// Geniol · "Casais de Férias". Spine = diária (ordenada, R$100..R$400, passo R$100).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "casais-de-ferias",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 4,
  size: 4,
  title: "Casais de Férias",
  story:
    "Quatro casais tiraram férias e aproveitaram para viajar. Cada casal ficou hospedado em um hotel e pagou um determinado preço pela diária. Descubra quanto foi a diária e qual é o diferencial de cada hotel.",
  spine: {
    id: "diaria",
    label: "Diária",
    ordered: true,
    labels: ["R$ 100", "R$ 200", "R$ 300", "R$ 400"],
    referential: "Posição 1 = a diária mais barata (R$ 100); posição 4 = a mais cara (R$ 400).",
  },
  categories: [
    {
      id: "casal",
      label: "Casal",
      values: [
        tx("LuciaEder", "Lucia e Eder"),
        tx("JulianaLuis", "Juliana e Luis"),
        tx("JenyVictor", "Jeny e Victor"),
        tx("GiseleRafael", "Gisele e Rafael"),
      ],
    },
    {
      id: "hotel",
      label: "Hotel",
      values: [
        tx("VolteSempre", "Volte Sempre"),
        tx("PonteGrande", "Ponte Grande"),
        tx("FlorestaNativa", "Floresta Nativa"),
        tx("California", "California"),
      ],
    },
    {
      id: "diferencial",
      label: "Diferencial",
      values: [
        tx("VagaGaragem", "vaga garagem"),
        tx("Janta", "janta"),
        tx("BelaVista", "bela vista"),
        tx("ArCondicionado", "ar condicionado"),
      ],
    },
  ],
  clues: [
    {
      id: "c1",
      text: "O casal que ficou no hotel com vaga na garagem pagou R$ 100 a mais na diária do que o casal Juliana e Luis.",
      highlights: [{ cat: "diferencial" }, { cat: "casal" }],
      constraints: [{ k: "immediateLeft", a: { cat: "casal", value: "JulianaLuis" }, b: { cat: "diferencial", value: "VagaGaragem" } }],
    },
    {
      id: "c2",
      text: "O casal que se hospedou no hotel Volte Sempre pagou uma diária mais cara do que o casal Jeny e Victor.",
      highlights: [{ cat: "hotel" }, { cat: "casal" }],
      constraints: [{ k: "before", a: { cat: "casal", value: "JenyVictor" }, b: { cat: "hotel", value: "VolteSempre" } }],
    },
    {
      id: "c3",
      text: "O hotel California não tem a diária mais barata.",
      highlights: [{ cat: "hotel" }],
      constraints: [{ k: "notEnd", cat: "hotel", value: "California", which: "first" }],
    },
    {
      id: "c4",
      text: "A diária do hotel Floresta Nativa é mais cara do que a diária do hotel Volte Sempre.",
      highlights: [{ cat: "hotel" }],
      constraints: [{ k: "before", a: { cat: "hotel", value: "VolteSempre" }, b: { cat: "hotel", value: "FlorestaNativa" } }],
    },
    {
      id: "c5",
      text: "O hotel que tem ar condicionado é o Floresta Nativa ou o hotel com a diária de R$ 100.",
      highlights: [{ cat: "diferencial" }, { cat: "hotel" }],
      // ar condicionado = Floresta Nativa, ou está na diária de R$ 100 (posição 0).
      // Como o Floresta Nativa tem bela vista (pista 6), o ar condicionado fica na diária de R$ 100.
      constraints: [{ k: "at", cat: "diferencial", value: "ArCondicionado", pos: 0 }],
    },
    {
      id: "c6",
      text: "Sobre o casal Lucia e Eder e o casal que se hospedou no hotel Floresta Nativa, um ficou com bela vista e o outro pagou R$ 200 de diária, não necessariamente nessa ordem.",
      highlights: [{ cat: "casal" }, { cat: "hotel" }, { cat: "diferencial" }, { cat: "diaria" }],
      // Lucia e Eder e o casal do Floresta Nativa são casais distintos, e juntos têm {bela vista, R$200}.
      // O Floresta Nativa nunca paga R$ 200 (pistas 2 e 4 o jogam para R$ 300/400), logo ele fica com a
      // bela vista e o casal Lucia e Eder paga a diária de R$ 200 (posição 1).
      constraints: [
        { k: "diff", a: { cat: "casal", value: "LuciaEder" }, b: { cat: "hotel", value: "FlorestaNativa" } },
        { k: "same", a: { cat: "hotel", value: "FlorestaNativa" }, b: { cat: "diferencial", value: "BelaVista" } },
        { k: "at", cat: "casal", value: "LuciaEder", pos: 1 },
      ],
    },
  ],
  solution: {},
};
