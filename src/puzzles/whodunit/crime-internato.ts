import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Inspetora", "Professor", "Aluno", "Cozinheira", "Bibliotecaria"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Inspetora     -> Refeitorio  | Faca        | 23h | Heranca
//   idx 1 Professor     -> Patio       | Corda       | 00h | Bullying
//   idx 2 Aluno         -> Dormitorio  | Travesseiro | 22h | Ciume
//   idx 3 Cozinheira    -> Capela      | Veneno      | 01h | Segredo
//   idx 4 Bibliotecaria -> Biblioteca  | Castical    | 02h | Expulsao
//
// Culpado: Bibliotecaria. Evidências do crime: Castical + 02h + Expulsao.
// PREMISSA (atalho 0%): nenhuma pista fixa diretamente o castiçal, as 02h ou a expulsão
// sobre a bibliotecária. Esses três atributos são RESIDUAIS — espremidos pelas exclusões
// cruzadas que os tiram dos OUTROS suspeitos e dos OUTROS atributos. Só convergem juntos na
// bibliotecária quando a grade inteira já está resolvida (o culpado fica único na última rodada).
// ATENÇÃO: a ORDEM de declaração dos valores afeta o motor de busca (nº de nós) e, portanto,
// a dificuldade calibrada. Não reordene os arrays de valores abaixo.

