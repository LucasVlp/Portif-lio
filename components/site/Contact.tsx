"use client";

import { useRef } from "react";
import { profile } from "@/content/profile";
import { useReveal } from "@/lib/useReveal";
import CopyEmail from "@/components/ui/CopyEmail";
import HeroButton from "./HeroButton";

const mail = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

// Contato: painel azul com o convite de um lado e, do outro, o botão principal
// (abre o e-mail já com assunto), copiar e-mail e os outros canais.
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  const [user, domain] = profile.email.split("@");
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(profile.contact.subject)}`;

  const links = [
    { href: profile.links.linkedin, label: "LinkedIn", external: true },
    { href: profile.links.github, label: "GitHub", external: true },
    { href: profile.links.cv, label: "Baixar currículo", external: false },
  ];

  return (
    <section id="contato" ref={root} aria-labelledby="contato-tv" className="px-gutter pb-[clamp(64px,8vw,120px)]">
      <div
        data-fx-zoom
        className="tv-blue tv-container grid gap-x-12 gap-y-12 overflow-hidden rounded-[32px] px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-12 lg:items-end"
        data-reveal-group
      >
        <div className="lg:col-span-6">
          <p data-reveal className="tv-label text-white">
            <span className="live-dot size-2 rounded-full bg-[var(--yellow)]" aria-hidden="true" />
            Contato
          </p>
          <h2
            id="contato-tv"
            data-split
            className="mt-5 text-[clamp(2.5rem,1.5rem+3.2vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.035em]"
          >
            {profile.contact.title}
          </h2>
          <p data-reveal className="mt-5 max-w-[40ch] text-lead leading-snug text-[var(--muted)]">
            {profile.contact.line}
          </p>
        </div>

        <div className="lg:col-span-6">
          <div data-reveal className="flex flex-wrap items-center gap-4">
            <HeroButton href={mailto} label="Enviar e-mail" icon={mail} variant="light" />
            <CopyEmail email={profile.email} className="rounded-full !bg-white/15 font-semibold !text-white hover:!bg-white/25" />
          </div>

          <p data-reveal className="mt-8 text-small text-[var(--muted)]">
            Ou escreva direto para{" "}
            <a href={mailto} className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
              {user}
              <wbr />@{domain}
            </a>
          </p>

          <ul data-reveal className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="underline decoration-2 underline-offset-[6px] hover:decoration-[var(--yellow)]"
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
