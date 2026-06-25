// Geniol · "Campeonato de Xadrez". Spine = idade (ordenada, 10..13 anos, consecutivos).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "campeonato-de-xadrez",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Campeonato de Xadrez",
  story:
    "Quatro jogadores participaram de um campeonato de xadrez. Descubra, seguindo as dicas, a idade deles e em qual posição cada um ficou.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["10 anos", "11 anos", "12 anos", "13 anos"],
    referential: "Posição 1 = o mais novo (10 anos); posição 4 = o mais velho (13 anos).",
  },
  categories: [
    { id: "jogador", label: "Jogador", values: ["Victor", "Tales", "Douglas", "Bernardo"].map((v) => tx(v)) },
    {
      id: "posicao",
      label: "Posição",
      values: [
        tx("P1", "1º"),
        tx("P2", "2º"),
        tx("P3", "3º"),
        tx("P4", "4º"),
      ],
    },
  ],
  clues: [
    {
      id: "x1",
      text: "Douglas é um ano mais novo do que o jogador que ficou no primeiro lugar.",
      highlights: [{ cat: "jogador" }, { cat: "posicao" }],
      constraints: [{ k: "immediateLeft", a: { cat: "jogador", value: "Douglas" }, b: { cat: "posicao", value: "P1" } }],
    },
    {
      id: "x2",
      text: "Bernardo é mais velho do que o jogador que foi campeão.",
      highlights: [{ cat: "jogador" }, { cat: "posicao" }],
      constraints: [{ k: "before", a: { cat: "posicao", value: "P1" }, b: { cat: "jogador", value: "Bernardo" } }],
    },
    {
      id: "x3",
      text: "Douglas ficou na terceira posição.",
      highlights: [{ cat: "jogador" }, { cat: "posicao" }],
      constraints: [{ k: "same", a: { cat: "jogador", value: "Douglas" }, b: { cat: "posicao", value: "P3" } }],
    },
    {
      id: "x4",
      text: "O jogador que ficou na segunda posição é um ano mais velho do que o Tales.",
      highlights: [{ cat: "posicao" }, { cat: "jogador" }],
      constraints: [{ k: "immediateLeft", a: { cat: "jogador", value: "Tales" }, b: { cat: "posicao", value: "P2" } }],
    },
    {
      id: "x5",
      text: "Victor foi vice-campeão.",
      highlights: [{ cat: "jogador" }, { cat: "posicao" }],
      constraints: [{ k: "same", a: { cat: "jogador", value: "Victor" }, b: { cat: "posicao", value: "P2" } }],
    },
  ],
  solution: {},
};
