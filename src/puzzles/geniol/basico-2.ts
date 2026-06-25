// Geniol · "Básico 2". Associação pura: spine = Nacionalidade (não-ordenada, posições fixas).
// Alemão=0, Espanhol=1, Italiano=2, Português=3.
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "basico-2",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 1,
  size: 4,
  title: "Roteiro pelo Brasil",
  story:
    "Quatro turistas viajaram para conhecer o Brasil, sendo que cada um decidiu viajar para um determinado estado durante certo mês. Descubra para quando e para onde cada um viajou.",
  spine: {
    id: "nacionalidade",
    label: "Nacionalidade",
    ordered: false,
    labels: ["Alemão", "Espanhol", "Italiano", "Português"],
  },
  categories: [
    { id: "mes", label: "Mês", values: ["Dezembro", "Junho", "Marco", "Setembro"].map((v) => tx(v, v === "Marco" ? "Março" : v)) },
    {
      id: "estado",
      label: "Estado",
      values: [
        tx("Amazonas", "Amazonas"),
        tx("Bahia", "Bahia"),
        tx("RioDeJaneiro", "Rio de Janeiro"),
        tx("RioGrandeDoSul", "Rio Grande do Sul"),
      ],
    },
  ],
  clues: [
    {
      id: "b1",
      text: "O espanhol visitou o Rio Grande do Sul em dezembro ou em março.",
      highlights: [{ cat: "estado" }, { cat: "mes" }],
      constraints: [
        { k: "at", cat: "estado", value: "RioGrandeDoSul", pos: 1 },
        { k: "notAt", cat: "mes", value: "Junho", pos: 1 },
        { k: "notAt", cat: "mes", value: "Setembro", pos: 1 },
      ],
    },
    {
      id: "b2",
      text: "O português não foi ao Rio de Janeiro. Ele viajou em setembro.",
      highlights: [{ cat: "estado" }, { cat: "mes" }],
      constraints: [
        { k: "notAt", cat: "estado", value: "RioDeJaneiro", pos: 3 },
        { k: "at", cat: "mes", value: "Setembro", pos: 3 },
      ],
    },
    {
      id: "b3",
      text: "O italiano viajou para a Bahia ou para o Rio de Janeiro. Ele não viajou em junho.",
      highlights: [{ cat: "estado" }, { cat: "mes" }],
      constraints: [
        { k: "notAt", cat: "estado", value: "Amazonas", pos: 2 },
        { k: "notAt", cat: "estado", value: "RioGrandeDoSul", pos: 2 },
        { k: "notAt", cat: "mes", value: "Junho", pos: 2 },
      ],
    },
    {
      id: "b4",
      text: "O alemão foi para o Amazonas em junho ou em dezembro.",
      highlights: [{ cat: "estado" }, { cat: "mes" }],
      constraints: [
        { k: "at", cat: "estado", value: "Amazonas", pos: 0 },
        { k: "notAt", cat: "mes", value: "Marco", pos: 0 },
        { k: "notAt", cat: "mes", value: "Setembro", pos: 0 },
      ],
    },
    {
      id: "b5",
      text: "O italiano viajou no mês em que é comemorado o Natal.",
      highlights: [{ cat: "mes" }],
      constraints: [{ k: "at", cat: "mes", value: "Dezembro", pos: 2 }],
    },
  ],
  solution: {},
};
