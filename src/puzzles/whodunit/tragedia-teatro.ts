import type { Puzzle } from "../../engine/types";
const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const suspeitos = ["Vera", "Otavio", "Hugo", "Lucia"];
export const puzzle: Puzzle = {
  id: "tragedia-teatro", kind: "whodunit", source: "investigacao", themeId: "dossie",
  difficulty: 0, size: 4, title: "Tragedia no teatro",
  story: "Na noite de estreia, um ator foi encontrado morto nos bastidores. Quatro pessoas circulavam pelo teatro, cada uma num local, com um objeto, em determinado horario. Descubra a posicao de cada uma — e quem cometeu o crime.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "local", label: "Local", values: ["Camarim","Coxia","Fosso","Deposito"].map((v)=>tx(v)) },
    { id: "objeto", label: "Objeto", values: ["Adaga","Corda","Frasco","Castical"].map((v)=>tx(v)) },
    { id: "hora",   label: "Horario", values: ["19h","20h","21h","22h"].map((v)=>tx(v)) },
  ],
  clues: [
    { id:"c1", text:"A atriz Vera ficou retocando a maquiagem no camarim.", highlights:[], constraints:[{k:"at",cat:"local",value:"Camarim",pos:0}] },
    { id:"c2", text:"No camarim, sobre a penteadeira, repousava uma adaga de cena.", highlights:[], constraints:[{k:"same",a:{cat:"local",value:"Camarim"},b:{cat:"objeto",value:"Adaga"}}] },
    { id:"c3", text:"O diretor Otavio supervisionava tudo da coxia, ao lado do palco.", highlights:[], constraints:[{k:"at",cat:"local",value:"Coxia",pos:1}] },
    { id:"c4", text:"Quem estava na coxia segurava uma corda de cenario.", highlights:[], constraints:[{k:"same",a:{cat:"local",value:"Coxia"},b:{cat:"objeto",value:"Corda"}}] },
    { id:"c5", text:"O frasco de veneno foi visto com quem descera ao fosso da orquestra.", highlights:[], constraints:[{k:"same",a:{cat:"objeto",value:"Frasco"},b:{cat:"local",value:"Fosso"}}] },
    { id:"c6", text:"A camareira Lucia nao chegou perto do fosso naquela noite.", highlights:[], constraints:[{k:"notAt",cat:"local",value:"Fosso",pos:3}] },
    { id:"c7", text:"O maestro Hugo nao pisou no deposito de figurinos.", highlights:[], constraints:[{k:"notAt",cat:"local",value:"Deposito",pos:2}] },
    { id:"c8", text:"Vera foi vista logo no inicio, as 19h.", highlights:[], constraints:[{k:"at",cat:"hora",value:"19h",pos:0}] },
    { id:"c9", text:"O diretor Otavio nao foi visto as 22h nem permaneceu ate o fim.", highlights:[], constraints:[{k:"notAt",cat:"hora",value:"22h",pos:1}] },
    { id:"c10", text:"Quem desceu ao fosso foi avistado as 21h.", highlights:[], constraints:[{k:"same",a:{cat:"local",value:"Fosso"},b:{cat:"hora",value:"21h"}}] },
    { id:"c11", text:"O castical do altar de cena estava no deposito de figurinos.", highlights:[], constraints:[{k:"same",a:{cat:"objeto",value:"Castical"},b:{cat:"local",value:"Deposito"}}] },
  ],
  crime: { prompt: "Quem matou o ator na noite de estreia?", evidence: [{cat:"local",value:"Fosso"},{cat:"hora",value:"21h"}] },
  solution: {},
};
