// Geniol · "Jogo de Boliche". Spine = pontuação (ordenada, 160..220, passo 20).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "jogo-de-boliche",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Jogo de Boliche",
  story:
    "Quatro amigos jogaram entre si uma partida de boliche. Use as dicas e descubra quantos pontos cada um fez.",
  spine: {
    id: "pontuacao",
    label: "Pontuação",
    ordered: true,
    labels: ["160", "180", "200", "220"],
    referential: "Posição 1 = menor pontuação (160); posição 4 = maior pontuação (220). Passo de 20 pontos.",
  },
  categories: [
    { id: "jogador", label: "Jogador", values: ["Ricardo", "Leonardo", "Daniel", "Arthur"].map((v) => tx(v)) },
    {
      id: "profissao",
      label: "Profissão",
      values: [
        tx("Tradutor", "tradutor"),
        tx("Musico", "músico"),
        tx("Engenheiro", "engenheiro"),
        tx("Eletricista", "eletricista"),
      ],
    },
  ],
  clues: [
    {
      // Quem fez 200 é o tradutor ou é o Leonardo. Mas Leonardo=Ricardo-20 e tradutor>Ricardo,
      // logo Leonardo não pode estar em 200 (forçaria Ricardo=220 e tradutor>220, impossível).
      // Portanto quem fez 200 é o tradutor (posição 2).
      id: "b1",
      text: "O jogador que fez 200 é o tradutor ou é o Leonardo.",
      highlights: [{ cat: "jogador" }, { cat: "profissao" }],
      constraints: [{ k: "at", cat: "profissao", value: "Tradutor", pos: 2 }],
    },
    {
      id: "b2",
      text: "O músico fez 20 pontos a mais que o engenheiro.",
      highlights: [{ cat: "profissao" }],
      constraints: [
        { k: "immediateLeft", a: { cat: "profissao", value: "Engenheiro" }, b: { cat: "profissao", value: "Musico" } },
      ],
    },
    {
      id: "b3",
      text: "Arthur é eletricista.",
      highlights: [{ cat: "jogador" }, { cat: "profissao" }],
      constraints: [{ k: "same", a: { cat: "jogador", value: "Arthur" }, b: { cat: "profissao", value: "Eletricista" } }],
    },
    {
      id: "b4",
      text: "Leonardo fez 20 pontos a menos que o Ricardo.",
      highlights: [{ cat: "jogador" }],
      constraints: [
        { k: "immediateLeft", a: { cat: "jogador", value: "Leonardo" }, b: { cat: "jogador", value: "Ricardo" } },
      ],
    },
    {
      id: "b5",
      text: "O tradutor fez mais pontos do que o Ricardo.",
      highlights: [{ cat: "jogador" }, { cat: "profissao" }],
      constraints: [{ k: "before", a: { cat: "jogador", value: "Ricardo" }, b: { cat: "profissao", value: "Tradutor" } }],
    },
  ],
  solution: {},
};
