// Geniol · "Apresentações de Dança". Spine = horário (ordenada, 21:00..22:00, passo 20min).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "apresentacoes-de-danca",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Apresentações de Dança",
  story:
    "Quatro casais estão aguardando chegar a hora de suas respectivas apresentações. Use as dicas e descubra quando e qual ritmo cada casal vai apresentar.",
  spine: {
    id: "horario",
    label: "Horário",
    ordered: true,
    labels: ["21:00", "21:20", "21:40", "22:00"],
    referential: "Posição 1 = quem se apresenta primeiro (21:00); posição 4 = por último (22:00). Passo de 20 minutos.",
  },
  categories: [
    { id: "cavalheiro", label: "Cavalheiro", values: ["Will", "Mathias", "Everton", "Alex"].map((v) => tx(v)) },
    { id: "ritmo", label: "Ritmo", values: ["zouk", "sertanejo", "samba", "salsa"].map((v) => tx(v)) },
    { id: "dama", label: "Dama", values: ["Mariana", "Luana", "Carol", "Agata"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "d1",
      text: "O casal que vai dançar zouk se apresentará 20 minutos antes que o casal formado por Alex e a sua dama.",
      highlights: [{ cat: "ritmo" }, { cat: "cavalheiro" }],
      constraints: [{ k: "immediateLeft", a: { cat: "ritmo", value: "zouk" }, b: { cat: "cavalheiro", value: "Alex" } }],
    },
    {
      id: "d2",
      text: "Will e Mariana dançarão juntos.",
      highlights: [{ cat: "cavalheiro" }, { cat: "dama" }],
      constraints: [{ k: "same", a: { cat: "cavalheiro", value: "Will" }, b: { cat: "dama", value: "Mariana" } }],
    },
    {
      id: "d3",
      text: "Nem Everton nem o casal que dançará salsa se apresentará às 21:20.",
      highlights: [{ cat: "cavalheiro" }, { cat: "ritmo" }],
      constraints: [
        { k: "notAt", cat: "cavalheiro", value: "Everton", pos: 1 },
        { k: "notAt", cat: "ritmo", value: "salsa", pos: 1 },
        // São dois casais distintos citados: Everton não é o casal da salsa.
        { k: "diff", a: { cat: "cavalheiro", value: "Everton" }, b: { cat: "ritmo", value: "salsa" } },
      ],
    },
    {
      id: "d4",
      text: "Ágata não dançará sertanejo.",
      highlights: [{ cat: "dama" }, { cat: "ritmo" }],
      constraints: [{ k: "diff", a: { cat: "dama", value: "Agata" }, b: { cat: "ritmo", value: "sertanejo" } }],
    },
    {
      id: "d5",
      text: "Will vai se apresentar em algum momento antes que Luana.",
      highlights: [{ cat: "cavalheiro" }, { cat: "dama" }],
      constraints: [{ k: "before", a: { cat: "cavalheiro", value: "Will" }, b: { cat: "dama", value: "Luana" } }],
    },
    {
      id: "d6",
      text: "Nem o casal que vai se apresentar às 21:40 nem o casal que dançará sertanejo é formado por Everton.",
      highlights: [{ cat: "cavalheiro" }, { cat: "ritmo" }],
      constraints: [
        { k: "notAt", cat: "cavalheiro", value: "Everton", pos: 2 },
        { k: "diff", a: { cat: "cavalheiro", value: "Everton" }, b: { cat: "ritmo", value: "sertanejo" } },
      ],
    },
    {
      id: "d7",
      text: "Mariana e seu parceiro vão dançar samba.",
      highlights: [{ cat: "dama" }, { cat: "ritmo" }],
      constraints: [{ k: "same", a: { cat: "dama", value: "Mariana" }, b: { cat: "ritmo", value: "samba" } }],
    },
  ],
  solution: {},
};
