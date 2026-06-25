// Geniol · "Pipas Coloridas". Spine = rabiola (ordenada, 1,50..3,00 m, passo 0,5).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const cor = (id: string, label: string, hex: string) => ({ id, label, display: { kind: "color" as const, hex } });

export const puzzle: Puzzle = {
  id: "pipas-coloridas",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Pipas coloridas",
  story:
    "Quatro crianças estão empinando pipas. Através das dicas, descubra qual pipa cada um está empinando.",
  spine: {
    id: "rabiola",
    label: "Rabiola",
    ordered: true,
    labels: ["1,50 m", "2,00 m", "2,50 m", "3,00 m"],
    referential: "Posição 1 = rabiola mais curta (1,50 m); posição 4 = a mais comprida (3,00 m).",
  },
  categories: [
    { id: "crianca", label: "Criança", values: ["Augusto", "Diogo", "Lucio", "Rogerio"].map((v) => tx(v)) },
    {
      id: "pipa",
      label: "Pipa",
      values: [
        cor("Azul", "Azul", "#2a6fdb"),
        cor("Preta", "Preta", "#222222"),
        cor("Verde", "Verde", "#2faa3f"),
        cor("Vermelha", "Vermelha", "#d22f2f"),
      ],
    },
  ],
  clues: [
    {
      id: "p1",
      text: "A rabiola da pipa azul é maior do que a rabiola da pipa do Augusto.",
      highlights: [{ cat: "pipa" }, { cat: "crianca" }],
      constraints: [{ k: "before", a: { cat: "crianca", value: "Augusto" }, b: { cat: "pipa", value: "Azul" } }],
    },
    {
      id: "p2",
      text: "Diogo está empinando a pipa azul.",
      highlights: [{ cat: "crianca" }, { cat: "pipa" }],
      constraints: [{ k: "same", a: { cat: "crianca", value: "Diogo" }, b: { cat: "pipa", value: "Azul" } }],
    },
    {
      id: "p3",
      text: "A rabiola da pipa do Diogo é menor do que a rabiola da pipa verde.",
      highlights: [{ cat: "crianca" }, { cat: "pipa" }],
      constraints: [{ k: "before", a: { cat: "crianca", value: "Diogo" }, b: { cat: "pipa", value: "Verde" } }],
    },
    {
      id: "p4",
      text: "A rabiola da pipa vermelha é meio metro maior do que a rabiola da pipa preta.",
      highlights: [{ cat: "pipa" }],
      constraints: [{ k: "immediateLeft", a: { cat: "pipa", value: "Preta" }, b: { cat: "pipa", value: "Vermelha" } }],
    },
    {
      id: "p5",
      text: "Rogério está empinando a pipa preta.",
      highlights: [{ cat: "crianca" }, { cat: "pipa" }],
      constraints: [{ k: "same", a: { cat: "crianca", value: "Rogerio" }, b: { cat: "pipa", value: "Preta" } }],
    },
  ],
  solution: {},
};
