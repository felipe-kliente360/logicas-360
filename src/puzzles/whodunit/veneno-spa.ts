import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices 0..4
const suspeitos = ["Clarissa", "Otavio", "Nubia", "Tadeu", "Viviane"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Clarissa -> Estufa    | ChaVerde   | 15h
//   idx 1 Otavio   -> Sauna     | ChaPreto   | 18h
//   idx 2 Nubia    -> Solario   | Espumante  | 17h
//   idx 3 Tadeu    -> Massagem  | Limonada   | 14h
//   idx 4 Viviane  -> Piscina   | Mimosa     | 16h
//
// Culpado: Nubia (Solario + 17h) — evidências do crime.
// Nenhuma pista fixa "Solario" nem "17h" a uma posição: as duas evidências
// andam coladas (same) mas só se cravam num suspeito quando a grade inteira
// fecha (atalho 0%).

export const puzzle: Puzzle = {
  id: "veneno-spa",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "Veneno no spa",
  story:
    "No spa mais exclusivo da serra, uma hóspede tombou durante o chá da tarde: envenenamento, cravou o legista. Cinco frequentadores circulavam pelo complexo naquela tarde, cada um relaxando num ambiente diferente, saboreando uma bebida distinta, em horários que não se cruzam. Os relatos são vagos e contraditórios — ninguém confessa onde estava nem o que bebia. Reconstrua a tarde inteira e só então o ambiente e a hora do crime convergem num único nome.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "ambiente",
      label: "Ambiente",
      values: ["Estufa", "Sauna", "Solario", "Massagem", "Piscina"].map((v) =>
        tx(v, v === "Solario" ? "Solário" : v === "Massagem" ? "Sala de massagem" : v)
      ),
    },
    {
      id: "bebida",
      label: "Bebida",
      values: ["ChaVerde", "ChaPreto", "Espumante", "Limonada", "Mimosa"].map((v) =>
        tx(v, v === "ChaVerde" ? "Chá verde" : v === "ChaPreto" ? "Chá preto" : v)
      ),
    },
    {
      id: "hora",
      label: "Horário",
      values: ["14h", "15h", "16h", "17h", "18h"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "c1",
      text: "Clarissa relaxava na estufa, de chá verde em mãos, logo às 15h.",
      highlights: [],
      constraints: [
        { k: "at", cat: "ambiente", value: "Estufa", pos: 0 },
        { k: "same", a: { cat: "ambiente", value: "Estufa" }, b: { cat: "bebida", value: "ChaVerde" } },
        { k: "at", cat: "hora", value: "15h", pos: 0 },
      ],
    },
    {
      id: "c2",
      text: "O chá preto foi servido na sauna, e a sauna só foi ocupada no fim da tarde, às 18h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "bebida", value: "ChaPreto" }, b: { cat: "ambiente", value: "Sauna" } },
        { k: "same", a: { cat: "ambiente", value: "Sauna" }, b: { cat: "hora", value: "18h" } },
      ],
    },
    {
      id: "c3",
      text: "Quem estava no solário bebia o espumante, e essa pessoa foi vista às 17h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "ambiente", value: "Solario" }, b: { cat: "bebida", value: "Espumante" } },
        { k: "same", a: { cat: "ambiente", value: "Solario" }, b: { cat: "hora", value: "17h" } },
      ],
    },
    {
      id: "c4",
      text: "A limonada foi pedida na sala de massagem, e a mimosa, na beira da piscina.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "bebida", value: "Limonada" }, b: { cat: "ambiente", value: "Massagem" } },
        { k: "same", a: { cat: "bebida", value: "Mimosa" }, b: { cat: "ambiente", value: "Piscina" } },
      ],
    },
    {
      id: "c5",
      text: "Otavio não pisou na estufa, no solário, na sala de massagem nem na piscina.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "ambiente", value: "Estufa", pos: 1 },
        { k: "notAt", cat: "ambiente", value: "Solario", pos: 1 },
        { k: "notAt", cat: "ambiente", value: "Massagem", pos: 1 },
        { k: "notAt", cat: "ambiente", value: "Piscina", pos: 1 },
      ],
    },
    {
      id: "c6",
      text: "A sala de massagem foi a primeira a ser usada: nunca às 15h, 16h nem 17h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "ambiente", value: "Massagem" }, b: { cat: "hora", value: "15h" } },
        { k: "diff", a: { cat: "ambiente", value: "Massagem" }, b: { cat: "hora", value: "16h" } },
        { k: "diff", a: { cat: "ambiente", value: "Massagem" }, b: { cat: "hora", value: "17h" } },
      ],
    },
    {
      id: "c7",
      text: "A piscina não foi frequentada às 14h, 17h nem 18h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "ambiente", value: "Piscina" }, b: { cat: "hora", value: "14h" } },
        { k: "diff", a: { cat: "ambiente", value: "Piscina" }, b: { cat: "hora", value: "17h" } },
        { k: "diff", a: { cat: "ambiente", value: "Piscina" }, b: { cat: "hora", value: "18h" } },
      ],
    },
    {
      id: "c8",
      text: "Tadeu não bebia chá verde, chá preto, espumante nem mimosa.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "bebida", value: "ChaVerde", pos: 3 },
        { k: "notAt", cat: "bebida", value: "ChaPreto", pos: 3 },
        { k: "notAt", cat: "bebida", value: "Espumante", pos: 3 },
        { k: "notAt", cat: "bebida", value: "Mimosa", pos: 3 },
      ],
    },
    {
      id: "c9",
      text: "Nubia não tocou no chá preto, na limonada nem na mimosa.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "bebida", value: "ChaPreto", pos: 2 },
        { k: "notAt", cat: "bebida", value: "Limonada", pos: 2 },
        { k: "notAt", cat: "bebida", value: "Mimosa", pos: 2 },
      ],
    },
  ],
  crime: {
    prompt:
      "A perícia apontou que a dose fatal foi servida às 17h, sob o sol do solário. Cruzando o ambiente e a hora, quem envenenou a hóspede?",
    evidence: [
      { cat: "ambiente", value: "Solario" },
      { cat: "hora", value: "17h" },
    ],
  },
  solution: {},
};
