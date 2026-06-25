// Geniol · "Almoço de Natal". Spine = horário de chegada (ordenado, 11:00..11:45, passo 15min).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "almoco-de-natal",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Almoço de Natal",
  story:
    "Quatro homens participaram de um almoço de natal em família. Descubra o horário de chegada e o meio de transporte utilizado por cada um deles.",
  spine: {
    id: "chegada",
    label: "Chegada",
    ordered: true,
    labels: ["11:00", "11:15", "11:30", "11:45"],
    referential: "Posição 1 = quem chegou mais cedo (11:00); posição 4 = mais tarde (11:45). Passo de 15 minutos.",
  },
  categories: [
    { id: "convidado", label: "Convidado", values: ["Rodrigo", "Marcio", "Heitor", "Antonio"].map((v) => tx(v)) },
    {
      id: "transporte",
      label: "Transporte",
      values: [tx("Onibus", "ônibus"), tx("Moto", "moto"), tx("Metro", "metrô"), tx("Carro", "carro")],
    },
  ],
  clues: [
    {
      id: "n1",
      text: "Márcio foi de ônibus para o almoço.",
      highlights: [{ cat: "convidado" }, { cat: "transporte" }],
      constraints: [{ k: "same", a: { cat: "convidado", value: "Marcio" }, b: { cat: "transporte", value: "Onibus" } }],
    },
    {
      id: "n2",
      text: "Quem foi de moto chegou 30 minutos antes que o Márcio.",
      highlights: [{ cat: "convidado" }, { cat: "transporte" }],
      constraints: [
        { k: "offset", a: { cat: "transporte", value: "Moto" }, b: { cat: "convidado", value: "Marcio" }, delta: -2 },
      ],
    },
    {
      // Quem chegou às 11:00 (pos 0) foi de moto ou de ônibus, ou seja: não foi de metrô nem de carro.
      id: "n3",
      text: "Quem chegou às 11:00 foi quem foi de moto ou quem foi de ônibus para o almoço.",
      highlights: [{ cat: "transporte", pos: 0 }],
      constraints: [
        { k: "notAt", cat: "transporte", value: "Metro", pos: 0 },
        { k: "notAt", cat: "transporte", value: "Carro", pos: 0 },
      ],
    },
    {
      id: "n4",
      text: "Heitor chegou 30 minutos depois que Antônio.",
      highlights: [{ cat: "convidado" }],
      constraints: [
        { k: "offset", a: { cat: "convidado", value: "Heitor" }, b: { cat: "convidado", value: "Antonio" }, delta: 2 },
      ],
    },
    {
      id: "n5",
      text: "Antônio usou o carro para ir no almoço.",
      highlights: [{ cat: "convidado" }, { cat: "transporte" }],
      constraints: [{ k: "same", a: { cat: "convidado", value: "Antonio" }, b: { cat: "transporte", value: "Carro" } }],
    },
  ],
  solution: {},
};
