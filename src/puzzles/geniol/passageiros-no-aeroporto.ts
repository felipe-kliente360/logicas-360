// Geniol · "Passageiros no Aeroporto". Spine = horário (ordenada, 20:00..21:30, passo 30min).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "passageiros-no-aeroporto",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Passageiros no Aeroporto",
  story:
    "Quatro passageiros aguardam na área de embarque de um aeroporto. Cada um viajará para um estado brasileiro. Descubra para onde cada um vai.",
  spine: {
    id: "horario",
    label: "Horário",
    ordered: true,
    labels: ["20:00", "20:30", "21:00", "21:30"],
    referential: "Posição 1 = voo mais cedo (20:00); posição 4 = mais tarde (21:30). Passo de 30 minutos.",
  },
  categories: [
    { id: "nome", label: "Passageiro", values: ["Cicero", "Gustavo", "Vitor", "William"].map((v) => tx(v, v === "Cicero" ? "Cícero" : v)) },
    { id: "mala", label: "Mala", values: ["Azul", "Preta", "Verde", "Vermelha"].map((v) => tx(v)) },
    {
      id: "destino",
      label: "Destino",
      values: [
        tx("Bahia"),
        tx("MatoGrosso", "Mato Grosso"),
        tx("MinasGerais", "Minas Gerais"),
        tx("Para", "Pará"),
      ],
    },
  ],
  clues: [
    {
      id: "a1",
      text: "William vai para Minas Gerais ou é o dono da mala preta.",
      highlights: [{ cat: "nome" }, { cat: "destino" }, { cat: "mala" }],
      // Disjunção: Cícero vai a Minas (a3), logo William ≠ Minas → William tem a mala preta.
      constraints: [{ k: "same", a: { cat: "nome", value: "William" }, b: { cat: "mala", value: "Preta" } }],
    },
    {
      id: "a2",
      text: "O voo do passageiro da mala verde é meia hora antes que o voo do passageiro que viajará para o estado nordestino (Bahia).",
      highlights: [{ cat: "mala" }, { cat: "destino" }],
      constraints: [{ k: "immediateLeft", a: { cat: "mala", value: "Verde" }, b: { cat: "destino", value: "Bahia" } }],
    },
    {
      id: "a3",
      text: "Cícero vai para Minas Gerais.",
      highlights: [{ cat: "nome" }, { cat: "destino" }],
      constraints: [{ k: "same", a: { cat: "nome", value: "Cicero" }, b: { cat: "destino", value: "MinasGerais" } }],
    },
    {
      id: "a4",
      text: "O voo com destino a Minas Gerais sairá antes que o voo do passageiro da mala vermelha.",
      highlights: [{ cat: "destino" }, { cat: "mala" }],
      constraints: [{ k: "before", a: { cat: "destino", value: "MinasGerais" }, b: { cat: "mala", value: "Vermelha" } }],
    },
    {
      id: "a5",
      text: "O voo do passageiro da mala preta é meia hora depois que o voo para o Pará.",
      highlights: [{ cat: "mala" }, { cat: "destino" }],
      constraints: [{ k: "immediateLeft", a: { cat: "destino", value: "Para" }, b: { cat: "mala", value: "Preta" } }],
    },
    {
      id: "a6",
      text: "O voo do William sairá antes que o voo do passageiro da mala azul.",
      highlights: [{ cat: "nome" }, { cat: "mala" }],
      constraints: [{ k: "before", a: { cat: "nome", value: "William" }, b: { cat: "mala", value: "Azul" } }],
    },
    {
      id: "a7",
      text: "O voo do Vitor sairá depois que o voo para o Pará.",
      highlights: [{ cat: "nome" }, { cat: "destino" }],
      constraints: [{ k: "before", a: { cat: "destino", value: "Para" }, b: { cat: "nome", value: "Vitor" } }],
    },
  ],
  solution: {},
};
