import mysql from "mysql2/promise";

const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const nodeApiKey = process.env.NODE_API_KEY?.trim();
const adminApiKey = process.env.ADMIN_API_KEY?.trim();
const initialAdminEmail = process.env.INITIAL_ADMIN_EMAIL?.trim();
const initialAdminPassword = process.env.INITIAL_ADMIN_PASSWORD;
const databaseUrl = process.env.DATABASE_URL?.trim();
const suffix = crypto.randomUUID().slice(0, 8);
const deviceId = `room-test-node-${suffix}`;
const roomA = `TEST-A-${suffix}`;
const roomB = `TEST-B-${suffix}`;
const measurementA = crypto.randomUUID();
const measurementB = crypto.randomUUID();
const bootId = crypto.randomUUID();
const requestedBy = `classroom-integration-${suffix}`;

if (!nodeApiKey || !adminApiKey || !databaseUrl) {
  throw new Error("NODE_API_KEY, ADMIN_API_KEY e DATABASE_URL são obrigatórias.");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function saoPauloDateKey(value) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(value);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

let adminSessionCookie;

async function loginAsInitialAdmin() {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: initialAdminEmail, password: initialAdminPassword }),
  });
  const cookie = response.headers.get("set-cookie")?.split(";", 1)[0];
  assert(response.status === 200 && cookie?.startsWith("tcc_iot_session="), `Login administrativo inesperado: ${response.status}.`);
  adminSessionCookie = cookie;
}

async function requestJson(path, { method = "GET", body, admin = false } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(admin ? { Cookie: adminSessionCookie } : { Authorization: `Bearer ${nodeApiKey}` }),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { status: response.status, body: await response.json() };
}

function measurementPayload(measurementId, sequenceNumber, temperature, measuredAt) {
  return {
    schema_version: 1,
    measurement: {
      measurement_id: measurementId, device_id: deviceId, boot_id: bootId,
      sequence_number: sequenceNumber, run_id: null, configuration_version: 1,
      measured_at: measuredAt, device_uptime_ms: sequenceNumber * 1000,
      time_sync_status: "SYNCED",
      readings: {
        temperature_c: { value: temperature, status: "VALID" },
        relative_humidity_pct: { value: 50, status: "VALID" },
        illuminance_lx: { value: 500, status: "VALID" },
      },
    },
    delivery: {
      mode: "ONLINE", sent_at: new Date().toISOString(), queue_depth_before_send: 0,
      queue_capacity: 256, dropped_total: 0,
    },
  };
}

const connection = await mysql.createConnection({ uri: databaseUrl, timezone: "Z" });

async function cleanup() {
  await connection.execute(
    "DELETE o FROM local_monitoring_occurrences o INNER JOIN devices d ON d.id = o.device_id WHERE d.public_id = ?",
    [deviceId],
  );
  await connection.execute(
    "DELETE r FROM local_monitoring_rules r INNER JOIN local_monitoring_profiles p ON p.id = r.profile_id INNER JOIN devices d ON d.id = p.device_id WHERE d.public_id = ?",
    [deviceId],
  );
  await connection.execute(
    "DELETE p FROM local_monitoring_profiles p INNER JOIN devices d ON d.id = p.device_id WHERE d.public_id = ?",
    [deviceId],
  );
  await connection.execute(
    "DELETE f FROM measurement_flags f INNER JOIN measurements m ON m.measurement_id = f.measurement_id INNER JOIN devices d ON d.id = m.device_id WHERE d.public_id = ?",
    [deviceId],
  );
  await connection.execute(
    "DELETE a FROM ingestion_attempts a INNER JOIN devices d ON d.id = a.device_id WHERE d.public_id = ?",
    [deviceId],
  );
  await connection.execute(
    "DELETE m FROM measurements m INNER JOIN devices d ON d.id = m.device_id WHERE d.public_id = ?",
    [deviceId],
  );
  await connection.execute(
    "DELETE a FROM device_classroom_assignments a INNER JOIN devices d ON d.id = a.device_id WHERE d.public_id = ?",
    [deviceId],
  );
  await connection.execute("DELETE FROM classrooms WHERE code IN (?, ?)", [roomA, roomB]);
  await connection.execute(
    "DELETE c FROM sampling_configurations c INNER JOIN devices d ON d.id = c.device_id WHERE d.public_id = ?",
    [deviceId],
  );
  await connection.execute("DELETE FROM devices WHERE public_id = ?", [deviceId]);
}

