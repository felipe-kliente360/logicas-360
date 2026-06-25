// Geniol · "Sanduíches Naturais". Spine = preço (ordenado, R$9..R$12, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "sanduiches-naturais",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Sanduíches Naturais",
  story:
    "Quatro garotas compraram sanduíches naturais para comer à tarde. Cada sanduíche tem um sabor e um preço. Siga as pistas e descubra qual sanduíche cada garota comprou.",
  spine: {
    id: "preco",
    label: "Preço",
    ordered: true,
    labels: ["R$ 9", "R$ 10", "R$ 11", "R$ 12"],
    referential: "Posição 1 = mais barato (R$ 9); posição 4 = mais caro (R$ 12). Passo de R$ 1.",
  },
  categories: [
    { id: "cliente", label: "Cliente", values: ["Renata", "Natalia", "Gabriela", "Daniele"].map((v) => tx(v)) },
    {
      id: "sabor",
      label: "Sanduíche",
      values: [
        tx("Salame", "salame italiano"),
        tx("Peito", "peito de peru"),
        tx("Frango", "frango com azeitona"),
        tx("Atum", "atum"),
      ],
    },
  ],
  clues: [
    {
      id: "s1",
      text: "O sanduíche da Gabriela custa R$ 11 e não é de atum.",
      highlights: [{ cat: "cliente" }, { cat: "sabor" }],
      constraints: [
        { k: "at", cat: "cliente", value: "Gabriela", pos: 2 },
        { k: "diff", a: { cat: "cliente", value: "Gabriela" }, b: { cat: "sabor", value: "Atum" } },
      ],
    },
    {
      id: "s2",
      text: "O sanduíche de salame italiano custa um real mais caro que o sanduíche da Natália.",
      highlights: [{ cat: "cliente" }, { cat: "sabor" }],
      constraints: [
        { k: "immediateLeft", a: { cat: "cliente", value: "Natalia" }, b: { cat: "sabor", value: "Salame" } },
      ],
    },
    {
      id: "s3",
      text: "O sanduíche de atum custa mais caro que o sanduíche da Daniele.",
      highlights: [{ cat: "cliente" }, { cat: "sabor" }],
      constraints: [{ k: "before", a: { cat: "cliente", value: "Daniele" }, b: { cat: "sabor", value: "Atum" } }],
    },
    {
      id: "s4",
      text: "O sanduíche de R$ 12 é de frango com azeitona.",
      highlights: [{ cat: "sabor" }],
      constraints: [{ k: "at", cat: "sabor", value: "Frango", pos: 3 }],
    },
  ],
  solution: {},
};
