// Geniol · "Turistas no Brasil". Spine = duração (ordenada, 15..30 dias, passo 5).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "turistas-no-brasil",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Turistas no Brasil",
  story:
    "Quatro turistas visitarão o Brasil pela primeira vez. Use a lógica para descobrir quanto tempo cada um ficará no país e qual estado cada um vai conhecer.",
  spine: {
    id: "duracao",
    label: "Duração",
    ordered: true,
    labels: ["15 dias", "20 dias", "25 dias", "30 dias"],
    referential: "Posição 1 = menor estadia (15 dias); posição 4 = maior estadia (30 dias). Passo de 5 dias.",
  },
  categories: [
    { id: "nacionalidade", label: "Nacionalidade", values: ["japones", "italiano", "frances", "americano"].map((v) => tx(v)) },
    { id: "estado", label: "Estado", values: ["SaoPaulo", "RioDeJaneiro", "Bahia", "Amazonas"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "t1",
      text: "O turista que vai para o Amazonas ficará 5 dias a mais que o italiano.",
      highlights: [{ cat: "estado" }, { cat: "nacionalidade" }],
      constraints: [{ k: "immediateLeft", a: { cat: "nacionalidade", value: "italiano" }, b: { cat: "estado", value: "Amazonas" } }],
    },
    {
      id: "t2",
      text: "O turista que viajará para São Paulo ficará 5 dias a mais que o turista que visitará o Amazonas.",
      highlights: [{ cat: "estado" }],
      constraints: [{ k: "immediateLeft", a: { cat: "estado", value: "Amazonas" }, b: { cat: "estado", value: "SaoPaulo" } }],
    },
    {
      id: "t3",
      text: "O italiano vai para o Rio de Janeiro.",
      highlights: [{ cat: "nacionalidade" }, { cat: "estado" }],
      constraints: [{ k: "same", a: { cat: "nacionalidade", value: "italiano" }, b: { cat: "estado", value: "RioDeJaneiro" } }],
    },
    {
      id: "t4",
      text: "O francês ficará mais tempo no Brasil do que o turista que vai para o Amazonas.",
      highlights: [{ cat: "nacionalidade" }, { cat: "estado" }],
      constraints: [{ k: "before", a: { cat: "estado", value: "Amazonas" }, b: { cat: "nacionalidade", value: "frances" } }],
    },
    {
      id: "t5",
      text: "O francês ficará menos tempo no Brasil do que o americano.",
      highlights: [{ cat: "nacionalidade" }],
      constraints: [{ k: "before", a: { cat: "nacionalidade", value: "frances" }, b: { cat: "nacionalidade", value: "americano" } }],
    },
  ],
  solution: {},
};
