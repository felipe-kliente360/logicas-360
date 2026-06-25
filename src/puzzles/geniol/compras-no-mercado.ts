// Geniol · "Compras no Mercado". Spine = gasto (ordenada, R$80..R$140, passo 20).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "compras-no-mercado",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Compras no Mercado",
  story:
    "Quatro mulheres foram ao supermercado fazer as compras da semana. Tente descobrir quanto cada uma gastou e qual item elas esqueceram de comprar.",
  spine: {
    id: "gasto",
    label: "Gasto",
    ordered: true,
    labels: ["R$ 80", "R$ 100", "R$ 120", "R$ 140"],
    referential: "Posição 1 = menor gasto (R$ 80); posição 4 = maior gasto (R$ 140). Passo de R$ 20.",
  },
  categories: [
    { id: "nome", label: "Nome", values: ["Raquel", "Maria", "Clara", "Ana"].map((v) => tx(v)) },
    { id: "esqueceu", label: "Esqueceu", values: ["leite", "detergente", "cafe", "arroz"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "c1",
      text: "Ana esqueceu de comprar detergente.",
      highlights: [{ cat: "nome" }, { cat: "esqueceu" }],
      constraints: [{ k: "same", a: { cat: "nome", value: "Ana" }, b: { cat: "esqueceu", value: "detergente" } }],
    },
    {
      id: "c2",
      text: "Quem gastou R$ 140 foi a Raquel ou quem esqueceu de comprar leite.",
      highlights: [{ cat: "nome" }, { cat: "esqueceu" }],
      // Disjunção "R$140 = Raquel OU esqueceu leite": dadas as demais pistas, Raquel nunca
      // ocupa R$140 (pos 3), logo o ramo restante força quem esqueceu leite a estar em R$140.
      constraints: [{ k: "at", cat: "esqueceu", value: "leite", pos: 3 }],
    },
    {
      id: "c3",
      text: "Maria gastou R$ 100.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "at", cat: "nome", value: "Maria", pos: 1 }],
    },
    {
      id: "c4",
      text: "Quem esqueceu o café gastou R$ 20 a mais do que Raquel.",
      highlights: [{ cat: "esqueceu" }, { cat: "nome" }],
      constraints: [{ k: "immediateLeft", a: { cat: "nome", value: "Raquel" }, b: { cat: "esqueceu", value: "cafe" } }],
    },
  ],
  solution: {},
};
