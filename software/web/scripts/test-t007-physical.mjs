import { writeFile } from "node:fs/promises";
import path from "node:path";

import mysql from "mysql2/promise";

const baseUrl = process.env.T007_BASE_URL ?? "http://127.0.0.1:3100";
const deviceId = "classroom-node-physical-01";
const classroomCode = "DEV-01";
const requestedSamples = 20;
const email = process.env.T007_ADMIN_EMAIL;
const password = process.env.T007_ADMIN_PASSWORD;

if (!email || !password || !process.env.DATABASE_URL) {
  throw new Error("T007_ADMIN_EMAIL, T007_ADMIN_PASSWORD e DATABASE_URL são obrigatórios.");
}

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const p95 = (values) => [...values].sort((left, right) => left - right)[Math.ceil(values.length * 0.95) - 1];

const login = await fetch(`${baseUrl}/api/auth/login`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ email, password }),
  redirect: "manual",
});
if (!login.ok) throw new Error(`Login do painel recusado (${login.status}).`);
const cookie = login.headers.get("set-cookie")?.split(";")[0];
if (!cookie) throw new Error("Sessão do painel ausente.");

const database = await mysql.createConnection(process.env.DATABASE_URL);
const measurementsQuery = `
  SELECT m.measurement_id, m.temperature_c, m.relative_humidity_pct, m.illuminance_lx,
    DATE_FORMAT(m.measured_at, '%Y-%m-%dT%H:%i:%s.000Z') AS measured_at_iso,
    TIMESTAMPDIFF(MICROSECOND, m.measured_at, m.first_received_at) / 1000 AS api_latency_ms,
    m.time_sync_status, m.temperature_status, m.humidity_status, m.illuminance_status,
    a.delivery_mode, a.outcome, a.queue_depth_before_send, a.dropped_total
  FROM measurements m
  JOIN devices d ON d.id = m.device_id
  JOIN ingestion_attempts a ON a.claimed_measurement_id = m.measurement_id
  WHERE d.public_id = ?
  ORDER BY m.first_received_at DESC
  LIMIT 80`;

try {
  const [initialRows] = await database.query(measurementsQuery, [deviceId]);
  const seen = new Set(initialRows.map((row) => row.measurement_id));
  const samples = [];
  const startedAt = new Date().toISOString();

  console.log(`T007 físico iniciado: aguardando ${requestedSamples} medições ONLINE.`);
  while (samples.length < requestedSamples) {
    const [rows] = await database.query(measurementsQuery, [deviceId]);
    const newRows = rows.filter((row) => !seen.has(row.measurement_id)).reverse();

    for (const row of newRows) {
      seen.add(row.measurement_id);
      if (row.delivery_mode !== "ONLINE" || row.outcome !== "STORED") continue;
      if (row.time_sync_status !== "SYNCED" || row.temperature_status !== "VALID" || row.humidity_status !== "VALID" || row.illuminance_status !== "VALID") {
        throw new Error(`Medição ${row.measurement_id} não é válida e sincronizada para T007.`);
      }

      let rendered = false;
      let dashboardLatencyMs = null;
      let dashboardStatus = null;
      for (let attempt = 0; attempt < 8 && !rendered; attempt += 1) {
        const response = await fetch(`${baseUrl}/?room=${classroomCode}&t007=${row.measurement_id}`, {
          headers: { cookie, "cache-control": "no-cache" },
        });
        const html = await response.text();
        dashboardStatus = response.status;
        const marker = (metric, value) => html.includes(`data-metric="${metric}"`) && html.includes(`data-reading-value="${Number(value)}"`) && html.includes(`data-reading-at="${row.measured_at_iso}"`);
        rendered = response.status === 200 && marker("temperature_c", row.temperature_c) && marker("relative_humidity_pct", row.relative_humidity_pct) && marker("illuminance_lx", row.illuminance_lx);
        if (rendered) dashboardLatencyMs = Date.now() - Date.parse(row.measured_at_iso);
        else await delay(400);
      }
      if (!rendered) throw new Error(`Dashboard não exibiu integralmente ${row.measurement_id} (HTTP ${dashboardStatus}).`);

      samples.push({
        measurement_id: row.measurement_id,
        measured_at: row.measured_at_iso,
        api_latency_ms: Number(row.api_latency_ms),
        dashboard_requested_render_ms: dashboardLatencyMs,
        queue_depth_before_send: Number(row.queue_depth_before_send),
        dropped_total: Number(row.dropped_total),
      });
      console.log(`Progresso T007: ${samples.length}/${requestedSamples}`);
      if (samples.length === requestedSamples) break;
    }
    if (samples.length < requestedSamples) await delay(500);
  }

  const apiLatencies = samples.map((sample) => sample.api_latency_ms);
  const dashboardLatencies = samples.map((sample) => sample.dashboard_requested_render_ms);
  const report = {
    test_id: "T007",
    generated_at: new Date().toISOString(),
    started_at: startedAt,
    mode: "physical_node_real_network",
    method: "authenticated server-rendered dashboard response requested after physical measurement persistence",
    limitation: "A atualização visual automática do navegador, de até 5 s, não foi cronometrada separadamente.",
    results: {
      sample_count: samples.length,
      consistency_rate_pct: 100,
      api_latency_p95_ms: p95(apiLatencies),
      dashboard_requested_render_p95_ms: p95(dashboardLatencies),
      api_within_5_seconds: p95(apiLatencies) <= 5000,
      dashboard_within_10_seconds: p95(dashboardLatencies) <= 10000,
      max_queue_depth_before_send: Math.max(...samples.map((sample) => sample.queue_depth_before_send)),
      dropped_total_min: Math.min(...samples.map((sample) => sample.dropped_total)),
      dropped_total_max: Math.max(...samples.map((sample) => sample.dropped_total)),
    },
    samples,
  };
  const reportPath = path.join(process.cwd(), "test-results", `t007-physical-${report.generated_at.replaceAll(":", "-")}.json`);
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`T007 concluído: ${reportPath}`);
} finally {
  await database.end();
}
