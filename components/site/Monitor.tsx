"use client";

import { useEffect, useRef, useState, type FormEvent, type PointerEvent as RPointerEvent } from "react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { toggleTheme } from "@/lib/theme";
import { demos } from "@/components/demos";
import LocalClock from "@/components/ui/LocalClock";
import Fit from "./Fit";


// Um "sistema operacional" de brinquedo dentro do monitor: ícones abrem janelas
// com os projetos rodando, as janelas se arrastam, e o terminal aceita comandos.

type AppId = (typeof projects)[number]["slug"] | "terminal" | "leiame";
type Win = { id: AppId; x: number; y: number; z: number }; // x/y em % da tela

const iconTint = ["var(--blue-2)", "var(--cyan)", "#0c1324", "#f2d900"];

const apps: { id: AppId; label: string; glyph: string }[] = [
  ...projects.map((p) => ({ id: p.slug as AppId, label: p.name, glyph: p.name.slice(0, 2) })),
  { id: "terminal", label: "Terminal", glyph: ">_" },
  { id: "leiame", label: "Leia-me", glyph: "Aa" },
];

const size: Record<string, { w: number; h: number }> = {
  terminal: { w: 56, h: 52 },
  leiame: { w: 50, h: 50 },
  project: { w: 60, h: 80 },
};

const sizeOf = (id: AppId) => size[id] ?? size.project;

// Respostas do terminal
function run(cmd: string, open: (id: AppId) => void): string[] {
  const [name, ...rest] = cmd.trim().toLowerCase().split(/\s+/);
  const arg = rest.join(" ");
  switch (name) {
    case "":
      return [];
    case "help":
    case "ajuda":
      return [
        "comandos:",
        "  projetos       lista os projetos",
        "  abrir <nome>   abre um projeto (ex.: abrir rotina)",
        "  skills         o que eu sei fazer",
        "  rede           vai para a topologia de rede",
        "  ping           testa a conexão comigo",
        "  sobre          quem sou",
        "  contato        como falar comigo",
        "  tema           troca claro/escuro",
        "  clear          limpa a tela",
      ];
    case "projetos":
      return projects.map((p) => `  ${p.name.toLowerCase().padEnd(10)} ${p.kind}`);
    case "abrir":
    case "open": {
      const p = projects.find((x) => x.slug === arg || x.name.toLowerCase() === arg);
      if (!p) return [`projeto não encontrado: ${arg || "(vazio)"}. tente: projetos`];
      open(p.slug as AppId);
      return [`abrindo ${p.name}…`];
    }
    case "skills":
    case "stack":
      return [profile.stack.join(" · ")];
    case "rede":
      document.getElementById("rede")?.scrollIntoView({ behavior: "smooth" });
      return ["indo para a topologia de rede…"];
    case "ping":
      return [
        "PING lucas-volpe: 32 bytes de dados",
        "resposta de lucas-volpe: tempo<1ms TTL=64",
        "conexão ok. digite contato para falar comigo.",
      ];
    case "sobre":
    case "whoami":
      return [`${profile.name} — ${profile.role}.`, profile.intro];
    case "contato":
      return [profile.email, profile.links.linkedin, profile.links.github];
    case "tema":
    case "theme":
      toggleTheme();
      return ["tema trocado."];
    case "sudo":
      return ["boa tentativa."];
    default:
      return [`comando não encontrado: ${name}. digite help`];
  }
}

function Terminal({ open }: { open: (id: AppId) => void }) {
  const [lines, setLines] = useState<string[]>([`VolpeOS 1.0 — digite help`, ""]);
  const [value, setValue] = useState("");
  const end = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === "clear") {
      setLines([]);
    } else {
      // Roda o comando fora do setState: ele pode abrir janelas no Monitor.
      const out = run(value, open);
      setLines((l) => [...l, `$ ${value}`, ...out]);
    }
    setValue("");
  };

  return (
    <div
      data-lenis-prevent
      className="tv-mono h-full overflow-y-auto bg-[#0a1020] p-3 text-[12px] leading-relaxed text-[#cfe0ff]"
      onClick={() => input.current?.focus()}
    >
      {lines.map((l, i) => (
        <p key={i} className="whitespace-pre-wrap break-words">
          {l || " "}
        </p>
      ))}
      <form onSubmit={submit} className="flex items-center gap-2">
        <span className="text-[#7dff9b]">$</span>
        <label htmlFor="terminal-input" className="sr-only">
          Comando do terminal
        </label>
        <input
          ref={input}
          id="terminal-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="help"
          className="min-w-0 flex-1 bg-transparent text-[#cfe0ff] caret-[#7dff9b] outline-none placeholder:text-[#4b5a7a]"
        />
      </form>
      <div ref={end} />
    </div>
  );
}

