import { timingSafeEqual } from "node:crypto";

export type BearerAuthenticationStatus =
  | "authenticated"
  | "invalid"
  | "not_configured";

function authenticateBearer(
  request: Request,
  expected: string | undefined,
): BearerAuthenticationStatus {
  expected = expected?.trim();

  if (!expected) {
    return "not_configured";
  }

  const authorization = request.headers.get("authorization");
  const prefix = "Bearer ";

  if (!authorization?.startsWith(prefix)) {
    return "invalid";
  }

  const received = authorization.slice(prefix.length);
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return "invalid";
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer)
    ? "authenticated"
    : "invalid";
}

export function authenticateNode(request: Request): BearerAuthenticationStatus {
  return authenticateBearer(request, process.env.NODE_API_KEY);
}

export function authenticateAdmin(request: Request): BearerAuthenticationStatus {
  return authenticateBearer(request, process.env.ADMIN_API_KEY);
}
