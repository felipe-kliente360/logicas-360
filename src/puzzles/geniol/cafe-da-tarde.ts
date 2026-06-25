// Geniol · "Café da Tarde". Spine = gasto (ordenado, R$10..R$25, passo 5).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "cafe-da-tarde",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Café da tarde",
  story:
    "Quatro clientes estão tomando o habitual cafezinho da tarde. Cada um pediu um café e algo para comer. Descubra quanto cada um gastou e qual café cada um escolheu.",
  spine: {
    id: "gasto",
    label: "Gasto",
    ordered: true,
    labels: ["R$ 10", "R$ 15", "R$ 20", "R$ 25"],
    referential: "Posição 1 = quem gastou menos (R$ 10); posição 4 = quem gastou mais (R$ 25).",
  },
  categories: [
    { id: "cliente", label: "Cliente", values: ["Arnaldo", "Everson", "Lucas", "Ronaldo"].map((v) => tx(v)) },
    {
      id: "cafe",
      label: "Café",
      values: ["Cappuccino", "Espresso", "Latte", "Mocha"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "f1",
      text: "O cliente que gastou R$ 15 comprou um espresso ou é o Arnaldo.",
      highlights: [{ cat: "cafe" }, { cat: "cliente" }],
      // O espresso custa R$ 10 (dica 5), logo quem gastou R$ 15 não é o espresso → é o Arnaldo.
      constraints: [{ k: "at", cat: "cliente", value: "Arnaldo", pos: 1 }],
    },
    {
      id: "f2",
      text: "Everson gosta de mocha ou de espresso.",
      highlights: [{ cat: "cliente" }, { cat: "cafe" }],
      constraints: [
        { k: "diff", a: { cat: "cliente", value: "Everson" }, b: { cat: "cafe", value: "Cappuccino" } },
        { k: "diff", a: { cat: "cliente", value: "Everson" }, b: { cat: "cafe", value: "Latte" } },
      ],
    },
    {
      id: "f3",
      text: "Lucas gastou mais do que o cliente que comprou um espresso.",
      highlights: [{ cat: "cliente" }, { cat: "cafe" }],
      constraints: [{ k: "before", a: { cat: "cafe", value: "Espresso" }, b: { cat: "cliente", value: "Lucas" } }],
    },
    {
      id: "f4",
      text: "O cliente que gastou R$ 20 comprou um cappuccino.",
      highlights: [{ cat: "cafe" }],
      constraints: [{ k: "at", cat: "cafe", value: "Cappuccino", pos: 2 }],
    },
    {
      id: "f5",
      text: "O cliente que comprou um espresso gastou R$ 10.",
      highlights: [{ cat: "cafe" }],
      constraints: [{ k: "at", cat: "cafe", value: "Espresso", pos: 0 }],
    },
    {
      id: "f6",
      text: "Lucas, quem comprou um mocha e quem gastou R$ 20 são clientes diferentes.",
      highlights: [{ cat: "cliente" }, { cat: "cafe" }],
      constraints: [
        { k: "diff", a: { cat: "cliente", value: "Lucas" }, b: { cat: "cafe", value: "Mocha" } },
        { k: "diff", a: { cat: "cliente", value: "Lucas" }, b: { cat: "cafe", value: "Cappuccino" } },
        { k: "diff", a: { cat: "cafe", value: "Mocha" }, b: { cat: "cafe", value: "Cappuccino" } },
      ],
    },
  ],
  solution: {},
};
