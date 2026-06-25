// Geniol · "Cachorros no Parque". Spine = idade (ordenada, 1..4 anos, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "cachorros-no-parque",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Cachorros no parque",
  story:
    "Quatro rapazes estão passeando com os seus cachorros num parque. Siga as dicas e descubra os nomes dos donos, as raças e as idades dos cachorros.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["1 ano", "2 anos", "3 anos", "4 anos"],
    referential: "Posição 1 = o mais novo (1 ano); posição 4 = o mais velho (4 anos).",
  },
  categories: [
    { id: "dono", label: "Dono", values: ["Carlos", "Fred", "Igor", "Leandro"].map((v) => tx(v)) },
    { id: "raca", label: "Raça", values: ["Bulldog", "Dalmata", "Labrador", "Poodle"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "c1",
      text: "O bulldog é um ano mais velho que o cachorro do Igor.",
      highlights: [{ cat: "raca" }, { cat: "dono" }],
      constraints: [{ k: "immediateLeft", a: { cat: "dono", value: "Igor" }, b: { cat: "raca", value: "Bulldog" } }],
    },
    {
      id: "c2",
      text: "O poodle é um ano mais velho que o bulldog.",
      highlights: [{ cat: "raca" }],
      constraints: [{ k: "immediateLeft", a: { cat: "raca", value: "Bulldog" }, b: { cat: "raca", value: "Poodle" } }],
    },
    {
      id: "c3",
      text: "Igor tem um labrador.",
      highlights: [{ cat: "dono" }, { cat: "raca" }],
      constraints: [{ k: "same", a: { cat: "dono", value: "Igor" }, b: { cat: "raca", value: "Labrador" } }],
    },
    {
      id: "c4",
      text: "O cachorro de Fred é mais velho que o bulldog.",
      highlights: [{ cat: "dono" }, { cat: "raca" }],
      constraints: [{ k: "before", a: { cat: "raca", value: "Bulldog" }, b: { cat: "dono", value: "Fred" } }],
    },
    {
      id: "c5",
      text: "O cachorro de Fred é mais novo que o de Carlos.",
      highlights: [{ cat: "dono" }],
      constraints: [{ k: "before", a: { cat: "dono", value: "Fred" }, b: { cat: "dono", value: "Carlos" } }],
    },
  ],
  solution: {},
};
