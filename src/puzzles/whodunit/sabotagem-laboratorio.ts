import type { Puzzle } from "../../engine/types";
const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Diretor Vasquez", "Pesquisadora Lund", "Tecnico Bara", "Estagiaria Pena", "Bioquimico Roth"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Diretor Vasquez   -> Sala limpa    | Luva rasgada        | 22h   <- CULPADO (Sala limpa + 22h)
//   idx 1 Pesquisadora Lund -> Camara fria    | Seringa contaminada | 23h
//   idx 2 Tecnico Bara      -> Reator         | Frasco de acido     | 00h
//   idx 3 Estagiaria Pena   -> Bioterio       | Cracha clonado      | 01h
//   idx 4 Bioquimico Roth   -> Almoxarifado   | Pen drive           | 02h
//
// Culpado: Diretor Vasquez (Sala limpa + 22h) — evidências do crime.
// Nenhuma pista fixa Sala limpa/22h direto no Vasquez: a dupla só fica única quando
// a grade está praticamente resolvida (atalho 0%). Mesma técnica do "Crime no cassino".

export const puzzle: Puzzle = {
  id: "sabotagem-laboratorio",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "Sabotagem no Laboratório",
  story:
    "O Instituto Helix amanheceu em pânico: o pesquisador-chefe foi achado morto entre as bancadas, e o protótipo de uma vacina bilionária havia sido sabotado na mesma noite. Cinco cientistas tinham acesso à ala restrita naquela madrugada, cada um numa zona do laboratório, manuseando um objeto e tendo passado o crachá pela última vez num horário diferente. Os registros eletrônicos estão fragmentados, todos juram inocência e cada depoimento contradiz o outro. Reconstrua a noite inteira — zona, objeto e hora — e só então o nome de quem sabotou o Instituto Helix surgirá dos arquivos.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "zona",
      label: "Zona",
      values: ["Sala limpa", "Camara fria", "Reator", "Bioterio", "Almoxarifado"].map((v) =>
        tx(v, v === "Camara fria" ? "Câmara fria" : v === "Bioterio" ? "Biotério" : v),
      ),
    },
    {
      id: "objeto",
      label: "Objeto",
      values: ["Frasco de acido", "Seringa contaminada", "Cracha clonado", "Pen drive", "Luva rasgada"].map((v) =>
        tx(v, v === "Frasco de acido" ? "Frasco de ácido" : v === "Cracha clonado" ? "Crachá clonado" : v),
      ),
    },
    {
      id: "hora",
      label: "Horário",
      values: ["22h", "23h", "00h", "01h", "02h"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "c1",
      text: "O Bioquímico Roth não passou o crachá antes da meia-noite, tampouco esteve nas duas primeiras zonas, a sala limpa e o biotério.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "hora", value: "22h", pos: 4 },
        { k: "notAt", cat: "hora", value: "23h", pos: 4 },
        { k: "notAt", cat: "zona", value: "Sala limpa", pos: 4 },
        { k: "notAt", cat: "zona", value: "Bioterio", pos: 4 },
      ],
    },
    {
      id: "c2",
      text: "Quem manuseou o frasco de ácido passou o crachá à meia-noite em ponto.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Frasco de acido" }, b: { cat: "hora", value: "00h" } }],
    },
    {
      id: "c3",
      text: "A Pesquisadora Lund não portava o frasco de ácido, nem o crachá clonado, nem o pen drive.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Frasco de acido", pos: 1 },
        { k: "notAt", cat: "objeto", value: "Cracha clonado", pos: 1 },
        { k: "notAt", cat: "objeto", value: "Pen drive", pos: 1 },
      ],
    },
    {
      id: "c4",
      text: "O dono da seringa contaminada não estava no reator nem no almoxarifado.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Seringa contaminada", pos: 0 },
        { k: "diff", a: { cat: "objeto", value: "Seringa contaminada" }, b: { cat: "zona", value: "Reator" } },
        { k: "diff", a: { cat: "objeto", value: "Seringa contaminada" }, b: { cat: "zona", value: "Almoxarifado" } },
      ],
    },
    {
      id: "c5",
      text: "O Técnico Bara estava no reator, mas a luva rasgada não era dele.",
      highlights: [],
      constraints: [
        { k: "at", cat: "zona", value: "Reator", pos: 2 },
        { k: "notAt", cat: "objeto", value: "Luva rasgada", pos: 2 },
      ],
    },
    {
      id: "c6",
      text: "Quem deixou para trás a luva rasgada passou o crachá às 22h.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Luva rasgada" }, b: { cat: "hora", value: "22h" } }],
    },
    {
      id: "c7",
      text: "O Diretor Vasquez não passou o crachá à meia-noite e não estava na câmara fria.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "hora", value: "00h", pos: 0 },
        { k: "notAt", cat: "zona", value: "Camara fria", pos: 0 },
      ],
    },
    {
      id: "c8",
      text: "O crachá clonado não foi flagrado na sala limpa nem na câmara fria.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "objeto", value: "Cracha clonado" }, b: { cat: "zona", value: "Sala limpa" } },
        { k: "diff", a: { cat: "objeto", value: "Cracha clonado" }, b: { cat: "zona", value: "Camara fria" } },
      ],
    },
    {
      id: "c9",
      text: "A Estagiária Pena passou o crachá à 01h.",
      highlights: [],
      constraints: [{ k: "at", cat: "hora", value: "01h", pos: 3 }],
    },
    {
      id: "c10",
      text: "O pen drive pertencia a quem passou o crachá por último de toda a noite, às 02h.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Pen drive" }, b: { cat: "hora", value: "02h" } }],
    },
    {
      id: "c11",
      text: "A Pesquisadora Lund não passou o crachá às 02h.",
      highlights: [],
      constraints: [{ k: "notAt", cat: "hora", value: "02h", pos: 1 }],
    },
    {
      id: "c12",
      text: "O Diretor Vasquez não portava o pen drive.",
      highlights: [],
      constraints: [{ k: "notAt", cat: "objeto", value: "Pen drive", pos: 0 }],
    },
    {
      id: "c13",
      text: "O pen drive não estava no reator.",
      highlights: [],
      constraints: [{ k: "diff", a: { cat: "objeto", value: "Pen drive" }, b: { cat: "zona", value: "Reator" } }],
    },
    {
      id: "c14",
      text: "O crachá clonado não pertencia a quem passou o crachá às 23h.",
      highlights: [],
      constraints: [{ k: "diff", a: { cat: "objeto", value: "Cracha clonado" }, b: { cat: "hora", value: "23h" } }],
    },
    {
      id: "c15",
      text: "O frasco de ácido não estava no almoxarifado.",
      highlights: [],
      constraints: [{ k: "diff", a: { cat: "objeto", value: "Frasco de acido" }, b: { cat: "zona", value: "Almoxarifado" } }],
    },
    {
      id: "c16",
      text: "O pen drive não estava na câmara fria.",
      highlights: [],
      constraints: [{ k: "diff", a: { cat: "objeto", value: "Pen drive" }, b: { cat: "zona", value: "Camara fria" } }],
    },
    {
      id: "c17",
      text: "O Diretor Vasquez não portava o crachá clonado.",
      highlights: [],
      constraints: [{ k: "notAt", cat: "objeto", value: "Cracha clonado", pos: 0 }],
    },
    {
      id: "c18",
      text: "A luva rasgada não foi recolhida na câmara fria nem no biotério.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "objeto", value: "Luva rasgada" }, b: { cat: "zona", value: "Camara fria" } },
        { k: "diff", a: { cat: "objeto", value: "Luva rasgada" }, b: { cat: "zona", value: "Bioterio" } },
      ],
    },
  ],
  crime: {
    prompt:
      "A perícia cravou a hora da sabotagem às 22h em ponto, e o ponto de adulteração foi a sala limpa, a primeira zona da ala restrita.",
    evidence: [
      { cat: "zona", value: "Sala limpa" },
      { cat: "hora", value: "22h" },
    ],
  },
  solution: {},
};
