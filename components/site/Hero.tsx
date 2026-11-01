"use client";

import { useRef } from "react";
import { profile } from "@/content/profile";
import { gsap, useGSAP, onIntroDone, reducedMotion } from "@/lib/gsap";
import Monitor from "./Monitor";
import HeroButton from "./HeroButton";

const arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const download = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { before, highlight } = profile.headline;

  useGSAP(
    () => {
      if (reducedMotion()) return;
      gsap.set(".hero-word", { autoAlpha: 0, yPercent: 40, filter: "blur(8px)" });
      gsap.set(".hero-underline", { strokeDashoffset: 1 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 18 });
      gsap.set("[data-hero-monitor]", { autoAlpha: 0, y: 40 });
      return onIntroDone(() => {
        gsap
          .timeline()
          .to(".hero-word", {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.06,
          })
          .to(".hero-underline", { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.3")
          .to("[data-hero-monitor]", { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }, 0.2)
          .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, 0.45);
      });
    },
    { scope: root },
  );

  return (
    <section
      id="topo"
      ref={root}
      className="flex items-center px-gutter pb-[clamp(72px,9vw,140px)] pt-[clamp(48px,6vw,96px)] lg:min-h-[calc(100svh-4rem)]"
    >
      <div className="tv-container grid w-full items-center gap-x-[clamp(32px,5vw,80px)] gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div>
        <p data-hero-fade className="tv-label">
          <span className="live-dot size-2 rounded-full bg-[var(--blue-2)]" aria-hidden="true" />
          {profile.status}
        </p>

        <h1 className="mt-7 text-[clamp(2.6rem,1.2rem+3.3vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.035em]">
          {before.split(" ").map((w, i) => (
            <span key={i} className="hero-word inline-block">
              {w}&nbsp;
            </span>
          ))}
          <span className="hero-word relative inline-block text-[var(--accent)]">
            {highlight}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 20"
              preserveAspectRatio="none"
              className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full overflow-visible"
            >
              <path
                className="hero-underline"
                d="M3 14 C 50 4, 120 4, 197 10"
                pathLength={1}
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="1"
              />
            </svg>
          </span>
          <span className="hero-word inline-block">.</span>
          <span className="sr-only">
            {" "}
            — {profile.name}, {profile.role}
          </span>
        </h1>

        <p data-hero-fade className="mt-7 max-w-[44ch] text-lead leading-snug text-[var(--muted)]">
          {profile.intro}
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <HeroButton href="#projetos" label="Ver projetos" icon={arrow} />
          <HeroButton href={profile.links.cv} label="Currículo" icon={download} variant="ghost" />
        </div>
      </div>

      <div className="relative flex justify-center" data-hero-monitor>
        <div data-fx-out className="flex w-full justify-center">
          <Monitor />
        </div>
      </div>
      </div>
    </section>
  );
}
