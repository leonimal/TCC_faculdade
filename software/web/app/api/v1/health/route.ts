import {
  checkDatabaseConnection,
  isDatabaseConfigured,
} from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type DatabaseStatus =
  | "not_checked"
  | "not_configured"
  | "reachable"
  | "unreachable";

export async function GET(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  const shouldCheckDatabase = requestUrl.searchParams.get("database") === "1";
  let database: DatabaseStatus = "not_checked";
  let status = 200;

  if (shouldCheckDatabase) {
    if (!isDatabaseConfigured()) {
      database = "not_configured";
      status = 503;
    } else {
      try {
        await checkDatabaseConnection();
        database = "reachable";
      } catch {
        database = "unreachable";
        status = 503;
      }
    }
  }

  return Response.json(
    {
      service: "tcc-iot-api",
      status: status === 200 ? "ok" : "degraded",
      version: "0.1.0",
      timestamp: new Date().toISOString(),
      checks: { database },
    },
    {
      headers: { "Cache-Control": "no-store" },
      status,
    },
  );
}
