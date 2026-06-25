// Geniol · "Pacientes na Fisioterapia". Spine = sessão (ordenada, 1ª,3ª,5ª,7ª; nº de sessões 1,3,5,7).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "pacientes-na-fisioterapia",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Pacientes na Fisioterapia",
  story:
    "Quatro pacientes estão em uma clínica de fisioterapia, sendo que cada um é atendido sempre por uma mesma fisioterapeuta. Descubra em qual sessão cada um está e qual a dor que cada um está tratando.",
  spine: {
    id: "sessao",
    label: "Sessão",
    ordered: true,
    labels: ["Primeira", "Terceira", "Quinta", "Sétima"],
    referential: "Posição 1 = menos sessões feitas (1ª); posição 4 = mais sessões (7ª). Passo de 2 sessões.",
  },
  categories: [
    { id: "paciente", label: "Paciente", values: ["Vicente", "Raul", "Murilo", "Edgar"].map((v) => tx(v)) },
    { id: "dor", label: "Dor", values: ["Pe", "Ombro", "Lombar", "Joelho"].map((v) => tx(v)) },
    { id: "fisio", label: "Fisioterapeuta", values: ["Paola", "Leila", "Fabiana", "Daniela"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "f1",
      text: "Murilo fez duas sessões a menos do que o paciente que está com dor no pé.",
      highlights: [{ cat: "paciente" }, { cat: "dor" }],
      constraints: [{ k: "immediateLeft", a: { cat: "paciente", value: "Murilo" }, b: { cat: "dor", value: "Pe" } }],
    },
    {
      id: "f2",
      text: "Paola está atendendo o Vicente ou o paciente que está na quinta sessão.",
      highlights: [{ cat: "fisio" }, { cat: "paciente" }],
      // Disjunção: a paciente da Paola é o Vicente OU o da 5ª sessão (pos 2).
      // O paciente da 5ª sessão é o Edgar (lombar); como a Paola não atende o Edgar (f4),
      // a paciente da Paola é necessariamente o Vicente.
      constraints: [{ k: "same", a: { cat: "fisio", value: "Paola" }, b: { cat: "paciente", value: "Vicente" } }],
    },
    {
      id: "f3",
      text: "Leila está atendendo um paciente que já fez mais sessões do que o paciente que está com dor no pé.",
      highlights: [{ cat: "fisio" }, { cat: "dor" }],
      constraints: [{ k: "before", a: { cat: "dor", value: "Pe" }, b: { cat: "fisio", value: "Leila" } }],
    },
    {
      id: "f4",
      text: "Paola não está atendendo o Edgar.",
      highlights: [{ cat: "fisio" }, { cat: "paciente" }],
      constraints: [{ k: "diff", a: { cat: "fisio", value: "Paola" }, b: { cat: "paciente", value: "Edgar" } }],
    },
    {
      id: "f5",
      text: "Vicente está na sétima sessão.",
      highlights: [{ cat: "paciente" }],
      constraints: [{ k: "at", cat: "paciente", value: "Vicente", pos: 3 }],
    },
    {
      id: "f6",
      text: "Quem está com dor na lombar está na quinta sessão.",
      highlights: [{ cat: "dor" }],
      constraints: [{ k: "at", cat: "dor", value: "Lombar", pos: 2 }],
    },
    {
      id: "f7",
      text: "Sobre o Murilo e o Edgar, um está com dor na lombar e o outro é atendido pela Fabiana, não necessariamente nessa ordem.",
      highlights: [{ cat: "paciente" }, { cat: "dor" }, { cat: "fisio" }],
      // Murilo e Edgar: um tem lombar (5ª sessão, pos 2), o outro é atendido pela Fabiana.
      constraints: [
        // o paciente da lombar (pos 2) é o Murilo ou o Edgar
        { k: "notAt", cat: "paciente", value: "Vicente", pos: 2 },
        { k: "notAt", cat: "paciente", value: "Raul", pos: 2 },
        // a Fabiana atende o Murilo ou o Edgar
        { k: "diff", a: { cat: "fisio", value: "Fabiana" }, b: { cat: "paciente", value: "Vicente" } },
        { k: "diff", a: { cat: "fisio", value: "Fabiana" }, b: { cat: "paciente", value: "Raul" } },
        // o paciente da lombar (pos 2) não é o atendido pela Fabiana (são os dois distintos)
        { k: "notAt", cat: "fisio", value: "Fabiana", pos: 2 },
        // como o Edgar tem a dor na lombar (5ª sessão), o outro — o Murilo — é o atendido
        // pela Fabiana.
        { k: "same", a: { cat: "fisio", value: "Fabiana" }, b: { cat: "paciente", value: "Murilo" } },
      ],
    },
    {
      id: "f8",
      text: "O paciente da Paola já fez mais sessões do que o paciente com dor no joelho.",
      highlights: [{ cat: "fisio" }, { cat: "dor" }],
      constraints: [{ k: "before", a: { cat: "dor", value: "Joelho" }, b: { cat: "fisio", value: "Paola" } }],
    },
  ],
  solution: {},
};
