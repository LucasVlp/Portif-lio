"use client";

import { useRef } from "react";
import { projects } from "@/content/projects";
import { useReveal } from "@/lib/useReveal";
import PcBuild from "./PcBuild";
import { demos } from "@/components/demos";
import ProjectShot from "./ProjectShot";


// Cada programa ganha uma cor das barras de teste.
const tints = ["var(--blue)", "var(--cyan)", "var(--sky)"];

// Projetos: cada um com a tela real funcionando ao lado.
export default function Programs() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section
      id="projetos"
      ref={root}
      aria-labelledby="projetos-tv"
      className="px-gutter py-[clamp(96px,12vw,200px)]"
    >
      <div className="tv-container grid gap-10 md:grid-cols-12 md:items-center" data-reveal-group>
        <h2 id="projetos-tv" data-split className="tv-display text-[clamp(4rem,1.5rem+9vw,10rem)] md:col-span-7">
          Projetos
        </h2>
        <div className="md:col-span-5">
          <PcBuild />
        </div>
      </div>

      <div className="tv-container mt-[clamp(56px,7vw,112px)] space-y-[clamp(72px,9vw,140px)]">
        {projects.map((p, i) => {
          const Demo = demos[p.demo];
          return (
            <article
              key={p.slug}
              aria-labelledby={`prog-${p.slug}`}
              className="grid gap-x-10 gap-y-10 lg:grid-cols-12 lg:items-center"
              data-reveal-group
            >
              <div className={`@container lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                <p data-reveal className="tv-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-small">
                  <span className="font-semibold text-[var(--accent)]">
                    Projeto {i + 1} de {projects.length}
                  </span>
                  <span className="text-muted">
                    {p.kind}
                    {p.year ? ` · ${p.year}` : ""}
                  </span>
                </p>
                <h3
                  id={`prog-${p.slug}`}
                  data-split
                  className="tv-display mt-5 break-words text-[clamp(2.5rem,15cqw,7.5rem)]"
                >
                  {p.name}
                </h3>
                <p data-reveal className="mt-5 max-w-[44ch]">
                  {p.summary}
                </p>
                <p data-reveal className="tv-mono mt-4 text-small text-muted">
                  <span className="text-[var(--fg)]">Feito com:</span> {p.stack.join(" · ")}
                </p>
                <div data-reveal className="mt-8 flex flex-wrap items-center gap-6">
                  <ul className="flex gap-5 font-semibold">
                    {p.links.live && (
                      <li>
                        <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="tv-link">
                          Ver site ↗
                        </a>
                      </li>
                    )}
                    {p.links.github && (
                      <li>
                        <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="tv-link">
                          Ver código ↗
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div
                data-fx-zoom
                className={`grid place-items-center overflow-hidden rounded-[28px] px-4 py-12 sm:px-10 lg:col-span-7 ${
                  i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-6"
                }`}
                style={{ backgroundColor: tints[i % tints.length] }}
              >
                <div data-fx-parallax="-10" className="flex w-full justify-center">
                  {p.shot ? <ProjectShot shot={p.shot} /> : <Demo />}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
