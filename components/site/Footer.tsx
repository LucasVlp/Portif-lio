import { profile } from "@/content/profile";
import Logo from "./Logo";

const nav = [
  { href: "#topo", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#skills", label: "Skills" },
  { href: "#contato", label: "Contato" },
];

// Rodapé enxuto: quem é, para onde ir, como falar e a volta ao topo.
export default function Footer() {
  const contact = [
    { href: `mailto:${profile.email}`, label: "E-mail" },
    { href: profile.links.linkedin, label: "LinkedIn" },
    { href: profile.links.github, label: "GitHub" },
    { href: profile.links.cv, label: "Currículo" },
  ];

  return (
    <footer className="bg-[var(--surface)] px-gutter pb-8 pt-16">
      <div className="tv-container grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-12">
        <div className="col-span-2 md:col-span-5">
          <a href="#topo" className="inline-block text-lead">
            <Logo size="size-11" />
          </a>
          <p className="mt-4 max-w-[36ch] text-[var(--muted)]">{profile.tagline}</p>
          <p className="tv-label mt-6">
            <span className="live-dot size-2 rounded-full bg-[var(--blue-2)]" aria-hidden="true" />
            {profile.status}
          </p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-2 md:col-start-7">
          <p className="text-small font-bold uppercase tracking-wider text-[var(--muted)]">Navegação</p>
          <ul className="mt-4 grid gap-2">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-[var(--accent)]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="text-small font-bold uppercase tracking-wider text-[var(--muted)]">Contato</p>
          <ul className="mt-4 grid gap-2">
            {contact.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-[var(--accent)]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-2 md:justify-self-end">
          <a
            href="#topo"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--surface-2)] px-5 font-semibold transition-transform hover:-translate-y-0.5"
          >
            Voltar ao topo <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>

      <div className="tv-container mt-16 text-small text-[var(--muted)]">
        <p>© 2026 {profile.name}.</p>
      </div>
    </footer>
  );
}
