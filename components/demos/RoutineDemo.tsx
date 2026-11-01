"use client";

import { useRef } from "react";
import { useLoop } from "./useLoop";

// Tela ilustrativa do app para crianças autistas: a rotina do dia em cartões
// grandes, uma etapa de cada vez. TODO: troque pelas telas reais do app.
const steps = [
  { label: "Acordar", color: "#ffe7a8", icon: <circle cx="12" cy="12" r="5" /> },
  { label: "Escovar os dentes", color: "#cfe3ff", icon: <path d="M5 15l9-9 4 4-9 9H5z M14 6l4 4" /> },
  { label: "Tomar café", color: "#ffd9c7", icon: <path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h2a2 2 0 0 1 0 4h-2" /> },
  { label: "Ir para a escola", color: "#d6f0d9", icon: <path d="M4 11l8-6 8 6v8H4zM10 19v-5h4v5" /> },
];

export default function RoutineDemo() {
  const root = useRef<HTMLDivElement>(null);

  useLoop(root, (tl) => {
    tl.set(".step-check", { scale: 0, autoAlpha: 0 })
      .set(".step", { opacity: 0.45, scale: 1 })
      .set(".step-0", { opacity: 1, scale: 1.03 })
      .set(".progress", { scaleX: 0 })
      .set(".toast", { yPercent: -160, autoAlpha: 0 });

    [0, 1, 2].forEach((i) => {
      tl.to(".cta", { scale: 0.94, duration: 0.12, ease: "power2.in" }, "+=1")
        .to(".cta", { scale: 1, duration: 0.3 })
        .to(`.step-${i} .step-check`, { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2.5)" }, "<")
        .to(`.step-${i}`, { opacity: 0.55, scale: 1, duration: 0.3 }, "<0.1")
        .to(`.step-${i + 1}`, { opacity: 1, scale: 1.03, duration: 0.35 }, "<")
        .to(".progress", { scaleX: (i + 1) / steps.length, duration: 0.5, ease: "power2.inOut" }, "<");
    });
    tl.to(".toast", { yPercent: 0, autoAlpha: 1, duration: 0.5 }, "+=0.2").to(
      ".toast",
      { yPercent: -160, autoAlpha: 0, duration: 0.4, ease: "power2.in" },
      "+=1.6",
    );
  });

  return (
    <div ref={root} data-ui className="mx-auto w-[min(300px,82vw)]">
      <div className="rounded-[46px] bg-[#1c1c1a] p-[10px]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[37px] bg-[#f7f6f2] font-sans text-[#1d2433]">
          <div className="flex items-center justify-between px-6 pt-3.5 text-[12px] font-semibold">
            <span>7:30</span>
            <span className="h-[22px] w-[78px] rounded-full bg-[#1c1c1a]" aria-hidden="true" />
            <span>4G</span>
          </div>

          <div className="toast absolute inset-x-3 top-11 z-10 rounded-2xl bg-[#2346d8] px-4 py-3 text-center text-[13px] font-semibold text-white opacity-0">
            Muito bem! Falta só uma.
          </div>

          <div className="px-5 pt-6">
            <p className="text-[12px] text-[#6b7286]">Hoje de manhã</p>
            <p className="mt-0.5 text-[24px] font-extrabold leading-none tracking-tight">Minha rotina</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e3e1da]">
              <div className="progress h-full origin-left rounded-full bg-[#2bc24a]" />
            </div>
          </div>

          <ul className="mt-4 space-y-2.5 px-3">
            {steps.map((s, i) => (
              <li
                key={s.label}
                className={`step step-${i} flex items-center gap-3 rounded-2xl px-3 py-3`}
                style={{ backgroundColor: s.color }}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/70">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="#1d2433" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {s.icon}
                  </svg>
                </span>
                <span className="flex-1 text-[14px] font-bold">{s.label}</span>
                <span className="step-check grid size-6 place-items-center rounded-full bg-[#2bc24a] text-[13px] text-white opacity-0">
                  ✓
                </span>
              </li>
            ))}
          </ul>

          <div className="absolute inset-x-3 bottom-4">
            <div className="cta flex h-12 items-center justify-center rounded-2xl bg-[#1d2433] text-[15px] font-semibold text-white">
              Terminei!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
