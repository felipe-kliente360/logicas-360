import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const gl = (id: string, label: string, icon: string) => ({ id, label, display: { kind: "icon" as const, icon } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Condessa", "Mordomo", "Capitao", "Pianista", "Jardineiro"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Condessa   -> Estufa      | Adaga      | 23h | Heranca
//   idx 1 Mordomo     -> Adega       | Castical   | 21h | Chantagem
//   idx 2 Capitao     -> Escritorio  | Revolver   | 00h | Vinganca
//   idx 3 Pianista    -> Biblioteca  | Veneno     | 22h | Ciume
//   idx 4 Jardineiro  -> Salao       | Corda      | 20h | Dividas
//
// Culpado: Condessa (Adaga + 23h + Heranca) — evidências do crime.
// (Adaga/23h/Heranca são exatamente os atributos deduzidos por ÚLTIMO na
//  propagação: nenhuma pista os fixa direto, então o culpado só fica único
//  quando a grade está praticamente resolvida — sem atalho.)

export const puzzle: Puzzle = {
  id: "mansao-segredos",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "A mansão dos segredos",
  story:
    "O velho patriarca foi achado morto numa mansão onde cada parede esconde um segredo. O legista é categórico: a ferida é de lâmina, o relógio parado marcava 23h, e o testamento recém-aberto aponta a herança como o estopim. Cinco hóspedes, cada um num cômodo, com uma arma, a uma certa hora, movido por um motivo. As pistas são poucas e tortuosas: ninguém confessa, todos mentem por omissão. Reconstrua a noite inteira — só então a lâmina, a hora e a cobiça pela herança convergem num único nome.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "comodo",
      label: "Cômodo",
      values: ["Escritorio", "Salao", "Adega", "Biblioteca", "Estufa"].map((v) => tx(v)),
    },
    {
      id: "arma",
      label: "Arma",
      values: [
        gl("Adaga", "Adaga", "adaga"),
        gl("Castical", "Castiçal", "castical"),
        gl("Revolver", "Revólver", "revolver"),
        gl("Veneno", "Veneno", "veneno"),
        gl("Corda", "Corda", "corda"),
      ],
    },
    {
      id: "hora",
      label: "Horário",
      values: ["23h", "21h", "22h", "00h", "20h"].map((v) => tx(v)),
    },
    {
      id: "motivo",
      label: "Motivo",
      values: ["Heranca", "Chantagem", "Vinganca", "Ciume", "Dividas"].map((v) => tx(v)),
    },
  ],
  clues: [
    // --- Ancoras minimas e indiretas ---
    {
      id: "c1",
      text: "O hóspede movido por dívidas não pôs os pés na estufa, nem na adega, nem no escritório naquela noite.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Dividas" }, b: { cat: "comodo", value: "Estufa" } },
        { k: "diff", a: { cat: "motivo", value: "Dividas" }, b: { cat: "comodo", value: "Adega" } },
        { k: "diff", a: { cat: "motivo", value: "Dividas" }, b: { cat: "comodo", value: "Escritorio" } },
      ],
    },
    {
      id: "c2",
      text: "Quem agiu por dívidas largou a corda; e essa pessoa foi a primeira a circular, logo às 20h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Dividas" }, b: { cat: "arma", value: "Corda" } },
        { k: "same", a: { cat: "motivo", value: "Dividas" }, b: { cat: "hora", value: "20h" } },
      ],
    },
    {
      id: "c3",
      text: "O motivo da herança não se cruzou com a corda, nem com o revólver, nem com o castiçal.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "arma", value: "Corda" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "arma", value: "Revolver" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "arma", value: "Castical" } },
      ],
    },
    {
      id: "c4",
      text: "A herança não pesou sobre quem estava na biblioteca, na adega ou no salão.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "comodo", value: "Biblioteca" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "comodo", value: "Adega" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "comodo", value: "Salao" } },
      ],
    },
    {
      id: "c5",
      text: "Na estufa o relógio marcava bem mais tarde que as 20h, 21h e 22h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "comodo", value: "Estufa" }, b: { cat: "hora", value: "20h" } },
        { k: "diff", a: { cat: "comodo", value: "Estufa" }, b: { cat: "hora", value: "21h" } },
        { k: "diff", a: { cat: "comodo", value: "Estufa" }, b: { cat: "hora", value: "22h" } },
        { k: "diff", a: { cat: "comodo", value: "Estufa" }, b: { cat: "hora", value: "00h" } },
      ],
    },
    {
      id: "c6",
      text: "A adaga não esteve no escritório, no salão nem na adega.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "arma", value: "Adaga" }, b: { cat: "comodo", value: "Escritorio" } },
        { k: "diff", a: { cat: "arma", value: "Adaga" }, b: { cat: "comodo", value: "Salao" } },
        { k: "diff", a: { cat: "arma", value: "Adaga" }, b: { cat: "comodo", value: "Adega" } },
      ],
    },
    {
      id: "c7",
      text: "O Capitão jamais tocaria em adaga, castiçal, veneno ou corda — só uma arma lhe servia.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "arma", value: "Adaga", pos: 2 },
        { k: "notAt", cat: "arma", value: "Castical", pos: 2 },
        { k: "notAt", cat: "arma", value: "Veneno", pos: 2 },
        { k: "notAt", cat: "arma", value: "Corda", pos: 2 },
      ],
    },
    {
      id: "c8",
      text: "A vingança não andou de mãos dadas com adaga, castiçal, veneno ou corda — restou-lhe uma só arma.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Vinganca" }, b: { cat: "arma", value: "Adaga" } },
        { k: "diff", a: { cat: "motivo", value: "Vinganca" }, b: { cat: "arma", value: "Castical" } },
        { k: "diff", a: { cat: "motivo", value: "Vinganca" }, b: { cat: "arma", value: "Veneno" } },
        { k: "diff", a: { cat: "motivo", value: "Vinganca" }, b: { cat: "arma", value: "Corda" } },
      ],
    },
    {
      id: "c9",
      text: "Ninguém ouviu o revólver antes da meia-noite: o tiro só pôde soar às 00h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "arma", value: "Revolver" }, b: { cat: "hora", value: "20h" } },
        { k: "diff", a: { cat: "arma", value: "Revolver" }, b: { cat: "hora", value: "21h" } },
        { k: "diff", a: { cat: "arma", value: "Revolver" }, b: { cat: "hora", value: "22h" } },
        { k: "diff", a: { cat: "arma", value: "Revolver" }, b: { cat: "hora", value: "23h" } },
      ],
    },
    {
      id: "c10",
      text: "O veneno coube a quem se escondia na biblioteca, movido por ciúme.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "arma", value: "Veneno" }, b: { cat: "comodo", value: "Biblioteca" } },
        { k: "same", a: { cat: "arma", value: "Veneno" }, b: { cat: "motivo", value: "Ciume" } },
      ],
    },
    {
      id: "c11",
      text: "A chantagem rondava a adega — e por lá não se viu a Condessa.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Chantagem" }, b: { cat: "comodo", value: "Adega" } },
        { k: "notAt", cat: "comodo", value: "Adega", pos: 0 },
      ],
    },
    {
      id: "c12",
      text: "O castiçal repousava na adega; e quem o segurava não foi visto às 22h nem às 00h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "arma", value: "Castical" }, b: { cat: "comodo", value: "Adega" } },
        { k: "diff", a: { cat: "arma", value: "Castical" }, b: { cat: "hora", value: "22h" } },
        { k: "diff", a: { cat: "arma", value: "Castical" }, b: { cat: "hora", value: "00h" } },
      ],
    },
    {
      id: "c14",
      text: "O Jardineiro não estava na estufa, no escritório nem na biblioteca; tampouco agiu por herança, chantagem ou vingança.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "comodo", value: "Estufa", pos: 4 },
        { k: "notAt", cat: "comodo", value: "Escritorio", pos: 4 },
        { k: "notAt", cat: "comodo", value: "Biblioteca", pos: 4 },
        { k: "notAt", cat: "motivo", value: "Heranca", pos: 4 },
        { k: "notAt", cat: "motivo", value: "Chantagem", pos: 4 },
        { k: "notAt", cat: "motivo", value: "Vinganca", pos: 4 },
      ],
    },
    {
      id: "c15",
      text: "O Pianista não pisou na estufa, na adega nem no escritório.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "comodo", value: "Estufa", pos: 3 },
        { k: "notAt", cat: "comodo", value: "Adega", pos: 3 },
        { k: "notAt", cat: "comodo", value: "Escritorio", pos: 3 },
      ],
    },
  ],
  crime: {
    prompt: "O legista é categórico: a ferida é de adaga, o relógio parado marcava 23h e o testamento recém-aberto aponta a herança como estopim.",
    evidence: [
      { cat: "arma", value: "Adaga" },
      { cat: "hora", value: "23h" },
      { cat: "motivo", value: "Heranca" },
    ],
  },
  solution: {},
};
