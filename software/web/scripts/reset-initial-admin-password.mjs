import { randomBytes, scryptSync } from "node:crypto";
import mysql from "mysql2/promise";

const email = (process.env.RESET_ADMIN_EMAIL ?? process.env.INITIAL_ADMIN_EMAIL)?.trim().toLowerCase();
const displayName = process.env.RESET_ADMIN_NAME?.trim() || "Administrador local";
const password = process.env.RESET_ADMIN_PASSWORD;

if (!email || !password || password.length < 12 || !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, INITIAL_ADMIN_EMAIL e RESET_ADMIN_PASSWORD (com pelo menos 12 caracteres) são obrigatórias.");
}

const salt = randomBytes(16).toString("base64url");
const passwordHash = `scrypt-v1$${salt}$${scryptSync(password, salt, 64).toString("base64url")}`;
const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  await connection.beginTransaction();
  const [users] = await connection.execute("SELECT id FROM application_users WHERE email = ? LIMIT 1", [email]);
  let action;
  if (users[0]) {
    const [result] = await connection.execute(
      "UPDATE application_users SET password_hash = ? WHERE id = ? AND role = 'ADMIN' AND active = TRUE",
      [passwordHash, users[0].id],
    );
    if (result.affectedRows !== 1) throw new Error("A conta encontrada não é um administrador ativo.");
    await connection.execute("DELETE FROM application_sessions WHERE user_id = ?", [users[0].id]);
    action = "Senha administrativa redefinida e sessões anteriores encerradas.";
  } else {
    await connection.execute(
      "INSERT INTO application_users (email, display_name, password_hash, role) VALUES (?, ?, ?, 'ADMIN')",
      [email, displayName, passwordHash],
    );
    action = "Conta administrativa local criada.";
  }
  await connection.commit();
  console.log(action);
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  await connection.end();
}

const loginResponse = await fetch("http://127.0.0.1:3100/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
if (!loginResponse.ok) throw new Error(`Senha redefinida, mas a validação do login falhou (HTTP ${loginResponse.status}).`);
console.log("Teste de login aprovado.");
