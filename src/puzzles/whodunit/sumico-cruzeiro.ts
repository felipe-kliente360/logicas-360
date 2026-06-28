import type { Puzzle } from "../../engine/types";
const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Comandante Vasco", "Cantora Dione", "Mergulhador Pou", "Crooner Sales", "Herdeira Munoz"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Comandante Vasco -> Ponte     | Bussola  | 22h   <- CULPADO (Ponte + 22h)
//   idx 1 Cantora Dione    -> Maquinas  | Binoculo | 23h
//   idx 2 Mergulhador Pou  -> Bar       | Corda    | 01h
//   idx 3 Crooner Sales    -> Conves    | Cantil   | 00h
//   idx 4 Herdeira Munoz   -> Camarote  | Lanterna | 02h
//
// Culpado: Comandante Vasco (Ponte + 22h) — evidências do sumiço.
// Nenhuma pista fixa Ponte/22h direto no Comandante: a dupla só fica única quando a
// grade está praticamente resolvida (atalho 0%). Topologia transliterada de
// "expresso-noturno" (5×3, raw ~5.9 = nível 6), mantida solta.

export const puzzle: Puzzle = {
  id: "sumico-cruzeiro",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "Sumiço no cruzeiro",
  story:
    "Em alto-mar, no meio da travessia, uma passageira simplesmente desapareceu do cruzeiro. Naquela noite, cinco pessoas vagavam pelo navio — cada uma num ponto da embarcação, carregando um objeto e tendo sido vista pela última vez num horário diferente. O diário de bordo está rasurado, a tripulação troca olhares e o mar guarda silêncio. Reconstrua a noite inteira — local, objeto e hora — e só então o responsável pelo sumiço emergirá das sombras do convés.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "local", label: "Local", values: ["Ponte", "Bar", "Conves", "Maquinas", "Camarote"].map((v) => tx(v, v === "Maquinas" ? "Casa de Máquinas" : v === "Conves" ? "Convés" : v)) },
    { id: "objeto", label: "Objeto", values: ["Bussola", "Binoculo", "Corda", "Cantil", "Lanterna"].map((v) => tx(v, v === "Bussola" ? "Bússola" : v === "Binoculo" ? "Binóculo" : v)) },
    { id: "hora", label: "Horário", values: ["22h", "23h", "00h", "01h", "02h"].map((v) => tx(v)) },
  ],
  clues: [
    // c1 <- expresso c1 (Brun idx4): não 22h/23h; não Cabine1/Cabine2 => Munoz: não 22h/23h; não Ponte/Bar
    { id: "c1", text: "A Herdeira Munoz não foi vista antes da meia-noite, tampouco na ponte de comando ou no bar.", highlights: [], constraints: [{ k: "notAt", cat: "hora", value: "22h", pos: 4 }, { k: "notAt", cat: "hora", value: "23h", pos: 4 }, { k: "notAt", cat: "local", value: "Ponte", pos: 4 }, { k: "notAt", cat: "local", value: "Bar", pos: 4 }] },
    // c2 <- Frasco<->00h => Cantil<->00h
    { id: "c2", text: "Quem levava o cantil foi visto à meia-noite em ponto.", highlights: [], constraints: [{ k: "same", a: { cat: "objeto", value: "Cantil" }, b: { cat: "hora", value: "00h" } }] },
    // c3 <- expresso c3 (Castro idx1): não Frasco/Bengala/Charuto => Dione: não Cantil/Corda/Lanterna
    { id: "c3", text: "A Cantora Dione não carregava o cantil, nem a corda, nem a lanterna.", highlights: [], constraints: [{ k: "notAt", cat: "objeto", value: "Cantil", pos: 1 }, { k: "notAt", cat: "objeto", value: "Corda", pos: 1 }, { k: "notAt", cat: "objeto", value: "Lanterna", pos: 1 }] },
    // c4 <- expresso c4 (Relogio): não idx0; não Cabine3/Cabine5 => Binoculo: não Vasco; não Conves/Camarote
    { id: "c4", text: "O dono do binóculo não era o comandante, e o binóculo não esteve no convés nem no camarote.", highlights: [], constraints: [{ k: "notAt", cat: "objeto", value: "Binoculo", pos: 0 }, { k: "diff", a: { cat: "objeto", value: "Binoculo" }, b: { cat: "local", value: "Conves" } }, { k: "diff", a: { cat: "objeto", value: "Binoculo" }, b: { cat: "local", value: "Camarote" } }] },
    // c5 <- expresso c5 (Lorca idx3 at Cabine3; não Lenco) => Sales: não Ponte/Bar/Maquinas/Camarote (=> Conves); não Bussola
    { id: "c5", text: "O Crooner Sales não foi visto na ponte, no bar, na casa de máquinas nem no camarote — e a bússola não era dele.", highlights: [], constraints: [{ k: "notAt", cat: "local", value: "Ponte", pos: 3 }, { k: "notAt", cat: "local", value: "Bar", pos: 3 }, { k: "notAt", cat: "local", value: "Maquinas", pos: 3 }, { k: "notAt", cat: "local", value: "Camarote", pos: 3 }, { k: "notAt", cat: "objeto", value: "Bussola", pos: 3 }] },
    // c6 <- Lenco<->22h => Bussola<->22h
    { id: "c6", text: "Quem segurava a bússola foi visto às 22h.", highlights: [], constraints: [{ k: "same", a: { cat: "objeto", value: "Bussola" }, b: { cat: "hora", value: "22h" } }] },
    // c7 <- expresso c7 (Adler idx0): não 00h; não Cabine4 => Vasco: não 00h; não Maquinas
    { id: "c7", text: "O Comandante Vasco não foi visto à meia-noite e não desceu à casa de máquinas.", highlights: [], constraints: [{ k: "notAt", cat: "hora", value: "00h", pos: 0 }, { k: "notAt", cat: "local", value: "Maquinas", pos: 0 }] },
    // c8 <- expresso c8 (Bengala: não Cabine1/Cabine4) => Corda: não Ponte/Maquinas
    { id: "c8", text: "A corda não foi vista na ponte de comando nem na casa de máquinas.", highlights: [], constraints: [{ k: "diff", a: { cat: "objeto", value: "Corda" }, b: { cat: "local", value: "Ponte" } }, { k: "diff", a: { cat: "objeto", value: "Corda" }, b: { cat: "local", value: "Maquinas" } }] },
    // c9 <- expresso c9 (Esteves idx2 at 01h) => Pou at 01h
    { id: "c9", text: "O Mergulhador Pou foi visto à 01h.", highlights: [], constraints: [{ k: "at", cat: "hora", value: "01h", pos: 2 }] },
    // c10 <- Charuto<->02h => Lanterna<->02h
    { id: "c10", text: "A lanterna pertencia a quem foi visto por último, às 02h.", highlights: [], constraints: [{ k: "same", a: { cat: "objeto", value: "Lanterna" }, b: { cat: "hora", value: "02h" } }] },
    // c11 <- expresso c11 (Castro idx1 não 02h) => Dione não 02h
    { id: "c11", text: "A Cantora Dione não foi vista às 02h.", highlights: [], constraints: [{ k: "notAt", cat: "hora", value: "02h", pos: 1 }] },
    // c12 <- expresso c12 (Adler idx0 não Charuto) => Vasco não Lanterna
    { id: "c12", text: "O Comandante Vasco não carregava a lanterna.", highlights: [], constraints: [{ k: "notAt", cat: "objeto", value: "Lanterna", pos: 0 }] },
    // c13 <- expresso c13 (Charuto não Cabine3) => Lanterna não Conves
    { id: "c13", text: "A lanterna não foi vista no convés.", highlights: [], constraints: [{ k: "diff", a: { cat: "objeto", value: "Lanterna" }, b: { cat: "local", value: "Conves" } }] },
    // c14 <- expresso c14 (Bengala não 23h) => Corda não 23h
    { id: "c14", text: "A corda não era de quem foi visto às 23h.", highlights: [], constraints: [{ k: "diff", a: { cat: "objeto", value: "Corda" }, b: { cat: "hora", value: "23h" } }] },
    // c15 <- expresso c15 (Frasco não Cabine5) => Cantil não Camarote
    { id: "c15", text: "O cantil não foi visto no camarote.", highlights: [], constraints: [{ k: "diff", a: { cat: "objeto", value: "Cantil" }, b: { cat: "local", value: "Camarote" } }] },
    // c16 <- expresso c16 (Charuto não Cabine4) => Lanterna não Maquinas
    { id: "c16", text: "A lanterna não foi vista na casa de máquinas.", highlights: [], constraints: [{ k: "diff", a: { cat: "objeto", value: "Lanterna" }, b: { cat: "local", value: "Maquinas" } }] },
    // c17 <- expresso c17 (Adler não Bengala) => Vasco não Corda
    { id: "c17", text: "O Comandante Vasco não carregava a corda.", highlights: [], constraints: [{ k: "notAt", cat: "objeto", value: "Corda", pos: 0 }] },
  ],
  crime: {
    prompt: "As buscas fixaram o sumiço às 22h em ponto, e a última imagem da vítima foi captada na ponte de comando.",
    evidence: [
      { cat: "local", value: "Ponte" },
      { cat: "hora", value: "22h" },
    ],
  },
  solution: {},
};
