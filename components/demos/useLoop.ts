"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/gsap";

// Timeline em loop que só roda enquanto a demo está na tela.
// Com movimento reduzido nada é montado e a demo fica no estado final, estático.
export function useLoop(scope: RefObject<HTMLElement | null>, build: (tl: gsap.core.Timeline) => void) {
  useGSAP(
    () => {
      if (!scope.current || reducedMotion()) return;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4, paused: true, defaults: { ease: "power3.out" } });
      build(tl);
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top 90%",
        end: "bottom 10%",
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    },
    { scope },
  );
}
