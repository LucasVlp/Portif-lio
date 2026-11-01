"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Efeitos ligados ao scroll (ScrollTrigger com scrub), marcados por atributos:
//   data-fx-zoom          o bloco cresce e endireita enquanto entra na tela
//   data-fx-parallax="n"  desloca n% para cima/baixo enquanto atravessa a tela
//   data-fx-drift         desliza na horizontal enquanto atravessa a tela
//   data-fx-out           some e recua enquanto a seção sai por cima
export default function ScrollFX() {
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-fx-zoom]").forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.86, rotate: -1.5, borderRadius: "48px" },
        {
          scale: 1,
          rotate: 0,
          borderRadius: "28px",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.6 },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-fx-parallax]").forEach((el) => {
      const n = parseFloat(el.dataset.fxParallax || "10");
      gsap.fromTo(
        el,
        { yPercent: -n },
        {
          yPercent: n,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-fx-drift]").forEach((el) => {
      gsap.fromTo(
        el,
        { xPercent: -14 },
        {
          xPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-fx-out]").forEach((el) => {
      const section = el.closest("section") ?? el;
      // Valores iniciais explícitos: na montagem o hero ainda está escondido pela
      // tela de carregamento, e ler a opacidade "atual" daria 0.
      gsap.fromTo(
        el,
        { y: 0, scale: 1, opacity: 1 },
        {
          y: -80,
          scale: 0.94,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: section, start: "center center", end: "bottom top", scrub: true },
        },
      );
    });

    // Fontes e imagens mudam alturas depois do primeiro cálculo.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  });

  return null;
}
