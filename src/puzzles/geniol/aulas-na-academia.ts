// Geniol · "Aulas na Academia". Spine = horário (ordenado, 18:00..21:00, passo 1h).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "aulas-na-academia",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Aulas na academia",
  story:
    "Quatro aulas acontecem em horários e salas diferentes em uma academia. Use as dicas e descubra quando, onde e quem dá cada uma das aulas.",
  spine: {
    id: "horario",
    label: "Horário",
    ordered: true,
    labels: ["18:00", "19:00", "20:00", "21:00"],
    referential: "Posição 1 = mais cedo (18:00); posição 4 = mais tarde (21:00).",
  },
  categories: [
    { id: "sala", label: "Sala", values: ["Sala1", "Sala2", "Sala3", "Sala4"].map((v, i) => tx(v, "Sala " + (i + 1))) },
    {
      id: "aula",
      label: "Aula",
      values: ["Alongamento", "Pilates", "Yoga", "Zumba"].map((v) => tx(v)),
    },
    { id: "professor", label: "Professor", values: ["Charles", "Edu", "Ivan", "Teo"].map((v) => tx(v, v === "Teo" ? "Téo" : v)) },
  ],
  clues: [
    {
      id: "a1",
      text: "Téo dá aula de yoga.",
      highlights: [{ cat: "professor" }, { cat: "aula" }],
      constraints: [{ k: "same", a: { cat: "professor", value: "Teo" }, b: { cat: "aula", value: "Yoga" } }],
    },
    {
      id: "a2",
      text: "Sobre o professor que dá aula na sala 3 e o professor que dá aula às 21:00 horas, um dá aula de yoga e o outro dá aula de pilates, não necessariamente nessa ordem.",
      highlights: [{ cat: "sala" }, { cat: "aula" }],
      // sala 3 e 21:00 são professores distintos; entre os dois há o yoga e o pilates.
      constraints: [
        { k: "notAt", cat: "sala", value: "Sala3", pos: 3 },
        { k: "diff", a: { cat: "sala", value: "Sala3" }, b: { cat: "aula", value: "Alongamento" } },
        { k: "diff", a: { cat: "sala", value: "Sala3" }, b: { cat: "aula", value: "Zumba" } },
        { k: "notAt", cat: "aula", value: "Alongamento", pos: 3 },
        { k: "notAt", cat: "aula", value: "Zumba", pos: 3 },
      ],
    },
    {
      id: "a3",
      text: "A aula do Charles é duas horas antes da aula que acontece na sala 3.",
      highlights: [{ cat: "professor" }, { cat: "sala" }],
      constraints: [{ k: "offset", a: { cat: "sala", value: "Sala3" }, b: { cat: "professor", value: "Charles" }, delta: 2 }],
    },
    {
      id: "a4",
      text: "A aula do Téo é às 21:00 horas.",
      highlights: [{ cat: "professor" }],
      constraints: [{ k: "at", cat: "professor", value: "Teo", pos: 3 }],
    },
    {
      id: "a5",
      text: "Téo não dá aula na sala 2.",
      highlights: [{ cat: "professor" }, { cat: "sala" }],
      constraints: [{ k: "diff", a: { cat: "professor", value: "Teo" }, b: { cat: "sala", value: "Sala2" } }],
    },
    {
      id: "a6",
      text: "A aula de alongamento acontece mais tarde do que a aula que acontece na sala 4.",
      highlights: [{ cat: "aula" }, { cat: "sala" }],
      constraints: [{ k: "before", a: { cat: "sala", value: "Sala4" }, b: { cat: "aula", value: "Alongamento" } }],
    },
    {
      id: "a7",
      text: "A aula de zumba acontece uma hora antes da aula do Edu.",
      highlights: [{ cat: "aula" }, { cat: "professor" }],
      constraints: [{ k: "immediateLeft", a: { cat: "aula", value: "Zumba" }, b: { cat: "professor", value: "Edu" } }],
    },
  ],
  solution: {},
};
