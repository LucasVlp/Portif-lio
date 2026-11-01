// Ícones desenhados para cada habilidade (traço, 24×24), procurados pelo nome em
// content/tech.ts. Todo elemento usa pathLength=1 para que o CSS consiga
// "redesenhar" o traço no hover.
const L = { pathLength: 1 } as const;

const icons: Record<string, React.JSX.Element> = {
  "Manutenção de computadores": (
    <>
      <path {...L} d="M14.7 4.3a4.2 4.2 0 0 0-5.3 5.3L3.5 15.5l3 3 5.9-5.9a4.2 4.2 0 0 0 5.3-5.3l-2.6 2.6-2.3-.7-.7-2.3Z" />
      <circle {...L} cx="5.3" cy="17" r="0.6" />
    </>
  ),
  "Montagem de PCs": (
    <>
      <rect {...L} x="7" y="2.5" width="10" height="19" rx="1.8" />
      <path {...L} d="M9.5 6.5h5M9.5 9.5h5" />
      <circle {...L} cx="12" cy="16" r="1.8" />
    </>
  ),
  "Suporte ao usuário": (
    <>
      <path {...L} d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <rect {...L} x="3.5" y="12.5" width="3.5" height="5.5" rx="1.2" />
      <rect {...L} x="17" y="12.5" width="3.5" height="5.5" rx="1.2" />
      <path {...L} d="M19 18c0 1.8-2 3-5 3h-1.5" />
    </>
  ),
  "Cisco Packet Tracer": (
    <>
      <ellipse {...L} cx="12" cy="8" rx="8.5" ry="3.2" />
      <path {...L} d="M3.5 8v6.5c0 1.8 3.8 3.2 8.5 3.2s8.5-1.4 8.5-3.2V8" />
      <path {...L} d="M8.5 8h7M13.5 6.5 15.5 8l-2 1.5" />
    </>
  ),
  "Topologia de redes": (
    <>
      <circle {...L} cx="12" cy="4.5" r="2.2" />
      <circle {...L} cx="5" cy="18.5" r="2.2" />
      <circle {...L} cx="19" cy="18.5" r="2.2" />
      <path {...L} d="M12 6.7V11M12 11l-5.4 5.8M12 11l5.4 5.8" />
    </>
  ),
  Wireshark: (
    <>
      <path {...L} d="M3 18c3 0 4-2 6-2s3 2 6 2 4-2 6-2" />
      <path {...L} d="M7.5 15.5C8.7 9.5 12.5 5.2 17.5 4c-1.3 3.4-1.3 7.6.7 11.5" />
    </>
  ),
  "Terminal Linux": (
    <>
      <rect {...L} x="3" y="4" width="18" height="16" rx="2.5" />
      <path {...L} d="m7 10 3 2.5L7 15" />
      <path {...L} d="M12.5 15H17" />
    </>
  ),
  JavaScript: (
    <>
      <path {...L} d="M9 4C7 4 7 5.5 7 7s0 3.5-2 5c2 1.5 2 3.5 2 5s0 3 2 3" />
      <path {...L} d="M15 4c2 0 2 1.5 2 3s0 3.5 2 5c-2 1.5-2 3.5-2 5s0 3-2 3" />
    </>
  ),
  HTML: (
    <>
      <path {...L} d="M8 7 3 12l5 5" />
      <path {...L} d="m16 7 5 5-5 5" />
      <path {...L} d="M13.6 4.5 10.4 19.5" />
    </>
  ),
  CSS: (
    <>
      <path {...L} d="M12 3a9 9 0 1 0 0 18c1.6 0 2.1-1.1 1.5-2.1-.6-1.1 0-2.4 1.4-2.4h2.2a3.9 3.9 0 0 0 3.9-3.9C21 7 17 3 12 3Z" />
      <circle {...L} cx="7.5" cy="11" r="1.2" />
      <circle {...L} cx="10.5" cy="7" r="1.2" />
      <circle {...L} cx="15" cy="7.5" r="1.2" />
    </>
  ),
  Excel: (
    <>
      <rect {...L} x="3" y="4" width="18" height="16" rx="2" />
      <path {...L} d="M3 9.5h18M3 15h18M9 4v16" />
    </>
  ),
  Word: (
    <>
      <path {...L} d="M6 3h8l4 4v14H6Z" />
      <path {...L} d="M14 3v4h4" />
      <path {...L} d="M9 12h6M9 15.5h6M9 19h4" />
    </>
  ),
};

const fallback = (
  <>
    <path {...L} d="M8 7 3 12l5 5M16 7l5 5-5 5" />
  </>
);

export default function SkillIcon({ name }: { name: string }) {
  return (
    <span className="skill-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{icons[name] ?? fallback}</svg>
    </span>
  );
}
