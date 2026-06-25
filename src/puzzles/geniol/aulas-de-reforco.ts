// Geniol · "Aulas de Reforço". Spine = horário (ordenado, 14:00..17:00, passo 1h).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "aulas-de-reforco",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Aulas de reforço",
  story:
    "Quatro alunos fazem aulas de reforço na escola. Tente descobrir o horário e a matéria da aula que cada um faz.",
  spine: {
    id: "horario",
    label: "Horário",
    ordered: true,
    labels: ["14:00", "15:00", "16:00", "17:00"],
    referential: "Posição 1 = mais cedo (14:00); posição 4 = mais tarde (17:00).",
  },
  categories: [
    { id: "aluno", label: "Aluno", values: ["Denis", "Hugo", "Luiz", "Ze"].map((v) => tx(v, v === "Ze" ? "Zé" : v)) },
    {
      id: "materia",
      label: "Matéria",
      values: ["Ingles", "Matematica", "Portugues", "Redacao"].map((v) =>
        tx(v, { Ingles: "Inglês", Matematica: "Matemática", Portugues: "Português", Redacao: "Redação" }[v]!),
      ),
    },
  ],
  clues: [
    {
      id: "r1",
      text: "A aula de redação é uma hora mais cedo do que a aula do Hugo.",
      highlights: [{ cat: "materia" }, { cat: "aluno" }],
      constraints: [{ k: "immediateLeft", a: { cat: "materia", value: "Redacao" }, b: { cat: "aluno", value: "Hugo" } }],
    },
    {
      id: "r2",
      text: "A aula do Denis é mais tarde do que a aula do Zé.",
      highlights: [{ cat: "aluno" }],
      constraints: [{ k: "before", a: { cat: "aluno", value: "Ze" }, b: { cat: "aluno", value: "Denis" } }],
    },
    {
      id: "r3",
      text: "Denis tem aula de reforço de matemática.",
      highlights: [{ cat: "aluno" }, { cat: "materia" }],
      constraints: [{ k: "same", a: { cat: "aluno", value: "Denis" }, b: { cat: "materia", value: "Matematica" } }],
    },
    {
      id: "r4",
      text: "Às 14 horas começa a aula de inglês.",
      highlights: [{ cat: "materia" }],
      constraints: [{ k: "at", cat: "materia", value: "Ingles", pos: 0 }],
    },
    {
      id: "r5",
      text: "A aula das 15 horas é a aula de matemática ou a aula do Hugo.",
      highlights: [{ cat: "materia" }, { cat: "aluno" }],
      // "15h = matemática OU Hugo": Hugo às 15h forçaria redação às 14h (dica 1), mas às 14h
      // é inglês (dica 4). Logo Hugo não pode estar às 15h → às 15h é a aula de matemática.
      constraints: [{ k: "at", cat: "materia", value: "Matematica", pos: 1 }],
    },
  ],
  solution: {},
};
