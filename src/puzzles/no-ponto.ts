// puzzles/no-ponto — fase 1 (dificuldade 6). Constraints validadas: countSolutions === 1.
import type { Puzzle } from "../engine/types";

const COL: Record<string, string> = {
  Amarelo: "#f2c14e",
  Marrom: "#9a6b46",
  Rosa: "#e89bbb",
  Verde: "#5fae74",
  Vermelho: "#d8553f",
};
const cv = (id: string) => ({ id, label: id, display: { kind: "color" as const, hex: COL[id] } });
const cores = ["Amarelo", "Marrom", "Rosa", "Verde", "Vermelho"];

export const noPonto: Puzzle = {
  id: "no-ponto",
  themeId: "ponto-de-onibus",
  difficulty: 6,
  size: 5,
  title: "No ponto",
  story:
    "Ontem à tarde, cinco mulheres esperavam o ônibus na chuva. Cada uma usava uma capa, um cachecol e um guarda-chuva — todos de cores diferentes. Descubra quem é quem.",
  spine: {
    id: "posicao",
    label: "Posição na fila",
    ordered: true,
    labels: ["1ª", "2ª", "3ª", "4ª", "5ª"],
    referential: "Posição 1 = frente da fila (embarca primeiro); posição 5 = fim da fila.",
  },
  categories: [
    { id: "capa", label: "Capa", values: cores.map(cv) },
    { id: "cachecol", label: "Cachecol", values: cores.map(cv) },
    { id: "guarda", label: "Guarda-chuva", values: cores.map(cv) },
  ],
  clues: [
    {
      id: "c1",
      text: "Uma mulher usava capa rosa e cachecol marrom.",
      highlights: [{ cat: "capa" }, { cat: "cachecol" }],
      constraints: [{ k: "same", a: { cat: "capa", value: "Rosa" }, b: { cat: "cachecol", value: "Marrom" } }],
    },
    {
      id: "c2",
      text: "A mulher de capa vermelha tinha guarda-chuva amarelo e não era a primeira nem a última da fila.",
      highlights: [{ cat: "capa" }, { cat: "guarda" }],
      constraints: [
        { k: "same", a: { cat: "capa", value: "Vermelho" }, b: { cat: "guarda", value: "Amarelo" } },
        { k: "notEnd", cat: "capa", value: "Vermelho", which: "first" },
        { k: "notEnd", cat: "capa", value: "Vermelho", which: "last" },
      ],
    },
    {
      id: "c3",
      text: "A quinta da fila (fim) usava cachecol rosa, e o guarda-chuva dela não era marrom.",
      highlights: [
        { cat: "cachecol", pos: 4 },
        { cat: "guarda", pos: 4 },
      ],
      constraints: [
        { k: "at", cat: "cachecol", value: "Rosa", pos: 4 },
        { k: "notAt", cat: "guarda", value: "Marrom", pos: 4 },
      ],
    },
    {
      id: "c4",
      text: "A mulher do guarda-chuva marrom usava capa amarela e estava imediatamente atrás (uma posição mais ao fundo) da mulher de cachecol amarelo.",
      highlights: [{ cat: "guarda" }, { cat: "capa" }, { cat: "cachecol" }],
      constraints: [
        { k: "same", a: { cat: "guarda", value: "Marrom" }, b: { cat: "capa", value: "Amarelo" } },
        { k: "immediateLeft", a: { cat: "cachecol", value: "Amarelo" }, b: { cat: "guarda", value: "Marrom" } },
      ],
    },
    {
      id: "c5",
      text: "A quarta da fila levava guarda-chuva verde.",
      highlights: [{ cat: "guarda", pos: 3 }],
      constraints: [{ k: "at", cat: "guarda", value: "Verde", pos: 3 }],
    },
    {
      id: "c6",
      text: "A primeira da fila (frente) usava cachecol amarelo.",
      highlights: [{ cat: "cachecol", pos: 0 }],
      constraints: [{ k: "at", cat: "cachecol", value: "Amarelo", pos: 0 }],
    },
    {
      id: "c7",
      text: "A mulher de capa verde estava mais ao fundo da fila que a de capa rosa.",
      highlights: [{ cat: "capa" }],
      constraints: [{ k: "before", a: { cat: "capa", value: "Rosa" }, b: { cat: "capa", value: "Verde" } }],
    },
    {
      id: "c8",
      text: "O guarda-chuva rosa estava mais à frente na fila (mais perto da porta) que o vermelho.",
      highlights: [{ cat: "guarda" }],
      constraints: [{ k: "before", a: { cat: "guarda", value: "Rosa" }, b: { cat: "guarda", value: "Vermelho" } }],
    },
    {
      id: "c9",
      text: "O cachecol verde estava mais à frente na fila (mais perto da porta) que o vermelho.",
      highlights: [{ cat: "cachecol" }],
      constraints: [{ k: "before", a: { cat: "cachecol", value: "Verde" }, b: { cat: "cachecol", value: "Vermelho" } }],
    },
  ],
  solution: {
    capa: ["Marrom", "Amarelo", "Vermelho", "Rosa", "Verde"],
    cachecol: ["Amarelo", "Verde", "Vermelho", "Marrom", "Rosa"],
    guarda: ["Rosa", "Marrom", "Amarelo", "Verde", "Vermelho"],
  },
};
