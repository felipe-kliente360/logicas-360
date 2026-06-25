// Geniol · "Ovos de Páscoa". Spine = peso (ordenado, 150..300 g, passo 50 g).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "ovos-de-pascoa",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Ovos de Páscoa",
  story:
    "Quatro mães acabaram de comprar ovos de páscoa para os seus filhos. Cada uma comprou um ovo de páscoa de determinado tipo e peso. Siga as dicas e use a lógica para descobrir isso e os nomes dos filhos e das mães.",
  spine: {
    id: "peso",
    label: "Peso",
    ordered: true,
    labels: ["150 g", "200 g", "250 g", "300 g"],
    referential: "Posição 1 = o ovo mais leve (150 g); posição 4 = o mais pesado (300 g).",
  },
  categories: [
    {
      id: "mae",
      label: "Mãe",
      values: [tx("Regina"), tx("Luciana"), tx("Cristina"), tx("AnaPaula", "Ana Paula")].map((v) => v),
    },
    {
      id: "ovo",
      label: "Ovo",
      values: [tx("Recheado"), tx("Crocante"), tx("Branco"), tx("AoLeite", "Ao leite")],
    },
    {
      id: "filho",
      label: "Filho",
      values: ["Renato", "Pedro", "Erick", "Adriano"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "o1",
      text: "As quatro mães são a Cristina, a mãe que comprou um ovo de chocolate branco, a mãe que comprou o ovo de 150 g e a mãe do Adriano.",
      highlights: [{ cat: "mae" }, { cat: "ovo" }, { cat: "filho" }],
      // Quatro entidades distintas: Cristina, ovo branco, ovo de 150 g, mãe do Adriano.
      constraints: [
        { k: "diff", a: { cat: "mae", value: "Cristina" }, b: { cat: "ovo", value: "Branco" } },
        { k: "notAt", cat: "mae", value: "Cristina", pos: 0 },
        { k: "diff", a: { cat: "mae", value: "Cristina" }, b: { cat: "filho", value: "Adriano" } },
        { k: "notAt", cat: "ovo", value: "Branco", pos: 0 },
        { k: "diff", a: { cat: "ovo", value: "Branco" }, b: { cat: "filho", value: "Adriano" } },
        { k: "notAt", cat: "filho", value: "Adriano", pos: 0 },
      ],
    },
    {
      id: "o2",
      text: "O ovo de 250 g foi comprado pela Regina.",
      highlights: [{ cat: "mae" }],
      constraints: [
        { k: "notAt", cat: "mae", value: "Cristina", pos: 2 },
        { k: "notAt", cat: "mae", value: "Luciana", pos: 2 },
        { k: "at", cat: "mae", value: "Regina", pos: 2 },
      ],
    },
    {
      id: "o3",
      text: "O ovo de 300 g foi comprado pela mãe do Renato.",
      highlights: [{ cat: "filho" }],
      constraints: [{ k: "at", cat: "filho", value: "Renato", pos: 3 }],
    },
    {
      id: "o4",
      text: "Ana Paula comprou o ovo de chocolate branco e o Adriano ganhou o ovo ao leite.",
      highlights: [{ cat: "mae" }, { cat: "filho" }, { cat: "ovo" }],
      constraints: [
        { k: "diff", a: { cat: "mae", value: "AnaPaula" }, b: { cat: "filho", value: "Adriano" } },
        { k: "same", a: { cat: "mae", value: "AnaPaula" }, b: { cat: "ovo", value: "Branco" } },
        { k: "same", a: { cat: "filho", value: "Adriano" }, b: { cat: "ovo", value: "AoLeite" } },
      ],
    },
    {
      id: "o5",
      text: "O ovo de Adriano pesa 50 g a mais que o ovo crocante.",
      highlights: [{ cat: "filho" }, { cat: "ovo" }],
      constraints: [{ k: "immediateLeft", a: { cat: "ovo", value: "Crocante" }, b: { cat: "filho", value: "Adriano" } }],
    },
    {
      id: "o6",
      text: "Pedro não ganhou o ovo de 150 g nem o ovo comprado pela Luciana.",
      highlights: [{ cat: "filho" }, { cat: "mae" }],
      constraints: [
        { k: "notAt", cat: "filho", value: "Pedro", pos: 0 },
        { k: "diff", a: { cat: "filho", value: "Pedro" }, b: { cat: "mae", value: "Luciana" } },
      ],
    },
  ],
  solution: {},
};