export const puzzle: Puzzle = {
  id: "crime-internato",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "O crime do internato",
  story:
    "O sino das duas da manhã ainda ecoava quando o jovem herdeiro foi encontrado sem vida no internato adormecido. O legista cerra o caso em três certezas geladas: o golpe veio de um castiçal de bronze, o relógio do corredor parou às 02h, e o crime nasceu de um único pavor — o de ser expulso e perder tudo. Cinco internos velavam aquela madrugada, cada um num cômodo, com um objeto à mão, registrado num horário e movido por um motivo. Todos juram que dormiam; cada versão desmente a anterior. Reconstrua a planta inteira da noite — só então o castiçal, as 02h e o medo da expulsão convergem num único nome.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "local",
      label: "Local",
      values: ["Dormitorio", "Refeitorio", "Patio", "Capela", "Biblioteca"].map((v) => tx(v)),
    },
    {
      id: "objeto",
      label: "Objeto",
      values: ["Travesseiro", "Faca", "Corda", "Veneno", "Castical"].map((v) => tx(v)),
    },
    {
      id: "hora",
      label: "Horário",
      values: ["22h", "23h", "00h", "01h", "02h"].map((v) => tx(v)),
    },
    {
      id: "motivo",
      label: "Motivo",
      values: ["Ciume", "Heranca", "Bullying", "Segredo", "Expulsao"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "c1",
      text: "O ciúme não rondou a biblioteca, o refeitório nem o pátio.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Ciume" }, b: { cat: "local", value: "Biblioteca" } },
        { k: "diff", a: { cat: "motivo", value: "Ciume" }, b: { cat: "local", value: "Refeitorio" } },
        { k: "diff", a: { cat: "motivo", value: "Ciume" }, b: { cat: "local", value: "Patio" } },
      ],
    },
    {
      id: "c2",
      text: "Quem agiu por ciúme tinha um travesseiro nas mãos e foi registrado às 22h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Ciume" }, b: { cat: "objeto", value: "Travesseiro" } },
        { k: "same", a: { cat: "motivo", value: "Ciume" }, b: { cat: "hora", value: "22h" } },
      ],
    },
    {
      id: "c3",
      text: "O medo da expulsão não se cruzou com o travesseiro, com a faca nem com a corda.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Expulsao" }, b: { cat: "objeto", value: "Travesseiro" } },
        { k: "diff", a: { cat: "motivo", value: "Expulsao" }, b: { cat: "objeto", value: "Faca" } },
        { k: "diff", a: { cat: "motivo", value: "Expulsao" }, b: { cat: "objeto", value: "Corda" } },
      ],
    },
    {
      id: "c4",
      text: "A expulsão não pesou sobre quem estava no dormitório, no refeitório ou no pátio.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Expulsao" }, b: { cat: "local", value: "Dormitorio" } },
        { k: "diff", a: { cat: "motivo", value: "Expulsao" }, b: { cat: "local", value: "Refeitorio" } },
        { k: "diff", a: { cat: "motivo", value: "Expulsao" }, b: { cat: "local", value: "Patio" } },
      ],
    },
    {
      id: "c5",
      text: "Na biblioteca o relógio não marcava 22h, 23h, 00h nem 01h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "local", value: "Biblioteca" }, b: { cat: "hora", value: "22h" } },
        { k: "diff", a: { cat: "local", value: "Biblioteca" }, b: { cat: "hora", value: "23h" } },
        { k: "diff", a: { cat: "local", value: "Biblioteca" }, b: { cat: "hora", value: "00h" } },
        { k: "diff", a: { cat: "local", value: "Biblioteca" }, b: { cat: "hora", value: "01h" } },
      ],
    },
    {
      id: "c6",
      text: "O castiçal não esteve no dormitório, no pátio nem no refeitório.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "objeto", value: "Castical" }, b: { cat: "local", value: "Dormitorio" } },
        { k: "diff", a: { cat: "objeto", value: "Castical" }, b: { cat: "local", value: "Patio" } },
        { k: "diff", a: { cat: "objeto", value: "Castical" }, b: { cat: "local", value: "Refeitorio" } },
      ],
    },
    {
      id: "c7",
      text: "A inspetora não tocou no castiçal, no travesseiro, no veneno nem na corda — só um objeto lhe coube.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Castical", pos: 0 },
        { k: "notAt", cat: "objeto", value: "Travesseiro", pos: 0 },
        { k: "notAt", cat: "objeto", value: "Veneno", pos: 0 },
        { k: "notAt", cat: "objeto", value: "Corda", pos: 0 },
      ],
    },
    {
      id: "c8",
      text: "A herança não andou de mãos dadas com o castiçal, o travesseiro, o veneno nem a corda — restou-lhe um só objeto.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "objeto", value: "Castical" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "objeto", value: "Travesseiro" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "objeto", value: "Veneno" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "objeto", value: "Corda" } },
      ],
    },
    {
      id: "c9",
      text: "A corda não foi usada às 22h, às 23h, à 01h nem às 02h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "objeto", value: "Corda" }, b: { cat: "hora", value: "22h" } },
        { k: "diff", a: { cat: "objeto", value: "Corda" }, b: { cat: "hora", value: "23h" } },
        { k: "diff", a: { cat: "objeto", value: "Corda" }, b: { cat: "hora", value: "01h" } },
        { k: "diff", a: { cat: "objeto", value: "Corda" }, b: { cat: "hora", value: "02h" } },
      ],
    },
    {
      id: "c10",
      text: "O veneno coube a quem se escondeu na capela, guardando um segredo.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "objeto", value: "Veneno" }, b: { cat: "local", value: "Capela" } },
        { k: "same", a: { cat: "objeto", value: "Veneno" }, b: { cat: "motivo", value: "Segredo" } },
      ],
    },
    {
      id: "c11",
      text: "O bullying rondava o pátio — e por lá não esteve a bibliotecária.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Bullying" }, b: { cat: "local", value: "Patio" } },
        { k: "notAt", cat: "local", value: "Patio", pos: 4 },
      ],
    },
    {
      id: "c12",
      text: "O travesseiro ficou no dormitório; e quem o tinha não foi flagrado à 01h nem às 02h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "objeto", value: "Travesseiro" }, b: { cat: "local", value: "Dormitorio" } },
        { k: "diff", a: { cat: "objeto", value: "Travesseiro" }, b: { cat: "hora", value: "01h" } },
        { k: "diff", a: { cat: "objeto", value: "Travesseiro" }, b: { cat: "hora", value: "02h" } },
      ],
    },
    {
      id: "c13",
      text: "A cozinheira não esteve na biblioteca, no refeitório nem no dormitório; tampouco agiu por herança, bullying ou expulsão.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "local", value: "Biblioteca", pos: 3 },
        { k: "notAt", cat: "local", value: "Refeitorio", pos: 3 },
        { k: "notAt", cat: "local", value: "Dormitorio", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Heranca", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Bullying", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Expulsao", pos: 3 },
      ],
    },
    {
      id: "c14",
      text: "O professor não esteve na biblioteca, na capela nem no refeitório.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "local", value: "Biblioteca", pos: 1 },
        { k: "notAt", cat: "local", value: "Capela", pos: 1 },
        { k: "notAt", cat: "local", value: "Refeitorio", pos: 1 },
      ],
    },
    {
      id: "c15",
      text: "No dormitório o relógio marcava 22h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "local", value: "Dormitorio" }, b: { cat: "hora", value: "22h" } },
      ],
    },
    {
      id: "c16",
      text: "No refeitório o relógio marcava 23h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "local", value: "Refeitorio" }, b: { cat: "hora", value: "23h" } },
      ],
    },
    {
      id: "c17",
      text: "No pátio o relógio batia a meia-noite, 00h em ponto.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "local", value: "Patio" }, b: { cat: "hora", value: "00h" } },
      ],
    },
    {
      id: "c18",
      text: "Na capela o relógio marcava 01h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "local", value: "Capela" }, b: { cat: "hora", value: "01h" } },
      ],
    },
    {
      id: "c19",
      text: "O aluno foi consumido por ciúme.",
      highlights: [],
      constraints: [
        { k: "at", cat: "motivo", value: "Ciume", pos: 2 },
      ],
    },
  ],
  crime: {
    prompt:
      "O legista é taxativo: o golpe veio do castiçal, o relógio parou às 02h e o estopim foi o medo da expulsão.",
    evidence: [
      { cat: "objeto", value: "Castical" },
      { cat: "hora", value: "02h" },
      { cat: "motivo", value: "Expulsao" },
    ],
  },
  solution: {},
};
