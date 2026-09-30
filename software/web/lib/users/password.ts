import "server-only";

import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const keyLength = 64;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("base64url");
  const hash = (await scrypt(password, salt, keyLength)) as Buffer;
  return `scrypt-v1$${salt}$${hash.toString("base64url")}`;
}

export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  const [version, salt, expected] = encoded.split("$");
  if (version !== "scrypt-v1" || !salt || !expected) return false;
  const expectedBuffer = Buffer.from(expected, "base64url");
  const receivedBuffer = (await scrypt(password, salt, expectedBuffer.length)) as Buffer;
  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}
