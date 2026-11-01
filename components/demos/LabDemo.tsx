"use client";

import { useRef } from "react";
import { useLoop } from "./useLoop";

// Tela ilustrativa do sistema de laboratórios: o mapa das máquinas muda de estado
// ao vivo e uma reserva entra na agenda. TODO: troque pelos dados reais do sistema.
type Status = "livre" | "uso" | "manut";

const pcs: Status[] = [
  "uso", "uso", "livre", "uso", "livre",
  "livre", "uso", "manut", "livre", "uso",
  "uso", "livre", "uso", "livre", "livre",
];

const tone: Record<Status, string> = {
  livre: "#dff3e4",
  uso: "#dbe5ff",
  manut: "#fbe9cf",
};

export default function LabDemo() {
  const root = useRef<HTMLDivElement>(null);
  const free = useRef<HTMLSpanElement>(null);

  useLoop(root, (tl) => {
    const setFree = (n: number) => () => {
      if (free.current) free.current.textContent = String(n);
    };
    const paint = (i: number, s: Status) => {
      tl.to(`.pc-${i}`, { backgroundColor: tone[s], duration: 0.3 }, "+=0.7").call(() => {
        root.current?.querySelector(`.pc-${i} .pc-tag`)?.replaceChildren(s === "livre" ? "livre" : s === "uso" ? "em uso" : "manut.");
      });
    };

    tl.set(".reserva", { autoAlpha: 0, y: 12 })
      .call(() => pcs.forEach((s, i) => {
        const el = root.current?.querySelector<HTMLElement>(`.pc-${i}`);
        if (!el) return;
        el.style.backgroundColor = tone[s];
        el.querySelector(".pc-tag")?.replaceChildren(s === "livre" ? "livre" : s === "uso" ? "em uso" : "manut.");
      }))
      .call(setFree(7));

    paint(2, "uso");
    tl.call(setFree(6));
    paint(7, "livre");
    tl.call(setFree(7));
    paint(13, "manut");
    tl.call(setFree(6));
    tl.to(".reserva", { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, "+=0.5");
    tl.to({}, { duration: 2 });
  });

  return (
    <div ref={root} data-ui className="w-full max-w-[640px] overflow-hidden rounded-[14px] bg-[#fbfaf8] text-[13px] text-[#141413]">
      <div className="flex items-center gap-3 bg-[#e7e5df] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#cfccc4]" />
          <span className="size-2.5 rounded-full bg-[#cfccc4]" />
          <span className="size-2.5 rounded-full bg-[#cfccc4]" />
        </span>
        <span className="flex-1 truncate rounded-md bg-[#f6f5f1] px-3 py-1 text-[12px] text-[#6b6a64]">
          ti/laboratorios
        </span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 px-4 pb-3 pt-5">
        <div>
          <p className="text-[18px] font-extrabold tracking-tight">Laboratório 1</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#6b6a64]">
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-[#9fd8ad]" />livre</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-[#9db5f5]" />em uso</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-[#f0c47f]" />manutenção</span>
          </p>
        </div>
        <p className="text-right">
          <span className="block text-[11px] text-[#6b6a64]">Livres agora</span>
          <span className="text-[28px] font-extrabold leading-none tabular-nums">
            <span ref={free}>7</span>
            <span className="text-[16px] text-[#6b6a64]">/15</span>
          </span>
        </p>
      </div>

      <ul className="grid grid-cols-5 gap-2 px-4 pb-4">
        {pcs.map((s, i) => (
          <li
            key={i}
            className={`pc-${i} flex flex-col items-center gap-1 rounded-lg px-1 py-2`}
            style={{ backgroundColor: tone[s] }}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="#141413" strokeWidth="1.6" aria-hidden="true">
              <rect x="3" y="4" width="18" height="12" rx="1.5" />
              <path d="M9 20h6M12 16v4" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[10px] font-semibold">PC-{String(i + 1).padStart(2, "0")}</span>
            <span className="pc-tag text-[9.5px] text-[#4b4a45]">{s === "livre" ? "livre" : s === "uso" ? "em uso" : "manut."}</span>
          </li>
        ))}
      </ul>

      <div className="reserva mx-4 mb-4 flex items-center justify-between gap-3 rounded-lg bg-[#141413] px-4 py-3 text-[12px] text-white">
        <span>Laboratório 2 reservado</span>
        <span className="text-[#9fb0d8]">amanhã · 2ª aula</span>
      </div>
    </div>
  );
}
