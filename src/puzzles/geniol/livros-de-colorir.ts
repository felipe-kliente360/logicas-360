// Geniol · "Livros de Colorir". Spine = preço (ordenado, R$15..R$30, passo 5).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "livros-de-colorir",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Livros de Colorir",
  story:
    "Quatro garotas compraram livros de colorir para passar o tempo e relaxar. Siga as dicas e descubra o nome, o tipo do livro e o preço de cada livro de colorir.",
  spine: {
    id: "preco",
    label: "Preço",
    ordered: true,
    labels: ["R$ 15", "R$ 20", "R$ 25", "R$ 30"],
    referential: "Posição 1 = mais barato (R$ 15); posição 4 = mais caro (R$ 30). Passo de R$ 5.",
  },
  categories: [
    { id: "nome", label: "Nome", values: ["Vivian", "Patricia", "Lais", "Bruna"].map((v) => tx(v)) },
    {
      id: "livro",
      label: "Livro",
      values: [
        tx("Paisagens", "Paisagens"),
        tx("Mandalas", "Mandalas"),
        tx("Flores", "Flores"),
        tx("Animais", "Animais"),
      ],
    },
  ],
  clues: [
    {
      id: "l1",
      text: "Patrícia comprou um livro de colorir mais barato do que Vivian.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "before", a: { cat: "nome", value: "Patricia" }, b: { cat: "nome", value: "Vivian" } }],
    },
    {
      id: "l2",
      text: "O livro de colorir de animais é R$ 5 mais barato que o livro de colorir de paisagens.",
      highlights: [{ cat: "livro" }],
      constraints: [
        { k: "immediateLeft", a: { cat: "livro", value: "Animais" }, b: { cat: "livro", value: "Paisagens" } },
      ],
    },
    {
      id: "l3",
      text: "Vivian comprou o livro de R$ 25.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "at", cat: "nome", value: "Vivian", pos: 2 }],
    },
    {
      id: "l4",
      text: "O livro de colorir de flores é R$ 5 mais caro que o livro que a Laís comprou.",
      highlights: [{ cat: "nome" }, { cat: "livro" }],
      constraints: [{ k: "immediateLeft", a: { cat: "nome", value: "Lais" }, b: { cat: "livro", value: "Flores" } }],
    },
    {
      id: "l5",
      text: "O livro de colorir de mandalas é mais caro do que o livro de colorir de animais.",
      highlights: [{ cat: "livro" }],
      constraints: [{ k: "before", a: { cat: "livro", value: "Animais" }, b: { cat: "livro", value: "Mandalas" } }],
    },
  ],
  solution: {},
};
