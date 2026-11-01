// Projetos: um objeto por projeto, na ordem em que aparecem.
// `demo` escolhe qual tela animada acompanha o projeto (components/demos).
// A topologia de rede do Packet Tracer tem a própria seção (components/site/Network.tsx).
// TODO: confirme nome, ano, tecnologias e links de cada projeto.

export type DemoKind = "lab" | "routine";

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year?: string;
  summary: string;
  stack: string[];
  links: { live?: string; github?: string };
  demo: DemoKind;
  // Print real do projeto. Quando existe, aparece no lugar da tela animada da seção Projetos.
  // `frame` escolhe a moldura: janela de navegador ou celular.
  shot?: { src: string; alt: string; width: number; height: number; frame: "browser" | "phone" };
};

export const projects: Project[] = [
  {
    slug: "laboratorios",
    name: "Laboratórios", // TODO: nome do sistema
    kind: "Sistema para o setor de TI",
    summary:
      "Sistema para o setor de TI acompanhar os computadores de cada laboratório numa planta da sala: quais estão funcionando, em manutenção ou com defeito, e há quanto tempo cada problema está aberto.",
    stack: ["JavaScript", "HTML", "CSS"], // TODO: confirme
    links: {},
    demo: "lab",
    shot: {
      src: "/projects/laboratorios.png",
      alt: "Planta do Laboratório 1 com 25 computadores: 23 funcionando, o PC 12 em manutenção e o PC 05 com defeito.",
      width: 1175,
      height: 832,
      frame: "browser",
    },
  },
  {
    slug: "rotina",
    name: "IntegraMente",
    kind: "App para crianças autistas",
    summary:
      "Aplicativo para crianças autistas aprenderem do seu jeito, com telas simples e um mascote que acompanha cada etapa.", // TODO: confirme o que o app faz
    stack: ["JavaScript"], // TODO: confirme
    links: {},
    demo: "routine",
    shot: {
      src: "/projects/integramente.png",
      alt: "Tela inicial do IntegraMente: o mascote acenando, o nome do app e a frase Aprender do seu jeito.",
      width: 390,
      height: 779,
      frame: "phone",
    },
  },
];
