// Geniol · "Viagem aos Estados Unidos". Spine = duração da viagem (ordenada, 10..25 dias, passo 5).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "viagem-aos-estados-unidos",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Viagem aos Estados Unidos",
  story:
    "Quatro turistas brasileiros viajarão para os Estados Unidos neste ano. Siga as dicas para descobrir em qual cidade e hotel cada um ficará e quantos dias cada um passará nos Estados Unidos.",
  spine: {
    id: "duracao",
    label: "Duração",
    ordered: true,
    labels: ["10 dias", "15 dias", "20 dias", "25 dias"],
    referential: "Posição 1 = viagem mais curta (10 dias); posição 4 = mais longa (25 dias).",
  },
  categories: [
    { id: "turista", label: "Turista", values: ["Rafael", "Henrique", "Ederson", "Cristian"].map((v) => tx(v)) },
    { id: "cidade", label: "Cidade", values: ["Orlando", "LasVegas", "NovaYork", "SaoFrancisco"].map((v) => tx(v)) },
    { id: "hotel", label: "Hotel", values: ["BestPrice", "BigPalace", "GardenFlowers", "NiceSpring"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "v1",
      text: "O turista que viajará por 20 dias nos Estados Unidos ficará hospedado no hotel Big Palace.",
      highlights: [{ cat: "hotel" }],
      constraints: [{ k: "at", cat: "hotel", value: "BigPalace", pos: 2 }],
    },
    {
      id: "v2",
      text: "Quem ficará hospedado no hotel Best Price é o turista Cristian ou o turista que viajará por 10 dias.",
      highlights: [{ cat: "hotel" }, { cat: "turista" }],
      // Disjunção: Best Price é o Cristian OU o de 10 dias. Pela pista v3, o turista de
      // 10 dias (Henrique) fica no hotel Nice Spring — não no Best Price; logo, o Best
      // Price é necessariamente do Cristian.
      constraints: [{ k: "same", a: { cat: "hotel", value: "BestPrice" }, b: { cat: "turista", value: "Cristian" } }],
    },
    {
      id: "v3",
      text: "Sobre o turista que vai pra Orlando e o que vai ficar no hotel Nice Springs, um vai viajar durante 20 dias e o outro se chama Henrique (não necessariamente nessa ordem).",
      highlights: [{ cat: "cidade" }, { cat: "hotel" }, { cat: "turista" }],
      // "um vai 20 dias e o outro é o Henrique": como o hotel das 20 dias é o Big Palace
      // (v1), o Nice Spring não é o de 20 dias; logo Orlando é o de 20 dias (pos 2) e o
      // hóspede do Nice Spring é o Henrique.
      constraints: [
        { k: "diff", a: { cat: "cidade", value: "Orlando" }, b: { cat: "hotel", value: "NiceSpring" } },
        { k: "at", cat: "cidade", value: "Orlando", pos: 2 },
        { k: "same", a: { cat: "turista", value: "Henrique" }, b: { cat: "hotel", value: "NiceSpring" } },
      ],
    },
    {
      id: "v4",
      text: "O turista que vai para Nova York ficará 10 dias a mais nos Estados Unidos que Rafael.",
      highlights: [{ cat: "cidade" }, { cat: "turista" }],
      constraints: [{ k: "offset", a: { cat: "cidade", value: "NovaYork" }, b: { cat: "turista", value: "Rafael" }, delta: 2 }],
    },
    {
      id: "v5",
      text: "Henrique viajará 5 dias a menos que o turista que vai para São Francisco.",
      highlights: [{ cat: "turista" }, { cat: "cidade" }],
      constraints: [{ k: "immediateLeft", a: { cat: "turista", value: "Henrique" }, b: { cat: "cidade", value: "SaoFrancisco" } }],
    },
  ],
  solution: {},
};
