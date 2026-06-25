// Geniol · "Self-Service". Spine = prato (ordenada, 600..900 g, passo 100 g).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "self-service",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Self-Service",
  story:
    "Quatro pessoas estão comendo em um self-service. Descubra quanto cada um vai comer, o que vai beber e qual sobremesa vai consumir.",
  spine: {
    id: "prato",
    label: "Prato",
    ordered: true,
    labels: ["600 g", "700 g", "800 g", "900 g"],
    referential: "Posição 1 = prato mais leve (600 g); posição 4 = mais pesado (900 g). Passo de 100 g.",
  },
  categories: [
    { id: "nome", label: "Consumidor", values: ["Diego", "Gabriel", "Paulo", "Plinio"].map((v) => tx(v, v === "Plinio" ? "Plínio" : v)) },
    { id: "suco", label: "Suco", values: ["acerola", "laranja", "limao", "uva"].map((v) => tx(v, v === "limao" ? "limão" : v[0].toUpperCase() + v.slice(1))) },
    { id: "sobremesa", label: "Sobremesa", values: ["bolo", "bombom", "gelatina", "pudim"].map((v) => tx(v, v[0].toUpperCase() + v.slice(1))) },
  ],
  clues: [
    {
      id: "f1",
      text: "Quem pegou o prato com 700 g de comida foi o Plínio ou quem vai beber suco de laranja.",
      highlights: [{ cat: "nome" }, { cat: "suco" }],
      // Disjunção: 700 g é o Plínio OU bebe laranja. Demais pistas excluem laranja em 700 g → 700 g é o Plínio.
      constraints: [{ k: "at", cat: "nome", value: "Plinio", pos: 1 }],
    },
    {
      id: "f2",
      text: "Diego vai comer gelatina de sobremesa.",
      highlights: [{ cat: "nome" }, { cat: "sobremesa" }],
      constraints: [{ k: "same", a: { cat: "nome", value: "Diego" }, b: { cat: "sobremesa", value: "gelatina" } }],
    },
    {
      id: "f3",
      text: "Quem vai beber suco de laranja pegou um prato 200 g mais leve do que quem vai comer gelatina.",
      highlights: [{ cat: "suco" }, { cat: "sobremesa" }],
      constraints: [{ k: "offset", a: { cat: "suco", value: "laranja" }, b: { cat: "sobremesa", value: "gelatina" }, delta: -2 }],
    },
    {
      id: "f4",
      text: "Quem vai comer pudim vai tomar suco de acerola ou suco de laranja.",
      highlights: [{ cat: "sobremesa" }, { cat: "suco" }],
      // Disjunção: pudim bebe acerola OU laranja → pudim não bebe uva nem limão.
      constraints: [
        { k: "diff", a: { cat: "sobremesa", value: "pudim" }, b: { cat: "suco", value: "uva" } },
        { k: "diff", a: { cat: "sobremesa", value: "pudim" }, b: { cat: "suco", value: "limao" } },
      ],
    },
    {
      id: "f5",
      text: "Paulo não pegou o prato mais leve.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "notAt", cat: "nome", value: "Paulo", pos: 0 }],
    },
    {
      id: "f6",
      text: "Sobre quem vai beber suco de uva e quem vai beber suco de acerola: um vai comer bombom e o outro pegou o prato com 800 g (não necessariamente nessa ordem).",
      highlights: [{ cat: "suco" }, { cat: "sobremesa" }, { cat: "prato" }],
      // uva está em 900 g (f7), logo não é o de 800 g → acerola está em 800 g e uva come bombom.
      constraints: [
        { k: "at", cat: "suco", value: "acerola", pos: 2 },
        { k: "same", a: { cat: "suco", value: "uva" }, b: { cat: "sobremesa", value: "bombom" } },
      ],
    },
    {
      id: "f7",
      text: "O consumidor que vai beber suco de uva pegou o prato com 900 g de comida.",
      highlights: [{ cat: "suco" }, { cat: "prato" }],
      constraints: [{ k: "at", cat: "suco", value: "uva", pos: 3 }],
    },
  ],
  solution: {},
};
