// Geniol · "Salas de Cinema". Spine = capacidade (ordenada, 200..350, passo 50).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "salas-de-cinema",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 2,
  size: 4,
  title: "Salas de Cinema",
  story:
    "Um cinema possui quatro salas com capacidades distintas, cada uma exibindo filmes de gêneros específicos. Associe as salas às capacidades e aos gêneros.",
  spine: {
    id: "capacidade",
    label: "Capacidade",
    ordered: true,
    labels: ["200", "250", "300", "350"],
    referential: "Posição 1 = menor capacidade (200 lugares); posição 4 = maior (350). Passo de 50 lugares.",
  },
  categories: [
    { id: "sala", label: "Sala", values: ["I", "II", "III", "IV"].map((v) => tx(v, "Sala " + v)) },
    { id: "filme", label: "Filme", values: ["Acao", "Comedia", "Drama", "Terror"].map((v) => tx(v, v === "Acao" ? "Ação" : v === "Comedia" ? "Comédia" : v)) },
  ],
  clues: [
    {
      id: "s1",
      text: "A sala que está passando filmes de comédia tem mais lugares do que a que está exibindo filmes de terror.",
      highlights: [{ cat: "filme" }],
      constraints: [{ k: "before", a: { cat: "filme", value: "Terror" }, b: { cat: "filme", value: "Comedia" } }],
    },
    {
      id: "s2",
      text: "A sala I está exibindo filmes de terror.",
      highlights: [{ cat: "sala" }, { cat: "filme" }],
      constraints: [{ k: "same", a: { cat: "sala", value: "I" }, b: { cat: "filme", value: "Terror" } }],
    },
    {
      id: "s3",
      text: "A sala III, a sala que está exibindo filmes de drama e a sala com 350 lugares são salas distintas.",
      highlights: [{ cat: "sala" }, { cat: "filme" }],
      constraints: [
        { k: "diff", a: { cat: "sala", value: "III" }, b: { cat: "filme", value: "Drama" } },
        { k: "notAt", cat: "sala", value: "III", pos: 3 },
        { k: "notAt", cat: "filme", value: "Drama", pos: 3 },
      ],
    },
    {
      id: "s4",
      text: "A sala II tem 100 lugares a mais do que a sala que está passando filmes de drama.",
      highlights: [{ cat: "sala" }, { cat: "filme" }],
      constraints: [{ k: "offset", a: { cat: "sala", value: "II" }, b: { cat: "filme", value: "Drama" }, delta: 2 }],
    },
    {
      id: "s5",
      text: "A sala com 350 lugares é a sala I ou a que está exibindo filmes de ação.",
      highlights: [{ cat: "sala" }, { cat: "filme" }],
      // Disjunção: 350 é a sala I OU exibe ação. Sala I = terror (s2), mas s1 exige
      // comédia > terror, logo terror ≠ 350 → cai o ramo "sala I" → 350 exibe ação.
      constraints: [{ k: "at", cat: "filme", value: "Acao", pos: 3 }],
    },
  ],
  solution: {},
};
