import type { Puzzle } from "../../engine/types";
const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Gerente Sa", "Turista Ono", "Viuva Prado", "Garcom Lima", "Hospede Rocha"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Gerente Sa     -> Suite   | Vinho     | 19h   <- CULPADO (Suite + 19h)
//   idx 1 Turista Ono    -> Piscina | Champanhe | 20h
//   idx 2 Viuva Prado    -> Varanda | Uisque    | 22h
//   idx 3 Garcom Lima    -> Terraco | Cafe      | 21h
//   idx 4 Hospede Rocha  -> Saguao  | Agua      | 23h
//
// Culpado: Gerente Sá (Suíte + 19h) — evidências do crime.
// Nenhuma pista fixa Suíte/19h direto no Gerente: a dupla só fica única quando a
// grade está praticamente resolvida (atalho 0%). Topologia transliterada de
// "expresso-noturno" (5×3, atalho 0%), depois afrouxada para o nível 5.

export const puzzle: Puzzle = {
  id: "hotel-beira-mar",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "Morte no hotel à beira-mar",
  story:
    "O mar batia nas rochas quando um hóspede foi encontrado sem vida no velho hotel à beira-mar. Naquela noite, cinco pessoas circulavam pelos seus recantos — cada uma num ambiente, com uma bebida na mão e tendo sido vista pela última vez num horário diferente. O recepcionista anota meias-verdades, as ondas abafam os gritos e ninguém viu nada. Reconstrua a noite — ambiente, bebida e hora — e o nome do culpado virá com a maré.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "ambiente", label: "Ambiente", values: ["Suite", "Varanda", "Terraco", "Piscina", "Saguao"].map((v) => tx(v)) },
    { id: "bebida", label: "Bebida", values: ["Vinho", "Champanhe", "Uisque", "Cafe", "Agua"].map((v) => tx(v)) },
    { id: "hora", label: "Horário", values: ["19h", "20h", "21h", "22h", "23h"].map((v) => tx(v)) },
  ],
  clues: [
    // c1 <- expresso c1 (Brun): não antes da "meia-noite" (aqui 21h) e fora das 2 primeiras salas
    { id: "c1", text: "O Hóspede Rocha não foi visto antes das 21h, tampouco na suíte ou na varanda.", highlights: [], constraints: [{ k: "notAt", cat: "hora", value: "19h", pos: 4 }, { k: "notAt", cat: "hora", value: "20h", pos: 4 }, { k: "notAt", cat: "ambiente", value: "Suite", pos: 4 }, { k: "notAt", cat: "ambiente", value: "Varanda", pos: 4 }] },
    // c2 <- expresso c2 (Frasco<->00h)  => Cafe<->21h
    { id: "c2", text: "Quem bebia café foi visto pela última vez às 21h em ponto.", highlights: [], constraints: [{ k: "same", a: { cat: "bebida", value: "Cafe" }, b: { cat: "hora", value: "21h" } }] },
    // c3 <- expresso c3 (Castro): não Frasco/Bengala/Charuto => Ono: não Cafe/Uisque/Agua
    { id: "c3", text: "A Turista Ono não bebia café, nem uísque, nem água.", highlights: [], constraints: [{ k: "notAt", cat: "bebida", value: "Cafe", pos: 1 }, { k: "notAt", cat: "bebida", value: "Uisque", pos: 1 }, { k: "notAt", cat: "bebida", value: "Agua", pos: 1 }] },
    // c4 <- expresso c4 (Relogio): não idx0; não C3/C5 => Champanhe: não Sa; não Terraco/Saguao
    { id: "c4", text: "O dono da taça de champanhe não era o gerente, e a taça não esteve no terraço nem no saguão.", highlights: [], constraints: [{ k: "notAt", cat: "bebida", value: "Champanhe", pos: 0 }, { k: "diff", a: { cat: "bebida", value: "Champanhe" }, b: { cat: "ambiente", value: "Terraco" } }, { k: "diff", a: { cat: "bebida", value: "Champanhe" }, b: { cat: "ambiente", value: "Saguao" } }] },
    // c5 <- expresso c5 (Lorca C3; não Lenco) => Lima Terraco; não Vinho
    { id: "c5", text: "O Garçom Lima estava no terraço, mas a taça de vinho não era dele.", highlights: [], constraints: [{ k: "at", cat: "ambiente", value: "Terraco", pos: 3 }, { k: "notAt", cat: "bebida", value: "Vinho", pos: 3 }] },
    // c6 <- expresso c6 (Lenco<->22h) => Vinho<->19h
    { id: "c6", text: "Quem segurava a taça de vinho foi visto às 19h.", highlights: [], constraints: [{ k: "same", a: { cat: "bebida", value: "Vinho" }, b: { cat: "hora", value: "19h" } }] },
    // c7 <- expresso c7 (Adler: não 00h; não C4) => Sa: não 21h; não Piscina
    { id: "c7", text: "O Gerente Sá não foi visto às 21h e não estava na piscina.", highlights: [], constraints: [{ k: "notAt", cat: "hora", value: "21h", pos: 0 }, { k: "notAt", cat: "ambiente", value: "Piscina", pos: 0 }] },
    // c8 <- expresso c8 (Bengala: não C1/C4) => Uisque: não Suite/Piscina
    { id: "c8", text: "O copo de uísque não foi visto na suíte nem na piscina.", highlights: [], constraints: [{ k: "diff", a: { cat: "bebida", value: "Uisque" }, b: { cat: "ambiente", value: "Suite" } }, { k: "diff", a: { cat: "bebida", value: "Uisque" }, b: { cat: "ambiente", value: "Piscina" } }] },
    // c9 <- expresso c9 (Esteves 01h) => Prado 22h
    { id: "c9", text: "A Viúva Prado foi vista às 22h.", highlights: [], constraints: [{ k: "at", cat: "hora", value: "22h", pos: 2 }] },
    // c10 <- expresso c10 (Charuto<->02h) => Agua<->23h
    { id: "c10", text: "A água pertencia a quem foi visto por último, às 23h.", highlights: [], constraints: [{ k: "same", a: { cat: "bebida", value: "Agua" }, b: { cat: "hora", value: "23h" } }] },
    // c11 <- expresso c11 (Castro não 02h) => Ono não 23h
    { id: "c11", text: "A Turista Ono não foi vista às 23h.", highlights: [], constraints: [{ k: "notAt", cat: "hora", value: "23h", pos: 1 }] },
    // c12 <- expresso c12 (Adler não Charuto) => Sa não Agua
    { id: "c12", text: "O Gerente Sá não bebia água.", highlights: [], constraints: [{ k: "notAt", cat: "bebida", value: "Agua", pos: 0 }] },
    // c13 <- expresso c13 (Charuto não C3) => Agua não Terraco
    { id: "c13", text: "A água não foi servida no terraço.", highlights: [], constraints: [{ k: "diff", a: { cat: "bebida", value: "Agua" }, b: { cat: "ambiente", value: "Terraco" } }] },
    // c14 <- expresso c14 (Bengala não 23h) => Uisque não 20h
    { id: "c14", text: "O uísque não era de quem foi visto às 20h.", highlights: [], constraints: [{ k: "diff", a: { cat: "bebida", value: "Uisque" }, b: { cat: "hora", value: "20h" } }] },
    // c15 <- expresso c15 (Frasco não C5) => Cafe não Saguao
    { id: "c15", text: "O café não foi servido no saguão.", highlights: [], constraints: [{ k: "diff", a: { cat: "bebida", value: "Cafe" }, b: { cat: "ambiente", value: "Saguao" } }] },
    // c16 <- expresso c16 (Charuto não C4) => Agua não Piscina
    { id: "c16", text: "A água não foi servida na piscina.", highlights: [], constraints: [{ k: "diff", a: { cat: "bebida", value: "Agua" }, b: { cat: "ambiente", value: "Piscina" } }] },
    // c17 <- expresso c17 (Adler não Bengala) => Sa não Uisque
    { id: "c17", text: "O Gerente Sá não bebia uísque.", highlights: [], constraints: [{ k: "notAt", cat: "bebida", value: "Uisque", pos: 0 }] },
    // --- afrouxamento p/ nível 5 (longe da evidência Suíte/19h) ---
    { id: "c18", text: "O copo de água foi visto no saguão.", highlights: [], constraints: [{ k: "same", a: { cat: "bebida", value: "Agua" }, b: { cat: "ambiente", value: "Saguao" } }] },
  ],
  crime: {
    prompt: "O legista fixou a morte às 19h em ponto, e a chave encontrada na vítima abria a suíte.",
    evidence: [
      { cat: "ambiente", value: "Suite" },
      { cat: "hora", value: "19h" },
    ],
  },
  solution: {},
};
