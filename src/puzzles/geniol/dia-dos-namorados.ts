// Geniol · "Dia dos Namorados". Spine = tempo de namoro (ordenada, 2..5 anos, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "dia-dos-namorados",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Dia dos Namorados",
  story:
    "Quatro casais de namorados vão passar um tempo juntos em algum lugar para comemorar o dia dos namorados. Use a lógica para descobrir as características desses casais e aonde eles vão.",
  spine: {
    id: "namoro",
    label: "Tempo de namoro",
    ordered: true,
    labels: ["2 anos", "3 anos", "4 anos", "5 anos"],
    referential: "Posição 1 = namoram há menos tempo (2 anos); posição 4 = há mais tempo (5 anos).",
  },
  categories: [
    { id: "namorado", label: "Namorado", values: ["Gabriel", "Joao", "Luciano", "Rafael"].map((v) => tx(v, v === "Joao" ? "João" : v)) },
    { id: "namorada", label: "Namorada", values: ["Fatima", "Isabel", "Marina", "Taina"].map((v) => tx(v, v === "Fatima" ? "Fátima" : v === "Taina" ? "Tainá" : v)) },
    { id: "local", label: "Local", values: ["Cinema", "Parque", "Restaurante", "Teatro"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "n1",
      text: "Rafael namora há 3 anos.",
      highlights: [{ cat: "namorado" }],
      constraints: [{ k: "at", cat: "namorado", value: "Rafael", pos: 1 }],
    },
    {
      id: "n2",
      text: "O casal que vai ao cinema é formado por Gabriel, e o casal que namora há 3 anos é o da Tainá.",
      highlights: [{ cat: "local" }, { cat: "namorado" }, { cat: "namorada" }],
      constraints: [
        { k: "at", cat: "namorada", value: "Taina", pos: 1 },
        { k: "same", a: { cat: "namorado", value: "Gabriel" }, b: { cat: "local", value: "Cinema" } },
      ],
    },
    {
      id: "n3",
      text: "Isabel vai ao teatro com o namorado.",
      highlights: [{ cat: "namorada" }, { cat: "local" }],
      constraints: [{ k: "same", a: { cat: "namorada", value: "Isabel" }, b: { cat: "local", value: "Teatro" } }],
    },
    {
      id: "n4",
      text: "O casal que namora há mais tempo não vai ao parque.",
      highlights: [{ cat: "local" }],
      constraints: [{ k: "notAt", cat: "local", value: "Parque", pos: 3 }],
    },
    {
      id: "n5",
      text: "Os namorados que vão ao teatro namoram há 1 ano a menos que o casal que vai ao restaurante.",
      highlights: [{ cat: "local" }],
      constraints: [{ k: "immediateLeft", a: { cat: "local", value: "Teatro" }, b: { cat: "local", value: "Restaurante" } }],
    },
    {
      id: "n6",
      text: "Marina não vai ao cinema com o namorado.",
      highlights: [{ cat: "namorada" }, { cat: "local" }],
      constraints: [{ k: "diff", a: { cat: "namorada", value: "Marina" }, b: { cat: "local", value: "Cinema" } }],
    },
    {
      id: "n7",
      text: "O casal que vai ao teatro é formado por João ou por Rafael.",
      highlights: [{ cat: "local" }, { cat: "namorado" }],
      constraints: [
        { k: "diff", a: { cat: "local", value: "Teatro" }, b: { cat: "namorado", value: "Gabriel" } },
        { k: "diff", a: { cat: "local", value: "Teatro" }, b: { cat: "namorado", value: "Luciano" } },
      ],
    },
    {
      id: "n8",
      text: "O casal que namora há 3 anos vai ao parque.",
      highlights: [{ cat: "namoro" }, { cat: "local" }],
      constraints: [{ k: "at", cat: "local", value: "Parque", pos: 1 }],
    },
  ],
  solution: {},
};
