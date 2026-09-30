import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mysql from "mysql2/promise";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const databaseDirectory = path.resolve(scriptDirectory, "../../database");
const migrationsDirectory = path.join(databaseDirectory, "migrations");
const databaseUrl = process.env.DATABASE_ADMIN_URL?.trim();

if (!databaseUrl) {
  throw new Error("DATABASE_ADMIN_URL não foi configurada.");
}

const additionalMigrationNames = (await readdir(migrationsDirectory))
  .filter((name) => /^\d{3}_.+\.sql$/.test(name))
  .sort();
const migrations = [
  {
    id: "001_initial_schema",
    filePath: path.join(databaseDirectory, "schema.sql"),
  },
  ...additionalMigrationNames
    .filter((name) => !name.startsWith("001_"))
    .map((name) => ({
      id: path.basename(name, ".sql"),
      filePath: path.join(migrationsDirectory, name),
    })),
];

const connection = await mysql.createConnection({
  uri: databaseUrl,
  multipleStatements: true,
  timezone: "Z",
});

try {
  const [lockRows] = await connection.query(
    "SELECT GET_LOCK('tcc_iot_schema_migrations', 15) AS acquired",
  );
  if (lockRows[0]?.acquired !== 1) {
    throw new Error("Não foi possível obter o bloqueio das migrações.");
  }

  await connection.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id VARCHAR(190) PRIMARY KEY,
      checksum CHAR(64) NOT NULL,
      applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    )
  `);

  for (const migration of migrations) {
    const sql = await readFile(migration.filePath, "utf8");
    const checksum = createHash("sha256").update(sql).digest("hex");
    const [rows] = await connection.execute(
      "SELECT checksum FROM schema_migrations WHERE id = ?",
      [migration.id],
    );

    if (rows[0]) {
      if (rows[0].checksum !== checksum) {
        throw new Error(
          `A migração aplicada ${migration.id} foi alterada. Crie uma nova migração.`,
        );
      }
      console.log(`SKIP ${migration.id}`);
      continue;
    }

    await connection.query(sql);
    await connection.execute(
      "INSERT INTO schema_migrations (id, checksum) VALUES (?, ?)",
      [migration.id, checksum],
    );
    console.log(`APPLIED ${migration.id}`);
  }
} finally {
  try {
    await connection.query("SELECT RELEASE_LOCK('tcc_iot_schema_migrations')");
  } finally {
    await connection.end();
  }
}
