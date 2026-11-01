"use client";

import type { PointerEvent, ReactNode } from "react";
import Magnetic from "@/components/ui/Magnetic";

// Botão do hero: um círculo de cor nasce no ponto onde o mouse entra e some
// pelo ponto onde sai, o texto "rola" para cima e o ícone troca de lugar.
export default function HeroButton({
  href,
  label,
  icon,
  variant = "primary",
}: {
  href: string;
  label: string;
  icon: ReactNode;
  variant?: "primary" | "ghost" | "light";
}) {
  const track = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <Magnetic strength={0.25}>
      <a href={href} onPointerEnter={track} onPointerLeave={track} className={`hero-btn hero-btn--${variant}`}>
        <span className="hero-btn__fill" aria-hidden="true" />
        <span className="hero-btn__label">
          <span data-text={label}>{label}</span>
        </span>
        <span className="hero-btn__icon" aria-hidden="true">
          <span className="hero-btn__glyph">{icon}</span>
          <span className="hero-btn__glyph hero-btn__glyph--next">{icon}</span>
        </span>
      </a>
    </Magnetic>
  );
}
