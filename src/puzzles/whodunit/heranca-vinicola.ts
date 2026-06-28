import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..5
const suspeitos = ["Enologo Brandao", "Viuva Tessari", "Sobrinho Caetano", "Capataz Doria", "Herdeira Sabino", "Advogado Mello"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Brandao   -> Tonelaria  | Decanter     | 19h
//   idx 1 Tessari   -> Varanda    | Sacarrolhas  | 18h
//   idx 2 Caetano   -> Vinhedo    | Tesoura      | 22h
//   idx 3 Doria     -> Escritorio | Castical     | 21h
//   idx 4 Sabino    -> Cave       | Foice        | 23h   <- CULPADO
//   idx 5 Mello     -> Adega      | Lampiao      | 20h
//
// Culpado: Herdeira Sabino (Foice + 23h). Nenhuma pista fixa diretamente
// a foice, a cave ou as 23h na Sabino — esses atributos só ficam únicos
// quando a grade está praticamente resolvida (atalho ~0). O culpado é a
// pessoa da cave (23h), e quem é a pessoa da cave só se decide na última
// dedução da cadeia de locais e horários.

export const puzzle: Puzzle = {
  id: "heranca-vinicola",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 6,
  title: "A Herança da Vinícola",
  story:
    "O velho patriarca da Vinícola Tessari-Sabino morreu na véspera de assinar o novo testamento, e o legista não tem dúvida: não foi o coração. Naquela noite de vindima, seis pessoas rondavam a propriedade — herdeiros, empregados e o advogado da família —, cada uma num recanto da vinícola, portando um objeto, a uma hora distinta. Todos juram que mal se cruzaram, mas as adegas guardam ecos e os relógios não mentem. Reconstrua quem esteve onde, com o quê e quando — só então um único herdeiro fica sem álibi.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "local",
      label: "Local",
      values: ["Adega", "Tonelaria", "Vinhedo", "Cave", "Escritorio", "Varanda"].map((v) => tx(v)),
    },
    {
      id: "objeto",
      label: "Objeto",
      values: ["Sacarrolhas", "Decanter", "Foice", "Tesoura", "Lampiao", "Castical"].map((v) =>
        v === "Sacarrolhas" ? tx(v, "Saca-rolhas") : v === "Tesoura" ? tx(v, "Tesoura de poda") : tx(v),
      ),
    },
    {
      id: "hora",
      label: "Horário",
      values: ["18h", "19h", "20h", "21h", "22h", "23h"].map((v) => tx(v)),
    },
  ],
  clues: [
    {
      id: "c1",
      text: "O Enólogo Brandão estava na tonelaria e chegou às 19h.",
      highlights: [],
      constraints: [
        { k: "at", cat: "local", value: "Tonelaria", pos: 0 },
        { k: "at", cat: "hora", value: "19h", pos: 0 },
      ],
    },
    {
      id: "c2",
      text: "O decanter de cristal ficou na tonelaria a noite toda.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Decanter" }, b: { cat: "local", value: "Tonelaria" } }],
    },
    {
      id: "c3",
      text: "A Viúva Tessari recolheu-se cedo à varanda, ainda às 18h.",
      highlights: [],
      constraints: [
        { k: "at", cat: "local", value: "Varanda", pos: 1 },
        { k: "at", cat: "hora", value: "18h", pos: 1 },
      ],
    },
    {
      id: "c4",
      text: "O saca-rolhas de prata pertencia a quem estava na varanda.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Sacarrolhas" }, b: { cat: "local", value: "Varanda" } }],
    },
    {
      id: "c5",
      text: "O Advogado Mello passou a noite na adega e chegou às 20h.",
      highlights: [],
      constraints: [
        { k: "at", cat: "local", value: "Adega", pos: 5 },
        { k: "at", cat: "hora", value: "20h", pos: 5 },
      ],
    },
    {
      id: "c6",
      text: "O lampião foi visto na adega, e não na mão da Viúva Tessari.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "objeto", value: "Lampiao" }, b: { cat: "local", value: "Adega" } },
        { k: "notAt", cat: "objeto", value: "Lampiao", pos: 1 },
      ],
    },
    {
      id: "c7",
      text: "Quem ficou na cave chegou às 23h; quem estava no vinhedo, às 22h; e a pessoa do escritório, às 21h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "local", value: "Cave" }, b: { cat: "hora", value: "23h" } },
        { k: "same", a: { cat: "local", value: "Vinhedo" }, b: { cat: "hora", value: "22h" } },
        { k: "same", a: { cat: "local", value: "Escritorio" }, b: { cat: "hora", value: "21h" } },
      ],
    },
    {
      id: "c8",
      text: "A tesoura de poda pertencia a quem trabalhava no vinhedo.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Tesoura" }, b: { cat: "local", value: "Vinhedo" } }],
    },
    {
      id: "c9",
      text: "O castiçal repousava no escritório.",
      highlights: [],
      constraints: [{ k: "same", a: { cat: "objeto", value: "Castical" }, b: { cat: "local", value: "Escritorio" } }],
    },
    {
      id: "c10",
      text: "O Sobrinho Caetano não esteve na adega, na tonelaria, na varanda nem no escritório.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "local", value: "Adega", pos: 2 },
        { k: "notAt", cat: "local", value: "Tonelaria", pos: 2 },
        { k: "notAt", cat: "local", value: "Varanda", pos: 2 },
        { k: "notAt", cat: "local", value: "Escritorio", pos: 2 },
      ],
    },
    {
      id: "c11",
      text: "O Sobrinho Caetano não chegou às 18h, às 19h nem às 23h.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "hora", value: "18h", pos: 2 },
        { k: "notAt", cat: "hora", value: "19h", pos: 2 },
        { k: "notAt", cat: "hora", value: "23h", pos: 2 },
      ],
    },
    {
      id: "c12",
      text: "O Capataz Dória não pôs os pés na tonelaria, na varanda, no vinhedo nem na adega.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "local", value: "Tonelaria", pos: 3 },
        { k: "notAt", cat: "local", value: "Varanda", pos: 3 },
        { k: "notAt", cat: "local", value: "Vinhedo", pos: 3 },
        { k: "notAt", cat: "local", value: "Adega", pos: 3 },
      ],
    },
    {
      id: "c13",
      text: "A Herdeira Sabino não estava no vinhedo nem chegou às 21h.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "local", value: "Vinhedo", pos: 4 },
        { k: "notAt", cat: "hora", value: "21h", pos: 4 },
      ],
    },
    {
      id: "c14",
      text: "A Herdeira Sabino não usou o decanter, o saca-rolhas nem o lampião.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Decanter", pos: 4 },
        { k: "notAt", cat: "objeto", value: "Sacarrolhas", pos: 4 },
        { k: "notAt", cat: "objeto", value: "Lampiao", pos: 4 },
      ],
    },
    {
      id: "c15",
      text: "O Enólogo Brandão não empunhava a foice.",
      highlights: [],
      constraints: [{ k: "notAt", cat: "objeto", value: "Foice", pos: 0 }],
    },
    {
      id: "c16",
      text: "A foice não pertencia a quem chegou às 20h, às 21h ou às 22h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "objeto", value: "Foice" }, b: { cat: "hora", value: "20h" } },
        { k: "diff", a: { cat: "objeto", value: "Foice" }, b: { cat: "hora", value: "21h" } },
        { k: "diff", a: { cat: "objeto", value: "Foice" }, b: { cat: "hora", value: "22h" } },
      ],
    },
    {
      id: "c17",
      text: "O Advogado Mello não portava a foice nem a tesoura de poda.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "objeto", value: "Foice", pos: 5 },
        { k: "notAt", cat: "objeto", value: "Tesoura", pos: 5 },
      ],
    },
  ],
  crime: {
    prompt:
      "O legista fixou a morte às 23h em ponto, e a arma foi uma foice de vindima.",
    evidence: [
      { cat: "objeto", value: "Foice" },
      { cat: "hora", value: "23h" },
    ],
  },
  solution: {},
};
