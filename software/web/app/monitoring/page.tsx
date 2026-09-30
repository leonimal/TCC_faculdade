import { redirect } from "next/navigation";

type MonitoringPageProps = { searchParams: Promise<{ room?: string | string[] }> };

export default async function MonitoringPage({ searchParams }: MonitoringPageProps) {
  const { room } = await searchParams;
  const target = typeof room === "string" ? `/?room=${encodeURIComponent(room)}` : "/";
  redirect(target);
}
