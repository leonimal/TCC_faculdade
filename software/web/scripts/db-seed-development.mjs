import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mysql from "mysql2/promise";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.resolve(
  scriptDirectory,
  "../../database/seeds/development.sql",
);
const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  throw new Error("DATABASE_URL não foi configurada.");
}

const connection = await mysql.createConnection({
  uri: databaseUrl,
  multipleStatements: true,
  timezone: "Z",
});

try {
  await connection.query(await readFile(seedPath, "utf8"));
  console.log("SEED development");
} finally {
  await connection.end();
}
