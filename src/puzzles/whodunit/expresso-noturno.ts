import type { Puzzle } from "../../engine/types";
const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const suspeitos = ["Coronel Adler", "Viúva Castro", "Doutor Esteves", "Madame Lorca", "Maestro Brun"];
export const puzzle: Puzzle = {
  id: "expresso-noturno", kind: "whodunit", source: "investigacao", themeId: "dossie",
  difficulty: 0, size: 5, title: "O Expresso Noturno",
  story: "Durante a travessia do Expresso Noturno, um passageiro foi encontrado sem vida. Cinco viajantes ocupavam as cabines do vagão-leito, cada um portando um objeto e tendo se recolhido a um horário diferente. Descubra quem estava em cada cabine, com o quê e a que hora — e quem cometeu o crime.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "cabine", label: "Cabine", values: ["Cabine 1","Cabine 2","Cabine 3","Cabine 4","Cabine 5"].map((v)=>tx(v)) },
    { id: "objeto", label: "Objeto", values: ["Bengala","Lenco de seda","Frasco","Relogio","Charuto"].map((v)=>tx(v)) },
    { id: "hora",   label: "Horário", values: ["22h","23h","00h","01h","02h"].map((v)=>tx(v)) },
  ],
  clues: [
    { id:"c1", text:"O Maestro Brun não se recolheu antes da meia-noite, tampouco esteve nas duas primeiras cabines.", highlights:[], constraints:[{k:"notAt",cat:"hora",value:"22h",pos:4},{k:"notAt",cat:"hora",value:"23h",pos:4},{k:"notAt",cat:"cabine",value:"Cabine 1",pos:4},{k:"notAt",cat:"cabine",value:"Cabine 2",pos:4}] },
    { id:"c2", text:"O passageiro que portava o frasco recolheu-se à meia-noite em ponto.", highlights:[], constraints:[{k:"same",a:{cat:"objeto",value:"Frasco"},b:{cat:"hora",value:"00h"}}] },
    { id:"c3", text:"A Viúva Castro não levava o frasco, nem a bengala, nem o charuto.", highlights:[], constraints:[{k:"notAt",cat:"objeto",value:"Frasco",pos:1},{k:"notAt",cat:"objeto",value:"Bengala",pos:1},{k:"notAt",cat:"objeto",value:"Charuto",pos:1}] },
    { id:"c4", text:"O dono do relógio não ocupava a Cabine 3 nem a Cabine 5.", highlights:[], constraints:[{k:"notAt",cat:"objeto",value:"Relogio",pos:0},{k:"diff",a:{cat:"objeto",value:"Relogio"},b:{cat:"cabine",value:"Cabine 3"}},{k:"diff",a:{cat:"objeto",value:"Relogio"},b:{cat:"cabine",value:"Cabine 5"}}] },
    { id:"c5", text:"A Madame Lorca foi vista na Cabine 3, mas o lenço de seda não era dela.", highlights:[], constraints:[{k:"at",cat:"cabine",value:"Cabine 3",pos:3},{k:"notAt",cat:"objeto",value:"Lenco de seda",pos:3}] },
    { id:"c6", text:"Quem guardava o lenço de seda recolheu-se às 22h.", highlights:[], constraints:[{k:"same",a:{cat:"objeto",value:"Lenco de seda"},b:{cat:"hora",value:"22h"}}] },
    { id:"c7", text:"O Coronel Adler não se recolheu à meia-noite e não estava na Cabine 4.", highlights:[], constraints:[{k:"notAt",cat:"hora",value:"00h",pos:0},{k:"notAt",cat:"cabine",value:"Cabine 4",pos:0}] },
    { id:"c8", text:"A bengala não estava na Cabine 1 nem na Cabine 4.", highlights:[], constraints:[{k:"diff",a:{cat:"objeto",value:"Bengala"},b:{cat:"cabine",value:"Cabine 1"}},{k:"diff",a:{cat:"objeto",value:"Bengala"},b:{cat:"cabine",value:"Cabine 4"}}] },
    { id:"c9", text:"O Doutor Esteves recolheu-se à 01h.", highlights:[], constraints:[{k:"at",cat:"hora",value:"01h",pos:2}] },
    { id:"c10", text:"O charuto pertencia a quem se recolheu mais tarde, às 02h.", highlights:[], constraints:[{k:"same",a:{cat:"objeto",value:"Charuto"},b:{cat:"hora",value:"02h"}}] },
    { id:"c11", text:"A Viúva Castro não se recolheu às 02h.", highlights:[], constraints:[{k:"notAt",cat:"hora",value:"02h",pos:1}] },
    { id:"c12", text:"O Coronel Adler não portava o charuto.", highlights:[], constraints:[{k:"notAt",cat:"objeto",value:"Charuto",pos:0}] },
    { id:"c13", text:"O charuto não foi encontrado na Cabine 3.", highlights:[], constraints:[{k:"diff",a:{cat:"objeto",value:"Charuto"},b:{cat:"cabine",value:"Cabine 3"}}] },
    { id:"c14", text:"A bengala não pertencia a quem se recolheu às 23h.", highlights:[], constraints:[{k:"diff",a:{cat:"objeto",value:"Bengala"},b:{cat:"hora",value:"23h"}}] },
    { id:"c15", text:"O frasco não estava guardado na Cabine 5.", highlights:[], constraints:[{k:"diff",a:{cat:"objeto",value:"Frasco"},b:{cat:"cabine",value:"Cabine 5"}}] },
    { id:"c16", text:"O charuto não foi achado na Cabine 4.", highlights:[], constraints:[{k:"diff",a:{cat:"objeto",value:"Charuto"},b:{cat:"cabine",value:"Cabine 4"}}] },
    { id:"c17", text:"O Coronel Adler não portava a bengala.", highlights:[], constraints:[{k:"notAt",cat:"objeto",value:"Bengala",pos:0}] },
  ],
  crime: { prompt: "O legista fixou a morte às 22h em ponto, e o vagão de serviço confirmou: a cabine de origem do bilhete fatal foi a Cabine 1.", evidence: [{cat:"cabine",value:"Cabine 1"},{cat:"hora",value:"22h"}] },
  solution: {},
};
