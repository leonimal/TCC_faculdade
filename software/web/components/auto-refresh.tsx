"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useTransition } from "react";

const REFRESH_INTERVAL_MS = 5_000;

export function AutoRefresh() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const refresh = useCallback(() => startTransition(() => router.refresh()), [router, startTransition]);
  useEffect(() => {
    const timer = window.setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [refresh]);

  return <button type="button" onClick={refresh} disabled={isPending} className="refresh-button"><span aria-hidden="true" className={isPending ? "refresh-button__dot refresh-button__dot--pending" : "refresh-button__dot"} />{isPending ? "Atualizando" : "Atualizar agora"}</button>;
}
