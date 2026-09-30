const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const deviceId = "classroom-node-physical-01";

async function login() {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.INITIAL_ADMIN_EMAIL,
      password: process.env.INITIAL_ADMIN_PASSWORD,
    }),
  });
  if (!response.ok) throw new Error(`Login administrativo falhou: HTTP ${response.status}.`);
  const cookie = response.headers.get("set-cookie");
  if (!cookie) throw new Error("A sessão administrativa não foi criada.");
  return cookie;
}

async function requestAsAdmin(cookie, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Cookie: cookie,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`API retornou HTTP ${response.status}.`);
  return body;
}

async function getConfiguration(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { Authorization: `Bearer ${process.env.NODE_API_KEY}` },
  });
  if (response.status === 404) return null;
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`Consulta da configuração falhou: HTTP ${response.status}.`);
  return body;
}

const cookie = await login();
const path = `/api/v1/devices/${deviceId}/configuration`;
const existing = await getConfiguration(path);

if (existing?.configuration) {
  console.log(JSON.stringify({ action: "existing", deviceId, configuration: existing.configuration }));
} else {
  const created = await requestAsAdmin(cookie, path, {
    method: "PATCH",
    body: JSON.stringify({
      sampling_interval_seconds: 60,
      requested_by: "Preparação do nó físico",
    }),
  });
  console.log(JSON.stringify({ action: "created", deviceId, configuration: created.configuration }));
}
