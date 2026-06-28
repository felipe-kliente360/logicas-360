import type { Puzzle } from "../../engine/types";
const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const suspeitos = ["Dona Rosa", "Seu Tonho", "Bia"];
export const puzzle: Puzzle = {
  id: "sumico-padaria", kind: "whodunit", source: "investigacao", themeId: "dossie",
  difficulty: 0, size: 3, title: "O sumiço na padaria",
  story: "A última coxinha quentinha sumiu do balcão da padaria! Três fregueses estavam por perto, cada um num cantinho do salão, cada um beliscando um quitute. Descubra quem estava onde, comendo o quê — e quem surrupiou a coxinha.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "lugar", label: "Lugar", values: ["Balcao","Mesa da janela","Forno"].map((v)=>tx(v)) },
    { id: "item",  label: "Item",  values: ["Cafezinho","Pao de queijo","Sonho"].map((v)=>tx(v)) },
  ],
  clues: [
    { id:"c1", text:"Dona Rosa estava bem encostada no balcão.", highlights:[], constraints:[{k:"at",cat:"lugar",value:"Balcao",pos:0}] },
    { id:"c2", text:"Seu Tonho ficou parado perto do forno.", highlights:[], constraints:[{k:"at",cat:"lugar",value:"Forno",pos:1}] },
    { id:"c3", text:"Bia ficou na mesa da janela o tempo todo.", highlights:[], constraints:[{k:"at",cat:"lugar",value:"Mesa da janela",pos:2}] },
    { id:"c4", text:"Dona Rosa devorava um pão de queijo.", highlights:[], constraints:[{k:"at",cat:"item",value:"Pao de queijo",pos:0}] },
    { id:"c5", text:"Seu Tonho mordiscava um sonho.", highlights:[], constraints:[{k:"at",cat:"item",value:"Sonho",pos:1}] },
    { id:"c6", text:"Bia saboreava um cafezinho.", highlights:[], constraints:[{k:"at",cat:"item",value:"Cafezinho",pos:2}] },
  ],
  crime: { prompt: "A câmera da padaria flagrou, bem no balcão, o vulto que abocanhou a última coxinha ainda quentinha.", evidence: [{cat:"lugar",value:"Balcao"}] },
  solution: {},
};
