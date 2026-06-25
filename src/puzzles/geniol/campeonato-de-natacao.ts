// Geniol · "Campeonato de Natação". Spine = medalhas (ordenado, 5..8, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "campeonato-de-natacao",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 4,
  size: 4,
  title: "Campeonato de Natação",
  story:
    "Quatro nadadoras estão participando de provas diferentes de um campeonato de natação. Cada uma ganhou uma certa quantidade de medalhas e está usando uma touca colorida. Use a lógica para descobrir as características dessas nadadoras.",
  spine: {
    id: "medalhas",
    label: "Medalhas",
    ordered: true,
    labels: ["5", "6", "7", "8"],
    referential: "Posição 1 = menos medalhas (5); posição 4 = mais medalhas (8). Passo de 1 medalha.",
  },
  categories: [
    { id: "nadadora", label: "Nadadora", values: ["Sofia", "Larissa", "Isabela", "Beatriz"].map((v) => tx(v)) },
    {
      id: "estilo",
      label: "Estilo",
      values: [tx("Peito", "peito"), tx("Crawl", "crawl"), tx("Costas", "costas"), tx("Borboleta", "borboleta")],
    },
    {
      id: "touca",
      label: "Touca",
      values: [
        { id: "Vermelha", label: "vermelha", display: { kind: "color", hex: "#d33" } },
        { id: "Verde", label: "verde", display: { kind: "color", hex: "#2a2" } },
        { id: "Azul", label: "azul", display: { kind: "color", hex: "#36c" } },
        { id: "Amarela", label: "amarela", display: { kind: "color", hex: "#ec0" } },
      ],
    },
  ],
  clues: [
    {
      id: "c1",
      text: "Beatriz ganhou uma medalha a menos do que a nadadora da touca verde.",
      highlights: [{ cat: "nadadora" }, { cat: "touca" }],
      constraints: [
        { k: "immediateLeft", a: { cat: "nadadora", value: "Beatriz" }, b: { cat: "touca", value: "Verde" } },
      ],
    },
    {
      id: "c2",
      text: "A nadadora do estilo costas ganhou duas medalhas a menos do que Beatriz.",
      highlights: [{ cat: "nadadora" }, { cat: "estilo" }],
      constraints: [
        { k: "offset", a: { cat: "estilo", value: "Costas" }, b: { cat: "nadadora", value: "Beatriz" }, delta: -2 },
      ],
    },
    {
      id: "c3",
      text: "Quem nada borboleta está usando a touca vermelha.",
      highlights: [{ cat: "estilo" }, { cat: "touca" }],
      constraints: [{ k: "same", a: { cat: "estilo", value: "Borboleta" }, b: { cat: "touca", value: "Vermelha" } }],
    },
    {
      id: "c4",
      text: "A nadadora da touca amarela ganhou menos medalhas do que a nadadora do estilo borboleta.",
      highlights: [{ cat: "touca" }, { cat: "estilo" }],
      constraints: [{ k: "before", a: { cat: "touca", value: "Amarela" }, b: { cat: "estilo", value: "Borboleta" } }],
    },
    {
      id: "c5",
      text: "Isabela nada borboleta.",
      highlights: [{ cat: "nadadora" }, { cat: "estilo" }],
      constraints: [{ k: "same", a: { cat: "nadadora", value: "Isabela" }, b: { cat: "estilo", value: "Borboleta" } }],
    },
    {
      id: "c6",
      text: "Larissa não nada costas nem peito.",
      highlights: [{ cat: "nadadora" }, { cat: "estilo" }],
      constraints: [
        { k: "diff", a: { cat: "nadadora", value: "Larissa" }, b: { cat: "estilo", value: "Costas" } },
        { k: "diff", a: { cat: "nadadora", value: "Larissa" }, b: { cat: "estilo", value: "Peito" } },
      ],
    },
  ],
  solution: {},
};
