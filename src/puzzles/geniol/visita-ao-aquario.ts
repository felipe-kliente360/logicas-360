// Geniol · "Visita ao Aquário". Spine = idade (ordenada, 6..9, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "visita-ao-aquario",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Visita ao Aquário",
  story:
    "Quatro crianças estão visitando o aquário pela primeira vez. Siga as dicas e descubra qual animal cada uma quer ver.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["6 anos", "7 anos", "8 anos", "9 anos"],
    referential: "Posição 1 = a mais nova (6 anos); posição 4 = a mais velha (9 anos). Passo de 1 ano.",
  },
  categories: [
    { id: "crianca", label: "Criança", values: ["Renan", "Elias", "Danilo", "Alan"].map((v) => tx(v)) },
    { id: "animal", label: "Animal", values: ["tubarao", "tartaruga", "peixe-palhaco", "leao-marinho"].map((v) => tx(v)) },
    { id: "lanche", label: "Lanche", values: ["sanduiche", "salgadinho", "fruta", "bolacha"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "a1",
      text: "Nem a criança que quer ver o peixe-palhaço nem a que quer ver o tubarão levou bolacha.",
      highlights: [{ cat: "animal" }, { cat: "lanche" }],
      constraints: [
        { k: "diff", a: { cat: "animal", value: "peixe-palhaco" }, b: { cat: "lanche", value: "bolacha" } },
        { k: "diff", a: { cat: "animal", value: "tubarao" }, b: { cat: "lanche", value: "bolacha" } },
      ],
    },
    {
      id: "a2",
      text: "Quem levou sanduíche é 1 ano mais novo que a criança que quer ver o peixe-palhaço.",
      highlights: [{ cat: "lanche" }, { cat: "animal" }],
      constraints: [{ k: "immediateLeft", a: { cat: "lanche", value: "sanduiche" }, b: { cat: "animal", value: "peixe-palhaco" } }],
    },
    {
      id: "a3",
      text: "A criança que levou fruta é 1 ano mais nova do que quem deseja ver o tubarão.",
      highlights: [{ cat: "lanche" }, { cat: "animal" }],
      constraints: [{ k: "immediateLeft", a: { cat: "lanche", value: "fruta" }, b: { cat: "animal", value: "tubarao" } }],
    },
    {
      id: "a4",
      text: "Danilo é 2 anos mais velho do que a criança que levou fruta.",
      highlights: [{ cat: "crianca" }, { cat: "lanche" }],
      constraints: [{ k: "offset", a: { cat: "crianca", value: "Danilo" }, b: { cat: "lanche", value: "fruta" }, delta: 2 }],
    },
    {
      id: "a5",
      text: "Alan não tem 6 anos.",
      highlights: [{ cat: "crianca" }],
      constraints: [{ k: "notAt", cat: "crianca", value: "Alan", pos: 0 }],
    },
    {
      id: "a6",
      text: "A criança que levou salgadinho quer ver o tubarão.",
      highlights: [{ cat: "lanche" }, { cat: "animal" }],
      constraints: [{ k: "same", a: { cat: "lanche", value: "salgadinho" }, b: { cat: "animal", value: "tubarao" } }],
    },
    {
      id: "a7",
      text: "Quem deseja ver o tubarão é o Renan ou o menino de 9 anos.",
      highlights: [{ cat: "animal" }, { cat: "crianca" }, { cat: "idade" }],
      // Pelas pistas a3/a6, o tubarão fica aos 8 anos (não 9); logo é o Renan.
      constraints: [{ k: "same", a: { cat: "animal", value: "tubarao" }, b: { cat: "crianca", value: "Renan" } }],
    },
    {
      id: "a8",
      text: "Quem levou sanduíche tem 8 anos ou quer ver o leão-marinho.",
      highlights: [{ cat: "lanche" }, { cat: "idade" }, { cat: "animal" }],
      // O sanduíche fica aos 6 anos (a2/a3/a6 → 8 anos é o tubarão); logo quer ver o leão-marinho.
      constraints: [{ k: "same", a: { cat: "lanche", value: "sanduiche" }, b: { cat: "animal", value: "leao-marinho" } }],
    },
  ],
  solution: {},
};
