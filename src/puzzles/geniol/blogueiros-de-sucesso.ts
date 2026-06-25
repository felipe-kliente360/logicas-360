// Geniol · "Blogueiros de Sucesso". Spine = visitas (ordenada, 1..4 milhões, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "blogueiros-de-sucesso",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Blogueiros de Sucesso",
  story:
    "Uma reportagem do jornal fala sobre quatro blogueiros de sucesso. Use a lógica para descobrir as informações dos blogs desses blogueiros.",
  spine: {
    id: "visitas",
    label: "Visitas",
    ordered: true,
    labels: ["1 milhão", "2 milhões", "3 milhões", "4 milhões"],
    referential: "Posição 1 = menos visitado (1 milhão); posição 4 = mais visitado (4 milhões). Passo de 1 milhão.",
  },
  categories: [
    { id: "blogueiro", label: "Blogueiro", values: ["Rubens", "Lucas", "Felipe", "Anderson"].map((v) => tx(v)) },
    { id: "assunto", label: "Assunto", values: ["Esportes", "Humor", "Cinema", "Carros"].map((v) => tx(v)) },
    { id: "idade", label: "Idade do blog", values: ["2 anos", "3 anos", "4 anos", "5 anos"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "b1",
      text: "Rubens tem o blog mais visitado entre os quatro.",
      highlights: [{ cat: "blogueiro" }],
      constraints: [{ k: "end", cat: "blogueiro", value: "Rubens", which: "last" }],
    },
    {
      id: "b2",
      text: "O blog com 5 anos e o blog do Lucas não são sobre humor.",
      highlights: [{ cat: "idade" }, { cat: "blogueiro" }, { cat: "assunto" }],
      constraints: [
        { k: "diff", a: { cat: "idade", value: "5 anos" }, b: { cat: "assunto", value: "Humor" } },
        { k: "diff", a: { cat: "blogueiro", value: "Lucas" }, b: { cat: "assunto", value: "Humor" } },
        // São dois blogs distintos citados na frase: o de 5 anos não é o do Lucas.
        { k: "diff", a: { cat: "idade", value: "5 anos" }, b: { cat: "blogueiro", value: "Lucas" } },
      ],
    },
    {
      id: "b3",
      text: "O blog de humor tem 2 milhões de visitas ou é de Rubens.",
      highlights: [{ cat: "assunto" }, { cat: "blogueiro" }],
      // Rubens é o mais visitado (pos 3) e humor não pode ter 4 milhões (pista 5),
      // logo humor ≠ Rubens e o ramo restante força humor a ter 2 milhões (pos 1).
      constraints: [{ k: "at", cat: "assunto", value: "Humor", pos: 1 }],
    },
    {
      id: "b4",
      text: "O blog de esportes tem menos visitas que o blog com 2 anos de idade.",
      highlights: [{ cat: "assunto" }, { cat: "idade" }],
      constraints: [{ k: "before", a: { cat: "assunto", value: "Esportes" }, b: { cat: "idade", value: "2 anos" } }],
    },
    {
      id: "b5",
      text: "Nem o blog de esportes nem o blog de humor possuem 4 milhões de visitas.",
      highlights: [{ cat: "assunto" }],
      constraints: [
        { k: "notAt", cat: "assunto", value: "Esportes", pos: 3 },
        { k: "notAt", cat: "assunto", value: "Humor", pos: 3 },
      ],
    },
    {
      id: "b6",
      text: "Anderson tem um blog sobre carros.",
      highlights: [{ cat: "blogueiro" }, { cat: "assunto" }],
      constraints: [{ k: "same", a: { cat: "blogueiro", value: "Anderson" }, b: { cat: "assunto", value: "Carros" } }],
    },
    {
      id: "b7",
      text: "O blog com 3 anos de idade tem 2 milhões de visitas a mais que o blog de esportes.",
      highlights: [{ cat: "idade" }, { cat: "assunto" }],
      constraints: [{ k: "offset", a: { cat: "idade", value: "3 anos" }, b: { cat: "assunto", value: "Esportes" }, delta: 2 }],
    },
  ],
  solution: {},
};
