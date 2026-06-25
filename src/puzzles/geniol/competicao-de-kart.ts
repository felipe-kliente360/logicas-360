// Geniol · "Competição de Kart". Spine = idade (ordenada, 13..16 anos, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "competicao-de-kart",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Competição de Kart",
  story:
    "Quatro amigos se reuniram para participar de uma corrida de kart entre eles. Associe cada um dos pilotos com a idade e a posição na corrida.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["13 anos", "14 anos", "15 anos", "16 anos"],
    referential: "Posição 1 = o mais novo (13 anos); posição 4 = o mais velho (16 anos).",
  },
  categories: [
    { id: "nome", label: "Nome", values: ["Alexandre", "Fabiano", "Robson", "Sandro"].map((v) => tx(v)) },
    { id: "posicao", label: "Posição", values: ["Primeiro", "Segundo", "Terceiro", "Quarto"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "k1",
      text: "O piloto que terminou em primeiro é mais velho do que Sandro.",
      highlights: [{ cat: "posicao" }, { cat: "nome" }],
      constraints: [{ k: "before", a: { cat: "nome", value: "Sandro" }, b: { cat: "posicao", value: "Primeiro" } }],
    },
    {
      id: "k2",
      text: "Robson tem 13 anos.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "at", cat: "nome", value: "Robson", pos: 0 }],
    },
    {
      id: "k3",
      text: "Sandro ficou em segundo lugar.",
      highlights: [{ cat: "nome" }, { cat: "posicao" }],
      constraints: [{ k: "same", a: { cat: "nome", value: "Sandro" }, b: { cat: "posicao", value: "Segundo" } }],
    },
    {
      id: "k4",
      text: "Alexandre é um ano mais novo do que o piloto que terminou em terceiro.",
      highlights: [{ cat: "nome" }, { cat: "posicao" }],
      constraints: [{ k: "immediateLeft", a: { cat: "nome", value: "Alexandre" }, b: { cat: "posicao", value: "Terceiro" } }],
    },
  ],
  solution: {},
};
