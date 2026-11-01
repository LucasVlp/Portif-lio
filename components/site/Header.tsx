"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import ThemeToggle from "./ThemeToggle";
import { LogoMark } from "./Logo";

const nav = [
  { id: "topo", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "skills", label: "Skills" },
  { id: "contato", label: "Contato" },
];

// Nav fixa: marca à esquerda, links no centro com a seção atual marcada,
// tema e o botão de conversa à direita. Ganha fundo depois que a página rola.
export default function Header() {
  const [active, setActive] = useState("topo");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // A seção que cruza a faixa do meio da tela é a ativa.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-gutter transition-[background-color,backdrop-filter] duration-300 ${
        scrolled || open ? "bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-md" : ""
      }`}
    >
      <div className="tv-container flex h-16 items-center justify-between gap-4">
        <a href="#topo" className="flex items-center gap-2.5 font-bold" aria-label={`${profile.name}, início`} onClick={() => setOpen(false)}>
          <LogoMark className="size-9 transition-transform duration-300 hover:-rotate-6" />
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full bg-[var(--surface)] p-1 text-[0.9rem]">
            {nav.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={on ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-1.5 transition-colors duration-200 ${
                      on ? "bg-[var(--accent-fill)] text-white" : "text-[var(--muted)] hover:text-[var(--fg)]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contato"
            className="hidden h-10 items-center rounded-full bg-[var(--accent-fill)] px-5 text-[0.9rem] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Vamos conversar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid size-10 place-items-center rounded-full bg-[var(--surface-2)] md:hidden"
          >
            <span aria-hidden="true" className="grid gap-1">
              <span className={`block h-0.5 w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu" className="pb-5 md:hidden">
          <ul className="grid gap-1 rounded-2xl bg-[var(--surface)] p-2">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 font-semibold ${
                    active === item.id ? "bg-[var(--accent-fill)] text-white" : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
