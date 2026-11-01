"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// "Como eu trabalho": o jeito do Lucas resolver problemas, ao lado de uma topologia
// de rede no estilo Packet Tracer: Roteador → Switch 2960 → Access Point
// → celular, tablet e notebook. Conforme a página rola, cada cabo se desenha, as
// portas passam de vermelho para verde, o Wi-Fi conecta os aparelhos e, no fim,
// pacotes começam a correr pelos cabos. Acontece uma vez só, na primeira descida.

const L = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 } as const;

const steps = [
  { title: "Começo pelo hardware", text: "Abro, testo e troco o que estiver com defeito. Manutenção é onde eu tenho mais prática." },
  { title: "Desenho a rede antes de montar", text: "Planejo portas, cabos e Wi-Fi no Cisco Packet Tracer antes de mexer no equipamento." },
  { title: "Investigo quando algo falha", text: "Uso o Wireshark e o terminal Linux para ver em que ponto a conexão para." },
  { title: "Crio a ferramenta que falta", text: "Quando o mesmo problema volta, escrevo um sistema em JavaScript, como o controle dos laboratórios." },
];

// Linha de Wi-Fi em zigue-zague entre dois pontos, como o Packet Tracer desenha.
function zigzag(x1: number, y1: number, x2: number, y2: number, n = 14, amp = 5) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const px = (-dy / len) * amp;
  const py = (dx / len) * amp;
  let d = `M${x1} ${y1}`;
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const side = i % 2 ? 1 : -1;
    d += ` L${(x1 + dx * t + px * side).toFixed(1)} ${(y1 + dy * t + py * side).toFixed(1)}`;
  }
  return d + ` L${x2} ${y2}`;
}

// Triângulo de status de link, apontando para o aparelho
function LinkLight({ x, y, dir, className }: { x: number; y: number; dir: "up" | "down"; className: string }) {
  const d = dir === "up" ? `M${x} ${y - 6} l6 9 h-12 z` : `M${x} ${y + 6} l6 -9 h-12 z`;
  return <path className={`net-light ${className}`} d={d} fill="#e5322d" />;
}

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="net-label tv-mono" fontSize="11" fill="var(--muted)">
      {children}
    </text>
  );
}

