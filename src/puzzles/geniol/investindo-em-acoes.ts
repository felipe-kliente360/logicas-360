// Geniol · "Investindo em Ações". Spine = investimento (ordenada, 10k..40k, passo 10k).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "investindo-em-acoes",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Investindo em Ações",
  story:
    "Quatro investidores aplicaram dinheiro em ações de empresas brasileiras. Descubra qual ação cada um tem e quanto cada um investiu.",
  spine: {
    id: "investimento",
    label: "Investimento",
    ordered: true,
    labels: ["R$ 10000", "R$ 20000", "R$ 30000", "R$ 40000"],
    referential: "Posição 1 = menor investimento (R$ 10000); posição 4 = maior (R$ 40000). Passo de R$ 10000.",
  },
  categories: [
    { id: "nome", label: "Investidor", values: ["Daniel", "Fabio", "Luciano", "Rodrigo"].map((v) => tx(v)) },
    { id: "acao", label: "Ação", values: ["BRZL4", "CUCA3", "GNIO4", "HJPC3"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "i1",
      text: "Daniel tem R$ 30000 investido.",
      highlights: [{ cat: "nome" }],
      constraints: [{ k: "at", cat: "nome", value: "Daniel", pos: 2 }],
    },
    {
      id: "i2",
      text: "Luciano tem R$ 20000 a mais de investimento do que o investidor da ação HJPC3.",
      highlights: [{ cat: "nome" }, { cat: "acao" }],
      constraints: [{ k: "offset", a: { cat: "nome", value: "Luciano" }, b: { cat: "acao", value: "HJPC3" }, delta: 2 }],
    },
    {
      id: "i3",
      text: "Quem tem GNIO4 é quem investiu R$ 40000 ou é o Rodrigo.",
      highlights: [{ cat: "acao" }, { cat: "nome" }],
      // Disjunção: GNIO4 está em 40000 OU pertence a Rodrigo. Com as demais pistas,
      // Rodrigo fica com CUCA3, eliminando o segundo ramo → GNIO4 está nos 40000.
      constraints: [{ k: "at", cat: "acao", value: "GNIO4", pos: 3 }],
    },
    {
      id: "i4",
      text: "O investidor da ação CUCA3 tem R$ 20000 a menos de investimento do que Daniel.",
      highlights: [{ cat: "acao" }, { cat: "nome" }],
      constraints: [{ k: "offset", a: { cat: "acao", value: "CUCA3" }, b: { cat: "nome", value: "Daniel" }, delta: -2 }],
    },
    {
      id: "i5",
      text: "Fábio investe na ação HJPC3.",
      highlights: [{ cat: "nome" }, { cat: "acao" }],
      constraints: [{ k: "same", a: { cat: "nome", value: "Fabio" }, b: { cat: "acao", value: "HJPC3" } }],
    },
  ],
  solution: {},
};
