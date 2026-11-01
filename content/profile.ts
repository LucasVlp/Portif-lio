// Tudo que aparece no site sobre você mora aqui.
// Itens marcados com TODO ainda precisam de um dado seu antes de divulgar o link.

export type Rich = Array<string | { mark: string }>;

export const profile = {
  name: "Lucas Volpe",
  initials: "LV",
  role: "Suporte de TI, hardware e redes",
  timeZone: "America/Sao_Paulo", // só para o relógio do monitor; não aparece escrito
  status: "Aberto a vagas de suporte de TI e redes", // TODO: confirme se está procurando vaga

  // Título do hero: a palavra destacada ganha cor e um traço desenhado embaixo.
  headline: { before: "Do hardware à rede, mantenho tudo", highlight: "funcionando" },
  intro:
    "Trabalho com suporte de TI. Monto e conserto computadores, desenho redes no Cisco Packet Tracer e uso JavaScript para criar as ferramentas que o setor de TI precisa.",
  stack: ["Hardware", "Redes", "Suporte de TI"],
  // Frase curta do rodapé.
  tagline:
    "Monto e conserto computadores, desenho redes no Cisco Packet Tracer e escrevo em JavaScript as ferramentas que o setor de TI precisa.",

  email: "lucas.volpe@example.com", // TODO
  links: {
    linkedin: "https://www.linkedin.com/in/TODO", // TODO
    github: "https://github.com/TODO", // TODO
    cv: "/cv/lucas-volpe-cv.pdf", // TODO: coloque o PDF em public/cv/
  },

  // Foto 4:5 em public/. Para trocar, salve outra imagem e mude o src.
  photo: { src: "/lucas-volpe.webp", alt: "Retrato de Lucas Volpe" } as null | { src: string; alt: string },

  about: {
    // Os trechos { mark } ganham destaque.
    body: [
      "O que mais me prende na TI é o ",
      { mark: "hardware" },
      ": abrir o gabinete, achar a peça com defeito e ver a máquina ligar de novo. Fiz ",
      { mark: "estágio de suporte de TI" },
      " no ",
      { mark: "Colégio Rafael de Santo" },
      ", cuidando dos computadores da escola e das pessoas que dependem deles no dia a dia. Também gosto de software e uso ",
      { mark: "JavaScript" },
      " quando o problema pede um sistema.",
    ] as Rich,
  },

  // Card de experiência no Sobre mim.
  // TODO: confirme o período.
  experience: {
    role: "Estágio em Suporte de TI",
    place: "Colégio Rafael de Santo",
    period: "", // ex.: "2025 – 2026". Vazio, não aparece.
  },

  contact: {
    title: "Vamos conversar sobre a sua TI?",
    line: "Me manda um e-mail contando o que você precisa. Também estou no LinkedIn e no GitHub.",
    // Assunto que já vem preenchido quando a pessoa clica em "Enviar e-mail".
    subject: "Contato pelo portfólio",
  },
};
