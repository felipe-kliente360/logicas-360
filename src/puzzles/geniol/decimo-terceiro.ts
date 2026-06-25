// Geniol · "Décimo Terceiro". Spine = salário (ordenado, R$2000..R$4000, passo R$500).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "decimo-terceiro",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 5,
  title: "Décimo Terceiro",
  story:
    "Cinco funcionários de uma empresa estão para receber o décimo terceiro salário. Descubra onde cada um deles trabalha e quanto cada um vai receber.",
  spine: {
    id: "salario",
    label: "Salário",
    ordered: true,
    labels: ["R$ 2000", "R$ 2500", "R$ 3000", "R$ 3500", "R$ 4000"],
    referential: "Posição 1 = o menor salário (R$ 2000); posição 5 = o maior (R$ 4000).",
  },
  categories: [
    {
      id: "funcionario",
      label: "Funcionário",
      values: ["Sergio", "Roberto", "Jucelino", "Eduardo", "Alessandro"].map((v) => tx(v)),
    },
    {
      id: "area",
      label: "Área",
      values: [
        tx("Vendas"),
        tx("RH"),
        tx("Marketing"),
        tx("Financeiro"),
        tx("Administracao", "Administração"),
      ],
    },
  ],
  clues: [
    {
      id: "d1",
      text: "O funcionário do financeiro ganha R$ 500 a menos do que Jucelino.",
      highlights: [{ cat: "area" }, { cat: "funcionario" }],
      constraints: [{ k: "immediateLeft", a: { cat: "area", value: "Financeiro" }, b: { cat: "funcionario", value: "Jucelino" } }],
    },
    {
      id: "d2",
      text: "Jucelino trabalha na área de marketing ou ganha R$ 3500 por mês.",
      highlights: [{ cat: "funcionario" }, { cat: "area" }],
      // Jucelino ganha R$ 2500 (pista 6), logo não ganha R$ 3500 → trabalha em marketing.
      constraints: [{ k: "same", a: { cat: "funcionario", value: "Jucelino" }, b: { cat: "area", value: "Marketing" } }],
    },
    {
      id: "d3",
      text: "O funcionário que ganha R$ 3000 é o Jucelino ou quem trabalha no RH.",
      highlights: [{ cat: "area" }, { cat: "funcionario" }],
      // Jucelino ganha R$ 2500, então quem ganha R$ 3000 trabalha no RH.
      constraints: [{ k: "at", cat: "area", value: "RH", pos: 2 }],
    },
    {
      id: "d4",
      text: "Alessandro ganha mais do que o funcionário da administração.",
      highlights: [{ cat: "funcionario" }, { cat: "area" }],
      constraints: [{ k: "before", a: { cat: "area", value: "Administracao" }, b: { cat: "funcionario", value: "Alessandro" } }],
    },
    {
      id: "d5",
      text: "Sérgio ganha R$ 1500 a menos do que Roberto.",
      highlights: [{ cat: "funcionario" }],
      constraints: [{ k: "offset", a: { cat: "funcionario", value: "Sergio" }, b: { cat: "funcionario", value: "Roberto" }, delta: -3 }],
    },
    {
      id: "d6",
      text: "Jucelino ganha R$ 2500 por mês.",
      highlights: [{ cat: "funcionario" }],
      constraints: [{ k: "at", cat: "funcionario", value: "Jucelino", pos: 1 }],
    },
  ],
  solution: {},
};
