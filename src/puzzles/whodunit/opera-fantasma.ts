import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// Suspeitos (spine não-ordenada). Índices: 0..4
const suspeitos = ["Soprano", "Cenografa", "Maestro", "Bilheteiro", "Tenor"];

// SOLUÇÃO ALVO (referência mental; não vai no objeto):
//   idx 0 Soprano    -> Palco     | Estatueta | 22h | Inveja
//   idx 1 Cenografa  -> Coxia     | Castical  | 21h | Chantagem
//   idx 2 Maestro    -> Fosso     | Veneno    | 20h | Heranca
//   idx 3 Bilheteiro -> Camarim   | Corda     | 19h | Dividas
//   idx 4 Tenor      -> Camarote  | Adaga     | 23h | Rivalidade
//
// Culpado: Maestro (Veneno + 20h + Heranca) — evidências do crime.
// (Veneno/20h/Heranca são exatamente os atributos deduzidos por ÚLTIMO na propagação:
//  nenhuma pista os fixa direto, então o culpado só fica único quando a grade está
//  praticamente resolvida — sem atalho. Caso nível 10: isomorfo estrutural de
//  mansao-segredos (5×4, raw 8.85), re-tematizado e com a espinha calibrada p/ raw≈8.6.)

export const puzzle: Puzzle = {
  id: "opera-fantasma",
  kind: "whodunit",
  source: "investigacao",
  themeId: "dossie",
  difficulty: 0,
  size: 5,
  title: "O fantasma da ópera",
  story:
    "Na noite de estreia, o velho diretor do teatro foi achado sem vida atrás das cortinas, enquanto a orquestra ainda afinava. O legista é categórico: a morte veio por veneno na taça, o relógio do fosso parara às 20h e um testamento rasurado revela a herança do teatro como o estopim. Cinco artistas e funcionários rondavam os bastidores, cada um num ponto da casa, com um instrumento de morte ao alcance, num horário, movido por uma paixão inconfessável. As pistas são poucas e tortuosas: sob a luz dos refletores todos representam inocência, mas nos bastidores ninguém diz a verdade inteira. Reconstrua a estreia inteira — só então o veneno, as 20h e a cobiça pela herança se calam sobre um único nome.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: suspeitos },
  categories: [
    {
      id: "local",
      label: "Local",
      values: [
        tx("Fosso", "Fosso da orquestra"),
        tx("Coxia", "Coxia"),
        tx("Camarote", "Camarote"),
        tx("Palco", "Palco"),
        tx("Camarim", "Camarim"),
      ],
    },
    {
      id: "arma",
      label: "Arma",
      values: [
        tx("Veneno", "Veneno"),
        tx("Castical", "Castiçal"),
        tx("Adaga", "Adaga"),
        tx("Estatueta", "Estatueta"),
        tx("Corda", "Corda de cortina"),
      ],
    },
    {
      id: "hora",
      label: "Horário",
      values: ["20h", "21h", "23h", "22h", "19h"].map((v) => tx(v)),
    },
    {
      id: "motivo",
      label: "Motivo",
      values: [
        tx("Heranca", "Herança"),
        tx("Chantagem", "Chantagem"),
        tx("Rivalidade", "Rivalidade"),
        tx("Inveja", "Inveja"),
        tx("Dividas", "Dívidas"),
      ],
    },
  ],
  clues: [
    {
      id: "c1",
      text: "Quem se afundava em dívidas não pôs os pés no fosso, na coxia nem no camarote.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Dividas" }, b: { cat: "local", value: "Fosso" } },
        { k: "diff", a: { cat: "motivo", value: "Dividas" }, b: { cat: "local", value: "Coxia" } },
        { k: "diff", a: { cat: "motivo", value: "Dividas" }, b: { cat: "local", value: "Camarote" } },
      ],
    },
    {
      id: "c2",
      text: "Quem agiu por dívidas largou a corda; e foi o primeiro a circular, logo às 19h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Dividas" }, b: { cat: "arma", value: "Corda" } },
        { k: "same", a: { cat: "motivo", value: "Dividas" }, b: { cat: "hora", value: "19h" } },
      ],
    },
    {
      id: "c3",
      text: "O motivo da herança não se cruzou com a corda, com a adaga nem com o castiçal.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "arma", value: "Corda" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "arma", value: "Adaga" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "arma", value: "Castical" } },
      ],
    },
    {
      id: "c4",
      text: "A herança não pesou sobre quem estava no palco, na coxia ou no camarim.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "local", value: "Palco" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "local", value: "Coxia" } },
        { k: "diff", a: { cat: "motivo", value: "Heranca" }, b: { cat: "local", value: "Camarim" } },
      ],
    },
    {
      id: "c5",
      text: "No fosso o relógio marcava bem antes das 19h, 21h, 22h e 23h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "local", value: "Fosso" }, b: { cat: "hora", value: "19h" } },
        { k: "diff", a: { cat: "local", value: "Fosso" }, b: { cat: "hora", value: "21h" } },
        { k: "diff", a: { cat: "local", value: "Fosso" }, b: { cat: "hora", value: "22h" } },
        { k: "diff", a: { cat: "local", value: "Fosso" }, b: { cat: "hora", value: "23h" } },
      ],
    },
    {
      id: "c6",
      text: "O veneno não esteve no camarote, no camarim nem na coxia.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "arma", value: "Veneno" }, b: { cat: "local", value: "Camarote" } },
        { k: "diff", a: { cat: "arma", value: "Veneno" }, b: { cat: "local", value: "Camarim" } },
        { k: "diff", a: { cat: "arma", value: "Veneno" }, b: { cat: "local", value: "Coxia" } },
      ],
    },
    {
      id: "c7",
      text: "O Tenor jamais tocaria em veneno, castiçal, estatueta ou corda — só uma arma lhe servia.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "arma", value: "Veneno", pos: 4 },
        { k: "notAt", cat: "arma", value: "Castical", pos: 4 },
        { k: "notAt", cat: "arma", value: "Estatueta", pos: 4 },
        { k: "notAt", cat: "arma", value: "Corda", pos: 4 },
      ],
    },
    {
      id: "c8",
      text: "A rivalidade não andou de mãos dadas com veneno, castiçal, estatueta ou corda — restou-lhe uma só arma.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "motivo", value: "Rivalidade" }, b: { cat: "arma", value: "Veneno" } },
        { k: "diff", a: { cat: "motivo", value: "Rivalidade" }, b: { cat: "arma", value: "Castical" } },
        { k: "diff", a: { cat: "motivo", value: "Rivalidade" }, b: { cat: "arma", value: "Estatueta" } },
        { k: "diff", a: { cat: "motivo", value: "Rivalidade" }, b: { cat: "arma", value: "Corda" } },
      ],
    },
    {
      id: "c9",
      text: "Ninguém viu a adaga antes das 23h: o golpe só pôde soar às 23h.",
      highlights: [],
      constraints: [
        { k: "diff", a: { cat: "arma", value: "Adaga" }, b: { cat: "hora", value: "19h" } },
        { k: "diff", a: { cat: "arma", value: "Adaga" }, b: { cat: "hora", value: "20h" } },
        { k: "diff", a: { cat: "arma", value: "Adaga" }, b: { cat: "hora", value: "21h" } },
        { k: "diff", a: { cat: "arma", value: "Adaga" }, b: { cat: "hora", value: "22h" } },
      ],
    },
    {
      id: "c10",
      text: "A estatueta coube a quem se escondia no palco, movido por inveja.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "arma", value: "Estatueta" }, b: { cat: "local", value: "Palco" } },
        { k: "same", a: { cat: "arma", value: "Estatueta" }, b: { cat: "motivo", value: "Inveja" } },
      ],
    },
    {
      id: "c11",
      text: "A chantagem rondava a coxia — e por lá não passou o Maestro.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "motivo", value: "Chantagem" }, b: { cat: "local", value: "Coxia" } },
        { k: "notAt", cat: "local", value: "Coxia", pos: 2 },
      ],
    },
    {
      id: "c12",
      text: "O castiçal repousava na coxia; e quem o segurava não foi visto às 22h nem às 23h.",
      highlights: [],
      constraints: [
        { k: "same", a: { cat: "arma", value: "Castical" }, b: { cat: "local", value: "Coxia" } },
        { k: "diff", a: { cat: "arma", value: "Castical" }, b: { cat: "hora", value: "22h" } },
        { k: "diff", a: { cat: "arma", value: "Castical" }, b: { cat: "hora", value: "23h" } },
      ],
    },
    {
      id: "c14",
      text: "O Bilheteiro não estava no fosso, no camarote nem no palco; tampouco agiu por herança, chantagem ou rivalidade.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "local", value: "Fosso", pos: 3 },
        { k: "notAt", cat: "local", value: "Camarote", pos: 3 },
        { k: "notAt", cat: "local", value: "Palco", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Heranca", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Chantagem", pos: 3 },
        { k: "notAt", cat: "motivo", value: "Rivalidade", pos: 3 },
      ],
    },
    {
      id: "c15",
      text: "A Soprano não pisou no fosso, na coxia nem no camarote.",
      highlights: [],
      constraints: [
        { k: "notAt", cat: "local", value: "Fosso", pos: 0 },
        { k: "notAt", cat: "local", value: "Coxia", pos: 0 },
        { k: "notAt", cat: "local", value: "Camarote", pos: 0 },
      ],
    },
  ],
  crime: {
    prompt: "Quem matou o diretor do teatro?",
    evidence: [
      { cat: "arma", value: "Veneno" },
      { cat: "hora", value: "20h" },
      { cat: "motivo", value: "Heranca" },
    ],
  },
  solution: {},
};
