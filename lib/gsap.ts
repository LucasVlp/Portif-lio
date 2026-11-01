"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

// Decisão do projeto: o site roda sempre com todos os efeitos, mesmo quando o
// sistema pede movimento reduzido (ex.: "Efeitos de animação" desligado no Windows).
// Para voltar a respeitar essa preferência, troque `false` por:
//   typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
export const reducedMotion = () => false;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// O hero só anima depois do loader. Quem chega depois do evento recebe na hora.
export function onIntroDone(cb: () => void) {
  if (document.documentElement.dataset.intro === "done") {
    cb();
    return () => {};
  }
  window.addEventListener("intro:done", cb, { once: true });
  return () => window.removeEventListener("intro:done", cb);
}

// Avisa fora do callback do GSAP de propósito: chamado de dentro da timeline do loader,
// o GSAP procuraria os seletores do hero dentro do próprio loader e não acharia nada.
export function markIntroDone() {
  setTimeout(() => {
    document.documentElement.dataset.intro = "done";
    window.dispatchEvent(new Event("intro:done"));
  }, 0);
}
