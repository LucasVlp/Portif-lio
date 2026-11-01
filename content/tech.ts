// Habilidades da seção Skills: uma por card, com a área em que se encaixa.
// O ícone de cada uma fica em components/site/SkillIcon.tsx (procurado pelo nome).

export type Area = "Hardware" | "Suporte" | "Redes" | "Sistemas" | "Web" | "Escritório";

export type Tech = { name: string; area: Area; desc: string };

export const tech: Tech[] = [
  {
    name: "Manutenção de computadores",
    area: "Hardware",
    desc: "Acho o defeito, troco a peça e devolvo a máquina ligando.",
  },
  {
    name: "Montagem de PCs",
    area: "Hardware",
    desc: "Placa-mãe, processador, memória, armazenamento e fonte, cada um no seu lugar.", // TODO: confirme
  },
  {
    name: "Suporte ao usuário",
    area: "Suporte",
    desc: "Atendo quem trabalha no computador quando ele para, como fazia no Colégio Rafael de Santo.",
  },
  {
    name: "Cisco Packet Tracer",
    area: "Redes",
    desc: "Simulo roteadores, switches e access points antes de mexer no equipamento de verdade.",
  },
  {
    name: "Topologia de redes",
    area: "Redes",
    desc: "Desenho como cada máquina se conecta: portas, cabos e Wi-Fi.",
  },
  {
    name: "Wireshark",
    area: "Redes",
    desc: "Capturo e leio os pacotes para descobrir onde a rede está falhando.",
  },
  {
    name: "Terminal Linux",
    area: "Sistemas",
    desc: "Navego, configuro e investigo a máquina pela linha de comando.",
  },
  {
    name: "JavaScript",
    area: "Web",
    desc: "A lógica dos meus sistemas, como o controle dos laboratórios.",
  },
  {
    name: "HTML",
    area: "Web",
    desc: "A estrutura das páginas, do formulário à tabela.",
  },
  {
    name: "CSS",
    area: "Web",
    desc: "O layout e o visual das telas, no computador e no celular.",
  },
  {
    name: "Excel",
    area: "Escritório",
    desc: "Planilhas de controle, fórmulas e relatórios.",
  },
  {
    name: "Word",
    area: "Escritório",
    desc: "Documentos, relatórios e manuais de uso.",
  },
];
