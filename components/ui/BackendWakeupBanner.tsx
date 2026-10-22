"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "ready" | "waking";

export default function BackendWakeupBanner() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 6;

    const ping = async () => {
      if (cancelled) return;
      attempts += 1;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!cancelled && res.ok) {
          setStatus("ready");
          return;
        }
      } catch {
        clearTimeout(timeout);
      }

      if (cancelled) return;
      if (attempts >= maxAttempts) {
        setStatus("waking");
        return;
      }
      setStatus("waking");
      setTimeout(ping, 4000);
    };

    const slowTimer = setTimeout(() => {
      if (!cancelled) setStatus((prev) => (prev === "ready" ? prev : "waking"));
    }, 2500);

    ping();

    return () => {
      cancelled = true;
      clearTimeout(slowTimer);
    };
  }, []);

  if (status === "ready") return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-4 py-2 text-xs text-yellow-200 shadow-lg backdrop-blur">
      {status === "checking"
        ? "Conectando con el servidor..."
        : "El servidor se está iniciando (Render). Puede tardar unos segundos..."}
    </div>
  );
}
