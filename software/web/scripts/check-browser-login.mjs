const debugAddress = process.env.TCC_BROWSER_DEBUG_ADDRESS ?? "http://127.0.0.1:9223";
const email = process.env.TCC_BROWSER_TEST_EMAIL;
const password = process.env.TCC_BROWSER_TEST_PASSWORD;

if (!email || !password) throw new Error("TCC_BROWSER_TEST_EMAIL e TCC_BROWSER_TEST_PASSWORD são obrigatórias.");

const pages = await fetch(`${debugAddress}/json/list`).then((response) => response.json());
const page = pages.find((candidate) => candidate.type === "page") ?? (await fetch(`${debugAddress}/json/new?http://127.0.0.1:3100/login`, { method: "PUT" }).then((response) => response.json()));
const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let sequence = 0;

const receive = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error("Tempo esgotado na conexão de diagnóstico do navegador.")), 10_000);
  socket.addEventListener("open", () => { clearTimeout(timeout); resolve(); });
  socket.addEventListener("error", () => { clearTimeout(timeout); reject(new Error("Não foi possível conectar ao navegador de diagnóstico.")); });
});
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});
await receive;

function command(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

await command("Page.enable");
await command("Page.navigate", { url: "http://127.0.0.1:3100/login" });
await new Promise((resolve) => setTimeout(resolve, 1_500));
const expression = `(() => {
  const form = document.querySelector("form");
  const emailInput = document.querySelector("input[name=email]");
  const passwordInput = document.querySelector("input[name=password]");
  if (!form || !emailInput || !passwordInput) throw new Error("Campos de login não encontrados.");
  emailInput.value = ${JSON.stringify(email)};
  emailInput.dispatchEvent(new Event("input", { bubbles: true }));
  passwordInput.value = ${JSON.stringify(password)};
  passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
  form.requestSubmit();
  return true;
})()`;
await command("Runtime.evaluate", { expression, awaitPromise: true });
await new Promise((resolve) => setTimeout(resolve, 2_000));
const result = await command("Runtime.evaluate", { expression: "location.pathname", returnByValue: true });
socket.close();
if (result.result.value !== "/") throw new Error(`O navegador permaneceu em ${result.result.value} após o login.`);
console.log("LOGIN_NO_NAVEGADOR_APROVADO");
