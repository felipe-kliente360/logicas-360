// Geniol · "Vizinhança em Perigo". Spine = número da casa (ordenada, 71,73,75,77, passo 2).
import type { Puzzle } from "../../engine/types";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

export const puzzle: Puzzle = {
  id: "vizinhanca-em-perigo",
  source: "geniol",
  themeId: "casas-classico",
  difficulty: 0,
  sourceDifficulty: 4,
  size: 4,
  title: "Vizinhança em Perigo",
  story:
    "Quatro casas instalaram dispositivos de segurança para se protegerem durante uma recente onda de violência. Descubra como cada morador investiu na segurança.",
  spine: {
    id: "numero",
    label: "Número",
    ordered: true,
    labels: ["71", "73", "75", "77"],
    referential: "Posição 1 = casa 71; posição 4 = casa 77 (números crescentes, de 2 em 2).",
  },
  categories: [
    { id: "morador", label: "Morador", values: ["Nelson", "Jorge", "Geraldo", "Armando"].map((v) => tx(v)) },
    {
      id: "dispositivo",
      label: "Dispositivo",
      values: ["PorteiroEletronico", "CercaEletrica", "Camera", "Alarme"].map((v) => tx(v)),
    },
    { id: "cor", label: "Cor", values: ["Vermelha", "Verde", "Branca", "Azul"].map((v) => tx(v)) },
  ],
  clues: [
    {
      id: "vp1",
      text: "Sobre as casas azul e 77, uma teve um alarme instalado e a outra é do Geraldo, não necessariamente nessa ordem.",
      highlights: [{ cat: "cor" }, { cat: "dispositivo" }, { cat: "morador" }],
      // Azul e a casa 77 (pos 3) são casas diferentes. Pela pista vp3, a casa 77 é do
      // Armando ou do Nelson (não do Geraldo); logo o Geraldo mora na casa azul e a
      // casa 77 tem o alarme.
      constraints: [
        { k: "notAt", cat: "cor", value: "Azul", pos: 3 },
        { k: "same", a: { cat: "morador", value: "Geraldo" }, b: { cat: "cor", value: "Azul" } },
        { k: "at", cat: "dispositivo", value: "Alarme", pos: 3 },
      ],
    },
    {
      id: "vp2",
      text: "Jorge não mora na casa 73.",
      highlights: [{ cat: "morador" }],
      constraints: [{ k: "notAt", cat: "morador", value: "Jorge", pos: 1 }],
    },
    {
      id: "vp3",
      text: "Sobre as casas do Armando e do Nelson, uma é vermelha e a outra tem o número 77, não necessariamente nessa ordem.",
      highlights: [{ cat: "morador" }, { cat: "cor" }],
      // Armando e Nelson são as duas casas: uma é vermelha, a outra é a casa 77 (pos 3).
      // Logo a 77 é do Armando ou do Nelson, e a vermelha é do outro.
      constraints: [
        { k: "diff", a: { cat: "morador", value: "Armando" }, b: { cat: "cor", value: "Vermelha" } },
        { k: "notAt", cat: "morador", value: "Geraldo", pos: 3 },
        { k: "notAt", cat: "morador", value: "Jorge", pos: 3 },
        { k: "diff", a: { cat: "cor", value: "Vermelha" }, b: { cat: "morador", value: "Geraldo" } },
        { k: "diff", a: { cat: "cor", value: "Vermelha" }, b: { cat: "morador", value: "Jorge" } },
        // a casa vermelha e a casa 77 são casas DIFERENTES
        { k: "notAt", cat: "cor", value: "Vermelha", pos: 3 },
      ],
    },
    {
      id: "vp4",
      text: "A casa com cerca elétrica é branca.",
      highlights: [{ cat: "dispositivo" }, { cat: "cor" }],
      constraints: [{ k: "same", a: { cat: "dispositivo", value: "CercaEletrica" }, b: { cat: "cor", value: "Branca" } }],
    },
    {
      id: "vp5",
      text: "A casa com cerca elétrica é dois números menor do que a casa vermelha.",
      highlights: [{ cat: "dispositivo" }, { cat: "cor" }],
      constraints: [{ k: "immediateLeft", a: { cat: "dispositivo", value: "CercaEletrica" }, b: { cat: "cor", value: "Vermelha" } }],
    },
    {
      id: "vp6",
      text: "A casa azul, a casa do Armando e a casa com porteiro eletrônico são diferentes.",
      highlights: [{ cat: "cor" }, { cat: "morador" }, { cat: "dispositivo" }],
      constraints: [
        { k: "diff", a: { cat: "cor", value: "Azul" }, b: { cat: "morador", value: "Armando" } },
        { k: "diff", a: { cat: "cor", value: "Azul" }, b: { cat: "dispositivo", value: "PorteiroEletronico" } },
        { k: "diff", a: { cat: "morador", value: "Armando" }, b: { cat: "dispositivo", value: "PorteiroEletronico" } },
      ],
    },
  ],
  solution: {},
};
