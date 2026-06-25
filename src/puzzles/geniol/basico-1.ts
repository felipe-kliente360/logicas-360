// Geniol · "Básico 1". Spine = idade (ordenada, 7..9 anos, consecutivos).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "basico-1",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 1,
  size: 3,
  title: "Sucos no quintal",
  story:
    "Três crianças estão brincando enquanto a mãe de uma delas prepara três sucos diferentes. Descubra o suco favorito e a idade de cada uma das crianças.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["7 anos", "8 anos", "9 anos"],
    referential: "Posição 1 = a mais nova (7 anos); posição 3 = a mais velha (9 anos).",
  },
  categories: [
    { id: "nome", label: "Nome", values: ["Talita", "Lucas", "Carina"].map((v) => tx(v)) },
    { id: "suco", label: "Suco", values: ["Maracuja", "Limao", "Laranja"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "b1",
      text: "A menina que gosta de suco de laranja tem dois anos a mais que Talita.",
      highlights: [{ cat: "suco" }, { cat: "nome" }],
      // "A menina" → não é o Lucas (menino).
      constraints: [
        { k: "offset", a: { cat: "suco", value: "Laranja" }, b: { cat: "nome", value: "Talita" }, delta: 2 },
        { k: "diff", a: { cat: "suco", value: "Laranja" }, b: { cat: "nome", value: "Lucas" } },
      ],
    },
    {
      id: "b2",
      text: "A criança que gosta de suco de maracujá tem 8 anos.",
      highlights: [{ cat: "suco" }],
      constraints: [{ k: "at", cat: "suco", value: "Maracuja", pos: 1 }],
    },
  ],
  solution: {},
};
