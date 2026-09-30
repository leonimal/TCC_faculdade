import mysql from "mysql2/promise";

const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const adminApiKey = process.env.ADMIN_API_KEY?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const deviceId = `device-registration-${crypto.randomUUID().slice(0, 8)}`;

if (!adminApiKey || !databaseUrl) {
  throw new Error("ADMIN_API_KEY e DATABASE_URL sao obrigatorias.");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function requestJson(path, { method = "GET", body, authorized = true } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(authorized ? { Authorization: `Bearer ${adminApiKey}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { status: response.status, body: await response.json() };
}

const connection = await mysql.createConnection({ uri: databaseUrl, timezone: "Z" });

try {
  await connection.execute("DELETE FROM devices WHERE public_id = ?", [deviceId]);

  const denied = await requestJson("/api/v1/devices", { authorized: false });
  assert(denied.status === 401, `Consulta sem credencial retornou ${denied.status}.`);

  const created = await requestJson("/api/v1/devices", {
    method: "POST",
    body: { public_id: deviceId, name: "No temporario de teste de cadastro" },
  });
  assert(created.status === 201, `Cadastro inesperado: ${JSON.stringify(created)}`);
  assert(created.body.device?.publicId === deviceId, "A resposta nao retornou o identificador cadastrado.");
  assert(created.body.device?.classroomCode === null, "Um no novo nao deve iniciar associado a uma sala.");

  const updated = await requestJson(`/api/v1/devices/${deviceId}`, {
    method: "PATCH",
    body: { name: "No temporario atualizado", active: false },
  });
  assert(updated.status === 200 && updated.body.device?.name === "No temporario atualizado" && updated.body.device?.active === false,
    `Edicao inesperada: ${JSON.stringify(updated)}`);

  const duplicate = await requestJson("/api/v1/devices", {
    method: "POST",
    body: { public_id: deviceId, name: "Tentativa duplicada" },
  });
  assert(duplicate.status === 409 && duplicate.body.error?.code === "DEVICE_ID_EXISTS", `Duplicidade inesperada: ${JSON.stringify(duplicate)}`);

  const listed = await requestJson("/api/v1/devices");
  const registered = listed.body.devices?.find((device) => device.publicId === deviceId);
  assert(listed.status === 200 && registered?.name === "No temporario atualizado" && registered?.active === false, `Listagem inesperada: ${JSON.stringify(listed)}`);
  assert(registered.classroomCode === null, "A listagem classificou um no novo em uma sala.");

  console.log(`PASS cadastro protegido, edicao, conflito e listagem de no: ${deviceId}`);
} finally {
  await connection.execute("DELETE FROM devices WHERE public_id = ?", [deviceId]);
  await connection.end();
}
