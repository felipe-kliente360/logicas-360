// Geniol · "Conta de Água". Spine = consumo (ordenada, 16..22 m³, passo 2 consecutivo).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "conta-de-agua",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Conta de Água",
  story:
    "Quatro famílias paulistanas estão fazendo o possível para economizar água. Descubra qual foi o consumo de cada uma delas em um determinado mês.",
  spine: {
    id: "consumo",
    label: "Consumo",
    ordered: true,
    labels: ["16 m³", "18 m³", "20 m³", "22 m³"],
    referential: "Posição 1 = menor consumo (16 m³); posição 4 = maior consumo (22 m³). Passo de 2 m³.",
  },
  categories: [
    { id: "familia", label: "Família", values: ["Alves", "Lima", "Silva", "Vieira"].map((v) => tx(v)) },
    { id: "bairro", label: "Bairro", values: ["BarraFunda", "BelaVista", "Pinheiros", "Santana"].map((v) => tx(v, v === "BarraFunda" ? "Barra Funda" : v === "BelaVista" ? "Bela Vista" : v)) },
  ],
  clues: [
    {
      id: "a1",
      text: "A família Alves mora em Pinheiros.",
      highlights: [{ cat: "familia" }, { cat: "bairro" }],
      constraints: [{ k: "same", a: { cat: "familia", value: "Alves" }, b: { cat: "bairro", value: "Pinheiros" } }],
    },
    {
      id: "a2",
      text: "A família Vieira gastou 2 m³ a mais do que a família que mora em Santana.",
      highlights: [{ cat: "familia" }, { cat: "bairro" }],
      constraints: [{ k: "immediateLeft", a: { cat: "bairro", value: "Santana" }, b: { cat: "familia", value: "Vieira" } }],
    },
    {
      id: "a3",
      text: "A família que mora na Barra Funda gastou 2 m³ a menos do que a família Silva.",
      highlights: [{ cat: "bairro" }, { cat: "familia" }],
      constraints: [{ k: "immediateLeft", a: { cat: "bairro", value: "BarraFunda" }, b: { cat: "familia", value: "Silva" } }],
    },
    {
      id: "a4",
      text: "Quem teve o maior consumo de água foi a família Vieira.",
      highlights: [{ cat: "familia" }],
      constraints: [{ k: "end", cat: "familia", value: "Vieira", which: "last" }],
    },
  ],
  solution: {},
};
