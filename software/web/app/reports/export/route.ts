import { getClassroom } from "@/lib/classrooms/repository";
import { isDatabaseConfigured } from "@/lib/db";
import { parseReportPeriod, parseReportTimeQuality, parseReportValueFormat } from "@/lib/reports/filters";
import { measurementsToCsv } from "@/lib/reports/presentation";
import { getExportMeasurements } from "@/lib/reports/repository";
import { getRequestUser } from "@/lib/user-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  if (!(await getRequestUser(request))) return Response.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const fromValues = url.searchParams.getAll("from");
  const toValues = url.searchParams.getAll("to");
  const roomValues = url.searchParams.getAll("room");
  const timeValues = url.searchParams.getAll("time");
  const valueFormatValues = url.searchParams.getAll("values");
  const parsedPeriod = parseReportPeriod({
    from:
      fromValues.length > 1 ? fromValues : (fromValues[0] ?? undefined),
    to: toValues.length > 1 ? toValues : (toValues[0] ?? undefined),
  });

  if (!parsedPeriod.success) {
    return Response.json(
      { error: "invalid_report_period", details: parsedPeriod.errors },
      { status: 400 },
    );
  }
  if (roomValues.length !== 1 || !/^[A-Za-z0-9._-]{1,64}$/.test(roomValues[0])) {
    return Response.json({ error: "invalid_classroom" }, { status: 400 });
  }
  if (timeValues.length > 1) return Response.json({ error: "invalid_time_filter" }, { status: 400 });
  if (valueFormatValues.length > 1) return Response.json({ error: "invalid_value_format" }, { status: 400 });
  const timeQuality = parseReportTimeQuality(timeValues[0]);
  const valueFormat = parseReportValueFormat(valueFormatValues[0]);
  if (!isDatabaseConfigured()) {
    return Response.json({ error: "database_not_configured" }, { status: 503 });
  }

  try {
    const classroom = await getClassroom(roomValues[0]);
    if (!classroom) {
      return Response.json({ error: "classroom_not_found" }, { status: 404 });
    }

    const exported = await getExportMeasurements(
      classroom.code,
      parsedPeriod.period,
      timeQuality,
    );
    if (exported.exceededLimit) {
      return Response.json(
        {
          error: "export_limit_exceeded",
          message: "Reduza o período para exportar no máximo 5000 registros.",
        },
        { status: 422 },
      );
    }

    const filename = `relatorio-${classroom.code}-${parsedPeriod.period.fromDate}-a-${parsedPeriod.period.toDate}.csv`;
    return new Response(measurementsToCsv(exported.measurements, valueFormat), {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "text/csv; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Falha ao exportar relatório", error);
    return Response.json({ error: "report_unavailable" }, { status: 503 });
  }
}
