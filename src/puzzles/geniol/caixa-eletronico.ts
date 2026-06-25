// Geniol · "Caixa Eletrônico". Spine = saldo (ordenado, 1000..2500, passo 500).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "caixa-eletronico",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Caixa Eletrônico",
  story:
    "Quatro mulheres acabaram de conferir o saldo de suas contas no caixa eletrônico. Siga as dicas e descubra qual a profissão e o saldo de cada uma delas.",
  spine: {
    id: "saldo",
    label: "Saldo",
    ordered: true,
    labels: ["R$ 1000", "R$ 1500", "R$ 2000", "R$ 2500"],
    referential: "Posição 1 = menor saldo (R$ 1000); posição 4 = maior saldo (R$ 2500). Passo de R$ 500.",
  },
  categories: [
    { id: "nome", label: "Nome", values: ["Paula", "Luiza", "Fernanda", "Alice"].map((v) => tx(v)) },
    { id: "profissao", label: "Profissão", values: ["Reporter", "Motorista", "Cabeleireira", "Advogada"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "c1",
      text: "Alice tem saldo de R$ 1500 ou é motorista.",
      highlights: [{ cat: "nome" }, { cat: "saldo" }, { cat: "profissao" }],
      // Disjunção: se Alice não está em 1500 (Luiza está, c3), então Alice é motorista.
      constraints: [{ k: "same", a: { cat: "nome", value: "Alice" }, b: { cat: "profissao", value: "Motorista" } }],
    },
    {
      id: "c2",
      text: "A repórter tem R$ 500 a mais de saldo que a Fernanda.",
      highlights: [{ cat: "profissao" }, { cat: "nome" }],
      constraints: [{ k: "immediateLeft", a: { cat: "nome", value: "Fernanda" }, b: { cat: "profissao", value: "Reporter" } }],
    },
    {
      id: "c3",
      text: "Luiza tem saldo de R$ 1500.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "at", cat: "nome", value: "Luiza", pos: 1 }],
    },
    {
      id: "c4",
      text: "Fernanda é cabeleireira.",
      highlights: [{ cat: "nome" }, { cat: "profissao" }],
      constraints: [{ k: "same", a: { cat: "nome", value: "Fernanda" }, b: { cat: "profissao", value: "Cabeleireira" } }],
    },
    {
      id: "c5",
      text: "A motorista, a repórter e quem tem R$ 2500 de saldo são pessoas diferentes.",
      highlights: [{ cat: "profissao" }, { cat: "saldo" }],
      constraints: [
        { k: "diff", a: { cat: "profissao", value: "Motorista" }, b: { cat: "profissao", value: "Reporter" } },
        { k: "notAt", cat: "profissao", value: "Motorista", pos: 3 },
        { k: "notAt", cat: "profissao", value: "Reporter", pos: 3 },
      ],
    },
  ],
  solution: {},
};
