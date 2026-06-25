// puzzles/einstein — fase 2 (dificuldade 10). Constraints validadas: countSolutions === 1.
import type { Puzzle } from "../engine/types";

const tx = (id: string) => ({ id, label: id, display: { kind: "text" as const } });

export const einstein: Puzzle = {
  id: "einstein",
  themeId: "casas-classico",
  difficulty: 10,
  size: 5,
  title: "O enigma de Einstein",
  story:
    "Cinco casas em fila, cada uma de uma cor. Em cada uma mora uma pessoa de nacionalidade diferente, que bebe uma bebida, fuma uma marca e cria um animal — todos distintos. Quem tem o peixe?",
  spine: {
    id: "casa",
    label: "Casa",
    ordered: true,
    labels: ["Casa 1", "Casa 2", "Casa 3", "Casa 4", "Casa 5"],
    referential: "Casa 1 = extrema esquerda; Casa 5 = extrema direita; vizinha = casa imediatamente ao lado.",
  },
  categories: [
    { id: "cor", label: "Cor", values: ["Vermelha", "Verde", "Branca", "Amarela", "Azul"].map(tx) },
    { id: "nac", label: "Nacionalidade", values: ["Britanico", "Sueco", "Dinamarques", "Noruegues", "Alemao"].map(tx) },
    { id: "bebida", label: "Bebida", values: ["Cha", "Cafe", "Leite", "Cerveja", "Agua"].map(tx) },
    { id: "cigarro", label: "Cigarro", values: ["PallMall", "Dunhill", "Blends", "Bluemasters", "Prince"].map(tx) },
    { id: "animal", label: "Animal", values: ["Caes", "Passaros", "Gatos", "Cavalos", "Peixe"].map(tx) },
  ],
  clues: [
    {
      id: "e1",
      text: "O britânico mora na casa vermelha.",
      highlights: [{ cat: "nac" }, { cat: "cor" }],
      constraints: [{ k: "same", a: { cat: "nac", value: "Britanico" }, b: { cat: "cor", value: "Vermelha" } }],
    },
    {
      id: "e2",
      text: "O sueco tem cães.",
      highlights: [{ cat: "nac" }, { cat: "animal" }],
      constraints: [{ k: "same", a: { cat: "nac", value: "Sueco" }, b: { cat: "animal", value: "Caes" } }],
    },
    {
      id: "e3",
      text: "O dinamarquês bebe chá.",
      highlights: [{ cat: "nac" }, { cat: "bebida" }],
      constraints: [{ k: "same", a: { cat: "nac", value: "Dinamarques" }, b: { cat: "bebida", value: "Cha" } }],
    },
    {
      id: "e4",
      text: "A casa verde fica imediatamente à esquerda da casa branca.",
      highlights: [{ cat: "cor" }],
      constraints: [{ k: "immediateLeft", a: { cat: "cor", value: "Verde" }, b: { cat: "cor", value: "Branca" } }],
    },
    {
      id: "e5",
      text: "O dono da casa verde bebe café.",
      highlights: [{ cat: "cor" }, { cat: "bebida" }],
      constraints: [{ k: "same", a: { cat: "cor", value: "Verde" }, b: { cat: "bebida", value: "Cafe" } }],
    },
    {
      id: "e6",
      text: "Quem fuma Pall Mall cria pássaros.",
      highlights: [{ cat: "cigarro" }, { cat: "animal" }],
      constraints: [{ k: "same", a: { cat: "cigarro", value: "PallMall" }, b: { cat: "animal", value: "Passaros" } }],
    },
    {
      id: "e7",
      text: "O dono da casa amarela fuma Dunhill.",
      highlights: [{ cat: "cor" }, { cat: "cigarro" }],
      constraints: [{ k: "same", a: { cat: "cor", value: "Amarela" }, b: { cat: "cigarro", value: "Dunhill" } }],
    },
    {
      id: "e8",
      text: "Quem mora na casa do meio (casa 3) bebe leite.",
      highlights: [{ cat: "bebida", pos: 2 }],
      constraints: [{ k: "at", cat: "bebida", value: "Leite", pos: 2 }],
    },
    {
      id: "e9",
      text: "O norueguês mora na primeira casa (extrema esquerda).",
      highlights: [{ cat: "nac", pos: 0 }],
      constraints: [{ k: "at", cat: "nac", value: "Noruegues", pos: 0 }],
    },
    {
      id: "e10",
      text: "Quem fuma Blends mora numa casa vizinha à de quem tem gatos.",
      highlights: [{ cat: "cigarro" }, { cat: "animal" }],
      constraints: [{ k: "adjacent", a: { cat: "cigarro", value: "Blends" }, b: { cat: "animal", value: "Gatos" } }],
    },
    {
      id: "e11",
      text: "Quem tem cavalos mora numa casa vizinha à de quem fuma Dunhill.",
      highlights: [{ cat: "animal" }, { cat: "cigarro" }],
      constraints: [{ k: "adjacent", a: { cat: "animal", value: "Cavalos" }, b: { cat: "cigarro", value: "Dunhill" } }],
    },
    {
      id: "e12",
      text: "Quem fuma Bluemasters bebe cerveja.",
      highlights: [{ cat: "cigarro" }, { cat: "bebida" }],
      constraints: [{ k: "same", a: { cat: "cigarro", value: "Bluemasters" }, b: { cat: "bebida", value: "Cerveja" } }],
    },
    {
      id: "e13",
      text: "O alemão fuma Prince.",
      highlights: [{ cat: "nac" }, { cat: "cigarro" }],
      constraints: [{ k: "same", a: { cat: "nac", value: "Alemao" }, b: { cat: "cigarro", value: "Prince" } }],
    },
    {
      id: "e14",
      text: "O norueguês mora numa casa vizinha à casa azul.",
      highlights: [{ cat: "nac" }, { cat: "cor" }],
      constraints: [{ k: "adjacent", a: { cat: "nac", value: "Noruegues" }, b: { cat: "cor", value: "Azul" } }],
    },
    {
      id: "e15",
      text: "Quem fuma Blends tem um vizinho que bebe água.",
      highlights: [{ cat: "cigarro" }, { cat: "bebida" }],
      constraints: [{ k: "adjacent", a: { cat: "cigarro", value: "Blends" }, b: { cat: "bebida", value: "Agua" } }],
    },
  ],
  solution: {
    cor: ["Amarela", "Azul", "Vermelha", "Verde", "Branca"],
    nac: ["Noruegues", "Dinamarques", "Britanico", "Alemao", "Sueco"],
    bebida: ["Agua", "Cha", "Leite", "Cafe", "Cerveja"],
    cigarro: ["Dunhill", "Blends", "PallMall", "Prince", "Bluemasters"],
    animal: ["Gatos", "Cavalos", "Passaros", "Peixe", "Caes"],
  },
};
