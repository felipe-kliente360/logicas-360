import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices 0..4
const suspeitos = ["Bianca", "Renato", "Sofia", "Dimas", "Helio"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Bianca -> Vitrine  | Diamante  | 14h
//   idx 1 Renato -> Cofre    | Esmeralda | 17h
//   idx 2 Sofia  -> Fundos   | Rubi      | 16h
//   idx 3 Dimas  -> Garagem  | Perola    | 13h
//   idx 4 Helio  -> Terraco  | Safira    | 15h
//
// Culpado: Sofia (Fundos + 16h) — evidências do crime.
// Nenhuma pista fixa "Fundos" nem "16h" a uma posição: as duas evidências
// andam coladas (same) mas só se cravam num suspeito quando a grade inteira
// fecha (atalho 0%).

export const puzzle: Puzzle = {
  id: "roubo-joalheria",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "O roubo da joalheria",
  story:
    "A joalheria mais fina da cidade amanheceu saqueada: o estojo principal vazio, o cofre forçado. As câmeras flagraram cinco frequentadores naquela tarde, cada um rondando um ponto diferente da loja, cobiçando uma pedra distinta, em horários que não se cruzam. Os indícios são esparsos e oblíquos — ninguém admite onde esteve nem o que mirava. Reconstrua o trajeto de cada um e só então o ponto exato e a hora do golpe convergem num único nome.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "local",
      label: "Local",
      values: ["Vitrine", "Cofre", "Fundos", "Garagem", "Terraco"].map((v) =>
        tx(v, v === "Terraco" ? "Terraço" : v)
      ),
    },
    {
      id: "pedra",
      label: "Pedra",
      values: ["Diamante", "Esmeralda", "Rubi", "Perola", "Safira"].map((v) =>
        tx(v, v === "Perola" ? "Pérola" : v)
      ),
    },
    {
      id: "hora",
      label: "Horário",
      values: ["13h", "14h", "15h", "16h", "17h"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "c1",
      text: "Bianca ficou admirando a vitrine, onde reluzia o diamante, logo no início da tarde, às 14h.",
      highlights: [],
      constraints: [
        { k: "at", cat: "local", value: "Vitrine", pos: 0 },
        { k: "same", a: { cat: "local", value: "Vitrine" }, b: { cat: "pedra", value: "Diamante" } },
        { k: "at", cat: "hora", value: "14h", pos: 0 },
      ],
    },
    {
      id: "c2",
      text: "A esmeralda repousava no cofre, e o cofre só foi tocado bem no fim da tarde, às 17h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "pedra", value: "Esmeralda" }, b: { cat: "local", value: "Cofre" } },
        { k: "same", a: { cat: "local", value: "Cofre" }, b: { cat: "hora", value: "17h" } },
      ],
    },
    {
      id: "c3",
      text: "Os fundos e o rubi pertenciam à mesma pessoa, e ela agiu às 16h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "local", value: "Fundos" }, b: { cat: "pedra", value: "Rubi" } },
        { k: "same", a: { cat: "local", value: "Fundos" }, b: { cat: "hora", value: "16h" } },
      ],
    },
    {
      id: "c4",
      text: "A pérola estava na garagem, e a safira foi avistada no terraço.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "pedra", value: "Perola" }, b: { cat: "local", value: "Garagem" } },
        { k: "same", a: { cat: "pedra", value: "Safira" }, b: { cat: "local", value: "Terraco" } },
      ],
    },
    {
      id: "c6",
      text: "Renato não rondou a vitrine, os fundos, a garagem nem o terraço.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "local", value: "Vitrine", pos: 1 },
        { k: "notAt", cat: "local", value: "Fundos", pos: 1 },
        { k: "notAt", cat: "local", value: "Garagem", pos: 1 },
        { k: "notAt", cat: "local", value: "Terraco", pos: 1 },
      ],
    },
    {
      id: "c7",
      text: "A garagem recebeu seu visitante mais cedo que qualquer outro: nunca às 14h, 15h ou 16h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "local", value: "Garagem" }, b: { cat: "hora", value: "14h" } },
        { k: "diff", a: { cat: "local", value: "Garagem" }, b: { cat: "hora", value: "15h" } },
        { k: "diff", a: { cat: "local", value: "Garagem" }, b: { cat: "hora", value: "16h" } },
      ],
    },
    {
      id: "c8",
      text: "O terraço não foi visitado às 13h, 14h nem 16h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "local", value: "Terraco" }, b: { cat: "hora", value: "13h" } },
        { k: "diff", a: { cat: "local", value: "Terraco" }, b: { cat: "hora", value: "14h" } },
        { k: "diff", a: { cat: "local", value: "Terraco" }, b: { cat: "hora", value: "16h" } },
      ],
    },
    {
      id: "c9",
      text: "Dimas não cobiçava o diamante, a esmeralda, o rubi nem a safira.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "pedra", value: "Diamante", pos: 3 },
        { k: "notAt", cat: "pedra", value: "Esmeralda", pos: 3 },
        { k: "notAt", cat: "pedra", value: "Rubi", pos: 3 },
        { k: "notAt", cat: "pedra", value: "Safira", pos: 3 },
      ],
    },
    {
      id: "c10",
      text: "Sofia não tinha olhos para a safira, nem para a esmeralda ou a pérola.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "pedra", value: "Safira", pos: 2 },
        { k: "notAt", cat: "pedra", value: "Esmeralda", pos: 2 },
        { k: "notAt", cat: "pedra", value: "Perola", pos: 2 },
      ],
    },
  ],
  crime: {
    prompt:
      "O alarme silencioso soou às 16h, e a pedra mais cobiçada sumiu pela porta dos fundos. Cruzando o local e a hora do golpe, quem assaltou a joalheria?",
    evidence: [
      { cat: "local", value: "Fundos" },
      { cat: "hora", value: "16h" },
    ],
  },
  solution: {},
};