export default function Network() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set(".net-device", { opacity: 0.28 });
      gsap.set(".net-light", { fill: "#e5322d", opacity: 0 });
      // No celular os passos ficam sempre acesos; o destaque passo a passo é só no desktop.
      const mobile = window.matchMedia("(max-width: 1023px)").matches;
      const step = (n: number) => (mobile ? {} : `.net-step-${n}`);
      if (!mobile) gsap.set(".net-step", { opacity: 0.3 });
      gsap.set(".net-waves", { opacity: 0, scale: 0.6, svgOrigin: "300 340" });
      gsap.set(".net-packet", { opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

      tl.to(step(1), { opacity: 1, duration: 0.3 })
        .to(".net-router", { opacity: 1, duration: 0.4 }, "<")
        .to(".net-light-a", { opacity: 1, duration: 0.2 }, "<")
        // Roteador → switch
        .to(step(1), { opacity: 0.3, duration: 0.2 }, "+=0.3")
        .to(step(2), { opacity: 1, duration: 0.2 }, "<")
        .to(".net-cable-1", { strokeDashoffset: 0, duration: 1 }, "<")
        .to(".net-light-b", { opacity: 1, duration: 0.15 }, "<0.1")
        .to(".net-light-a, .net-light-b", { fill: "#2bc24a", duration: 0.2 })
        .to(".net-switch", { opacity: 1, duration: 0.3 }, "<")
        // Switch → access point
        .to(step(2), { opacity: 0.3, duration: 0.2 }, "+=0.2")
        .to(step(3), { opacity: 1, duration: 0.2 }, "<")
        .to(".net-light-c", { opacity: 1, duration: 0.15 }, "<")
        .to(".net-cable-2", { strokeDashoffset: 0, duration: 1 }, "<")
        .to(".net-light-c", { fill: "#2bc24a", duration: 0.2 })
        .to(".net-ap", { opacity: 1, duration: 0.3 }, "<")
        // Wi-Fi até os aparelhos
        .to(step(3), { opacity: 0.3, duration: 0.2 }, "+=0.2")
        .to(step(4), { opacity: 1, duration: 0.2 }, "<")
        .to(".net-waves", { opacity: 1, scale: 1, duration: 0.5 }, "<")
        .to(".net-wifi", { strokeDashoffset: 0, duration: 1, stagger: 0.25 }, "<0.2")
        .to(".net-end", { opacity: 1, duration: 0.3, stagger: 0.25 }, "<0.5")
        .to(".net-packet", { opacity: 1, duration: 0.3 })
        .to({}, { duration: 0.4 });

      // A montagem segue o scroll só para a frente e uma vez: rolar para cima não
      // desfaz nada, e quando tudo conecta o gatilho é removido e a rede fica pronta.
      let max = 0;
      // Depois de tudo conectado, ao rolar para cima todos os passos acendem,
      // para a lista não ficar presa só no último.
      const lightAllOnScrollUp = () => {
        if (mobile) return;
        const up: ScrollTrigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (self.direction !== -1) return;
            gsap.to(".net-step", { opacity: 1, duration: 0.4, overwrite: true });
            up.kill();
          },
        });
      };
      const st: ScrollTrigger = ScrollTrigger.create({
        trigger: ".net-stage",
        start: "top 80%",
        end: "bottom 45%",
        onUpdate: (self) => {
          if (self.progress <= max) return;
          max = self.progress;
          gsap.to(tl, { progress: max, duration: 0.5, ease: "power1.out", overwrite: true });
          if (max >= 0.999) {
            st.kill();
            lightAllOnScrollUp();
          }
        },
      });
      // Quem chega já abaixo da seção (link direto, recarregar no meio) vê a rede montada.
      if (st.progress >= 1) {
        tl.progress(1);
        st.kill();
        if (!mobile) gsap.set(".net-step", { opacity: 1 });
      }

      // Pacotes correndo pelos cabos (ficam visíveis só depois que tudo conecta).
      gsap.fromTo(".net-packet-1", { attr: { cy: 96 } }, { attr: { cy: 182 }, duration: 1.1, repeat: -1, ease: "none" });
      gsap.fromTo(".net-packet-2", { attr: { cy: 226 } }, { attr: { cy: 300 }, duration: 1.1, repeat: -1, ease: "none", delay: 0.55 });
      // As ondas pulsam por dentro do grupo; quem decide se aparecem é a timeline.
      gsap.to(".net-wave", { opacity: 0.3, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.3 });
    },
    { scope: root },
  );

  return (
    <section
      id="rede"
      ref={root}
      aria-labelledby="rede-tv"
      className="tv-panel flex items-center px-gutter py-[clamp(96px,12vw,200px)]"
    >
      {/* No celular a ordem é título, topologia e texto; no desktop o texto fica à esquerda e a topologia ocupa a coluna da direita. */}
      <div className="tv-container grid items-center gap-x-[clamp(32px,5vw,80px)] gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-y-0">
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="tv-label">
            <span className="live-dot size-2 rounded-full bg-[#2bc24a]" aria-hidden="true" />
            Como eu trabalho
          </p>
          <h2 id="rede-tv" className="mt-5 text-[clamp(2.5rem,1.5rem+3.2vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.035em]">
            Antes de mexer, eu entendo como tudo se conecta
          </h2>
        </div>

        <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="max-w-[42ch] text-lead lg:mt-5 leading-snug text-[var(--muted)]">
            É por isso que gosto tanto de hardware e de redes: dá para seguir o caminho inteiro, da peça dentro do gabinete até o Wi-Fi que chega no celular.
          </p>

          <ol className="mt-10 grid gap-5">
            {steps.map((s, i) => (
              <li key={s.title} className={`net-step net-step-${i + 1} grid grid-cols-[auto_1fr] gap-x-4`}>
                <span className="tv-mono mt-1 text-small font-semibold text-[var(--accent)]">0{i + 1}</span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="block text-[0.95rem] text-[var(--muted)]">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <figure className="net-stage order-2 mx-auto w-full max-w-[600px] lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <svg
            viewBox="0 0 600 540"
            className="h-auto w-full"
            role="img"
            aria-label="Topologia: Router0 ligado pela porta Gig0/0 ao Switch 2960 na porta Gig0/1; o switch liga pela Fa0/1 ao AccessPoint0, que conecta por Wi-Fi um smartphone, um tablet e um notebook."
          >
            <g fill="none" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Cabos */}
              <path className="net-cable-1" d="M300 96 V182" stroke="var(--accent)" strokeWidth="4" {...L} />
              <path className="net-cable-2" d="M300 226 V300" stroke="var(--accent)" strokeWidth="4" {...L} />

              {/* Wi-Fi: linhas em zigue-zague, como no Packet Tracer */}
              <path className="net-wifi" d={zigzag(282, 340, 120, 448)} stroke="var(--muted)" strokeWidth="2" {...L} />
              <path className="net-wifi" d={zigzag(300, 340, 300, 452)} stroke="var(--muted)" strokeWidth="2" {...L} />
              <path className="net-wifi" d={zigzag(318, 340, 492, 448)} stroke="var(--muted)" strokeWidth="2" {...L} />

              {/* Ondas do access point, abrindo para baixo */}
              <g className="net-waves">
              <path className="net-wave" d="M270 352 a34 34 0 0 0 60 0" stroke="var(--accent)" />
              <path className="net-wave" d="M254 360 a54 54 0 0 0 92 0" stroke="var(--accent)" />
              <path className="net-wave" d="M238 368 a74 74 0 0 0 124 0" stroke="var(--accent)" />
              </g>

              {/* Pacotes */}
              <circle className="net-packet net-packet-1" cx="300" cy="96" r="5" fill="var(--yellow)" stroke="none" />
              <circle className="net-packet net-packet-2" cx="300" cy="226" r="5" fill="var(--yellow)" stroke="none" />

              {/* Roteador */}
              <g className="net-device net-router">
                <ellipse cx="300" cy="50" rx="44" ry="13" fill="var(--surface-2)" />
                <path d="M256 50 v22 a44 13 0 0 0 88 0 v-22" fill="var(--surface-2)" />
                <path d="M286 45 l-10 5 10 5 M314 45 l10 5 -10 5 M276 50 h48" stroke="var(--accent)" />
              </g>

              {/* Switch 2960 */}
              <g className="net-device net-switch">
                <rect x="244" y="182" width="112" height="44" rx="8" fill="var(--surface-2)" />
                {[262, 278, 294, 310, 326].map((x) => (
                  <rect key={x} x={x} y="198" width="10" height="8" rx="1.5" fill="var(--panel)" stroke="none" />
                ))}
                <path d="M262 214 h74" stroke="var(--accent)" />
              </g>

              {/* Access point */}
              <g className="net-device net-ap">
                <path d="M266 300 v-18 M334 300 v-18" />
                <rect x="252" y="300" width="96" height="38" rx="9" fill="var(--surface-2)" />
                {[272, 288, 304, 320].map((x) => (
                  <circle key={x} cx={x} cy="319" r="3" fill="#2bc24a" stroke="none" />
                ))}
              </g>

              {/* Aparelhos */}
              <g className="net-device net-end">
                <rect x="96" y="452" width="34" height="60" rx="7" fill="var(--surface-2)" />
                <path d="M107 504 h12" />
              </g>
              <g className="net-device net-end">
                <rect x="264" y="456" width="72" height="54" rx="7" fill="var(--surface-2)" />
                <rect x="272" y="463" width="56" height="38" rx="2" fill="var(--panel)" stroke="none" />
              </g>
              <g className="net-device net-end">
                <rect x="466" y="452" width="72" height="44" rx="4" fill="var(--surface-2)" />
                <rect x="473" y="459" width="58" height="31" rx="2" fill="var(--panel)" stroke="none" />
                <path d="M456 500 h92 l-6 10 h-80 z" fill="var(--surface-2)" />
              </g>
            </g>

            {/* Luzes de link nas pontas dos cabos */}
            <LinkLight x={316} y={104} dir="up" className="net-light-a" />
            <LinkLight x={316} y={174} dir="down" className="net-light-b" />
            <LinkLight x={316} y={234} dir="up" className="net-light-c" />
            <LinkLight x={316} y={292} dir="down" className="net-light-c" />

            {/* Rótulos */}
            <Label x={356} y={44} anchor="start">Router0</Label>
            <Label x={324} y={112} anchor="start">Gig0/0</Label>
            <Label x={324} y={174} anchor="start">Gig0/1</Label>
            <Label x={366} y={208} anchor="start">Switch0 · 2960</Label>
            <Label x={324} y={244} anchor="start">Fa0/1</Label>
            <Label x={360} y={324} anchor="start">AccessPoint0</Label>
            <Label x={113} y={532}>Smartphone0</Label>
            <Label x={300} y={532}>TabletPC0</Label>
            <Label x={502} y={532}>Laptop0</Label>
          </svg>
          <figcaption className="mt-3 text-center text-small text-[var(--muted)]">
            Uma topologia que montei no Cisco Packet Tracer.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
