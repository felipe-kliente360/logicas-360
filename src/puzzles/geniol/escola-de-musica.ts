// Geniol · "Escola de Música". Spine = horário (ordenada, 18h..21h, passo 1h).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "escola-de-musica",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Escola de Música",
  story:
    "Quatro alunos fazem aula de música numa mesma escola. Siga as dicas para descobrir a idade, o horário da aula e o instrumento que cada um toca.",
  spine: {
    id: "horario",
    label: "Horário",
    ordered: true,
    labels: ["18:00", "19:00", "20:00", "21:00"],
    referential: "Posição 1 = aula mais cedo (18:00); posição 4 = mais tarde (21:00).",
  },
  categories: [
    { id: "aluno", label: "Aluno", values: ["Thiago", "Mario", "Jose", "Cesar"].map((v) => tx(v)) },
    { id: "instrumento", label: "Instrumento", values: ["Violao", "Teclado", "Guitarra", "Bateria"].map((v) => tx(v)) },
    { id: "idade", label: "Idade", values: ["14 anos", "19 anos", "26 anos", "38 anos"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "e1",
      text: "A aula de guitarra não é às 20:00.",
      highlights: [{ cat: "instrumento" }],
      constraints: [{ k: "notAt", cat: "instrumento", value: "Guitarra", pos: 2 }],
    },
    {
      id: "e2",
      text: "O aluno mais velho estuda às 20:00.",
      highlights: [{ cat: "idade" }],
      constraints: [{ k: "at", cat: "idade", value: "38 anos", pos: 2 }],
    },
    {
      id: "e3",
      text: "A aula de violão é às 18:00.",
      highlights: [{ cat: "instrumento" }],
      constraints: [{ k: "at", cat: "instrumento", value: "Violao", pos: 0 }],
    },
    {
      id: "e4",
      text: "O Mário tem aula às 18 horas e o aluno de teclado tem 26 anos.",
      highlights: [{ cat: "aluno" }, { cat: "instrumento" }, { cat: "idade" }],
      constraints: [
        { k: "diff", a: { cat: "aluno", value: "Mario" }, b: { cat: "instrumento", value: "Teclado" } },
        { k: "at", cat: "aluno", value: "Mario", pos: 0 },
        { k: "same", a: { cat: "instrumento", value: "Teclado" }, b: { cat: "idade", value: "26 anos" } },
        { k: "same", a: { cat: "aluno", value: "Mario" }, b: { cat: "instrumento", value: "Violao" } },
      ],
    },
    {
      id: "e5",
      text: "A aula de violão começa uma hora antes que a aula do César.",
      highlights: [{ cat: "instrumento" }, { cat: "aluno" }],
      constraints: [{ k: "immediateLeft", a: { cat: "instrumento", value: "Violao" }, b: { cat: "aluno", value: "Cesar" } }],
    },
    {
      id: "e6",
      text: "O aluno de 14 anos faz aula de bateria ou de guitarra.",
      highlights: [{ cat: "idade" }, { cat: "instrumento" }],
      constraints: [
        { k: "diff", a: { cat: "idade", value: "14 anos" }, b: { cat: "instrumento", value: "Violao" } },
        { k: "diff", a: { cat: "idade", value: "14 anos" }, b: { cat: "instrumento", value: "Teclado" } },
      ],
    },
    {
      id: "e7",
      text: "A aula do aluno de 38 anos começa mais tarde que a aula de teclado.",
      highlights: [{ cat: "idade" }, { cat: "instrumento" }],
      constraints: [{ k: "before", a: { cat: "instrumento", value: "Teclado" }, b: { cat: "idade", value: "38 anos" } }],
    },
    {
      id: "e8",
      text: "José tem aula às 20 horas.",
      highlights: [{ cat: "aluno" }],
      constraints: [
        { k: "notAt", cat: "aluno", value: "Jose", pos: 1 },
        { k: "at", cat: "aluno", value: "Jose", pos: 2 },
      ],
    },
  ],
  solution: {},
};
