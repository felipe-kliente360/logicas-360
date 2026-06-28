import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Engenheiro", "Diretora", "Reporter", "Mecanico", "Piloto"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Engenheiro -> Boxes    | ChaveInglesa | 14h | Patrocinio
//   idx 1 Diretora   -> Garagem  | Software     | 15h | Aposta
//   idx 2 Reporter   -> Paddock  | Pneu         | 12h | Vazamento
//   idx 3 Mecanico   -> Pitlane  | Macaco       | 13h | Despeito
//   idx 4 Piloto     -> Grid     | Combustivel  | 16h | Rivalidade
//
// Culpado: Engenheiro (ChaveInglesa + 14h + Patrocinio) — evidências do crime.
// (ChaveInglesa/14h/Patrocinio são os atributos deduzidos por ÚLTIMO: nenhuma pista
//  os fixa direto, então o culpado só fica único quando a grade já está resolvida —
//  sem atalho. Caso de nível 9: raw≈7.6 calibrado pela ordem da espinha.)

export const puzzle: Puzzle = {
  id: "sabotagem-grande-premio",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "Sabotagem no Grande Prêmio",
  story:
    "A poucas voltas da bandeirada, o carro líder pegou fogo nos boxes e o chefe da equipe não resistiu. A perícia é taxativa: a porca da roda foi afrouxada com uma chave inglesa, o cronômetro do pit parou às 14h e os documentos apreendidos apontam um contrato de patrocínio como o estopim. Cinco pessoas tinham acesso ao pit naquela tarde, cada uma num setor, manuseando uma ferramenta, num horário, movida por um interesse. Ninguém confessa; cada um joga a culpa no rádio do outro. Reconstrua a corrida inteira — só então a chave inglesa, as 14h e a cobiça pelo patrocínio convergem num único nome.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "setor",
      label: "Setor",
      values: ["Boxes", "Pitlane", "Grid", "Garagem", "Paddock"].map((v) => tx(v)),
    },
    {
      id: "ferramenta",
      label: "Ferramenta",
      values: [
        tx("ChaveInglesa", "Chave inglesa"),
        tx("Macaco", "Macaco"),
        tx("Combustivel", "Combustível"),
        tx("Software", "Software"),
        tx("Pneu", "Pneu"),
      ],
    },
    {
      id: "hora",
      label: "Horário",
      values: ["14h", "13h", "16h", "15h", "12h"].map((v) => tx(v)),
    },
    {
      id: "motivo",
      label: "Motivo",
      values: [
        tx("Patrocinio", "Patrocínio"),
        tx("Despeito", "Despeito"),
        tx("Rivalidade", "Rivalidade"),
        tx("Aposta", "Aposta"),
        tx("Vazamento", "Vazamento"),
      ],
    },
  ],
  clues: [
    {
      id: "c1",
      text: "O Repórter não estava nos boxes, no pitlane nem na garagem; e não agia por patrocínio, despeito ou aposta.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "setor", value: "Boxes", pos: 2 },
        { k: "notAt", cat: "setor", value: "Pitlane", pos: 2 },
        { k: "notAt", cat: "setor", value: "Garagem", pos: 2 },
        { k: "notAt", cat: "motivo", value: "Patrocinio", pos: 2 },
        { k: "notAt", cat: "motivo", value: "Despeito", pos: 2 },
        { k: "notAt", cat: "motivo", value: "Aposta", pos: 2 },
      ],
    },
    {
      id: "c2",
      text: "Quem movia o vazamento de dados ficou no paddock e largou o pneu velho ali mesmo.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Vazamento" }, b: { cat: "setor", value: "Paddock" } },
        { k: "same", a: { cat: "motivo", value: "Vazamento" }, b: { cat: "ferramenta", value: "Pneu" } },
      ],
    },
    {
      id: "c3",
      text: "O pneu foi a primeira peça a ser mexida, logo às 12h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "ferramenta", value: "Pneu" }, b: { cat: "hora", value: "12h" } },
      ],
    },
    {
      id: "c4",
      text: "O interesse no patrocínio não se cruzou com macaco, combustível, software nem pneu.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Patrocinio" }, b: { cat: "ferramenta", value: "Macaco" } },
        { k: "diff", a: { cat: "motivo", value: "Patrocinio" }, b: { cat: "ferramenta", value: "Combustivel" } },
        { k: "diff", a: { cat: "motivo", value: "Patrocinio" }, b: { cat: "ferramenta", value: "Software" } },
        { k: "diff", a: { cat: "motivo", value: "Patrocinio" }, b: { cat: "ferramenta", value: "Pneu" } },
      ],
    },
    {
      id: "c5",
      text: "O patrocínio não pesou sobre quem estava no pitlane, no grid ou na garagem.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Patrocinio" }, b: { cat: "setor", value: "Pitlane" } },
        { k: "diff", a: { cat: "motivo", value: "Patrocinio" }, b: { cat: "setor", value: "Grid" } },
        { k: "diff", a: { cat: "motivo", value: "Patrocinio" }, b: { cat: "setor", value: "Garagem" } },
      ],
    },
    {
      id: "c6",
      text: "A chave inglesa não passou pelo pitlane, pelo grid nem pelo paddock.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "ferramenta", value: "ChaveInglesa" }, b: { cat: "setor", value: "Pitlane" } },
        { k: "diff", a: { cat: "ferramenta", value: "ChaveInglesa" }, b: { cat: "setor", value: "Grid" } },
        { k: "diff", a: { cat: "ferramenta", value: "ChaveInglesa" }, b: { cat: "setor", value: "Paddock" } },
      ],
    },
    {
      id: "c7",
      text: "Nos boxes o cronômetro não marcava 15h, 16h nem 13h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "setor", value: "Boxes" }, b: { cat: "hora", value: "15h" } },
        { k: "diff", a: { cat: "setor", value: "Boxes" }, b: { cat: "hora", value: "16h" } },
        { k: "diff", a: { cat: "setor", value: "Boxes" }, b: { cat: "hora", value: "13h" } },
      ],
    },
    {
      id: "c8",
      text: "A rivalidade não combinou com chave inglesa, macaco, software nem pneu — restou-lhe uma só ferramenta.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Rivalidade" }, b: { cat: "ferramenta", value: "ChaveInglesa" } },
        { k: "diff", a: { cat: "motivo", value: "Rivalidade" }, b: { cat: "ferramenta", value: "Macaco" } },
        { k: "diff", a: { cat: "motivo", value: "Rivalidade" }, b: { cat: "ferramenta", value: "Software" } },
        { k: "diff", a: { cat: "motivo", value: "Rivalidade" }, b: { cat: "ferramenta", value: "Pneu" } },
      ],
    },
    {
      id: "c9",
      text: "O combustível só foi manuseado bem mais tarde: nunca às 12h, 13h, 14h ou 15h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "ferramenta", value: "Combustivel" }, b: { cat: "hora", value: "12h" } },
        { k: "diff", a: { cat: "ferramenta", value: "Combustivel" }, b: { cat: "hora", value: "13h" } },
        { k: "diff", a: { cat: "ferramenta", value: "Combustivel" }, b: { cat: "hora", value: "14h" } },
        { k: "diff", a: { cat: "ferramenta", value: "Combustivel" }, b: { cat: "hora", value: "15h" } },
      ],
    },
    {
      id: "c10",
      text: "O software estava na garagem, nas mãos de quem agia por aposta.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "ferramenta", value: "Software" }, b: { cat: "setor", value: "Garagem" } },
        { k: "same", a: { cat: "ferramenta", value: "Software" }, b: { cat: "motivo", value: "Aposta" } },
      ],
    },
    {
      id: "c11",
      text: "O despeito rondava o pitlane — e por lá não passou o Engenheiro.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Despeito" }, b: { cat: "setor", value: "Pitlane" } },
        { k: "notAt", cat: "setor", value: "Pitlane", pos: 0 },
      ],
    },
    {
      id: "c12",
      text: "O macaco ficou no pitlane; e quem o operava não foi visto às 15h nem às 16h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "ferramenta", value: "Macaco" }, b: { cat: "setor", value: "Pitlane" } },
        { k: "diff", a: { cat: "ferramenta", value: "Macaco" }, b: { cat: "hora", value: "15h" } },
        { k: "diff", a: { cat: "ferramenta", value: "Macaco" }, b: { cat: "hora", value: "16h" } },
      ],
    },
    {
      id: "c13",
      text: "A Diretora não esteve nos boxes, no pitlane nem no paddock.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "setor", value: "Boxes", pos: 1 },
        { k: "notAt", cat: "setor", value: "Pitlane", pos: 1 },
        { k: "notAt", cat: "setor", value: "Paddock", pos: 1 },
      ],
    },
    {
      id: "c14",
      text: "O Piloto não cuidou de patrocínio, despeito, aposta nem vazamento — sobrou-lhe um só interesse.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "motivo", value: "Patrocinio", pos: 4 },
        { k: "notAt", cat: "motivo", value: "Despeito", pos: 4 },
        { k: "notAt", cat: "motivo", value: "Aposta", pos: 4 },
        { k: "notAt", cat: "motivo", value: "Vazamento", pos: 4 },
      ],
    },
    {
      id: "c15",
      text: "O Mecânico não estava nos boxes, no grid nem na garagem.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "setor", value: "Boxes", pos: 3 },
        { k: "notAt", cat: "setor", value: "Grid", pos: 3 },
        { k: "notAt", cat: "setor", value: "Garagem", pos: 3 },
      ],
    },
  ],
  crime: {
    prompt: "A perícia é taxativa: a porca foi forçada com uma chave inglesa, o cronômetro do box parou às 14h e o estopim foi a guerra pelo patrocínio.",
    evidence: [
      { cat: "ferramenta", value: "ChaveInglesa" },
      { cat: "hora", value: "14h" },
      { cat: "motivo", value: "Patrocinio" },
    ],
  },
  solution: {},
};
