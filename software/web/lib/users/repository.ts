import "server-only";

import { createHash, randomBytes } from "node:crypto";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { getDatabasePool } from "@/lib/db";

export type UserRole = "ADMIN" | "VIEWER";
export type ApplicationUser = { id: number; email: string; displayName: string; role: UserRole; active: boolean; createdAt: string };
type UserRow = RowDataPacket & { id: number; email: string; display_name: string; password_hash: string; role: UserRole; active: number; created_at: Date };

export class UserNotFoundError extends Error { code = "USER_NOT_FOUND"; }
export class LastActiveAdminError extends Error { code = "LAST_ACTIVE_ADMIN"; }

function toUser(row: Omit<UserRow, "password_hash">): ApplicationUser {
  return { id: row.id, email: row.email, displayName: row.display_name, role: row.role, active: Boolean(row.active), createdAt: row.created_at.toISOString() };
}

export function hashSessionToken(token: string): string { return createHash("sha256").update(token).digest("hex"); }

export async function listApplicationUsers(): Promise<ApplicationUser[]> {
  const [rows] = await getDatabasePool().query<UserRow[]>("SELECT id, email, display_name, role, active, created_at FROM application_users ORDER BY role = 'ADMIN' DESC, display_name ASC");
  return rows.map(toUser);
}

export async function findUserByEmail(email: string): Promise<(ApplicationUser & { passwordHash: string }) | null> {
  const [rows] = await getDatabasePool().execute<UserRow[]>("SELECT id, email, display_name, password_hash, role, active, created_at FROM application_users WHERE email = ? LIMIT 1", [email]);
  const row = rows[0];
  return row ? { ...toUser(row), passwordHash: row.password_hash } : null;
}

export async function findApplicationUserById(id: number): Promise<ApplicationUser | null> {
  const [rows] = await getDatabasePool().execute<UserRow[]>("SELECT id, email, display_name, role, active, created_at FROM application_users WHERE id = ? LIMIT 1", [id]);
  return rows[0] ? toUser(rows[0]) : null;
}

export async function createApplicationUser(input: { email: string; displayName: string; passwordHash: string; role: UserRole }): Promise<ApplicationUser> {
  const pool = getDatabasePool();
  const [result] = await pool.execute<ResultSetHeader>("INSERT INTO application_users (email, display_name, password_hash, role) VALUES (?, ?, ?, ?)", [input.email, input.displayName, input.passwordHash, input.role]);
  const [rows] = await pool.execute<UserRow[]>("SELECT id, email, display_name, role, active, created_at FROM application_users WHERE id = ?", [result.insertId]);
  return toUser(rows[0]);
}

export async function updateApplicationUser(id: number, input: { displayName: string; role: UserRole; active: boolean; passwordHash?: string }): Promise<ApplicationUser> {
  const connection = await getDatabasePool().getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute<UserRow[]>("SELECT id, email, display_name, password_hash, role, active, created_at FROM application_users WHERE id = ? FOR UPDATE", [id]);
    const current = rows[0];
    if (!current) throw new UserNotFoundError();

    const removesAdminAccess = current.role === "ADMIN" && current.active && (input.role !== "ADMIN" || !input.active);
    if (removesAdminAccess) {
      const [adminRows] = await connection.query<(RowDataPacket & { total: number })[]>("SELECT COUNT(*) AS total FROM application_users WHERE role = 'ADMIN' AND active = TRUE FOR UPDATE");
      if (Number(adminRows[0]?.total ?? 0) <= 1) throw new LastActiveAdminError();
    }

    await connection.execute(
      "UPDATE application_users SET display_name = ?, role = ?, active = ?, password_hash = COALESCE(?, password_hash) WHERE id = ?",
      [input.displayName, input.role, input.active, input.passwordHash ?? null, id],
    );
    if (!input.active || input.passwordHash) {
      await connection.execute("DELETE FROM application_sessions WHERE user_id = ?", [id]);
    }
    const [updatedRows] = await connection.execute<UserRow[]>("SELECT id, email, display_name, role, active, created_at FROM application_users WHERE id = ?", [id]);
    await connection.commit();
    return toUser(updatedRows[0]);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function createSession(userId: number): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12);
  await getDatabasePool().execute("INSERT INTO application_sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)", [userId, hashSessionToken(token), expiresAt]);
  return token;
}

export async function findSessionUser(token: string): Promise<ApplicationUser | null> {
  const [rows] = await getDatabasePool().execute<UserRow[]>(`SELECT u.id, u.email, u.display_name, u.role, u.active, u.created_at
    FROM application_sessions s INNER JOIN application_users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > UTC_TIMESTAMP(3) AND u.active = TRUE LIMIT 1`, [hashSessionToken(token)]);
  if (!rows[0]) return null;
  await getDatabasePool().execute("UPDATE application_sessions SET last_seen_at = CURRENT_TIMESTAMP(3) WHERE token_hash = ?", [hashSessionToken(token)]);
  return toUser(rows[0]);
}

export async function deleteSession(token: string): Promise<void> {
  await getDatabasePool().execute("DELETE FROM application_sessions WHERE token_hash = ?", [hashSessionToken(token)]);
}
