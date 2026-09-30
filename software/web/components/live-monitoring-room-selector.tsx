"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type RoomOption = {
  code: string;
  name: string;
  hasDevice: boolean;
};

export function LiveMonitoringRoomSelector({ rooms, selectedRoomCode }: { rooms: RoomOption[]; selectedRoomCode?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const selectRoom = (roomCode: string) => {
    startTransition(() => {
      router.replace(`/monitoring?room=${encodeURIComponent(roomCode)}`);
      router.refresh();
    });
  };

  return <label className="live-monitoring-picker">
    <span>Sala em observação</span>
    <select aria-label="Escolher sala para monitoramento em tempo real" value={selectedRoomCode ?? ""} disabled={isPending || rooms.length === 0} onChange={(event) => selectRoom(event.target.value)}>
      {rooms.length === 0 ? <option value="">Nenhuma sala cadastrada</option> : null}
      {rooms.map((room) => <option key={room.code} value={room.code}>{room.code} · {room.name}{room.hasDevice ? "" : " · sem nó associado"}</option>)}
    </select>
  </label>;
}
