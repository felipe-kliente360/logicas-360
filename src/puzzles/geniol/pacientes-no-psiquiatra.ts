// Geniol · "Pacientes no Psiquiatra". Spine = hora da consulta (ordenada, 14h..17h, passo 1h).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "pacientes-no-psiquiatra",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Pacientes no Psiquiatra",
  story:
    "Quatro pacientes têm consulta em um mesmo psiquiatra. Cada um tem uma hora marcada e um motivo específico para terem buscado tratamento. Use a lógica para descobrir o motivo de cada paciente.",
  spine: {
    id: "consulta",
    label: "Consulta",
    ordered: true,
    labels: ["14:00", "15:00", "16:00", "17:00"],
    referential: "Posição 1 = consulta mais cedo (14:00); posição 4 = mais tarde (17:00). Passo de 1 hora.",
  },
  categories: [
    { id: "paciente", label: "Paciente", values: ["Orlando", "Milton", "Julio", "Caue"].map((v) => tx(v)) },
    { id: "motivo", label: "Motivo", values: ["ansiedade", "depressao", "fobia", "TOC"].map((v) => tx(v)) },
    { id: "idade", label: "Idade", values: ["23 anos", "32 anos", "41 anos", "55 anos"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "q1",
      text: "O paciente com depressão não tem 32 anos.",
      highlights: [{ cat: "motivo" }, { cat: "idade" }],
      constraints: [{ k: "diff", a: { cat: "motivo", value: "depressao" }, b: { cat: "idade", value: "32 anos" } }],
    },
    {
      id: "q2",
      text: "Sobre Júlio e o paciente com hora marcada às 15:00, um tem ansiedade e o outro tem TOC, não necessariamente nessa ordem.",
      highlights: [{ cat: "paciente" }, { cat: "consulta" }, { cat: "motivo" }],
      // Orlando tem TOC (q3) e Júlio ≠ Orlando; logo Júlio = ansiedade e o das 15:00 = TOC = Orlando.
      constraints: [
        { k: "same", a: { cat: "paciente", value: "Julio" }, b: { cat: "motivo", value: "ansiedade" } },
        { k: "at", cat: "paciente", value: "Orlando", pos: 1 },
      ],
    },
    {
      id: "q3",
      text: "Orlando tem TOC.",
      highlights: [{ cat: "paciente" }, { cat: "motivo" }],
      constraints: [{ k: "same", a: { cat: "paciente", value: "Orlando" }, b: { cat: "motivo", value: "TOC" } }],
    },
    {
      id: "q4",
      text: "A consulta do paciente de 32 anos é duas horas mais tarde que a consulta do paciente que tem TOC.",
      highlights: [{ cat: "idade" }, { cat: "motivo" }],
      constraints: [{ k: "offset", a: { cat: "idade", value: "32 anos" }, b: { cat: "motivo", value: "TOC" }, delta: 2 }],
    },
    {
      id: "q5",
      text: "O paciente mais novo tem ansiedade.",
      highlights: [{ cat: "idade" }, { cat: "motivo" }],
      constraints: [{ k: "same", a: { cat: "idade", value: "23 anos" }, b: { cat: "motivo", value: "ansiedade" } }],
    },
    {
      id: "q6",
      text: "A consulta do paciente com depressão está marcada para alguma hora depois da consulta do paciente de 55 anos.",
      highlights: [{ cat: "motivo" }, { cat: "idade" }],
      constraints: [{ k: "before", a: { cat: "idade", value: "55 anos" }, b: { cat: "motivo", value: "depressao" } }],
    },
    {
      id: "q7",
      text: "Milton tem 32 anos ou 55 anos.",
      highlights: [{ cat: "paciente" }, { cat: "idade" }],
      // Júlio = ansiedade = 23 anos (q5); logo Milton ≠ 23 e ≠ 41.
      constraints: [{ k: "diff", a: { cat: "paciente", value: "Milton" }, b: { cat: "idade", value: "41 anos" } }],
    },
  ],
  solution: {},
};
