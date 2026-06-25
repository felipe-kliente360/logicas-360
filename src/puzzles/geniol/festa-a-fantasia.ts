// Geniol · "Festa a Fantasia". Spine = idade (ordenada, 6..9 anos, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "festa-a-fantasia",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Festa a Fantasia",
  story:
    "Quatro meninas estão participando de uma animada festa a fantasia. Cada uma está com uma fantasia e acompanhada de um responsável. Use a lógica para descobrir as características delas.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["6 anos", "7 anos", "8 anos", "9 anos"],
    referential: "Posição 1 = a mais nova (6 anos); posição 4 = a mais velha (9 anos). Passo de 1 ano.",
  },
  categories: [
    { id: "nome", label: "Menina", values: ["Roberta", "Priscila", "Helen", "Debora"].map((v) => tx(v)) },
    { id: "fantasia", label: "Fantasia", values: ["princesa", "heroina", "fada", "bruxa"].map((v) => tx(v)) },
    { id: "responsavel", label: "Responsável", values: ["tio", "pai", "mae", "avo"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "f1",
      text: "O tio não é o responsável pela menina fantasiada de bruxa.",
      highlights: [{ cat: "responsavel" }, { cat: "fantasia" }],
      constraints: [{ k: "diff", a: { cat: "responsavel", value: "tio" }, b: { cat: "fantasia", value: "bruxa" } }],
    },
    {
      id: "f2",
      text: "Roberta é um ano mais velha do que Helen.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "immediateLeft", a: { cat: "nome", value: "Helen" }, b: { cat: "nome", value: "Roberta" } }],
    },
    {
      id: "f3",
      text: "A menina fantasiada de princesa tem 9 anos ou é a Roberta.",
      highlights: [{ cat: "fantasia" }, { cat: "nome" }],
      // Dadas as demais pistas, o ramo forçado é: a princesa é a Roberta.
      constraints: [{ k: "same", a: { cat: "fantasia", value: "princesa" }, b: { cat: "nome", value: "Roberta" } }],
    },
    {
      id: "f4",
      text: "A Priscila é mais nova do que a menina fantasiada de heroína.",
      highlights: [{ cat: "nome" }, { cat: "fantasia" }],
      constraints: [{ k: "before", a: { cat: "nome", value: "Priscila" }, b: { cat: "fantasia", value: "heroina" } }],
    },
    {
      id: "f5",
      text: "A menina de 7 anos está fantasiada de fada ou está acompanhada do pai.",
      highlights: [{ cat: "fantasia" }, { cat: "responsavel" }],
      // Dadas as demais pistas, o ramo forçado é: a menina de 7 anos está com o pai.
      constraints: [{ k: "at", cat: "responsavel", value: "pai", pos: 1 }],
    },
    {
      id: "f6",
      text: "Helen não está fantasiada de bruxa.",
      highlights: [{ cat: "nome" }, { cat: "fantasia" }],
      constraints: [{ k: "diff", a: { cat: "nome", value: "Helen" }, b: { cat: "fantasia", value: "bruxa" } }],
    },
    {
      id: "f7",
      text: "Sobre a menina de 8 anos e a menina acompanhada da mãe, uma está fantasiada de heroína e a outra é a Priscila, não necessariamente nessa ordem.",
      highlights: [{ cat: "nome" }, { cat: "responsavel" }, { cat: "fantasia" }],
      // Ramo forçado: a de 8 anos é a Priscila e a acompanhada da mãe está de heroína.
      constraints: [
        { k: "at", cat: "nome", value: "Priscila", pos: 2 },
        { k: "same", a: { cat: "responsavel", value: "mae" }, b: { cat: "fantasia", value: "heroina" } },
      ],
    },
    {
      id: "f8",
      text: "A menina de 9 anos está acompanhada da mãe.",
      highlights: [{ cat: "responsavel" }],
      constraints: [{ k: "at", cat: "responsavel", value: "mae", pos: 3 }],
    },
  ],
  solution: {},
};
