import { profile } from "@/content/profile";

// Marca do Lucas: L e V numa ligadura só. O pé do L corre até o vértice do V,
// como o caminho do banco até o bolso. Ponto amarelo marcando o destino.
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="var(--accent-fill)" />
      <path
        d="M8.5 7v18h11M14.5 7l5 18 5-18"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25.6" cy="25" r="1.9" fill="var(--yellow)" />
    </svg>
  );
}

export default function Logo({ size = "size-9", showName = true }: { size?: string; showName?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className={size} />
      {showName && <span className="font-bold tracking-[-0.01em]">{profile.name}</span>}
    </span>
  );
}
