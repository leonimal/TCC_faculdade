import "server-only";

import { getPrimaryDashboardDevice } from "@/lib/dashboard/repository";
import { getClassroom, getClassroomDeviceForDevice } from "@/lib/classrooms/repository";
import { isDatabaseConfigured } from "@/lib/db";

import type { ReportPeriod } from "./filters";
import type { ReportTimeQuality } from "./filters";
import {
  getReportMeasurements,
  getReportSummary,
  type ReportSummary,
} from "./repository";

export type ReportSnapshot =
  | {
      state: "ready";
      generatedAt: string;
      device: { publicId: string | null; name: string; code: string };
      period: ReportPeriod;
      timeQuality: ReportTimeQuality;
      summary: ReportSummary;
      measurements: Awaited<ReturnType<typeof getReportMeasurements>>;
    }
  | {
      state: "empty";
      generatedAt: string;
      reason: "database_not_configured" | "no_active_device";
    }
  | {
      state: "unavailable";
      generatedAt: string;
    };

export async function loadReportSnapshot(
  period: ReportPeriod, classroomCode?: string, timeQuality: ReportTimeQuality = "SYNCHRONIZED",
): Promise<ReportSnapshot> {
  const generatedAt = new Date().toISOString();

  if (!isDatabaseConfigured()) {
    return { state: "empty", generatedAt, reason: "database_not_configured" };
  }

  try {
    const primaryDevice = classroomCode ? null : await getPrimaryDashboardDevice();
    const device = classroomCode
      ? await getClassroom(classroomCode)
      : primaryDevice ? await getClassroomDeviceForDevice(primaryDevice.publicId) : null;
    if (!device) {
      return { state: "empty", generatedAt, reason: "no_active_device" };
    }

    const [summary, measurements] = await Promise.all([
      getReportSummary(device.code, period, timeQuality),
      getReportMeasurements(device.code, period, timeQuality),
    ]);

    return {
      state: "ready",
      generatedAt,
      device: {
        publicId: "publicId" in device ? device.publicId : device.devicePublicId,
        name: device.name,
        code: device.code,
      },
      period,
      timeQuality,
      summary,
      measurements,
    };
  } catch (error) {
    console.error("Falha ao carregar o relatório", error);
    return { state: "unavailable", generatedAt };
  }
}
