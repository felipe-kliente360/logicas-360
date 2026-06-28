// Caso de investigação (whodunit). Grade de solução única + evidências que apontam
// um único culpado. Validado com scripts/check.ts.
//
// PREMISSA DE DESIGN — culpado profundo (atalho 0%):
// As evidências do crime (Depósito + 22h) não são fixadas por nenhuma pista direta.
// As pistas só descrevem, por descarte, os locais/objetos/horas de quem circulava
// pelo camarim, pela coxia e pelo fosso; quem ficou no depósito, às 22h, só sobra
// quando a noite inteira já foi reconstruída. (A ordem das constraints foi calibrada
// para que Depósito e 22h sejam os últimos atributos deduzidos — não reordene à toa.)
//
// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Vera   -> Camarim   | Adaga    | 19h
//   idx 1 Otavio -> Coxia     | Corda    | 21h
//   idx 2 Hugo   -> Fosso     | Frasco   | 20h
//   idx 3 Lucia  -> Deposito  | Castical | 22h   <- culpada
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const suspeitos = ["Vera", "Otavio", "Hugo", "Lucia"];

export const puzzle: Puzzle = {
  id: "tragedia-teatro",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 4,
  title: "Tragedia no teatro",
  story:
    "Na noite de estreia, um ator foi encontrado morto nos bastidores. Quatro pessoas circulavam pelo teatro, cada uma num local, com um objeto, em determinado horario. O legista crava a morte as 22h, e foi no deposito de figurinos que o corpo caiu. As testemunhas so falam por descarte: ninguem aponta o deposito nem as 22h diretamente. Reconstrua a noite inteira e veja quem sobra.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "local", label: "Local", values: ["Camarim", "Coxia", "Fosso", "Deposito"].map((v) => tx(v, v === "Deposito" ? "Depósito" : v)) },
    { id: "objeto", label: "Objeto", values: ["Adaga", "Corda", "Frasco", "Castical"].map((v) => tx(v, v === "Castical" ? "Castiçal" : v)) },
    { id: "hora", label: "Horario", values: ["19h", "20h", "21h", "22h"].map((v) => tx(v)) },
  ],
  // NB: a ordem das constraints (no flatMap das pistas) é proposital — mantém atalho 0%.
  clues: [
    {
      id: "c1",
      text: "No camarim não estava o último a deixar o teatro; e a corda não foi vista nem com esse último, nem com quem desceu ao fosso.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "local", value: "Camarim", pos: 3 },
        { k: "notAt", cat: "objeto", value: "Corda", pos: 3 },
        { k: "notAt", cat: "objeto", value: "Corda", pos: 2 },
      ],
    },
    {
      id: "c2",
      text: "No fosso da orquestra surgiu um frasco de veneno; o castiçal não pertencia ao diretor Otavio, que comandava tudo da coxia.",
      highlights: [],
      constraints: [
        { k: "at", cat: "objeto", value: "Frasco", pos: 2 },
        { k: "notAt", cat: "objeto", value: "Castical", pos: 1 },
        { k: "at", cat: "local", value: "Coxia", pos: 1 },
      ],
    },
    {
      id: "c3",
      text: "O último a sair, o das 22h, não foi visto às 21h; quem levava o frasco estava mesmo no fosso, não na coxia; e a adaga não era do último.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "hora", value: "21h", pos: 3 },
        { k: "at", cat: "local", value: "Fosso", pos: 2 },
        { k: "notAt", cat: "objeto", value: "Adaga", pos: 3 },
        { k: "notAt", cat: "local", value: "Coxia", pos: 2 },
      ],
    },
    {
      id: "c4",
      text: "No camarim não havia castiçal, nem frasco, nem corda: ali estava a atriz Vera, retocando a maquiagem com uma adaga de cena sobre a penteadeira.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "local", value: "Camarim" }, b: { cat: "objeto", value: "Castical" } },
        { k: "at", cat: "objeto", value: "Adaga", pos: 0 },
        { k: "diff", a: { cat: "local", value: "Camarim" }, b: { cat: "objeto", value: "Frasco" } },
        { k: "diff", a: { cat: "local", value: "Camarim" }, b: { cat: "objeto", value: "Corda" } },
      ],
    },
    {
      id: "c5",
      text: "O frasco não coube a quem chegou primeiro; quem ficou no camarim foi vista logo na abertura, às 19h; ninguém viu o fosso movimentado às 21h; e o fosso também não era o local das 22h.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Frasco", pos: 0 },
        { k: "same", a: { cat: "local", value: "Camarim" }, b: { cat: "hora", value: "19h" } },
        { k: "notAt", cat: "hora", value: "21h", pos: 2 },
        { k: "diff", a: { cat: "local", value: "Fosso" }, b: { cat: "hora", value: "22h" } },
      ],
    },
    {
      id: "c6",
      text: "O depósito de figurinos não foi ocupado pela primeira a chegar.",
      highlights: [],
      constraints: [{ k: "notAt", cat: "local", value: "Deposito", pos: 0 }],
    },
  ],
  crime: {
    prompt: "O legista crava a morte às 22h, e o corpo caiu no depósito de figurinos. Cruzando o depósito com as 22h, quem matou o ator na noite de estreia?",
    evidence: [
      { cat: "local", value: "Deposito" },
      { cat: "hora", value: "22h" },
    ],
  },
  solution: {},
};
