# Portfólio · Lucas Volpe

Portfólio pessoal de Lucas Volpe, suporte de TI em São Paulo (hardware, redes e JavaScript).

Next.js (App Router) · TypeScript · Tailwind CSS · GSAP (ScrollTrigger, SplitText) · Lenis.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Onde editar o conteúdo

Todo o texto do site fica em `content/`:

- `content/profile.ts`: nome, título, status, textos do Sobre e do Contato, e-mail, links e foto
- `content/projects.ts`: projetos (nome, descrição, tecnologias, links e qual tela animada mostrar)
- `content/tech.ts`: cards de Skills (o ícone de cada um fica em `components/site/SkillIcon.tsx`)

A foto fica em `public/lucas-volpe.webp` e o currículo deve ir em `public/cv/lucas-volpe-cv.pdf`.

## Deploy

O projeto está ligado à Vercel: cada push na branch principal publica uma nova versão.
