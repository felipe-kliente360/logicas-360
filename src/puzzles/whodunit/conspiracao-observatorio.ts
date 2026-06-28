import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Astronoma", "Diretor", "Bolsista", "Zelador", "Visitante"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Astronoma  -> Cupula       | Telescopio | 23h | Sabotagem
//   idx 1 Diretor    -> Subsolo      | Chave      | 21h | Inveja
//   idx 2 Bolsista   -> Biblioteca   | Caderno    | 00h | Vinganca
//   idx 3 Zelador    -> Laboratorio  | Laser      | 22h | Dinheiro
//   idx 4 Visitante  -> Terraco      | Camera     | 20h | Medo
//
// Culpado: Astronoma. Evidências do crime: Telescopio + 23h + Sabotagem.
// PREMISSA (atalho 0%): nenhuma pista fixa diretamente o telescópio, as 23h ou a sabotagem
// sobre a astrônoma. Esses três atributos são RESIDUAIS — espremidos pelas exclusões cruzadas
// que os tiram dos OUTROS suspeitos e dos OUTROS atributos. Só convergem juntos na astrônoma
// quando a grade inteira já está praticamente resolvida (o culpado fica único na última rodada).

export const puzzle: Puzzle = {
  id: "conspiracao-observatorio",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "A conspiração do observatório",
  story:
    "Antes do amanhecer, o astrônomo-chefe foi encontrado caído sob a grande cúpula, os olhos ainda voltados para o céu. O legista resume o caso em três frias certezas: o golpe partiu de um instrumento pesado de observação, o relógio do mezanino congelou às 23h, e o crime nasceu de sabotagem — alguém queria enterrar a descoberta da noite. Cinco pessoas pernoitavam no observatório naquela madrugada de eclipse, cada uma em um setor, manuseando um equipamento, registrada num horário e movida por um motivo. Ninguém confessa; cada álibi contradiz o seguinte. Reconstrua a planta inteira da noite — só então o instrumento certo, as 23h e a sabotagem convergem num único nome.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "setor",
      label: "Setor",
      values: ["Cupula", "Biblioteca", "Laboratorio", "Subsolo", "Terraco"].map((v) => tx(v)),
    },
    {
      id: "instrumento",
      label: "Instrumento",
      values: ["Telescopio", "Caderno", "Laser", "Chave", "Camera"].map((v) => tx(v)),
    },
    {
      id: "horario",
      label: "Horário",
      values: ["23h", "21h", "22h", "20h", "00h"].map((v) => tx(v)),
    },
    {
      id: "motivo",
      label: "Motivo",
      values: ["Sabotagem", "Inveja", "Dinheiro", "Vinganca", "Medo"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "c1",
      text: "Quem agiu por medo não pisou na cúpula, no subsolo nem na biblioteca.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Medo" }, b: { cat: "setor", value: "Cupula" } },
        { k: "diff", a: { cat: "motivo", value: "Medo" }, b: { cat: "setor", value: "Subsolo" } },
        { k: "diff", a: { cat: "motivo", value: "Medo" }, b: { cat: "setor", value: "Biblioteca" } },
      ],
    },
    {
      id: "c2",
      text: "Quem agiu por medo empunhava a câmera e foi o primeiro a circular, ainda às 20h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Medo" }, b: { cat: "instrumento", value: "Camera" } },
        { k: "same", a: { cat: "motivo", value: "Medo" }, b: { cat: "horario", value: "20h" } },
      ],
    },
    {
      id: "c3",
      text: "A sabotagem não se cruzou com a câmera, com o caderno nem com a chave.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Sabotagem" }, b: { cat: "instrumento", value: "Camera" } },
        { k: "diff", a: { cat: "motivo", value: "Sabotagem" }, b: { cat: "instrumento", value: "Caderno" } },
        { k: "diff", a: { cat: "motivo", value: "Sabotagem" }, b: { cat: "instrumento", value: "Chave" } },
      ],
    },
    {
      id: "c4",
      text: "A sabotagem não pesou sobre quem estava no laboratório, no subsolo ou no terraço.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Sabotagem" }, b: { cat: "setor", value: "Laboratorio" } },
        { k: "diff", a: { cat: "motivo", value: "Sabotagem" }, b: { cat: "setor", value: "Subsolo" } },
        { k: "diff", a: { cat: "motivo", value: "Sabotagem" }, b: { cat: "setor", value: "Terraco" } },
      ],
    },
    {
      id: "c5",
      text: "Na cúpula o relógio não marcava 20h, 21h, 22h nem 00h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "setor", value: "Cupula" }, b: { cat: "horario", value: "20h" } },
        { k: "diff", a: { cat: "setor", value: "Cupula" }, b: { cat: "horario", value: "21h" } },
        { k: "diff", a: { cat: "setor", value: "Cupula" }, b: { cat: "horario", value: "22h" } },
        { k: "diff", a: { cat: "setor", value: "Cupula" }, b: { cat: "horario", value: "00h" } },
      ],
    },
    {
      id: "c6",
      text: "O telescópio não esteve na biblioteca, no terraço nem no subsolo.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "instrumento", value: "Telescopio" }, b: { cat: "setor", value: "Biblioteca" } },
        { k: "diff", a: { cat: "instrumento", value: "Telescopio" }, b: { cat: "setor", value: "Terraco" } },
        { k: "diff", a: { cat: "instrumento", value: "Telescopio" }, b: { cat: "setor", value: "Subsolo" } },
      ],
    },
    {
      id: "c7",
      text: "O bolsista jamais tocaria no telescópio, na chave, no laser ou na câmera — só um instrumento lhe servia.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "instrumento", value: "Telescopio", pos: 2 },
        { k: "notAt", cat: "instrumento", value: "Chave", pos: 2 },
        { k: "notAt", cat: "instrumento", value: "Laser", pos: 2 },
        { k: "notAt", cat: "instrumento", value: "Camera", pos: 2 },
      ],
    },
    {
      id: "c8",
      text: "A vingança não andou de mãos dadas com o telescópio, a chave, o laser nem a câmera — restou-lhe um só instrumento.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Vinganca" }, b: { cat: "instrumento", value: "Telescopio" } },
        { k: "diff", a: { cat: "motivo", value: "Vinganca" }, b: { cat: "instrumento", value: "Chave" } },
        { k: "diff", a: { cat: "motivo", value: "Vinganca" }, b: { cat: "instrumento", value: "Laser" } },
        { k: "diff", a: { cat: "motivo", value: "Vinganca" }, b: { cat: "instrumento", value: "Camera" } },
      ],
    },
    {
      id: "c9",
      text: "O caderno de anotações não foi registrado às 20h, às 21h, às 22h nem às 23h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "instrumento", value: "Caderno" }, b: { cat: "horario", value: "20h" } },
        { k: "diff", a: { cat: "instrumento", value: "Caderno" }, b: { cat: "horario", value: "21h" } },
        { k: "diff", a: { cat: "instrumento", value: "Caderno" }, b: { cat: "horario", value: "22h" } },
        { k: "diff", a: { cat: "instrumento", value: "Caderno" }, b: { cat: "horario", value: "23h" } },
      ],
    },
    {
      id: "c10",
      text: "O laser coube a quem se trancou no laboratório, movido por dinheiro.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "instrumento", value: "Laser" }, b: { cat: "setor", value: "Laboratorio" } },
        { k: "same", a: { cat: "instrumento", value: "Laser" }, b: { cat: "motivo", value: "Dinheiro" } },
      ],
    },
    {
      id: "c11",
      text: "A inveja rondava o subsolo — e por lá não esteve a astrônoma.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Inveja" }, b: { cat: "setor", value: "Subsolo" } },
        { k: "notAt", cat: "setor", value: "Subsolo", pos: 0 },
      ],
    },
    {
      id: "c12",
      text: "A chave de mestre ficou no subsolo; e quem a portava não foi flagrado às 22h nem às 00h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "instrumento", value: "Chave" }, b: { cat: "setor", value: "Subsolo" } },
        { k: "diff", a: { cat: "instrumento", value: "Chave" }, b: { cat: "horario", value: "22h" } },
        { k: "diff", a: { cat: "instrumento", value: "Chave" }, b: { cat: "horario", value: "00h" } },
      ],
    },
    {
      id: "c13",
      text: "O visitante não esteve na cúpula, no laboratório nem na biblioteca; tampouco agiu por sabotagem, inveja ou vingança.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "setor", value: "Cupula", pos: 4 },
        { k: "notAt", cat: "setor", value: "Laboratorio", pos: 4 },
        { k: "notAt", cat: "setor", value: "Biblioteca", pos: 4 },
        { k: "notAt", cat: "motivo", value: "Sabotagem", pos: 4 },
        { k: "notAt", cat: "motivo", value: "Inveja", pos: 4 },
        { k: "notAt", cat: "motivo", value: "Vinganca", pos: 4 },
      ],
    },
    {
      id: "c14",
      text: "O zelador não pisou na cúpula, no subsolo nem na biblioteca.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "setor", value: "Cupula", pos: 3 },
        { k: "notAt", cat: "setor", value: "Subsolo", pos: 3 },
        { k: "notAt", cat: "setor", value: "Biblioteca", pos: 3 },
      ],
    },
    {
      id: "c15",
      text: "No terraço o relógio marcava exatamente 20h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "setor", value: "Terraco" }, b: { cat: "horario", value: "20h" } },
      ],
    },
    {
      id: "c16",
      text: "No subsolo o relógio batia 21h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "setor", value: "Subsolo" }, b: { cat: "horario", value: "21h" } },
      ],
    },
    {
      id: "c17",
      text: "O laboratório só foi ocupado às 22h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "setor", value: "Laboratorio" }, b: { cat: "horario", value: "22h" } },
      ],
    },
    {
      id: "c18",
      text: "Na biblioteca o relógio cravava a meia-noite, 00h em ponto.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "setor", value: "Biblioteca" }, b: { cat: "horario", value: "00h" } },
      ],
    },
    {
      id: "c19",
      text: "A câmera pertencia ao visitante.",
      highlights: [],
      constraints: [
        { k: "at", cat: "instrumento", value: "Camera", pos: 4 },
      ],
    },
    {
      id: "c20",
      text: "O bolsista passou a madrugada na biblioteca.",
      highlights: [],
      constraints: [
        { k: "at", cat: "setor", value: "Biblioteca", pos: 2 },
      ],
    },
  ],
  crime: {
    prompt:
      "O legista é taxativo: o golpe veio do telescópio, o relógio parou às 23h e o estopim foi a sabotagem. Cruzando o instrumento, o horário e o motivo, quem matou o astrônomo-chefe?",
    evidence: [
      { cat: "instrumento", value: "Telescopio" },
      { cat: "horario", value: "23h" },
      { cat: "motivo", value: "Sabotagem" },
    ],
  },
  solution: {},
};
