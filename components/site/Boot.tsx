"use client";

import { useRef } from "react";
import { profile } from "@/content/profile";
import { gsap, useGSAP, markIntroDone } from "@/lib/gsap";

// Tela de carregamento: o logo se desenha, o nome sobe letra por letra e a barra
// enche passando por três etapas de um computador ligando. No fim, as duas metades
// da tela se abrem revelando o site. Cerca de 2,2 s.
const steps = ["Ligando a fonte…", "Reconhecendo o hardware…", "Conectando à rede…"];

export default function Boot() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const step = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      html.style.overflow = "hidden";
      const n = { v: 0 };

      gsap
        .timeline({
          onComplete: () => {
            html.style.overflow = "";
            root.current?.remove();
          },
        })
        .from(".boot-mark-bg", { scale: 0.4, autoAlpha: 0, rotate: -20, duration: 0.6, ease: "back.out(1.8)", transformOrigin: "50% 50%" })
        .fromTo(".boot-mark-line", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, "-=0.2")
        .from(".boot-mark-dot", { scale: 0, duration: 0.35, ease: "back.out(3)", transformOrigin: "50% 50%" }, "-=0.15")
        .from(".boot-char", { yPercent: 110, duration: 0.6, ease: "expo.out", stagger: 0.025 }, 0.35)
        .from(".boot-meta", { autoAlpha: 0, y: 10, duration: 0.4 }, 0.55)
        .to(
          n,
          {
            v: 100,
            duration: 1.25,
            ease: "power1.inOut",
            onUpdate: () => {
              const v = Math.round(n.v);
              if (count.current) count.current.textContent = `${String(v).padStart(3, "0")}%`;
              if (step.current) step.current.textContent = steps[Math.min(steps.length - 1, Math.floor(v / 34))];
            },
          },
          0.55,
        )
        .fromTo(".boot-bar", { scaleX: 0 }, { scaleX: 1, duration: 1.25, ease: "power1.inOut" }, 0.55)
        .to(".boot-content", { autoAlpha: 0, scale: 0.94, duration: 0.35, ease: "power2.in" }, "+=0.1")
        .add(markIntroDone, "-=0.05")
        .to(".boot-top", { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, "<")
        .to(".boot-bottom", { yPercent: 100, duration: 0.75, ease: "power4.inOut" }, "<");

      return () => {
        html.style.overflow = "";
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true" className="tv-boot fixed inset-0 z-[100]">
      <div className="boot-top absolute inset-x-0 top-0 h-1/2 bg-[#070b16]" />
      <div className="boot-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#070b16]" />

      <div className="boot-content absolute inset-0 grid place-items-center px-6 text-[#e8edf7]">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 32 32" className="size-20 sm:size-24">
            <rect className="boot-mark-bg" width="32" height="32" rx="9" fill="#2346d8" />
            <path
              className="boot-mark-line"
              d="M8.5 7v18h11M14.5 7l5 18 5-18"
              pathLength={1}
              strokeDasharray="1"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle className="boot-mark-dot" cx="25.6" cy="25" r="1.9" fill="#f2d900" />
          </svg>

          <p className="mt-6 overflow-hidden text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-bold leading-none tracking-[-0.03em]">
            {Array.from(profile.name).map((ch, i) => (
              <span key={i} className="boot-char inline-block">
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>

          <div className="boot-meta mt-8 w-[min(280px,70vw)]">
            <div className="h-1.5 overflow-hidden rounded-full bg-[#17213a]">
              <div className="boot-bar h-full origin-left rounded-full bg-[#3d7bff]" style={{ transform: "scaleX(0)" }} />
            </div>
            <p className="tv-mono mt-3 flex justify-between gap-4 text-[12px] text-[#8e99b3]">
              <span ref={step}>{steps[0]}</span>
              <span ref={count}>000%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
