import type { Puzzle } from "../../engine/types";
const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const suspeitos = ["Helena", "Caio", "Otávio", "Lúcia"];
export const puzzle: Puzzle = {
  id: "roubo-museu", kind: "whodunit", source: "investigacao", themeId: "dossie",
  difficulty: 0, size: 4, title: "Roubo no museu",
  story:
    "À meia-noite, a Coroa de Âmbar sumiu da vitrine. Quatro vigias estavam de plantão, cada um numa sala e usando um disfarce diferente. Descubra onde cada um estava — e quem levou a peça.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "sala", label: "Sala", values: ["Egípcia", "Renascença", "Moderna", "Acervo"].map((v) => tx(v)) },
    { id: "disfarce", label: "Disfarce", values: ["Uniforme", "Terno", "Macacão", "Capa"].map((v) => tx(v)) },
  ],
  clues: [
    { id: "c1", text: "Helena assinou o ponto na Sala Egípcia.", highlights: [], constraints: [{ k: "at", cat: "sala", value: "Egípcia", pos: 0 }] },
    { id: "c2", text: "Quem rondava a Sala Egípcia vestia o uniforme padrão.", highlights: [], constraints: [{ k: "same", a: { cat: "sala", value: "Egípcia" }, b: { cat: "disfarce", value: "Uniforme" } }] },
    { id: "c3", text: "Caio não foi escalado para a Sala Renascença.", highlights: [], constraints: [{ k: "notAt", cat: "sala", value: "Renascença", pos: 1 }] },
    { id: "c4", text: "O vigia da Sala Moderna usava um terno escuro.", highlights: [], constraints: [{ k: "same", a: { cat: "sala", value: "Moderna" }, b: { cat: "disfarce", value: "Terno" } }] },
    { id: "c5", text: "Otávio estava de macacão de manutenção, e não foi quem ficou no Acervo.", highlights: [], constraints: [{ k: "at", cat: "disfarce", value: "Macacão", pos: 2 }, { k: "notAt", cat: "sala", value: "Acervo", pos: 2 }] },
    { id: "c6", text: "A pessoa de capa comprida cuidava do Acervo trancado.", highlights: [], constraints: [{ k: "same", a: { cat: "disfarce", value: "Capa" }, b: { cat: "sala", value: "Acervo" } }] },
    { id: "c7", text: "Lúcia não estava na Sala Moderna naquela noite.", highlights: [], constraints: [{ k: "notAt", cat: "sala", value: "Moderna", pos: 3 }] },
  ],
  crime: {
    prompt: "As lentes da segurança flagraram, na sala do Acervo trancado, um vulto de capa comprida escapando com algo a reluzir. Cruzando o Acervo com a capa, quem roubou a Coroa de Âmbar?",
    evidence: [{ cat: "sala", value: "Acervo" }, { cat: "disfarce", value: "Capa" }],
  },
  solution: {},
};
