// Geniol · "Reunião de Professores". Spine = idade (ordenada, 25..40, passo 5).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "reuniao-de-professores",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Reunião de Professores",
  story:
    "Em uma escola, quatro professoras estão reunidas para discutir o andamento do semestre. Através das dicas, descubra qual matéria que cada uma ensina.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["25 anos", "30 anos", "35 anos", "40 anos"],
    referential: "Posição 1 = a mais nova (25 anos); posição 4 = a mais velha (40 anos). Passo de 5 anos.",
  },
  categories: [
    { id: "nome", label: "Nome", values: ["Rosana", "Luiza", "Erica", "Carina"].map((v) => tx(v)) },
    { id: "materia", label: "Matéria", values: ["Portugues", "Matematica", "Historia", "Biologia"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "p1",
      text: "A professora de biologia é 10 anos mais velha do que a Luiza.",
      highlights: [{ cat: "materia" }, { cat: "nome" }],
      constraints: [{ k: "offset", a: { cat: "materia", value: "Biologia" }, b: { cat: "nome", value: "Luiza" }, delta: 2 }],
    },
    {
      id: "p2",
      text: "Carina é professora de português.",
      highlights: [{ cat: "nome" }, { cat: "materia" }],
      constraints: [{ k: "same", a: { cat: "nome", value: "Carina" }, b: { cat: "materia", value: "Portugues" } }],
    },
    {
      id: "p3",
      text: "A professora de matemática é 5 anos mais nova do que a Luiza.",
      highlights: [{ cat: "materia" }, { cat: "nome" }],
      constraints: [{ k: "immediateLeft", a: { cat: "materia", value: "Matematica" }, b: { cat: "nome", value: "Luiza" } }],
    },
    {
      id: "p4",
      text: "Rosana é mais nova do que a professora de português.",
      highlights: [{ cat: "nome" }, { cat: "materia" }],
      constraints: [{ k: "before", a: { cat: "nome", value: "Rosana" }, b: { cat: "materia", value: "Portugues" } }],
    },
  ],
  solution: {},
};
