import { Dashboard } from "@/app/page";

type RoomPageProps = { params: Promise<{ room_code: string }> };

export default async function RoomPage({ params }: RoomPageProps) {
  const { room_code: classroomCode } = await params;
  return <Dashboard classroomCode={classroomCode} />;
}
