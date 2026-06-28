import type { Puzzle } from "../../engine/types";
const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Comandante Vidal", "Herdeira Salles", "Chef Toledo", "Doutora Rios", "Barao Klaus"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Comandante Vidal -> Suite Master | Seringa       | 22h   <- CULPADO (Suite Master + 22h)
//   idx 1 Herdeira Salles  -> Casa de maq. | Cabo de aco   | 23h
//   idx 2 Chef Toledo      -> Conves       | Taca quebrada | 00h
//   idx 3 Doutora Rios     -> Cozinha      | Pulseira      | 01h
//   idx 4 Barao Klaus      -> Ponte        | Faca de chef  | 02h
//
// Culpado: Comandante Vidal (Suite Master + 22h) — evidências do crime.
// Nenhuma pista fixa Suite Master/22h direto no Vidal: a dupla só fica única quando
// a grade está praticamente resolvida (atalho 0%).

export const puzzle: Puzzle = {
  id: "naufragio-iate",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "Naufrágio no Iate",
  story:
    "O iate de luxo Aurora Negra zarpou com cinco convidados e um anfitrião que não voltou vivo. Antes do amanhecer, o dono da embarcação foi achado sem vida enquanto o casco já adernava nas águas escuras. Cada suspeito ocupava um setor do iate, portava um objeto e foi visto pela última vez a uma hora distinta. As câmeras de bordo flagraram pedaços da noite, a tripulação sussurra meias-verdades e ninguém admite nada. Reconstrua a madrugada inteira — setor, objeto e hora — e só então o nome de quem afundou o anfitrião emergirá das águas.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "setor",
      label: "Setor",
      values: ["Suite Master", "Cozinha", "Conves", "Casa de maquinas", "Ponte"].map((v) =>
        tx(
          v,
          v === "Suite Master"
            ? "Suíte Master"
            : v === "Conves"
              ? "Convés"
              : v === "Casa de maquinas"
                ? "Casa de máquinas"
                : v,
        ),
      ),
    },
    {
      id: "objeto",
      label: "Objeto",
      values: ["Pulseira", "Cabo de aco", "Seringa", "Taca quebrada", "Faca de chef"].map((v) =>
        tx(v, v === "Cabo de aco" ? "Cabo de aço" : v === "Taca quebrada" ? "Taça quebrada" : v),
      ),
    },
    {
      id: "hora",
      label: "Horário",
      values: ["22h", "23h", "00h", "01h", "02h"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "c1",
      text: "O Barão Klaus não foi visto antes da meia-noite, tampouco esteve nos dois primeiros setores, a suíte master e a cozinha.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "hora", value: "22h", pos: 4 },
        { k: "notAt", cat: "hora", value: "23h", pos: 4 },
        { k: "notAt", cat: "setor", value: "Suite Master", pos: 4 },
        { k: "notAt", cat: "setor", value: "Cozinha", pos: 4 },
      ],
    },
    {
      id: "c2",
      text: "Quem largou a taça quebrada foi visto pela última vez à meia-noite em ponto.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Taca quebrada" }, b: { cat: "hora", value: "00h" } }],
    },
    {
      id: "c3",
      text: "A Herdeira Salles não portava a taça quebrada, nem a pulseira, nem a faca de chef.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Taca quebrada", pos: 1 },
        { k: "notAt", cat: "objeto", value: "Pulseira", pos: 1 },
        { k: "notAt", cat: "objeto", value: "Faca de chef", pos: 1 },
      ],
    },
    {
      id: "c4",
      text: "O dono do cabo de aço não estava na suíte master, no convés nem na ponte.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Cabo de aco", pos: 0 },
        { k: "diff", a: { cat: "objeto", value: "Cabo de aco" }, b: { cat: "setor", value: "Conves" } },
        { k: "diff", a: { cat: "objeto", value: "Cabo de aco" }, b: { cat: "setor", value: "Ponte" } },
      ],
    },
    {
      id: "c5",
      text: "O Chef Toledo estava no convés, mas a seringa não era dele.",
      highlights: [],
      constraints: [
        { k: "at", cat: "setor", value: "Conves", pos: 2 },
        { k: "notAt", cat: "objeto", value: "Seringa", pos: 2 },
      ],
    },
    {
      id: "c6",
      text: "Quem guardava a seringa foi visto pela última vez às 22h.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Seringa" }, b: { cat: "hora", value: "22h" } }],
    },
    {
      id: "c7",
      text: "O Comandante Vidal não foi visto à meia-noite e não estava na casa de máquinas.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "hora", value: "00h", pos: 0 },
        { k: "notAt", cat: "setor", value: "Casa de maquinas", pos: 0 },
      ],
    },
    {
      id: "c8",
      text: "A pulseira não foi vista na suíte master nem na casa de máquinas.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "objeto", value: "Pulseira" }, b: { cat: "setor", value: "Suite Master" } },
        { k: "diff", a: { cat: "objeto", value: "Pulseira" }, b: { cat: "setor", value: "Casa de maquinas" } },
      ],
    },
    {
      id: "c9",
      text: "A Doutora Rios foi vista pela última vez à 01h.",
      highlights: [],
      constraints: [{ k: "at", cat: "hora", value: "01h", pos: 3 }],
    },
    {
      id: "c10",
      text: "A faca de chef pertencia a quem foi visto por último de toda a noite, às 02h.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Faca de chef" }, b: { cat: "hora", value: "02h" } }],
    },
    {
      id: "c11",
      text: "A Herdeira Salles não foi vista às 02h.",
      highlights: [],
      constraints: [{ k: "notAt", cat: "hora", value: "02h", pos: 1 }],
    },
    {
      id: "c12",
      text: "O Comandante Vidal não portava a faca de chef.",
      highlights: [],
      constraints: [{ k: "notAt", cat: "objeto", value: "Faca de chef", pos: 0 }],
    },
    {
      id: "c13",
      text: "A faca de chef não estava no convés.",
      highlights: [],
      constraints: [{ k: "diff", a: { cat: "objeto", value: "Faca de chef" }, b: { cat: "setor", value: "Conves" } }],
    },
    {
      id: "c14",
      text: "A pulseira não pertencia a quem foi visto pela última vez às 23h.",
      highlights: [],
      constraints: [{ k: "diff", a: { cat: "objeto", value: "Pulseira" }, b: { cat: "hora", value: "23h" } }],
    },
    {
      id: "c15",
      text: "A taça quebrada não estava na ponte de comando.",
      highlights: [],
      constraints: [{ k: "diff", a: { cat: "objeto", value: "Taca quebrada" }, b: { cat: "setor", value: "Ponte" } }],
    },
    {
      id: "c16",
      text: "A faca de chef não estava na casa de máquinas.",
      highlights: [],
      constraints: [{ k: "diff", a: { cat: "objeto", value: "Faca de chef" }, b: { cat: "setor", value: "Casa de maquinas" } }],
    },
    {
      id: "c17",
      text: "O Comandante Vidal não portava a pulseira.",
      highlights: [],
      constraints: [{ k: "notAt", cat: "objeto", value: "Pulseira", pos: 0 }],
    },
    {
      id: "c18",
      text: "O Barão Klaus passou a noite junto ao leme, na ponte de comando.",
      highlights: [],
      constraints: [{ k: "at", cat: "setor", value: "Ponte", pos: 4 }],
    },
    {
      id: "c19",
      text: "O Barão Klaus, na ponte, foi o último a sumir das câmeras, às 02h.",
      highlights: [],
      constraints: [{ k: "at", cat: "hora", value: "02h", pos: 4 }],
    },
    {
      id: "c20",
      text: "Na cozinha não se viu nem o cabo de aço nem a seringa.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "setor", value: "Cozinha" }, b: { cat: "objeto", value: "Cabo de aco" } },
        { k: "diff", a: { cat: "setor", value: "Cozinha" }, b: { cat: "objeto", value: "Seringa" } },
      ],
    },
    {
      id: "c21",
      text: "A pulseira não pertencia a quem desapareceu às 22h nem à meia-noite.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "objeto", value: "Pulseira" }, b: { cat: "hora", value: "22h" } },
        { k: "diff", a: { cat: "objeto", value: "Pulseira" }, b: { cat: "hora", value: "00h" } },
      ],
    },
  ],
  crime: {
    prompt:
      "A perícia cravou a hora da morte às 22h em ponto, e o setor de origem do alarme silencioso foi a suíte master, o primeiro do plano do iate.",
    evidence: [
      { cat: "setor", value: "Suite Master" },
      { cat: "hora", value: "22h" },
    ],
  },
  solution: {},
};
