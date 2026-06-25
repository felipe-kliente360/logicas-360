// Geniol · "Cheque Especial". Spine = juros (ordenada, 10%..16%, passo 2pp).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "cheque-especial",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Cheque Especial",
  story:
    "Pessoas viraram devedoras ao utilizarem o cheque especial. Cada uma deve um valor e pagará uma taxa de juros mensal do seu banco. Descubra o tamanho da dívida de cada um.",
  spine: {
    id: "juros",
    label: "Juros",
    ordered: true,
    labels: ["10%", "12%", "14%", "16%"],
    referential: "Posição 1 = menor taxa (10%); posição 4 = maior taxa (16%). Passo de 2 pontos percentuais.",
  },
  categories: [
    { id: "nome", label: "Devedor", values: ["Alfredo", "Evandro", "Romulo", "Vagner"].map((v) => tx(v)) },
    {
      id: "divida",
      label: "Dívida",
      values: ["R$ 500", "R$ 1000", "R$ 1500", "R$ 2000"].map((v) => tx(v.replace(/[^0-9R$]/g, ""), v)),
    },
  ],
  clues: [
    {
      id: "c1",
      text: "Evandro está devendo R$ 1500.",
      highlights: [{ cat: "nome" }, { cat: "divida" }],
      constraints: [{ k: "same", a: { cat: "nome", value: "Evandro" }, b: { cat: "divida", value: "R$1500" } }],
    },
    {
      id: "c2",
      text: "Quem deve R$ 500 vai pagar 2 pontos percentuais a menos de juros mensais do que Rômulo.",
      highlights: [{ cat: "divida" }, { cat: "nome" }],
      constraints: [
        { k: "immediateLeft", a: { cat: "divida", value: "R$500" }, b: { cat: "nome", value: "Romulo" } },
      ],
    },
    {
      id: "c3",
      text: "A taxa de juros de quem deve R$ 1000 é menor do que a taxa de juros do Alfredo.",
      highlights: [{ cat: "divida" }, { cat: "nome" }],
      constraints: [{ k: "before", a: { cat: "divida", value: "R$1000" }, b: { cat: "nome", value: "Alfredo" } }],
    },
    {
      id: "c4",
      text: "A taxa de juros mensal do banco de Alfredo é 14%.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "at", cat: "nome", value: "Alfredo", pos: 2 }],
    },
    {
      id: "c5",
      text: "A taxa de juros mensal do banco de Rômulo é 10% ou 12%.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "notAt", cat: "nome", value: "Romulo", pos: 2 }, { k: "notAt", cat: "nome", value: "Romulo", pos: 3 }],
    },
  ],
  solution: {},
};
