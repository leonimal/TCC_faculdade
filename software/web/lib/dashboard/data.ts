import "server-only";

import { isDatabaseConfigured } from "@/lib/db";
import { getClassroomDevice } from "@/lib/classrooms/repository";
import { listMeasurements } from "@/lib/measurements/query-repository";

import {
  getCurrentConfiguration,
  getDeliverySummary,
  getLatestDeviceStatus,
  getPrimaryDashboardDevice,
  type DashboardConfiguration,
  type DashboardDeliverySummary,
  type DashboardDevice,
  type DashboardDeviceStatus,
} from "./repository";

export type DashboardSnapshot =
  | {
      state: "ready";
      refreshedAt: string;
      device: DashboardDevice;
      measurements: Awaited<ReturnType<typeof listMeasurements>>["measurements"];
      status: DashboardDeviceStatus | null;
      delivery: DashboardDeliverySummary;
      configuration: DashboardConfiguration | null;
    }
  | {
      state: "empty";
      refreshedAt: string;
      reason: "database_not_configured" | "no_active_device" | "no_classroom_device";
    }
  | {
      state: "unavailable";
      refreshedAt: string;
    };

export async function loadDashboardSnapshot(classroomCode?: string, requireClassroom = false): Promise<DashboardSnapshot> {
  const refreshedAt = new Date().toISOString();

  if (!isDatabaseConfigured()) {
    return { state: "empty", refreshedAt, reason: "database_not_configured" };
  }

  if (requireClassroom && !classroomCode) {
    return { state: "empty", refreshedAt, reason: "no_classroom_device" };
  }

  try {
    const device = classroomCode ? await getClassroomDevice(classroomCode) : await getPrimaryDashboardDevice();
    if (!device) {
      return {
        state: "empty",
        refreshedAt,
        reason: classroomCode ? "no_classroom_device" : "no_active_device",
      };
    }

    const [measurementPage, status, delivery, configuration] =
      await Promise.all([
        listMeasurements({ ...(classroomCode ? { classroomCode } : { deviceId: device.publicId }), limit: 180 }),
        getLatestDeviceStatus(device.publicId),
        getDeliverySummary(device.publicId),
        getCurrentConfiguration(device.publicId),
      ]);

    return {
      state: "ready",
      refreshedAt,
      device,
      measurements: measurementPage.measurements,
      status,
      delivery,
      configuration,
    };
  } catch (error) {
    console.error("Falha ao carregar o dashboard", error);
    return { state: "unavailable", refreshedAt };
  }
}
