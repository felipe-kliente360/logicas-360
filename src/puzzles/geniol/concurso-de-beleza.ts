// Geniol · "Concurso de Beleza". Spine = idade (ordenada, 20..23, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const cor = (id: string, label: string, hex: string) => ({ id, label, display: { kind: "color" as const, hex } });

export const puzzle: Puzzle = {
  id: "concurso-de-beleza",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Concurso de Beleza",
  story:
    "Quatro modelos, de países diferentes, se classificaram para a final de um concurso de beleza. A última prova será um desfile de vestidos. Use as dicas para descobrir a idade, a nacionalidade e a cor do vestido usado por cada uma das modelos.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["20 anos", "21 anos", "22 anos", "23 anos"],
    referential: "Posição 1 = a mais nova (20 anos); posição 4 = a mais velha (23 anos). Passo de 1 ano.",
  },
  categories: [
    { id: "pais", label: "País", values: ["venezuelana", "espanhola", "brasileira", "australiana"].map((v) => tx(v)) },
    {
      id: "vestido",
      label: "Vestido",
      values: [
        cor("Vermelho", "Vermelho", "#e0301e"),
        cor("Verde", "Verde", "#2e8b57"),
        cor("Branco", "Branco", "#f5f5f5"),
        cor("Azul", "Azul", "#1e63e0"),
      ],
    },
  ],
  clues: [
    {
      id: "b1",
      text: "A modelo da Venezuela é 1 ano mais nova do que a modelo australiana.",
      highlights: [{ cat: "pais" }],
      constraints: [{ k: "immediateLeft", a: { cat: "pais", value: "venezuelana" }, b: { cat: "pais", value: "australiana" } }],
    },
    {
      id: "b2",
      text: "A espanhola está usando um vestido azul.",
      highlights: [{ cat: "pais" }, { cat: "vestido" }],
      constraints: [{ k: "same", a: { cat: "pais", value: "espanhola" }, b: { cat: "vestido", value: "Azul" } }],
    },
    {
      id: "b3",
      text: "A brasileira é a mais velha.",
      highlights: [{ cat: "pais" }],
      constraints: [{ k: "end", cat: "pais", value: "brasileira", which: "last" }],
    },
    {
      id: "b4",
      text: "A modelo de vermelho é mais nova que a modelo de azul.",
      highlights: [{ cat: "vestido" }],
      constraints: [{ k: "before", a: { cat: "vestido", value: "Vermelho" }, b: { cat: "vestido", value: "Azul" } }],
    },
    {
      id: "b5",
      text: "A modelo de 20 anos está de vestido branco ou azul.",
      highlights: [{ cat: "idade" }, { cat: "vestido" }],
      constraints: [
        { k: "notAt", cat: "vestido", value: "Vermelho", pos: 0 },
        { k: "notAt", cat: "vestido", value: "Verde", pos: 0 },
      ],
    },
  ],
  solution: {},
};
