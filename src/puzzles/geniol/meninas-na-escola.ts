// Geniol · "Meninas na Escola". Spine = nomes (associação pura; nomes fixam o eixo).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "meninas-na-escola",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 1,
  size: 3,
  title: "Meninas na Escola",
  story:
    "Três meninas que frequentam a mesma escola possuem mochilas de cores diferentes e gostam de sucos e matérias distintas. Identifique a cor da mochila e o gosto de cada uma delas.",
  spine: {
    id: "nome",
    label: "Nome",
    ordered: false,
    // Posições fixas: 0=Aline, 1=Flávia, 2=Manuela.
    labels: ["Aline", "Flávia", "Manuela"],
  },
  categories: [
    { id: "mochila", label: "Mochila", values: [
      { id: "Laranja", label: "Laranja", display: { kind: "color", hex: "#f59e0b" } },
      { id: "Rosa", label: "Rosa", display: { kind: "color", hex: "#ec4899" } },
      { id: "Vermelha", label: "Vermelha", display: { kind: "color", hex: "#dc2626" } },
    ] },
    { id: "materia", label: "Matéria", values: ["Historia", "Matematica", "Portugues"].map((v) => tx(v, v === "Historia" ? "História" : v === "Matematica" ? "Matemática" : "Português")) },
    { id: "suco", label: "Suco", values: ["Abacaxi", "Limao", "Uva"].map((v) => tx(v, v === "Limao" ? "Limão" : v)) },
  ],
  clues: [
    {
      id: "m1",
      text: "A menina que gosta de português gosta de suco de abacaxi.",
      highlights: [{ cat: "materia" }, { cat: "suco" }],
      constraints: [{ k: "same", a: { cat: "materia", value: "Portugues" }, b: { cat: "suco", value: "Abacaxi" } }],
    },
    {
      id: "m2",
      text: "A mochila de Manuela não é laranja.",
      highlights: [{ cat: "nome" }, { cat: "mochila" }],
      constraints: [{ k: "notAt", cat: "mochila", value: "Laranja", pos: 2 }],
    },
    {
      id: "m3",
      text: "A garota da mochila vermelha gosta de suco de limão.",
      highlights: [{ cat: "mochila" }, { cat: "suco" }],
      constraints: [{ k: "same", a: { cat: "mochila", value: "Vermelha" }, b: { cat: "suco", value: "Limao" } }],
    },
    {
      id: "m4",
      text: "Aline gosta de história e não gosta de suco de uva.",
      highlights: [{ cat: "nome" }, { cat: "materia" }, { cat: "suco" }],
      constraints: [
        { k: "at", cat: "materia", value: "Historia", pos: 0 },
        { k: "notAt", cat: "suco", value: "Uva", pos: 0 },
      ],
    },
    {
      id: "m5",
      text: "Flávia não gosta de matemática.",
      highlights: [{ cat: "nome" }, { cat: "materia" }],
      constraints: [{ k: "notAt", cat: "materia", value: "Matematica", pos: 1 }],
    },
  ],
  solution: {},
};