try {
  await cleanup();
  await loginAsInitialAdmin();
  await connection.execute("INSERT INTO devices (public_id, name) VALUES (?, ?)", [deviceId, "Nó temporário de teste de salas"]);
  const [deviceRows] = await connection.execute("SELECT id FROM devices WHERE public_id = ?", [deviceId]);
  await connection.execute(
    "INSERT INTO sampling_configurations (device_id, version, sampling_interval_seconds, status, requested_by, acknowledged_at) VALUES (?, 1, 60, 'APPLIED', ?, CURRENT_TIMESTAMP(3))",
    [deviceRows[0].id, requestedBy],
  );

  const denied = await fetch(`${baseUrl}/api/v1/classrooms`, { method: "GET" });
  assert(denied.status === 401, `Consulta sem credencial retornou ${denied.status}.`);

  const assignA = await requestJson("/api/v1/classrooms", {
    admin: true, method: "POST", body: { code: roomA, name: "Sala A temporária", device_id: deviceId },
  });
  assert(assignA.status === 201, `Associação inicial inesperada: ${JSON.stringify(assignA)}`);

  const updatedA = await requestJson(`/api/v1/classrooms/${roomA}`, {
    admin: true, method: "PATCH", body: {
      name: "Sala A temporaria atualizada", building: "Bloco de teste", floor: "1", device_id: deviceId,
      installation_position: "Parede lateral", installation_height_cm: 180, responsible: requestedBy, notes: "Edicao integrada",
    },
  });
  assert(updatedA.status === 200 && updatedA.body.classroom?.name === "Sala A temporaria atualizada" && updatedA.body.classroom?.devicePublicId === deviceId,
    `Edicao da sala inesperada: ${JSON.stringify(updatedA)}`);

  const profile = await requestJson(`/api/v1/devices/${deviceId}/local-monitoring-profile`, {
    admin: true, method: "PATCH", body: {
      enabled: true, requested_by: requestedBy, justification: "Teste integrado de isolamento por sala.",
      rules: [{ variable: "TEMPERATURE_C", lower_limit: 20, upper_limit: 28 }],
    },
  });
  assert(profile.status === 201, `Perfil local inesperado: ${JSON.stringify(profile)}`);

  const now = Date.now();
  const storedA = await requestJson("/api/v1/measurements", {
    method: "POST", body: measurementPayload(measurementA, 1, 19, new Date(now + 5_000).toISOString()),
  });
  assert(storedA.status === 201 && storedA.body.ingestion_status === "STORED", `Medição da sala A inesperada: ${JSON.stringify(storedA)}`);

  const transfer = await requestJson("/api/v1/classrooms", {
    admin: true, method: "POST", body: { code: roomB, name: "Sala B temporária", device_id: deviceId },
  });
  assert(transfer.status === 201, `Transferência para a sala B inesperada: ${JSON.stringify(transfer)}`);
  const storedB = await requestJson("/api/v1/measurements", {
    method: "POST", body: measurementPayload(measurementB, 2, 29, new Date(now + 10_000).toISOString()),
  });
  assert(storedB.status === 201 && storedB.body.ingestion_status === "STORED", `Medição da sala B inesperada: ${JSON.stringify(storedB)}`);

  const [measurementRows] = await connection.execute(
    `SELECT m.measurement_id, c.code AS classroom_code
       FROM measurements m INNER JOIN classrooms c ON c.id = m.classroom_id
      WHERE m.measurement_id IN (?, ?) ORDER BY m.measurement_id`,
    [measurementA, measurementB],
  );
  const measurementRooms = Object.fromEntries(measurementRows.map((row) => [row.measurement_id, row.classroom_code]));
  assert(measurementRooms[measurementA] === roomA && measurementRooms[measurementB] === roomB, `Snapshot de sala incorreto: ${JSON.stringify(measurementRows)}`);

  const [occurrenceRows] = await connection.execute(
    `SELECT o.measurement_id, c.code AS classroom_code
       FROM local_monitoring_occurrences o INNER JOIN classrooms c ON c.id = o.classroom_id
      WHERE o.measurement_id IN (?, ?)`,
    [measurementA, measurementB],
  );
  const occurrenceRooms = Object.fromEntries(occurrenceRows.map((row) => [row.measurement_id, row.classroom_code]));
  assert(occurrenceRooms[measurementA] === roomA && occurrenceRooms[measurementB] === roomB, `Snapshot de alertas incorreto: ${JSON.stringify(occurrenceRows)}`);

  const [assignmentRows] = await connection.execute(
    `SELECT c.code, a.unassigned_at FROM device_classroom_assignments a
       INNER JOIN classrooms c ON c.id = a.classroom_id
      WHERE a.device_id = ? AND c.code IN (?, ?) ORDER BY a.id`,
    [deviceRows[0].id, roomA, roomB],
  );
  assert(assignmentRows.length === 2 && assignmentRows[0].unassigned_at && assignmentRows[1].code === roomB && assignmentRows[1].unassigned_at === null, `Histórico de associação incorreto: ${JSON.stringify(assignmentRows)}`);

  const reportDate = saoPauloDateKey(new Date(now));
  const urls = [
    [`/reports?room=${roomA}&from=${reportDate}&to=${reportDate}`, measurementA, measurementB],
    [`/reports?room=${roomB}&from=${reportDate}&to=${reportDate}`, measurementB, measurementA],
    [`/alerts?room=${roomA}&from=${reportDate}&to=${reportDate}`, measurementA, measurementB],
    [`/alerts?room=${roomB}&from=${reportDate}&to=${reportDate}`, measurementB, measurementA],
    [`/reports/export?room=${roomA}&from=${reportDate}&to=${reportDate}`, measurementA, measurementB],
  ];
  for (const [path, includedId, excludedId] of urls) {
    const response = await fetch(`${baseUrl}${path}`, { headers: { "Cache-Control": "no-cache", Cookie: adminSessionCookie } });
    const body = await response.text();
    assert(response.status === 200, `${path} retornou ${response.status}.`);
    assert(body.includes(includedId) && !body.includes(excludedId), `Isolamento incorreto em ${path}.`);
  }

  const reportFilter = await fetch(`${baseUrl}/reports?room=${roomA}&from=${reportDate}&to=${reportDate}`, { headers: { "Cache-Control": "no-cache", Cookie: adminSessionCookie } });
  const reportFilterBody = await reportFilter.text();
  assert(reportFilter.status === 200, `Caderno de observacao retornou ${reportFilter.status}.`);
  assert(reportFilterBody.includes(`value="${roomA}"`) && reportFilterBody.includes(`value="${roomB}"`), "O seletor do Caderno de observacao nao lista as salas cadastradas.");
  assert(/<option[^>]*selected[^>]*value="[^"]+"|<option[^>]*value="[^"]+"[^>]*selected/.test(reportFilterBody), "O seletor do Caderno de observacao nao preservou a sala escolhida.");

  const liveMonitoring = await fetch(`${baseUrl}/?room=${roomB}`, { headers: { "Cache-Control": "no-cache", Cookie: adminSessionCookie } });
  const liveMonitoringBody = await liveMonitoring.text();
  assert(liveMonitoring.status === 200, `Monitoramento em tempo real retornou ${liveMonitoring.status}.`);
  assert(liveMonitoringBody.includes("Monitoramento em") && liveMonitoringBody.includes("tempo real"), "A tela de monitoramento em tempo real nao foi renderizada.");
  assert(liveMonitoringBody.includes(`value="${roomA}"`) && liveMonitoringBody.includes(`value="${roomB}"`), "O seletor do monitoramento em tempo real nao lista as salas cadastradas.");
  const selectedLiveRoom = new RegExp(`<option[^>]*(?:selected[^>]*value="${roomB}"|value="${roomB}"[^>]*selected)`).test(liveMonitoringBody);
  assert(selectedLiveRoom, "O monitoramento em tempo real nao preservou a sala selecionada.");

  const multiRoomAlerts = await fetch(`${baseUrl}/alerts?room=${roomA}&room=${roomB}&from=${reportDate}&to=${reportDate}`, { headers: { "Cache-Control": "no-cache", Cookie: adminSessionCookie } });
  const multiRoomBody = await multiRoomAlerts.text();
  assert(multiRoomAlerts.status === 200, `Consulta multissala de alertas retornou ${multiRoomAlerts.status}.`);
  assert(multiRoomBody.includes(measurementA) && multiRoomBody.includes(measurementB), "A consulta multissala não exibiu alertas das duas salas.");
  assert(multiRoomBody.includes(roomA) && multiRoomBody.includes(roomB), "A consulta multissala não identificou as salas selecionadas.");

  console.log("PASS cadastro: salas protegidas por credencial administrativa");
  console.log("PASS associação: o nó foi transferido entre duas salas");
  console.log("PASS rastreabilidade: medições e alertas preservam a sala do instante da coleta");
  console.log("PASS isolamento: relatórios, CSV e alertas exibem somente a sala consultada");
  console.log("PASS caderno de observacao: o seletor unitario lista e preserva a sala consultada");
} finally {
  let cleanupSucceeded = false;
  try {
    if (adminSessionCookie) await fetch(`${baseUrl}/api/auth/logout`, { method: "POST", headers: { Cookie: adminSessionCookie } });
    await cleanup();
    const [remainingRows] = await connection.execute(
      "SELECT (SELECT COUNT(*) FROM devices WHERE public_id = ?) + (SELECT COUNT(*) FROM classrooms WHERE code IN (?, ?)) AS total",
      [deviceId, roomA, roomB],
    );
    cleanupSucceeded = Number(remainingRows[0].total) === 0;
  } finally {
    await connection.end();
  }
  if (!cleanupSucceeded) throw new Error("A limpeza dos dados temporários de salas falhou.");
}

console.log("PASS limpeza: nenhum nó, sala, medição ou alerta temporário permaneceu no MySQL");
