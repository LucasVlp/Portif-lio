"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Gabinete de PC aberto. Conforme a página rola, cada peça entra voando de um
// lado e encaixa no lugar: placa-mãe, processador, cooler, memórias, placa de
// vídeo, fonte e SSD. No fim o LED acende e as ventoinhas giram.

// Ponto de partida de cada peça (deslocamento em px do viewBox e giro)
const from: Record<string, gsap.TweenVars> = {
  board: { x: -120, y: -30, rotate: -10 },
  cpu: { x: 0, y: -140, rotate: 30 },
  cooler: { x: 140, y: -120, rotate: 90 },
  ram: { x: 0, y: -160 },
  gpu: { x: 200, y: 20, rotate: 8 },
  psu: { x: -180, y: 60, rotate: -8 },
  ssd: { x: 180, y: 80, rotate: 15 },
  fan: { x: 120, y: -40, rotate: -120 },
};

function Fan({ cx, cy, r, className = "" }: { cx: number; cy: number; r: number; className?: string }) {
  const blade = `M${cx} ${cy} q${r * 0.2} ${-r * 0.75} ${r * 0.75} ${-r * 0.55}`;
  return (
    <g className={`pc-spin ${className}`} data-origin={`${cx} ${cy}`}>
      <circle cx={cx} cy={cy} r={r} fill="var(--panel)" />
      {[0, 90, 180, 270].map((a) => (
        <path key={a} d={blade} transform={`rotate(${a} ${cx} ${cy})`} stroke="var(--accent)" />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="var(--accent)" stroke="none" />
    </g>
  );
}

export default function PcBuild() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const parts = Object.keys(from);
      parts.forEach((p) => gsap.set(`.pc-${p}`, { ...from[p], opacity: 0, transformOrigin: "50% 50%" }));
      gsap.set(".pc-led", { fill: "#5a6275" });
      gsap.set(".pc-glow", { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: root.current, start: "top 90%", end: "center 50%", scrub: 0.7 },
      });
      parts.forEach((p, i) => {
        tl.to(`.pc-${p}`, { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1 }, i * 0.55);
      });
      tl.to(".pc-led", { fill: "#2bc24a", duration: 0.3 }).to(".pc-glow", { opacity: 1, duration: 0.5 }, "<");

      // Ventoinhas sempre girando; só aparecem depois que encaixam.
      gsap.utils.toArray<SVGGElement>(".pc-spin").forEach((el, i) => {
        gsap.to(el, { rotate: 360, svgOrigin: el.dataset.origin, duration: 1.6 + i * 0.3, repeat: -1, ease: "none" });
      });
    },
    { scope: root },
  );

  return (
    <figure ref={root} className="mx-auto w-full max-w-[380px] md:ml-auto md:mr-0">
      <svg
        viewBox="0 0 320 300"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Um gabinete de PC sendo montado peça por peça: placa-mãe, processador, cooler, memórias, placa de vídeo, fonte e SSD."
        fill="none"
        stroke="var(--fg)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Brilho do gabinete quando liga */}
        <rect className="pc-glow" x="34" y="4" width="252" height="292" rx="18" stroke="var(--accent)" strokeWidth="3" />

        {/* Gabinete aberto */}
        <rect x="40" y="10" width="240" height="280" rx="14" fill="var(--surface-2)" />
        <rect x="52" y="22" width="216" height="256" rx="8" fill="var(--bg)" stroke="var(--line)" />
        <circle className="pc-led" cx="262" cy="272" r="4" stroke="none" />

        {/* Placa-mãe */}
        <g className="pc-board">
          <rect x="66" y="32" width="160" height="176" rx="5" fill="#16285e" stroke="var(--accent)" />
          <path d="M80 120 h30 v20 h40 M80 190 h60 M200 130 v60 M170 44 h40" stroke="#3d7bff" strokeWidth="1.5" opacity="0.7" />
        </g>

        {/* Processador */}
        <g className="pc-cpu">
          <rect x="118" y="58" width="48" height="48" rx="3" fill="var(--surface-2)" />
          <rect x="128" y="68" width="28" height="28" rx="2" fill="var(--yellow)" stroke="none" />
        </g>

        {/* Cooler do processador */}
        <g className="pc-cooler">
          <Fan cx={142} cy={82} r={20} />
        </g>

        {/* Memórias */}
        <g className="pc-ram">
          <rect x="180" y="48" width="9" height="66" rx="2" fill="var(--cyan)" stroke="var(--fg)" />
          <rect x="195" y="48" width="9" height="66" rx="2" fill="var(--cyan)" stroke="var(--fg)" />
        </g>

        {/* Placa de vídeo */}
        <g className="pc-gpu">
          <rect x="66" y="148" width="190" height="38" rx="5" fill="var(--surface-2)" />
          <Fan cx={112} cy={167} r={14} />
          <Fan cx={158} cy={167} r={14} />
          <path d="M196 158 h48 M196 167 h48 M196 176 h48" stroke="var(--accent)" strokeWidth="1.5" />
        </g>

        {/* Fonte */}
        <g className="pc-psu">
          <rect x="62" y="222" width="100" height="46" rx="5" fill="var(--surface-2)" />
          <circle cx="112" cy="245" r="15" fill="var(--panel)" />
          <path d="M100 245 h24 M112 233 v24 M103 236 l18 18 M121 236 l-18 18" stroke="var(--muted)" strokeWidth="1.2" />
        </g>

        {/* SSD */}
        <g className="pc-ssd">
          <rect x="176" y="230" width="72" height="30" rx="4" fill="var(--surface-2)" />
          <rect x="184" y="238" width="30" height="14" rx="2" fill="var(--accent-fill)" stroke="none" />
          <path d="M222 245 h18" stroke="var(--muted)" />
        </g>

        {/* Ventoinha traseira */}
        <g className="pc-fan">
          <rect x="236" y="34" width="38" height="38" rx="6" fill="var(--surface-2)" />
          <Fan cx={255} cy={53} r={15} />
        </g>
      </svg>
      <figcaption className="mt-3 text-center text-small text-[var(--muted)] md:text-right">
        Todo projeto começa assim: peça por peça.
      </figcaption>
    </figure>
  );
}
