import "server-only";

import mysql, { type Pool } from "mysql2/promise";

const globalForDatabase = globalThis as typeof globalThis & {
  tccMysqlPool?: Pool;
};

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getDatabasePool(): Pool {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL_NOT_CONFIGURED");
  }

  if (!globalForDatabase.tccMysqlPool) {
    globalForDatabase.tccMysqlPool = mysql.createPool({
      uri: databaseUrl,
      connectionLimit: 5,
      enableKeepAlive: true,
      queueLimit: 0,
      timezone: "Z",
      waitForConnections: true,
    });
  }

  return globalForDatabase.tccMysqlPool;
}

export async function checkDatabaseConnection(): Promise<void> {
  await getDatabasePool().query("SELECT 1");
}
