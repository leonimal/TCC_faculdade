import "server-only";

import { listClassrooms, type Classroom } from "@/lib/classrooms/repository";
import { isDatabaseConfigured } from "@/lib/db";
import { listLocalMonitoringOccurrences } from "@/lib/local-monitoring/repository";
import type { ReportPeriod } from "@/lib/reports/filters";

export type AlertSnapshot =
  | {
      state: "ready";
      generatedAt: string;
      classrooms: Classroom[];
      period: ReportPeriod;
      alerts: Awaited<ReturnType<typeof listLocalMonitoringOccurrences>>;
    }
  | { state: "empty"; generatedAt: string; reason: "database_not_configured" | "no_classrooms" }
  | { state: "unavailable"; generatedAt: string };

export async function loadAlertSnapshot(period: ReportPeriod, classroomCodes?: string[]): Promise<AlertSnapshot> {
  const generatedAt = new Date().toISOString();
  if (!isDatabaseConfigured()) return { state: "empty", generatedAt, reason: "database_not_configured" };

  try {
    const availableClassrooms = await listClassrooms();
    const classrooms = classroomCodes?.length
      ? availableClassrooms.filter((classroom) => classroomCodes.includes(classroom.code))
      : availableClassrooms;
    if (classrooms.length === 0) return { state: "empty", generatedAt, reason: "no_classrooms" };
    const alerts = await listLocalMonitoringOccurrences(period, classrooms.map((classroom) => classroom.code));
    return {
      state: "ready",
      generatedAt,
      classrooms,
      period,
      alerts,
    };
  } catch (error) {
    console.error("Falha ao carregar alertas locais", error);
    return { state: "unavailable", generatedAt };
  }
}
