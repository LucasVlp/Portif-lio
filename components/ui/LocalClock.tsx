"use client";

import { useEffect, useState } from "react";

export default function LocalClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", { timeZone, hour: "2-digit", minute: "2-digit" });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--"}
    </time>
  );
}
