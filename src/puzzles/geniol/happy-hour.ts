// Geniol · "Happy Hour". Spine = chopes (ordenada, 2..5 chopes, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "happy-hour",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Happy Hour",
  story:
    "Quatro amigos se reuniram num pub após o trabalho para beber e jogar conversa fora. Use a lógica e descubra o nome, a idade, a cerveja favorita e quantos chopes cada um deles bebeu.",
  spine: {
    id: "chopes",
    label: "Chopes",
    ordered: true,
    labels: ["2 chopes", "3 chopes", "4 chopes", "5 chopes"],
    referential: "Posição 1 = quem bebeu menos (2 chopes); posição 4 = quem bebeu mais (5 chopes). Passo de 1 chope.",
  },
  categories: [
    { id: "nome", label: "Nome", values: ["Paulo", "Mateus", "Hugo", "Fabio"].map((v) => tx(v)) },
    { id: "idade", label: "Idade", values: ["24 anos", "25 anos", "27 anos", "31 anos"].map((v) => tx(v)) },
    { id: "cerveja", label: "Cerveja", values: ["NorteAmericana", "Holandesa", "Belga", "Alema"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "h1",
      text: "O amigo de 25 anos bebeu menos chopes do que Hugo.",
      highlights: [{ cat: "idade" }, { cat: "nome" }],
      constraints: [{ k: "before", a: { cat: "idade", value: "25 anos" }, b: { cat: "nome", value: "Hugo" } }],
    },
    {
      id: "h2",
      text: "Mateus bebeu mais chopes do que o amigo que gosta da cerveja norte-americana.",
      highlights: [{ cat: "nome" }, { cat: "cerveja" }],
      constraints: [{ k: "before", a: { cat: "cerveja", value: "NorteAmericana" }, b: { cat: "nome", value: "Mateus" } }],
    },
    {
      id: "h3",
      text: "Sobre os amigos que gostam de cerveja alemã e de cerveja belga, um tem 27 anos e o outro é o Hugo, não necessariamente nessa ordem.",
      highlights: [{ cat: "cerveja" }, { cat: "idade" }, { cat: "nome" }],
      // Dadas as demais pistas, o ramo forçado é: a belga é a de 27 anos e a alemã é a do Hugo.
      constraints: [
        { k: "same", a: { cat: "cerveja", value: "Belga" }, b: { cat: "idade", value: "27 anos" } },
        { k: "same", a: { cat: "cerveja", value: "Alema" }, b: { cat: "nome", value: "Hugo" } },
      ],
    },
    {
      id: "h4",
      text: "Aquele que gosta da cerveja norte-americana não tem 24 anos nem 31 anos.",
      highlights: [{ cat: "cerveja" }, { cat: "idade" }],
      constraints: [
        { k: "diff", a: { cat: "cerveja", value: "NorteAmericana" }, b: { cat: "idade", value: "24 anos" } },
        { k: "diff", a: { cat: "cerveja", value: "NorteAmericana" }, b: { cat: "idade", value: "31 anos" } },
      ],
    },
    {
      id: "h5",
      text: "O amigo que bebeu 3 chopes gosta da cerveja belga.",
      highlights: [{ cat: "cerveja" }],
      constraints: [{ k: "at", cat: "cerveja", value: "Belga", pos: 1 }],
    },
    {
      id: "h6",
      text: "Paulo bebeu 3 chopes.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "at", cat: "nome", value: "Paulo", pos: 1 }],
    },
    {
      id: "h7",
      text: "Quem gosta da cerveja alemã é o Fábio ou o amigo de 24 anos.",
      highlights: [{ cat: "cerveja" }, { cat: "nome" }, { cat: "idade" }],
      // Dadas as demais pistas, a alemã (do Hugo) é a do amigo de 24 anos.
      constraints: [{ k: "same", a: { cat: "cerveja", value: "Alema" }, b: { cat: "idade", value: "24 anos" } }],
    },
    {
      id: "h8",
      text: "O amigo que bebeu 4 chopes não tem 24 anos.",
      highlights: [{ cat: "idade" }],
      constraints: [{ k: "notAt", cat: "idade", value: "24 anos", pos: 2 }],
    },
  ],
  solution: {},
};
