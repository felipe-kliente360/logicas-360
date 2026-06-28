import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..5
const suspeitos = ["Critico Vasques", "Galerista Pomar", "Marchand Quintela", "Restauradora Avila", "Colecionador Bettega", "Curadora Nunes"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Vasques   -> Vitrine   | Catalogo | 20h
//   idx 1 Pomar     -> Atrio     | Taca     | 19h
//   idx 2 Quintela  -> Corredor  | Cravo    | 23h
//   idx 3 Avila     -> Reserva   | Estilete | 00h   <- CULPADO
//   idx 4 Bettega   -> Patio     | Luvas    | 21h
//   idx 5 Nunes     -> Mezanino  | Lanterna | 22h
//
// Culpado: Restauradora Avila (Estilete + 00h). Nenhuma pista fixa
// diretamente estilete, reserva ou 00h na Avila — esses atributos só
// ficam únicos quando a grade está praticamente resolvida (atalho ~0).

export const puzzle: Puzzle = {
  id: "escandalo-galeria",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 6,
  title: "O Escândalo da Galeria",
  story:
    "Na noite de abertura da exposição mais cobiçada do ano, o vernissage terminou em tragédia: um dos convidados foi achado caído entre as obras, com um corte limpo de lâmina. Seis figuras do mundo da arte circulavam pelas alas da galeria, cada uma num espaço, portando um objeto, e tendo chegado a um horário diferente. Os depoimentos são esquivos, as coartadas se contradizem e o catálogo de luxo continua aberto na página errada. Reconstrua o trajeto de cada um pela galeria — só então a lâmina e a hora do crime convergem num único nome.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "ala",
      label: "Ala",
      values: ["Atrio", "Mezanino", "Reserva", "Vitrine", "Patio", "Corredor"].map((v) => tx(v)),
    },
    {
      id: "objeto",
      label: "Objeto",
      values: ["Taca", "Catalogo", "Luvas", "Estilete", "Cravo", "Lanterna"].map((v) => tx(v)),
    },
    {
      id: "hora",
      label: "Horário",
      values: ["19h", "20h", "21h", "22h", "23h", "00h"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "c1",
      text: "O Galerista Pomar recepcionou os convidados no átrio e foi o primeiro a chegar, às 19h.",
      highlights: [],
      constraints: [
        { k: "at", cat: "ala", value: "Atrio", pos: 1 },
        { k: "at", cat: "hora", value: "19h", pos: 1 },
      ],
    },
    {
      id: "c2",
      text: "Quem segurava a taça brindava no átrio.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Taca" }, b: { cat: "ala", value: "Atrio" } }],
    },
    {
      id: "c3",
      text: "O Crítico Vasques estava na vitrine, mas não chegou às 19h nem depois das 21h.",
      highlights: [],
      constraints: [
        { k: "at", cat: "ala", value: "Vitrine", pos: 0 },
        { k: "notAt", cat: "hora", value: "19h", pos: 0 },
        { k: "notAt", cat: "hora", value: "22h", pos: 0 },
        { k: "notAt", cat: "hora", value: "23h", pos: 0 },
        { k: "notAt", cat: "hora", value: "00h", pos: 0 },
      ],
    },
    {
      id: "c4",
      text: "O catálogo de luxo ficou aberto na vitrine a noite toda.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Catalogo" }, b: { cat: "ala", value: "Vitrine" } }],
    },
    {
      id: "c5",
      text: "O Colecionador Bettega não pisou no mezanino nem na vitrine.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "ala", value: "Mezanino", pos: 4 },
        { k: "notAt", cat: "ala", value: "Vitrine", pos: 4 },
      ],
    },
    {
      id: "c6",
      text: "Quem usava luvas brancas foi visto no pátio, e não foi o Galerista Pomar.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "objeto", value: "Luvas" }, b: { cat: "ala", value: "Patio" } },
        { k: "notAt", cat: "objeto", value: "Luvas", pos: 1 },
      ],
    },
    {
      id: "c7",
      text: "A lanterna não esteve no átrio, na vitrine, no pátio nem no corredor; quem a empunhava chegou às 22h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "objeto", value: "Lanterna" }, b: { cat: "ala", value: "Atrio" } },
        { k: "diff", a: { cat: "objeto", value: "Lanterna" }, b: { cat: "ala", value: "Vitrine" } },
        { k: "diff", a: { cat: "objeto", value: "Lanterna" }, b: { cat: "ala", value: "Patio" } },
        { k: "diff", a: { cat: "objeto", value: "Lanterna" }, b: { cat: "ala", value: "Corredor" } },
        { k: "same", a: { cat: "objeto", value: "Lanterna" }, b: { cat: "hora", value: "22h" } },
      ],
    },
    {
      id: "c8",
      text: "A Curadora Nunes circulou pelo mezanino e chegou às 22h.",
      highlights: [],
      constraints: [
        { k: "at", cat: "ala", value: "Mezanino", pos: 5 },
        { k: "at", cat: "hora", value: "22h", pos: 5 },
      ],
    },
    {
      id: "c9",
      text: "O cravo na lapela pertencia a quem ficou no corredor.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Cravo" }, b: { cat: "ala", value: "Corredor" } }],
    },
    {
      id: "c10",
      text: "O Marchand Quintela não estava no átrio, no mezanino, na reserva nem na vitrine.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "ala", value: "Atrio", pos: 2 },
        { k: "notAt", cat: "ala", value: "Mezanino", pos: 2 },
        { k: "notAt", cat: "ala", value: "Reserva", pos: 2 },
        { k: "notAt", cat: "ala", value: "Vitrine", pos: 2 },
      ],
    },
    {
      id: "c11",
      text: "O Marchand Quintela não chegou às 19h, às 20h nem às 21h.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "hora", value: "19h", pos: 2 },
        { k: "notAt", cat: "hora", value: "20h", pos: 2 },
        { k: "notAt", cat: "hora", value: "21h", pos: 2 },
      ],
    },
    {
      id: "c12",
      text: "A pessoa do corredor chegou às 23h; a do pátio, às 21h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "ala", value: "Corredor" }, b: { cat: "hora", value: "23h" } },
        { k: "same", a: { cat: "ala", value: "Patio" }, b: { cat: "hora", value: "21h" } },
      ],
    },
    {
      id: "c13",
      text: "O Crítico Vasques não portava a taça nem o estilete.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Taca", pos: 0 },
        { k: "notAt", cat: "objeto", value: "Estilete", pos: 0 },
      ],
    },
    {
      id: "c14",
      text: "O relógio da reserva, esquecido, marcava a meia-noite: quem esteve lá chegou às 00h.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "ala", value: "Reserva" }, b: { cat: "hora", value: "00h" } }],
    },
    {
      id: "c15",
      text: "A Restauradora Ávila não estava no pátio e não chegou às 23h.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "ala", value: "Patio", pos: 3 },
        { k: "notAt", cat: "hora", value: "23h", pos: 3 },
      ],
    },
    {
      id: "c16",
      text: "O Colecionador Bettega não chegou às 19h, às 20h nem às 22h.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "hora", value: "19h", pos: 4 },
        { k: "notAt", cat: "hora", value: "20h", pos: 4 },
        { k: "notAt", cat: "hora", value: "22h", pos: 4 },
      ],
    },
    {
      id: "c17",
      text: "A taça não pertencia a quem chegou às 20h.",
      highlights: [],
      constraints: [{ k: "diff", a: { cat: "objeto", value: "Taca" }, b: { cat: "hora", value: "20h" } }],
    },
  ],
  crime: {
    prompt:
      "O legista cravou a hora da morte à meia-noite em ponto, e a arma foi um estilete de restauro. Cruzando a lâmina com o horário fatal, quem cometeu o crime no vernissage?",
    evidence: [
      { cat: "objeto", value: "Estilete" },
      { cat: "hora", value: "00h" },
    ],
  },
  solution: {},
};
