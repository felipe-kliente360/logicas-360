// Geniol · "Básico 3". Spine = nomes (associação pura; nomes fixam o eixo).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "basico-3",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Coleção de miniaturas",
  story:
    "Quatro amigos estão conversando sobre as miniaturas que colecionam e com quantos anos começaram a colecionar. Descubra qual tipo de miniatura cada um deles coleciona.",
  spine: {
    id: "nome",
    label: "Nome",
    ordered: false,
    // Posições fixas: 0=Aline, 1=Jean, 2=Matheus, 3=Rafaela.
    labels: ["Aline", "Jean", "Matheus", "Rafaela"],
  },
  categories: [
    { id: "ano", label: "Ano", values: ["13 anos", "14 anos", "15 anos", "16 anos"].map((v) => tx(v.replace(" ", ""), v)) },
    { id: "miniatura", label: "Miniatura", values: ["Aviao", "Carro", "Moto", "Navio"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "b1",
      text: "Nem Aline nem Jean começaram a colecionar miniaturas com 15 anos.",
      highlights: [{ cat: "nome" }, { cat: "ano" }],
      constraints: [
        { k: "notAt", cat: "ano", value: "15anos", pos: 0 },
        { k: "notAt", cat: "ano", value: "15anos", pos: 1 },
      ],
    },
    {
      id: "b2",
      text: "Matheus não coleciona carrinhos.",
      highlights: [{ cat: "nome" }, { cat: "miniatura" }],
      constraints: [{ k: "notAt", cat: "miniatura", value: "Carro", pos: 2 }],
    },
    {
      id: "b3",
      text: "Rafaela começou a colecionar com 14 anos.",
      highlights: [{ cat: "nome" }, { cat: "ano" }],
      constraints: [{ k: "at", cat: "ano", value: "14anos", pos: 3 }],
    },
    {
      id: "b4",
      text: "Aline coleciona miniaturas de avião.",
      highlights: [{ cat: "nome" }, { cat: "miniatura" }],
      constraints: [{ k: "at", cat: "miniatura", value: "Aviao", pos: 0 }],
    },
    {
      id: "b5",
      text: "Nem Matheus nem Rafaela colecionam miniaturas de navio.",
      highlights: [{ cat: "nome" }, { cat: "miniatura" }],
      constraints: [
        { k: "notAt", cat: "miniatura", value: "Navio", pos: 2 },
        { k: "notAt", cat: "miniatura", value: "Navio", pos: 3 },
      ],
    },
    {
      id: "b6",
      text: "Um homem começou a colecionar miniaturas com 16 anos.",
      highlights: [{ cat: "nome" }, { cat: "ano" }],
      // Homens = Jean (1) e Matheus (2); logo as mulheres Aline (0) e Rafaela (3) não têm 16 anos.
      constraints: [
        { k: "notAt", cat: "ano", value: "16anos", pos: 0 },
        { k: "notAt", cat: "ano", value: "16anos", pos: 3 },
      ],
    },
  ],
  solution: {},
};
