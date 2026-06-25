// Geniol · "Jogadores de Basquete". Spine = altura (ordenada, 1,80..2,10 m, passo 10 cm).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "jogadores-de-basquete",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Jogadores de Basquete",
  story:
    "Quatro jogadores estão participando de uma seletiva brasileira de basquete. Use as dicas e a lógica para descobrir a altura e o estado onde cada um nasceu.",
  spine: {
    id: "altura",
    label: "Altura",
    ordered: true,
    labels: ["1,80 m", "1,90 m", "2,00 m", "2,10 m"],
    referential: "Posição 1 = o mais baixo (1,80 m); posição 4 = o mais alto (2,10 m).",
  },
  categories: [
    { id: "jogador", label: "Jogador", values: ["Tulio", "Michael", "Junior", "Angelo"].map((v) => tx(v)) },
    {
      id: "estado",
      label: "Estado",
      values: [
        tx("Parana", "Paraná"),
        tx("EspiritoSanto", "Espírito Santo"),
        tx("Ceara", "Ceará"),
        tx("Amapa", "Amapá"),
      ],
    },
  ],
  clues: [
    {
      id: "j1",
      text: "O jogador do Paraná é 10 cm mais alto do que o jogador do Ceará.",
      highlights: [{ cat: "estado" }],
      constraints: [{ k: "immediateLeft", a: { cat: "estado", value: "Ceara" }, b: { cat: "estado", value: "Parana" } }],
    },
    {
      id: "j2",
      text: "Michael tem 1,90 m de altura.",
      highlights: [{ cat: "jogador" }],
      constraints: [{ k: "at", cat: "jogador", value: "Michael", pos: 1 }],
    },
    {
      id: "j3",
      text: "Júnior tem 2,00 m de altura.",
      highlights: [{ cat: "jogador" }],
      constraints: [{ k: "at", cat: "jogador", value: "Junior", pos: 2 }],
    },
    {
      id: "j4",
      text: "Ângelo é 10 cm mais alto do que o jogador do Espírito Santo.",
      highlights: [{ cat: "jogador" }, { cat: "estado" }],
      constraints: [{ k: "immediateLeft", a: { cat: "estado", value: "EspiritoSanto" }, b: { cat: "jogador", value: "Angelo" } }],
    },
  ],
  solution: {},
};
