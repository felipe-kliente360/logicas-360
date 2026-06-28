import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Violinista", "Adido", "Embaixatriz", "Chef", "Senador"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Violinista  -> Salao       | Cafe      | 00h | Despeito
//   idx 1 Adido       -> SalaJantar  | Champanhe | 22h | Espionagem
//   idx 2 Embaixatriz -> Terraco     | Vinho     | 21h | Inveja
//   idx 3 Chef        -> Cozinha     | Sopa      | 23h | Despedida
//   idx 4 Senador     -> Biblioteca  | Caviar    | 20h | Suborno
//
// Culpado: Adido (Champanhe + 22h + Espionagem) — evidências do crime.
// (Champanhe/22h/Espionagem são deduzidos por ÚLTIMO: nenhuma pista os fixa direto,
//  o culpado só fica único quando a grade já está resolvida — sem atalho.
//  Nível 9: raw≈7.6, calibrado pela ordem da espinha.)

export const puzzle: Puzzle = {
  id: "banquete-embaixada",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "O banquete da embaixada",
  story:
    "No jantar de gala da embaixada, o cônsul tombou sobre a toalha de linho antes da sobremesa — não foi mal súbito. Cinco convidados de honra circulavam pelo prédio, cada um num ambiente, com uma bebida ou prato à mão, num horário, movido por um interesse secreto. Todos sorriem para as câmeras; ninguém admite nada. Reconstrua a noite inteira — só então um único nome se trai.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "ambiente",
      label: "Ambiente",
      values: [
        tx("SalaJantar", "Sala de jantar"),
        tx("Terraco", "Terraço"),
        tx("Cozinha", "Cozinha"),
        tx("Biblioteca", "Biblioteca"),
        tx("Salao", "Salão"),
      ],
    },
    {
      id: "servico",
      label: "Serviço",
      values: [
        tx("Champanhe", "Champanhe"),
        tx("Vinho", "Vinho"),
        tx("Sopa", "Sopa"),
        tx("Caviar", "Caviar"),
        tx("Cafe", "Café"),
      ],
    },
    {
      id: "hora",
      label: "Horário",
      values: ["22h", "21h", "23h", "20h", "00h"].map((v) => tx(v)),
    },
    {
      id: "motivo",
      label: "Motivo",
      values: [
        tx("Espionagem", "Espionagem"),
        tx("Inveja", "Inveja"),
        tx("Despedida", "Despedida"),
        tx("Suborno", "Suborno"),
        tx("Despeito", "Despeito"),
      ],
    },
  ],
  clues: [
    {
      id: "c1",
      text: "O Violinista não esteve na sala de jantar, no terraço nem na cozinha; e não agia por espionagem, inveja ou despedida.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "ambiente", value: "SalaJantar", pos: 0 },
        { k: "notAt", cat: "ambiente", value: "Terraco", pos: 0 },
        { k: "notAt", cat: "ambiente", value: "Cozinha", pos: 0 },
        { k: "notAt", cat: "motivo", value: "Espionagem", pos: 0 },
        { k: "notAt", cat: "motivo", value: "Inveja", pos: 0 },
        { k: "notAt", cat: "motivo", value: "Despedida", pos: 0 },
      ],
    },
    {
      id: "c2",
      text: "Quem agia por despeito ficou no salão e só provou o café da meia-noite.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Despeito" }, b: { cat: "ambiente", value: "Salao" } },
        { k: "same", a: { cat: "motivo", value: "Despeito" }, b: { cat: "servico", value: "Cafe" } },
      ],
    },
    {
      id: "c3",
      text: "O café só foi servido na última rodada, às 00h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "servico", value: "Cafe" }, b: { cat: "hora", value: "00h" } },
      ],
    },
    {
      id: "c4",
      text: "A espionagem não andou de mãos dadas com vinho, sopa, caviar nem café.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Espionagem" }, b: { cat: "servico", value: "Vinho" } },
        { k: "diff", a: { cat: "motivo", value: "Espionagem" }, b: { cat: "servico", value: "Sopa" } },
        { k: "diff", a: { cat: "motivo", value: "Espionagem" }, b: { cat: "servico", value: "Caviar" } },
        { k: "diff", a: { cat: "motivo", value: "Espionagem" }, b: { cat: "servico", value: "Cafe" } },
      ],
    },
    {
      id: "c5",
      text: "A espionagem não pesou sobre quem estava no terraço, na cozinha ou na biblioteca.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Espionagem" }, b: { cat: "ambiente", value: "Terraco" } },
        { k: "diff", a: { cat: "motivo", value: "Espionagem" }, b: { cat: "ambiente", value: "Cozinha" } },
        { k: "diff", a: { cat: "motivo", value: "Espionagem" }, b: { cat: "ambiente", value: "Biblioteca" } },
      ],
    },
    {
      id: "c6",
      text: "A champanhe não foi aberta no terraço, na cozinha nem no salão.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "servico", value: "Champanhe" }, b: { cat: "ambiente", value: "Terraco" } },
        { k: "diff", a: { cat: "servico", value: "Champanhe" }, b: { cat: "ambiente", value: "Cozinha" } },
        { k: "diff", a: { cat: "servico", value: "Champanhe" }, b: { cat: "ambiente", value: "Salao" } },
      ],
    },
    {
      id: "c7",
      text: "Na sala de jantar o pêndulo não marcava 21h, 20h nem 23h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "ambiente", value: "SalaJantar" }, b: { cat: "hora", value: "21h" } },
        { k: "diff", a: { cat: "ambiente", value: "SalaJantar" }, b: { cat: "hora", value: "20h" } },
        { k: "diff", a: { cat: "ambiente", value: "SalaJantar" }, b: { cat: "hora", value: "23h" } },
      ],
    },
    {
      id: "c8",
      text: "A inveja não combinou com champanhe, sopa, caviar nem café — restou-lhe uma só bebida.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Inveja" }, b: { cat: "servico", value: "Champanhe" } },
        { k: "diff", a: { cat: "motivo", value: "Inveja" }, b: { cat: "servico", value: "Sopa" } },
        { k: "diff", a: { cat: "motivo", value: "Inveja" }, b: { cat: "servico", value: "Caviar" } },
        { k: "diff", a: { cat: "motivo", value: "Inveja" }, b: { cat: "servico", value: "Cafe" } },
      ],
    },
    {
      id: "c9",
      text: "A sopa foi servida cedo: nunca às 22h, 00h, 20h ou 21h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "servico", value: "Sopa" }, b: { cat: "hora", value: "22h" } },
        { k: "diff", a: { cat: "servico", value: "Sopa" }, b: { cat: "hora", value: "00h" } },
        { k: "diff", a: { cat: "servico", value: "Sopa" }, b: { cat: "hora", value: "20h" } },
        { k: "diff", a: { cat: "servico", value: "Sopa" }, b: { cat: "hora", value: "21h" } },
      ],
    },
    {
      id: "c10",
      text: "O caviar foi servido na biblioteca, a quem agia por suborno, logo no início — nunca às 21h ou 23h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "servico", value: "Caviar" }, b: { cat: "ambiente", value: "Biblioteca" } },
        { k: "same", a: { cat: "servico", value: "Caviar" }, b: { cat: "motivo", value: "Suborno" } },
        { k: "diff", a: { cat: "servico", value: "Caviar" }, b: { cat: "hora", value: "21h" } },
        { k: "diff", a: { cat: "servico", value: "Caviar" }, b: { cat: "hora", value: "23h" } },
      ],
    },
    {
      id: "c11",
      text: "A inveja rondava o terraço — e por lá não passou o Adido.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Inveja" }, b: { cat: "ambiente", value: "Terraco" } },
        { k: "notAt", cat: "ambiente", value: "Terraco", pos: 1 },
      ],
    },
    {
      id: "c12",
      text: "A sopa saiu da cozinha; e quem a serviu não foi visto às 20h nem às 00h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "servico", value: "Sopa" }, b: { cat: "ambiente", value: "Cozinha" } },
        { k: "diff", a: { cat: "servico", value: "Sopa" }, b: { cat: "hora", value: "20h" } },
        { k: "diff", a: { cat: "servico", value: "Sopa" }, b: { cat: "hora", value: "00h" } },
      ],
    },
    {
      id: "c13",
      text: "O Senador não esteve na sala de jantar, no terraço nem no salão.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "ambiente", value: "SalaJantar", pos: 4 },
        { k: "notAt", cat: "ambiente", value: "Terraco", pos: 4 },
        { k: "notAt", cat: "ambiente", value: "Salao", pos: 4 },
      ],
    },
    {
      id: "c14",
      text: "O Chef cuidava da cozinha; não tinha como motivo espionagem, inveja, suborno nem despeito — sobrou-lhe um só.",
      highlights: [],
      constraints: [
        { k: "at", cat: "ambiente", value: "Cozinha", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Espionagem", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Inveja", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Suborno", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Despeito", pos: 3 },
      ],
    },
    {
      id: "c15",
      text: "A Embaixatriz não esteve na sala de jantar, na cozinha nem na biblioteca.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "ambiente", value: "SalaJantar", pos: 2 },
        { k: "notAt", cat: "ambiente", value: "Cozinha", pos: 2 },
        { k: "notAt", cat: "ambiente", value: "Biblioteca", pos: 2 },
      ],
    },
    {
      id: "c16",
      text: "O vinho foi servido no terraço, e nunca às 20h, 23h ou 00h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "servico", value: "Vinho" }, b: { cat: "ambiente", value: "Terraco" } },
        { k: "diff", a: { cat: "servico", value: "Vinho" }, b: { cat: "hora", value: "20h" } },
        { k: "diff", a: { cat: "servico", value: "Vinho" }, b: { cat: "hora", value: "23h" } },
        { k: "diff", a: { cat: "servico", value: "Vinho" }, b: { cat: "hora", value: "00h" } },
      ],
    },
  ],
  crime: {
    prompt: "A perícia é taxativa: o veneno veio na taça de champanhe, o brinde fatal foi às 22h e o estopim foi um caso de espionagem.",
    evidence: [
      { cat: "servico", value: "Champanhe" },
      { cat: "hora", value: "22h" },
      { cat: "motivo", value: "Espionagem" },
    ],
  },
  solution: {},
};