function ReadMe() {
  return (
    <div data-lenis-prevent className="h-full overflow-y-auto bg-[#fbfcff] p-4 text-[13px] leading-relaxed text-[#0c1324]">
      <p className="text-[15px] font-bold">{profile.name}</p>
      <p className="text-[#56617a]">
        {profile.role}
      </p>
      <p className="mt-3">{profile.intro}</p>
      <p className="mt-3 text-[#56617a]">Dica: abra o Terminal e digite help.</p>
    </div>
  );
}

export default function Monitor() {
  const screen = useRef<HTMLDivElement>(null);
  const [power, setPower] = useState(true);
  const [wins, setWins] = useState<Win[]>([
    { id: projects[0].slug as AppId, x: 24, y: 12, z: 2 },
    { id: "terminal", x: 40, y: 42, z: 3 },
  ]);
  const top = Math.max(0, ...wins.map((w) => w.z));

  const focus = (id: AppId) =>
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, z: Math.max(...ws.map((v) => v.z)) + 1 } : w)));

  const open = (id: AppId) =>
    setWins((ws) => {
      const z = Math.max(0, ...ws.map((w) => w.z)) + 1;
      if (ws.some((w) => w.id === id)) return ws.map((w) => (w.id === id ? { ...w, z } : w));
      const s = sizeOf(id);
      const n = ws.length;
      return [...ws, { id, x: Math.min(100 - s.w, 18 + n * 6), y: Math.min(100 - s.h, 10 + n * 5), z }];
    });

  const close = (id: AppId) => setWins((ws) => ws.filter((w) => w.id !== id));

  // Arrastar pela barra de título, sem sair da tela.
  const drag = (id: AppId) => (e: RPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    const el = screen.current;
    if (!el) return;
    focus(id);
    const rect = el.getBoundingClientRect();
    const start = wins.find((w) => w.id === id)!;
    const sx = e.clientX;
    const sy = e.clientY;
    const s = sizeOf(id);
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    const move = (ev: PointerEvent) => {
      const x = Math.min(100 - s.w, Math.max(0, start.x + ((ev.clientX - sx) / rect.width) * 100));
      const y = Math.min(100 - s.h, Math.max(6, start.y + ((ev.clientY - sy) / rect.height) * 100));
      setWins((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
    };
    const up = () => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", up);
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", up);
  };

  return (
    <figure className="w-full max-w-[720px]">
      <div className="rounded-[30px] bg-[var(--case)] p-3 sm:p-4">
        <div
          ref={screen}
          className="crt relative aspect-[16/11] overflow-hidden rounded-[16px] bg-[#0b1f63] text-white sm:aspect-[16/10]"
        >
          {power ? (
            <>
              {/* Barra de menu */}
              <div className="absolute inset-x-0 top-0 z-20 flex h-[6%] min-h-6 items-center justify-between bg-black/35 px-3 text-[11px] sm:text-[12px]">
                <span className="font-bold">VolpeOS</span>
                <span className="tv-mono flex items-center gap-2">
                  <span className="live-dot size-1.5 rounded-full bg-[#7dff9b]" aria-hidden="true" />
                  <LocalClock timeZone={profile.timeZone} />
                </span>
              </div>

              {/* Ícones da área de trabalho */}
              <ul className="absolute bottom-3 left-3 top-[9%] z-0 flex flex-col flex-wrap gap-x-2 gap-y-1 sm:gap-y-2">
                {apps.map((a, i) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => open(a.id)}
                      className="group flex w-14 flex-col items-center gap-1 rounded-lg p-1 text-[10px] sm:w-16 sm:text-[11px]"
                    >
                      <span
                        className="grid size-8 place-items-center rounded-xl text-[11px] font-bold transition-transform group-hover:-translate-y-0.5 group-active:scale-90 sm:size-10 sm:text-[13px]"
                        style={{ background: iconTint[i % iconTint.length], color: iconTint[i % iconTint.length] === "#f2d900" ? "#0c1324" : "#fff" }}
                      >
                        {a.glyph}
                      </span>
                      <span className="rounded px-1 group-focus-visible:bg-white/20">{a.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Janelas */}
              {wins.map((w) => {
                const s = sizeOf(w.id);
                const project = projects.find((p) => p.slug === w.id);
                const Demo = project ? demos[project.demo] : null;
                const title = project ? `${project.name} — ${project.kind}` : w.id === "terminal" ? "Terminal" : "Leia-me.txt";
                return (
                  <section
                    key={w.id}
                    aria-label={title}
                    onPointerDown={() => w.z !== top && focus(w.id)}
                    className="absolute flex flex-col overflow-hidden rounded-[10px] bg-[#e9eefb] text-[#0c1324] max-sm:!left-[24%] max-sm:!right-[3%] max-sm:!top-[9%] max-sm:!h-[87%] max-sm:!w-auto"
                    style={{ left: `${w.x}%`, top: `${w.y}%`, width: `${s.w}%`, height: `${s.h}%`, zIndex: 10 + w.z }}
                  >
                    <div
                      onPointerDown={drag(w.id)}
                      className={`flex h-7 shrink-0 cursor-grab touch-none select-none items-center gap-2 px-2.5 text-[11px] font-semibold active:cursor-grabbing ${
                        w.z === top ? "bg-[#2346d8] text-white" : "bg-[#c9d3ea] text-[#3b4660]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => close(w.id)}
                        aria-label={`Fechar ${title}`}
                        className="grid size-3.5 place-items-center rounded-full bg-[#ff5f57] text-[9px] leading-none text-[#5a0d0a]"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                      <span className="truncate">{title}</span>
                    </div>
                    <div className="relative flex-1">
                      {Demo ? (
                        <div className="absolute inset-0 bg-[#f4f7ff]">
                          <Fit>
                            <Demo />
                          </Fit>
                        </div>
                      ) : w.id === "terminal" ? (
                        <div className="absolute inset-0">
                          <Terminal open={open} />
                        </div>
                      ) : (
                        <div className="absolute inset-0">
                          <ReadMe />
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </>
          ) : (
            <div className="grid h-full place-items-center bg-[#05070d]">
              <p className="tv-mono text-[12px] text-[#4b5a7a]">desligado — aperte o botão</p>
            </div>
          )}
        </div>

        {/* Queixo do monitor: marca, LED e botão liga/desliga */}
        <div className="flex items-center justify-between px-2 pt-3">
          <span className="tv-mono text-[11px] font-semibold tracking-[0.2em] text-[var(--muted)]">LV-2026</span>
          <div className="flex items-center gap-3">
            <span
              className={`size-2 rounded-full ${power ? "bg-[#2bc24a]" : "bg-[#5a6275]"}`}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => setPower((p) => !p)}
              aria-pressed={power}
              aria-label={power ? "Desligar o monitor" : "Ligar o monitor"}
              className="grid size-7 place-items-center rounded-full bg-[var(--case-2)] text-[var(--fg)] transition-transform active:scale-90"
            >
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M12 3v8M6.3 6.3a8 8 0 1 0 11.4 0" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Pé */}
      <div aria-hidden="true" className="mx-auto h-8 w-[16%] bg-[var(--case-2)]" />
      <div aria-hidden="true" className="mx-auto h-3 w-[44%] rounded-t-xl bg-[var(--case)]" />

      <figcaption className="mt-4 text-center text-small text-[var(--muted)]">
        Clique nos ícones, arraste as janelas ou digite <span className="tv-mono text-[var(--fg)]">help</span> no terminal.
      </figcaption>
    </figure>
  );
}
