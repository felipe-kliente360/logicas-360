// Caso de investigação (whodunit). Grade de solução única + evidências que apontam
// um único culpado. Validado com scripts/check.ts.
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
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
    "O velho colecionador foi encontrado sem vida em seu escritório. Quatro convidados passaram a noite na mansão — cada um num cômodo, com um objeto, a uma certa hora. Reconstrua a noite e aponte o culpado.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "comodo", label: "Cômodo", values: ["Cozinha", "Biblioteca", "Jardim", "Salao"].map((v) => tx(v, v === "Salao" ? "Salão" : v)) },
    { id: "objeto", label: "Objeto", values: ["Corda", "Castical", "Veneno", "Revolver"].map((v) => tx(v, v === "Castical" ? "Castiçal" : v === "Revolver" ? "Revólver" : v)) },
    { id: "hora", label: "Horário", values: ["20h", "21h", "22h", "23h"].map((v) => tx(v)) },
  ],
  clues: [
    { id: "c1", text: "O Coronel Mostarda foi visto na biblioteca.", highlights: [], constraints: [{ k: "at", cat: "comodo", value: "Biblioteca", pos: 1 }] },
    { id: "c2", text: "Na biblioteca, o objeto sobre a mesa era o castiçal.", highlights: [], constraints: [{ k: "same", a: { cat: "comodo", value: "Biblioteca" }, b: { cat: "objeto", value: "Castical" } }] },
    { id: "c3", text: "O frasco de veneno estava com quem ficou no jardim.", highlights: [], constraints: [{ k: "same", a: { cat: "objeto", value: "Veneno" }, b: { cat: "comodo", value: "Jardim" } }] },
    { id: "c4", text: "Dona Branca preparava um chá na cozinha.", highlights: [], constraints: [{ k: "at", cat: "comodo", value: "Cozinha", pos: 0 }] },
    { id: "c5", text: "Na cozinha havia um pedaço de corda.", highlights: [], constraints: [{ k: "same", a: { cat: "comodo", value: "Cozinha" }, b: { cat: "objeto", value: "Corda" } }] },
    { id: "c6", text: "O Sr. Verde cuidava das plantas no jardim.", highlights: [], constraints: [{ k: "at", cat: "comodo", value: "Jardim", pos: 2 }] },
    { id: "c7", text: "Dona Branca foi vista às 20h.", highlights: [], constraints: [{ k: "at", cat: "hora", value: "20h", pos: 0 }] },
    { id: "c8", text: "O Coronel Mostarda foi visto às 22h.", highlights: [], constraints: [{ k: "at", cat: "hora", value: "22h", pos: 1 }] },
    { id: "c9", text: "Quem estava no jardim foi visto às 21h.", highlights: [], constraints: [{ k: "same", a: { cat: "comodo", value: "Jardim" }, b: { cat: "hora", value: "21h" } }] },
  ],
  crime: {
    prompt: "Quem matou o colecionador?",
    evidence: [
      { cat: "comodo", value: "Biblioteca" },
      { cat: "hora", value: "22h" },
    ],
  },
  solution: {},
};
