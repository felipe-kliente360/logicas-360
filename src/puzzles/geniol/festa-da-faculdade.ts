// Geniol · "Festa da Faculdade". Spine = idade (ordenada, 19..22 anos, passo 1).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "festa-da-faculdade",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 4,
  size: 4,
  title: "Festa da Faculdade",
  story:
    "Quatro estudantes estão aproveitando uma festa da faculdade para se divertirem. Através da lógica, descubra as características delas.",
  spine: {
    id: "idade",
    label: "Idade",
    ordered: true,
    labels: ["19 anos", "20 anos", "21 anos", "22 anos"],
    referential: "Posição 1 = a mais nova (19); posição 4 = a mais velha (22). Passo de 1 ano.",
  },
  categories: [
    { id: "estudante", label: "Estudante", values: ["Nayara", "Helena", "Cecilia", "Angelica"].map((v) => tx(v)) },
    {
      id: "curso",
      label: "Curso",
      values: [
        tx("Medicina", "Medicina"),
        tx("Enfermagem", "Enfermagem"),
        tx("Direito", "Direito"),
        tx("Administracao", "Administração"),
      ],
    },
    {
      id: "ano",
      label: "Ano",
      values: [
        tx("Primeiro", "Primeiro"),
        tx("Segundo", "Segundo"),
        tx("Terceiro", "Terceiro"),
        tx("Quarto", "Quarto"),
      ],
    },
  ],
  clues: [
    {
      id: "f1",
      text: "Cecília não tem 21 anos.",
      highlights: [{ cat: "estudante" }],
      constraints: [{ k: "notAt", cat: "estudante", value: "Cecilia", pos: 2 }],
    },
    {
      id: "f2",
      text: "Nem a Helena nem a estudante de 20 anos estão no terceiro ano da faculdade.",
      highlights: [{ cat: "estudante" }, { cat: "ano" }],
      constraints: [
        { k: "diff", a: { cat: "estudante", value: "Helena" }, b: { cat: "ano", value: "Terceiro" } },
        { k: "notAt", cat: "ano", value: "Terceiro", pos: 1 },
      ],
    },
    {
      // Sobre as de 20 e 21 anos, uma cursa enfermagem e a outra está no primeiro ano.
      // Logo enfermagem e primeiro estão ambos entre {20, 21} (pos 1 e 2) e são pessoas diferentes.
      id: "f3",
      text: "Sobre as estudantes de 20 anos e 21 anos, uma cursa enfermagem e a outra está no primeiro ano, não necessariamente nessa ordem.",
      highlights: [{ cat: "curso" }, { cat: "ano" }],
      constraints: [
        { k: "notAt", cat: "curso", value: "Enfermagem", pos: 0 },
        { k: "notAt", cat: "curso", value: "Enfermagem", pos: 3 },
        { k: "notAt", cat: "ano", value: "Primeiro", pos: 0 },
        { k: "notAt", cat: "ano", value: "Primeiro", pos: 3 },
        { k: "diff", a: { cat: "curso", value: "Enfermagem" }, b: { cat: "ano", value: "Primeiro" } },
      ],
    },
    {
      id: "f4",
      text: "A estudante do primeiro ano é mais velha do que a Angélica.",
      highlights: [{ cat: "estudante" }, { cat: "ano" }],
      constraints: [{ k: "before", a: { cat: "estudante", value: "Angelica" }, b: { cat: "ano", value: "Primeiro" } }],
    },
    {
      id: "f5",
      text: "A estudante de direito é mais velha do que a estudante do primeiro ano.",
      highlights: [{ cat: "curso" }, { cat: "ano" }],
      constraints: [{ k: "before", a: { cat: "ano", value: "Primeiro" }, b: { cat: "curso", value: "Direito" } }],
    },
    {
      id: "f6",
      text: "Nayara cursa medicina.",
      highlights: [{ cat: "estudante" }, { cat: "curso" }],
      constraints: [{ k: "same", a: { cat: "estudante", value: "Nayara" }, b: { cat: "curso", value: "Medicina" } }],
    },
    {
      // Sobre a do 2º ano e a de 20 anos, uma cursa direito e a outra é a Nayara. Como Nayara cursa
      // medicina (≠ direito), as demais pistas só admitem: Nayara tem 20 anos e a de direito está no 2º ano.
      id: "f7",
      text: "Sobre a estudante do segundo ano e a estudante de 20 anos, uma cursa direito e a outra é a Nayara, não necessariamente nessa ordem.",
      highlights: [{ cat: "estudante" }, { cat: "curso" }, { cat: "ano" }],
      constraints: [
        { k: "at", cat: "estudante", value: "Nayara", pos: 1 },
        { k: "same", a: { cat: "curso", value: "Direito" }, b: { cat: "ano", value: "Segundo" } },
      ],
    },
  ],
  solution: {},
};
