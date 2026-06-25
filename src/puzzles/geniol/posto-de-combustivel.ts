// Geniol · "Posto de Combustível". Spine = quilometragem (ordenada, 10..40 mil, passo 10).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "posto-de-combustivel",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Posto de Combustível",
  story:
    "Um posto de gasolina na beira da estrada está sempre movimentado. Neste exato momento, quatro carros acabaram de colocar combustível. Determine qual a quilometragem e quantos reais cada um dos carros gastou no abastecimento.",
  spine: {
    id: "km",
    label: "Km",
    ordered: true,
    labels: ["10 mil", "20 mil", "30 mil", "40 mil"],
    referential: "Posição 1 = menos km rodados (10 mil); posição 4 = mais (40 mil).",
  },
  categories: [
    { id: "montadora", label: "Montadora", values: ["Italiana", "Japonesa", "Francesa", "Alema"].map((v) => tx(v)) },
    { id: "valor", label: "Valor", values: ["R$ 40", "R$ 50", "R$ 60", "R$ 70"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "p1",
      text: "O carro francês tem 30 mil km rodados.",
      highlights: [{ cat: "montadora" }],
      constraints: [{ k: "at", cat: "montadora", value: "Francesa", pos: 2 }],
    },
    {
      id: "p2",
      text: "O automóvel com 20 mil km rodados é o carro da montadora italiana ou o que abasteceu R$ 40.",
      highlights: [{ cat: "montadora" }, { cat: "valor" }],
      // Disjunção: o carro de 20 mil km (pos 1) é a italiana OU o de R$ 40.
      // Pelas pistas p1/p3/p4, o carro de 20 mil km é o japonês (não a italiana);
      // logo, por esta pista, ele é necessariamente o que abasteceu R$ 40.
      constraints: [{ k: "at", cat: "valor", value: "R$ 40", pos: 1 }],
    },
    {
      id: "p3",
      text: "O carro alemão rodou menos do que o carro japonês.",
      highlights: [{ cat: "montadora" }],
      constraints: [{ k: "before", a: { cat: "montadora", value: "Alema" }, b: { cat: "montadora", value: "Japonesa" } }],
    },
    {
      id: "p4",
      text: "O veículo que abasteceu R$ 50 tem 10 mil km a mais que o automóvel da montadora japonesa.",
      highlights: [{ cat: "valor" }, { cat: "montadora" }],
      constraints: [{ k: "immediateLeft", a: { cat: "montadora", value: "Japonesa" }, b: { cat: "valor", value: "R$ 50" } }],
    },
    {
      id: "p5",
      text: "O carro que abasteceu R$ 60 tem 20 mil km a menos que o carro francês.",
      highlights: [{ cat: "valor" }, { cat: "montadora" }],
      constraints: [{ k: "offset", a: { cat: "valor", value: "R$ 60" }, b: { cat: "montadora", value: "Francesa" }, delta: -2 }],
    },
  ],
  solution: {},
};
