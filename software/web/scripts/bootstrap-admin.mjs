import { randomBytes, scryptSync } from "node:crypto";

import mysql from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL?.trim();
const email = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase();
const displayName = process.env.INITIAL_ADMIN_NAME?.trim();
const password = process.env.INITIAL_ADMIN_PASSWORD;

if (!databaseUrl || !email || !displayName || !password) throw new Error("DATABASE_URL, INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_NAME e INITIAL_ADMIN_PASSWORD são obrigatórias.");
if (password.length < 12) throw new Error("INITIAL_ADMIN_PASSWORD deve ter pelo menos 12 caracteres.");

const salt = randomBytes(16).toString("base64url");
const passwordHash = `scrypt-v1$${salt}$${scryptSync(password, salt, 64).toString("base64url")}`;
const connection = await mysql.createConnection({ uri: databaseUrl, timezone: "Z" });
try {
  const [existing] = await connection.execute("SELECT id FROM application_users WHERE email = ? LIMIT 1", [email]);
  if (existing.length) console.log("SKIP administrador inicial já cadastrado");
  else {
    await connection.execute("INSERT INTO application_users (email, display_name, password_hash, role) VALUES (?, ?, ?, 'ADMIN')", [email, displayName, passwordHash]);
    console.log(`CREATED administrador inicial: ${email}`);
  }
} finally { await connection.end(); }
