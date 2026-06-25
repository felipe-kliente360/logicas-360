// Geniol · "Carros no Mecânico". Spine = km (ordenada, 30..60 mil, passo 10).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "carros-no-mecanico",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Carros no Mecânico",
  story:
    "Quatro carros, de tipos diferentes, estão no mecânico aguardando para serem consertados. Descubra qual é o defeito mecânico de cada um deles.",
  spine: {
    id: "km",
    label: "Quilometragem",
    ordered: true,
    labels: ["30 mil", "40 mil", "50 mil", "60 mil"],
    referential: "Posição 1 = menor km (30 mil); posição 4 = maior km (60 mil). Passo de 10 mil.",
  },
  categories: [
    { id: "tipo", label: "Tipo", values: ["Crossover", "Pickup", "Sedan", "SUV"].map((v) => tx(v)) },
    { id: "problema", label: "Problema", values: ["Cambio", "Embreagem", "Freio", "Motor"].map((v) => tx(v, v === "Cambio" ? "Câmbio" : v)) },
    { id: "motorista", label: "Motorista", values: ["Andre", "Luiz", "Marcelo", "Samuel"].map((v) => tx(v, v === "Andre" ? "André" : v)) },
  ],
  clues: [
    {
      id: "c1",
      text: "Nem a pickup nem o SUV teve problema no câmbio.",
      highlights: [{ cat: "tipo" }, { cat: "problema" }],
      constraints: [
        { k: "diff", a: { cat: "tipo", value: "Pickup" }, b: { cat: "problema", value: "Cambio" } },
        { k: "diff", a: { cat: "tipo", value: "SUV" }, b: { cat: "problema", value: "Cambio" } },
      ],
    },
    {
      id: "c2",
      text: "O carro com problema no motor tem 10 mil km a menos que a pickup.",
      highlights: [{ cat: "problema" }, { cat: "tipo" }],
      constraints: [{ k: "immediateLeft", a: { cat: "problema", value: "Motor" }, b: { cat: "tipo", value: "Pickup" } }],
    },
    {
      id: "c3",
      text: "O veículo com problema na embreagem tem 10 mil km a menos que o SUV.",
      highlights: [{ cat: "problema" }, { cat: "tipo" }],
      constraints: [{ k: "immediateLeft", a: { cat: "problema", value: "Embreagem" }, b: { cat: "tipo", value: "SUV" } }],
    },
    {
      id: "c4",
      text: "O carro do Luiz tem 20 mil km a mais que o carro com problema na embreagem.",
      highlights: [{ cat: "motorista" }, { cat: "problema" }],
      constraints: [{ k: "offset", a: { cat: "motorista", value: "Luiz" }, b: { cat: "problema", value: "Embreagem" }, delta: 2 } as any],
    },
    {
      id: "c5",
      text: "O carro do André não tem 30 mil km.",
      highlights: [{ cat: "motorista" }],
      constraints: [{ k: "notAt", cat: "motorista", value: "Andre", pos: 0 }],
    },
    {
      id: "c6",
      text: "O SUV está com problema no freio.",
      highlights: [{ cat: "tipo" }, { cat: "problema" }],
      constraints: [{ k: "same", a: { cat: "tipo", value: "SUV" }, b: { cat: "problema", value: "Freio" } }],
    },
    {
      id: "c7",
      text: "O SUV é do Samuel ou tem 60 mil km.",
      highlights: [{ cat: "tipo" }, { cat: "motorista" }],
      // Pelas pistas 1–6, o SUV (=freio) fica nos 50 mil km, logo não tem 60 mil ⇒ é do Samuel.
      constraints: [{ k: "same", a: { cat: "tipo", value: "SUV" }, b: { cat: "motorista", value: "Samuel" } }],
    },
    {
      id: "c8",
      text: "O carro com problema no motor tem 50 mil km ou é um crossover.",
      highlights: [{ cat: "problema" }, { cat: "tipo" }],
      // Pelas pistas 1–6, o motor fica nos 30 mil km, logo não tem 50 mil ⇒ é o crossover.
      constraints: [{ k: "same", a: { cat: "problema", value: "Motor" }, b: { cat: "tipo", value: "Crossover" } }],
    },
  ],
  solution: {},
};
