// Geniol · "Dia das Mães". Spine = valor do presente (ordenada, R$50..R$250, passo 50).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "dia-das-maes",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 5,
  title: "Dia das Mães",
  story:
    "Cinco filhos compraram presentes para o dia das mães. Siga as dicas e use a lógica para descobrir o valor do presente de cada uma das mães.",
  spine: {
    id: "valor",
    label: "Valor",
    ordered: true,
    labels: ["R$ 50", "R$ 100", "R$ 150", "R$ 200", "R$ 250"],
    referential: "Posição 1 = presente mais barato (R$ 50); posição 5 = mais caro (R$ 250).",
  },
  categories: [
    { id: "filho", label: "Filho", values: ["Mauricio", "Juliano", "Guilherme", "Diego", "Bruno"].map((v) => tx(v)) },
    { id: "mae", label: "Mãe", values: ["Vanessa", "Sabrina", "Nicole", "Eliana", "Carolina"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "m1",
      text: "Eliana vai receber um presente R$ 50 mais caro do que a mãe do Bruno.",
      highlights: [{ cat: "mae" }, { cat: "filho" }],
      constraints: [{ k: "immediateLeft", a: { cat: "filho", value: "Bruno" }, b: { cat: "mae", value: "Eliana" } }],
    },
    {
      id: "m2",
      text: "Nicole vai receber um presente R$ 50 mais barato do que a mãe do Guilherme.",
      highlights: [{ cat: "mae" }, { cat: "filho" }],
      constraints: [{ k: "immediateLeft", a: { cat: "mae", value: "Nicole" }, b: { cat: "filho", value: "Guilherme" } }],
    },
    {
      id: "m3",
      text: "São cinco presentes distintos: o do Maurício, o da Vanessa, o de R$ 50, o de R$ 150 e o de R$ 200.",
      highlights: [{ cat: "filho" }, { cat: "mae" }],
      constraints: [
        { k: "diff", a: { cat: "filho", value: "Mauricio" }, b: { cat: "mae", value: "Vanessa" } },
        { k: "notAt", cat: "filho", value: "Mauricio", pos: 0 },
        { k: "notAt", cat: "filho", value: "Mauricio", pos: 2 },
        { k: "notAt", cat: "filho", value: "Mauricio", pos: 3 },
        { k: "notAt", cat: "mae", value: "Vanessa", pos: 0 },
        { k: "notAt", cat: "mae", value: "Vanessa", pos: 2 },
        { k: "notAt", cat: "mae", value: "Vanessa", pos: 3 },
      ],
    },
    {
      id: "m4",
      text: "Juliano não dará um presente de R$ 250.",
      highlights: [{ cat: "filho" }],
      constraints: [{ k: "notAt", cat: "filho", value: "Juliano", pos: 4 }],
    },
    {
      id: "m5",
      text: "Sabrina vai ganhar um presente de R$ 200.",
      highlights: [{ cat: "mae" }],
      constraints: [{ k: "at", cat: "mae", value: "Sabrina", pos: 3 }],
    },
    {
      id: "m6",
      text: "Nicole ganhará um presente de R$ 150.",
      highlights: [{ cat: "mae" }],
      constraints: [{ k: "at", cat: "mae", value: "Nicole", pos: 2 }],
    },
  ],
  solution: {},
};
