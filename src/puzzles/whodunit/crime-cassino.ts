import type { Puzzle } from "../../engine/types";
const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Crupie Vidal", "Magnata Reis", "Cantora Lis", "Detetive Paz", "Barao Klaus"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Crupie Vidal -> Roleta    | Verde    | 22h   <- CULPADO (Roleta + 22h)
//   idx 1 Magnata Reis -> Bacara    | Azul     | 23h
//   idx 2 Cantora Lis  -> Poquer    | Preta    | 00h
//   idx 3 Detetive Paz -> Blackjack | Vermelha | 01h
//   idx 4 Barao Klaus  -> Dados     | Dourada  | 02h
//
// Culpado: Crupiê Vidal (Roleta + 22h) — evidências do crime.
// Nenhuma pista fixa Roleta/22h direto no Vidal: a dupla só fica única quando a
// grade está praticamente resolvida (atalho 0%).

export const puzzle: Puzzle = {
  id: "crime-cassino",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "Crime no cassino",
  story:
    "As luzes do cassino ainda piscavam quando um corpo foi achado caído entre as mesas de jogo. Cinco frequentadores cravavam fichas naquela madrugada, cada um numa mesa, com uma cor de ficha e tendo entrado num horário diferente. As câmeras flagraram pedaços da noite, os seguranças sussurram meias-verdades e ninguém admite nada. Reconstrua a noite inteira — mesa, ficha e hora — e só então o nome do assassino aparecerá entre as cartas.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    { id: "mesa", label: "Mesa", values: ["Roleta", "Blackjack", "Poquer", "Bacara", "Dados"].map((v) => tx(v)) },
    { id: "ficha", label: "Ficha", values: ["Vermelha", "Azul", "Verde", "Preta", "Dourada"].map((v) => tx(v)) },
    { id: "hora", label: "Horário", values: ["22h", "23h", "00h", "01h", "02h"].map((v) => tx(v)) },
  ],
  clues: [
    { id: "c1", text: "O Barão Klaus não entrou antes da meia-noite, tampouco se sentou às duas primeiras mesas, roleta e blackjack.", highlights: [], constraints: [{ k: "notAt", cat: "hora", value: "22h", pos: 4 }, { k: "notAt", cat: "hora", value: "23h", pos: 4 }, { k: "notAt", cat: "mesa", value: "Roleta", pos: 4 }, { k: "notAt", cat: "mesa", value: "Blackjack", pos: 4 }] },
    { id: "c2", text: "Quem cravava a ficha preta entrou à meia-noite em ponto.", highlights: [], constraints: [{ k: "same", a: { cat: "ficha", value: "Preta" }, b: { cat: "hora", value: "00h" } }] },
    { id: "c3", text: "O Magnata Reis não levava a ficha preta, nem a vermelha, nem a dourada.", highlights: [], constraints: [{ k: "notAt", cat: "ficha", value: "Preta", pos: 1 }, { k: "notAt", cat: "ficha", value: "Vermelha", pos: 1 }, { k: "notAt", cat: "ficha", value: "Dourada", pos: 1 }] },
    { id: "c4", text: "O dono da ficha azul não estava no pôquer nem nos dados.", highlights: [], constraints: [{ k: "notAt", cat: "ficha", value: "Azul", pos: 0 }, { k: "diff", a: { cat: "ficha", value: "Azul" }, b: { cat: "mesa", value: "Poquer" } }, { k: "diff", a: { cat: "ficha", value: "Azul" }, b: { cat: "mesa", value: "Dados" } }] },
    { id: "c5", text: "A Cantora Lis jogava no pôquer, mas a ficha verde não era dela.", highlights: [], constraints: [{ k: "at", cat: "mesa", value: "Poquer", pos: 2 }, { k: "notAt", cat: "ficha", value: "Verde", pos: 2 }] },
    { id: "c6", text: "Quem guardava a ficha verde entrou às 22h.", highlights: [], constraints: [{ k: "same", a: { cat: "ficha", value: "Verde" }, b: { cat: "hora", value: "22h" } }] },
    { id: "c7", text: "O Crupiê Vidal não entrou à meia-noite e não estava no bacará.", highlights: [], constraints: [{ k: "notAt", cat: "hora", value: "00h", pos: 0 }, { k: "notAt", cat: "mesa", value: "Bacara", pos: 0 }] },
    { id: "c8", text: "A ficha vermelha não foi vista na roleta nem no bacará.", highlights: [], constraints: [{ k: "diff", a: { cat: "ficha", value: "Vermelha" }, b: { cat: "mesa", value: "Roleta" } }, { k: "diff", a: { cat: "ficha", value: "Vermelha" }, b: { cat: "mesa", value: "Bacara" } }] },
    { id: "c9", text: "A Detetive Paz entrou à 01h.", highlights: [], constraints: [{ k: "at", cat: "hora", value: "01h", pos: 3 }] },
    { id: "c10", text: "A ficha dourada pertencia a quem entrou por último, às 02h.", highlights: [], constraints: [{ k: "same", a: { cat: "ficha", value: "Dourada" }, b: { cat: "hora", value: "02h" } }] },
    { id: "c11", text: "O Magnata Reis não entrou às 02h.", highlights: [], constraints: [{ k: "notAt", cat: "hora", value: "02h", pos: 1 }] },
    { id: "c12", text: "O Crupiê Vidal não levava a ficha dourada.", highlights: [], constraints: [{ k: "notAt", cat: "ficha", value: "Dourada", pos: 0 }] },
    { id: "c13", text: "A ficha dourada não foi vista no pôquer.", highlights: [], constraints: [{ k: "diff", a: { cat: "ficha", value: "Dourada" }, b: { cat: "mesa", value: "Poquer" } }] },
    { id: "c14", text: "A ficha vermelha não pertencia a quem entrou às 23h.", highlights: [], constraints: [{ k: "diff", a: { cat: "ficha", value: "Vermelha" }, b: { cat: "hora", value: "23h" } }] },
    { id: "c15", text: "A ficha preta não estava na mesa de dados.", highlights: [], constraints: [{ k: "diff", a: { cat: "ficha", value: "Preta" }, b: { cat: "mesa", value: "Dados" } }] },
    { id: "c16", text: "A ficha dourada não foi vista no bacará.", highlights: [], constraints: [{ k: "diff", a: { cat: "ficha", value: "Dourada" }, b: { cat: "mesa", value: "Bacara" } }] },
    { id: "c17", text: "O Crupiê Vidal não levava a ficha vermelha.", highlights: [], constraints: [{ k: "notAt", cat: "ficha", value: "Vermelha", pos: 0 }] },
    { id: "c18", text: "A ficha dourada brilhava na mesa de dados.", highlights: [], constraints: [{ k: "same", a: { cat: "ficha", value: "Dourada" }, b: { cat: "mesa", value: "Dados" } }] },
    { id: "c19", text: "A Cantora Lis entrou à meia-noite em ponto.", highlights: [], constraints: [{ k: "at", cat: "hora", value: "00h", pos: 2 }] },
    { id: "c20", text: "O Barão Klaus passou a madrugada na mesa de dados.", highlights: [], constraints: [{ k: "at", cat: "mesa", value: "Dados", pos: 4 }] },
  ],
  crime: {
    prompt: "A perícia cravou a hora da morte às 22h em ponto, e a primeira mesa do salão — a roleta — guardava o estojo da arma.",
    evidence: [
      { cat: "mesa", value: "Roleta" },
      { cat: "hora", value: "22h" },
    ],
  },
  solution: {},
};
