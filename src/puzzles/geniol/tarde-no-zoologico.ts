// Geniol · "Tarde no Zoológico". Spine = idade (ordenada, 7..10 anos).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "tarde-no-zoologico",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0, // preenchido pelo engine/relatório
  sourceDifficulty: 0, // preenchido pela leitura dos ícones
  size: 4,
  title: "Tarde no zoológico",
  story:
    "Quatro amigas aproveitam uma linda tarde de sol para visitar o zoológico. Descubra a idade e o animal que cada uma quer ver.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["7 anos", "8 anos", "9 anos", "10 anos"],
    referential: "Posição 1 = a mais nova (7 anos); posição 4 = a mais velha (10 anos).",
  },
  categories: [
    { id: "nome", label: "Nome", values: ["Veronica", "Tatiane", "Julia", "Cristina"].map((v) => tx(v)) },
    { id: "animal", label: "Animal", values: ["Macaco", "Leao", "Girafa", "Elefante"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "z1",
      text: "Verônica é mais velha do que Tatiane.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "before", a: { cat: "nome", value: "Tatiane" }, b: { cat: "nome", value: "Veronica" } }],
    },
    {
      id: "z2",
      text: "Cristina é a mais velha da turma.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "end", cat: "nome", value: "Cristina", which: "last" }],
    },
    {
      id: "z3",
      text: "Júlia é um ano mais nova do que a menina que quer ver o elefante.",
      highlights: [{ cat: "nome" }, { cat: "animal" }],
      constraints: [{ k: "immediateLeft", a: { cat: "nome", value: "Julia" }, b: { cat: "animal", value: "Elefante" } }],
    },
    {
      id: "z4",
      text: "Júlia é um ano mais velha do que a garota que quer ver o leão.",
      highlights: [{ cat: "nome" }, { cat: "animal" }],
      constraints: [{ k: "immediateLeft", a: { cat: "animal", value: "Leao" }, b: { cat: "nome", value: "Julia" } }],
    },
    {
      id: "z5",
      text: "A menina que deseja ver o leão é um ano mais velha do que a que deseja ver o macaco.",
      highlights: [{ cat: "animal" }],
      constraints: [{ k: "immediateLeft", a: { cat: "animal", value: "Macaco" }, b: { cat: "animal", value: "Leao" } }],
    },
  ],
  solution: {}, // DERIVADA pelo engine (solve) no carregamento — ver puzzles/index.ts
};
