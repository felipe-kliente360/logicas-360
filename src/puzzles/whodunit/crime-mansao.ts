// Caso de investigação (whodunit). Grade de solução única + evidências que apontam
// um único culpado. Validado com scripts/check.ts.
//
// PREMISSA DE DESIGN — culpado profundo (atalho 0%):
// As evidências do crime (Salão + 23h) não são fixadas por nenhuma pista direta. As
// pistas só descrevem, por eliminação tortuosa, os cômodos/objetos/horas dos outros
// três convidados; o assassino — o que sobra no salão, às 23h — só fica único quando
// a grade inteira já está resolvida. (A ordem das constraints foi calibrada para que
// Salão e 23h sejam, de fato, os últimos atributos deduzidos — não reordene à toa.)
//
// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Dona Branca       -> Cozinha    | Corda    | 20h
//   idx 1 Coronel Mostarda  -> Biblioteca | Castical | 22h
//   idx 2 Sr. Verde         -> Jardim     | Veneno   | 21h
//   idx 3 Srta. Rosa        -> Salao      | Revolver | 23h   <- culpada
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const gl = (id: string, label: string, icon: string) => ({ id, label, display: { kind: "icon" as const, icon } });
const suspeitos = ["Dona Branca", "Coronel Mostarda", "Sr. Verde", "Srta. Rosa"];

export const puzzle: Puzzle = {
  id: "crime-mansao",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 4,
  title: "Crime na mansão",
  story:
    "O velho colecionador foi encontrado sem vida em seu escritório. Quatro convidados passaram a noite na mansão — cada um num cômodo, com um objeto, a uma certa hora. O legista crava a morte às 23h, e foi no salão que o golpe partiu. As testemunhas só falam por descarte: ninguém aponta o salão nem as 23h diretamente. Reconstrua a noite inteira e veja quem sobra.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "comodo", label: "Cômodo", values: ["Cozinha", "Biblioteca", "Jardim", "Salao"].map((v) => tx(v, v === "Salao" ? "Salão" : v)) },
    { id: "objeto", label: "Objeto", values: [gl("Corda", "Corda", "corda"), gl("Castical", "Castiçal", "castical"), gl("Veneno", "Veneno", "veneno"), gl("Revolver", "Revólver", "revolver")] },
    { id: "hora", label: "Horário", values: ["20h", "21h", "22h", "23h"].map((v) => tx(v)) },
  ],
  // NB: a ordem das constraints (no flatMap das pistas) é proposital — mantém atalho 0%.
  clues: [
    {
      id: "c1",
      text: "Na cozinha não se viu o último a se recolher; e o castiçal não esteve nem com o último, nem com quem ficou no jardim.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "comodo", value: "Cozinha", pos: 3 },
        { k: "notAt", cat: "objeto", value: "Castical", pos: 3 },
        { k: "notAt", cat: "objeto", value: "Castical", pos: 2 },
      ],
    },
    {
      id: "c2",
      text: "O Sr. Verde, no jardim, levava o frasco de veneno; e o revólver não pertencia ao Coronel Mostarda, que passou a noite na biblioteca.",
      highlights: [],
      constraints: [
        { k: "at", cat: "objeto", value: "Veneno", pos: 2 },
        { k: "notAt", cat: "objeto", value: "Revolver", pos: 1 },
        { k: "at", cat: "comodo", value: "Biblioteca", pos: 1 },
      ],
    },
    {
      id: "c3",
      text: "O último convidado, o das 23h, não carregava o castiçal — e o Sr. Verde, o do veneno, estava mesmo no jardim, não na biblioteca.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "hora", value: "22h", pos: 3 },
        { k: "at", cat: "comodo", value: "Jardim", pos: 2 },
        { k: "notAt", cat: "objeto", value: "Corda", pos: 3 },
        { k: "notAt", cat: "comodo", value: "Biblioteca", pos: 2 },
      ],
    },
    {
      id: "c4",
      text: "Na cozinha não havia revólver, nem veneno, nem castiçal: lá estava Dona Branca, a primeira convidada, com um pedaço de corda.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "comodo", value: "Cozinha" }, b: { cat: "objeto", value: "Revolver" } },
        { k: "at", cat: "objeto", value: "Corda", pos: 0 },
        { k: "diff", a: { cat: "comodo", value: "Cozinha" }, b: { cat: "objeto", value: "Veneno" } },
        { k: "diff", a: { cat: "comodo", value: "Cozinha" }, b: { cat: "objeto", value: "Castical" } },
      ],
    },
    {
      id: "c5",
      text: "O veneno não coube à primeira convidada; quem ficou na cozinha foi vista logo às 20h; o relógio não marcava 22h para quem desceu ao jardim; e ninguém apontou o jardim como o cômodo das 23h.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Veneno", pos: 0 },
        { k: "same", a: { cat: "comodo", value: "Cozinha" }, b: { cat: "hora", value: "20h" } },
        { k: "notAt", cat: "hora", value: "22h", pos: 2 },
        { k: "diff", a: { cat: "comodo", value: "Jardim" }, b: { cat: "hora", value: "23h" } },
      ],
    },
    {
      id: "c6",
      text: "O salão não foi ocupado pela primeira convidada.",
      highlights: [],
      constraints: [{ k: "notAt", cat: "comodo", value: "Salao", pos: 0 }],
    },
  ],
  crime: {
    prompt: "O legista crava a morte às 23h, e foi no salão que o golpe partiu.",
    evidence: [
      { cat: "comodo", value: "Salao" },
      { cat: "hora", value: "23h" },
    ],
  },
  solution: {},
};
