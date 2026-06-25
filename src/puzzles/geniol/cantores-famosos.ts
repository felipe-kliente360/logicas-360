// Geniol · "Cantores Famosos". Spine = idade (ordenada, 20..35, passo 5).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "cantores-famosos",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 3,
  size: 4,
  title: "Cantores Famosos",
  story:
    "Quatro cantores brasileiros famosos acabaram de se encontrar numa premiação musical. Use a lógica e descubra o nome, a idade, o estado natal e o estilo musical de cada um deles.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["20 anos", "25 anos", "30 anos", "35 anos"],
    referential: "Posição 1 = o mais novo (20 anos); posição 4 = o mais velho (35 anos). Passo de 5 anos.",
  },
  categories: [
    { id: "cantor", label: "Cantor", values: ["Marcos", "Luan", "Francisco", "Agnaldo"].map((v) => tx(v)) },
    { id: "estado", label: "Estado", values: ["SaoPaulo", "Parana", "Maranhao", "Goias"].map((v) => tx(v)) },
    { id: "estilo", label: "Estilo", values: ["sertanejo", "samba", "rock", "pop"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "s1",
      text: "O cantor do Maranhão é mais novo que o Agnaldo.",
      highlights: [{ cat: "estado" }, { cat: "cantor" }],
      constraints: [{ k: "before", a: { cat: "estado", value: "Maranhao" }, b: { cat: "cantor", value: "Agnaldo" } }],
    },
    {
      id: "s2",
      text: "O cantor do Paraná é 5 anos mais novo que o cantor de rock.",
      highlights: [{ cat: "estado" }, { cat: "estilo" }],
      constraints: [{ k: "immediateLeft", a: { cat: "estado", value: "Parana" }, b: { cat: "estilo", value: "rock" } }],
    },
    {
      id: "s3",
      text: "Sobre o cantor de sertanejo e o cantor do Maranhão, um tem 25 anos e o outro tem 30 anos, não necessariamente nessa ordem.",
      highlights: [{ cat: "estilo" }, { cat: "estado" }, { cat: "idade" }],
      // São pessoas diferentes; um em 25 (pos1), outro em 30 (pos2). Logo nenhum em 20/35.
      constraints: [
        { k: "diff", a: { cat: "estilo", value: "sertanejo" }, b: { cat: "estado", value: "Maranhao" } },
        { k: "notAt", cat: "estilo", value: "sertanejo", pos: 0 },
        { k: "notAt", cat: "estilo", value: "sertanejo", pos: 3 },
        { k: "notAt", cat: "estado", value: "Maranhao", pos: 0 },
        { k: "notAt", cat: "estado", value: "Maranhao", pos: 3 },
      ],
    },
    {
      id: "s4",
      text: "O cantor do Paraná tem 30 anos ou canta pop.",
      highlights: [{ cat: "estado" }, { cat: "idade" }, { cat: "estilo" }],
      // Pelas pistas s2/s5, o Paraná é o mais novo (20 anos), nunca 30; logo canta pop.
      constraints: [{ k: "same", a: { cat: "estado", value: "Parana" }, b: { cat: "estilo", value: "pop" } }],
    },
    {
      id: "s5",
      text: "Marcos é 5 anos mais velho que o cantor do Paraná.",
      highlights: [{ cat: "cantor" }, { cat: "estado" }],
      constraints: [{ k: "immediateLeft", a: { cat: "estado", value: "Parana" }, b: { cat: "cantor", value: "Marcos" } }],
    },
    {
      id: "s6",
      text: "O cantor de 35 anos não é de São Paulo.",
      highlights: [{ cat: "idade" }, { cat: "estado" }],
      constraints: [{ k: "notAt", cat: "estado", value: "SaoPaulo", pos: 3 }],
    },
    {
      id: "s7",
      text: "O cantor do Maranhão é mais novo que o Francisco.",
      highlights: [{ cat: "estado" }, { cat: "cantor" }],
      constraints: [{ k: "before", a: { cat: "estado", value: "Maranhao" }, b: { cat: "cantor", value: "Francisco" } }],
    },
    {
      id: "s8",
      text: "Agnaldo não canta samba.",
      highlights: [{ cat: "cantor" }, { cat: "estilo" }],
      constraints: [{ k: "diff", a: { cat: "cantor", value: "Agnaldo" }, b: { cat: "estilo", value: "samba" } }],
    },
  ],
  solution: {},
};
