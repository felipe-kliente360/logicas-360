// Geniol · "Contas para Pagar". Spine = valor (ordenada, R$60..120, passo R$20).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "contas-para-pagar",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Contas para Pagar",
  story:
    "Todo final de mês é igual: as contas chegam e precisamos pagá-las. Descubra, usando a lógica, qual conta cada pessoa vai pagar.",
  spine: {
    id: "valor",
    label: "Valor",
    ordered: true,
    labels: ["R$ 60", "R$ 80", "R$ 100", "R$ 120"],
    referential: "Posição 1 = conta mais barata (R$ 60); posição 4 = mais cara (R$ 120). Passo de R$ 20.",
  },
  categories: [
    { id: "nome", label: "Nome", values: ["Caio", "Fernando", "Miguel", "Yuri"].map((v) => tx(v)) },
    { id: "conta", label: "Conta", values: ["agua", "celular", "luz", "telefone"].map((v) => tx(v, v[0].toUpperCase() + v.slice(1))) },
  ],
  clues: [
    {
      id: "p1",
      text: "O valor da conta de luz é R$ 120.",
      highlights: [{ cat: "conta" }],
      constraints: [{ k: "at", cat: "conta", value: "luz", pos: 3 }],
    },
    {
      id: "p2",
      text: "A conta do telefone é do Yuri ou é a conta de R$ 80.",
      highlights: [{ cat: "conta" }, { cat: "nome" }],
      // Disjunção: telefone é do Yuri OU está em R$ 80. p3 impede telefone em R$ 80
      // (cairia o Caio em R$ 100 = Fernando) → o telefone é do Yuri.
      constraints: [{ k: "same", a: { cat: "nome", value: "Yuri" }, b: { cat: "conta", value: "telefone" } }],
    },
    {
      id: "p3",
      text: "A conta do Caio é R$ 20 mais cara que a conta de telefone.",
      highlights: [{ cat: "nome" }, { cat: "conta" }],
      constraints: [{ k: "immediateLeft", a: { cat: "conta", value: "telefone" }, b: { cat: "nome", value: "Caio" } }],
    },
    {
      id: "p4",
      text: "A conta de R$ 100 é a conta de celular ou é a conta do Miguel.",
      highlights: [{ cat: "conta" }, { cat: "nome" }],
      // Fernando paga R$ 100 (p5) e Fernando ≠ Miguel → o ramo "Miguel" cai → R$ 100 é celular.
      constraints: [{ k: "at", cat: "conta", value: "celular", pos: 2 }],
    },
    {
      id: "p5",
      text: "Fernando tem que pagar a conta de R$ 100.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "at", cat: "nome", value: "Fernando", pos: 2 }],
    },
  ],
  solution: {},
};
