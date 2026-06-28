// Linha autoral de glifos temáticos (dossiê) — SVG puro, traço branco sobre a
// etiqueta colorida do valor. Mesma gramática dos ícones: 24×24, currentColor.
// Usados quando um valor declara display { kind:"icon", icon:"<nome>" }.
import type { JSX } from "react";
import { FOOD_GLYPHS } from "./glyphs-food";
import { OBJECT_GLYPHS } from "./glyphs-objects";
import { TOOL_GLYPHS } from "./glyphs-tools";
import { TECH_GLYPHS } from "./glyphs-tech";
import { APPAREL_GLYPHS } from "./glyphs-apparel";

const g = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const GLYPHS: Record<string, (size: number) => JSX.Element> = {
  ...FOOD_GLYPHS,
  ...OBJECT_GLYPHS,
  ...TOOL_GLYPHS,
  ...TECH_GLYPHS,
  ...APPAREL_GLYPHS,
  // adaga — lâmina, guarda, cabo e pomo
  adaga: (s) => (
    <svg {...g(s)}>
      <path d="M12 2.5 13.8 10.5 12 12.2 10.2 10.5Z" />
      <path d="M7.5 12.6H16.5" />
      <path d="M12 12.6V18.4" />
      <circle cx="12" cy="19.6" r="1.2" />
    </svg>
  ),
  // castiçal — chama, vela, prato e base
  castical: (s) => (
    <svg {...g(s)}>
      <path d="M12 2.8c.9.9.9 2.1 0 2.8-.9-.7-.9-1.9 0-2.8Z" />
      <path d="M10.6 6.6h2.8v3.8h-2.8z" />
      <path d="M9 10.4h6l-1.2 2.2h-3.6z" />
      <path d="M12 12.6V18" />
      <path d="M8.7 19.4H15.3" />
    </svg>
  ),
  // revólver — silhueta + tambor
  revolver: (s) => (
    <svg {...g(s)}>
      <path d="M3 9h12v2.6H9.2L8.2 18H5.6l1-6.4H3Z" />
      <circle cx="11.2" cy="10.3" r="1.4" />
    </svg>
  ),
  // veneno — frasco com líquido e bolhas
  veneno: (s) => (
    <svg {...g(s)}>
      <path d="M9.8 3.2h4.4" />
      <path d="M10.4 3.2v5.4L7.6 16.8c-.3 1.1.4 2.2 1.6 2.2h5.6c1.2 0 1.9-1.1 1.6-2.2L13.6 8.6V3.2" />
      <path d="M8.9 14h6.2" />
      <circle cx="11" cy="16.2" r=".55" />
      <circle cx="13" cy="16.9" r=".55" />
    </svg>
  ),
  // corda — laço e amarras
  corda: (s) => (
    <svg {...g(s)}>
      <ellipse cx="12" cy="7.5" rx="3.6" ry="4.5" />
      <path d="M12 12v7.4" />
      <path d="M10.2 14h3.6" />
      <path d="M10.4 15.9h3.2" />
    </svg>
  ),
};

export function Glyph({ name, size = 15 }: { name: string; size?: number }) {
  return GLYPHS[name]?.(size) ?? null;
}

/**
 * Mapa global valor→glifo (chave = id do valor). Os nomes de objetos são
 * consistentes entre os casos (uma "Corda" é sempre corda), então atribuímos o
 * glifo uma vez aqui e o `hydrate` aplica a todos os casos de investigação.
 * `hex` define a cor semântica da etiqueta (gemas, fichas, bebidas); sem hex, a
 * etiqueta usa a cor por posição na categoria.
 */
export const GLYPH_FOR: Record<string, { icon: string; hex?: string }> = {
  // armas / objetos
  Adaga: { icon: "adaga" }, Corda: { icon: "corda" }, Castical: { icon: "castical" },
  Veneno: { icon: "veneno" }, Revolver: { icon: "revolver" }, Frasco: { icon: "frasco" },
  Faca: { icon: "faca" }, "Faca de chef": { icon: "faca" }, Estatueta: { icon: "estatueta" },
  Bengala: { icon: "bengala" }, "Lenco de seda": { icon: "lenco" }, Relogio: { icon: "relogio" },
  Charuto: { icon: "charuto" }, Bussola: { icon: "bussola" }, Binoculo: { icon: "binoculo" },
  Cantil: { icon: "cantil" }, Lanterna: { icon: "lanterna" }, "Cabo de aco": { icon: "cabo" },
  Pulseira: { icon: "pulseira" }, "Taca quebrada": { icon: "taca" }, Taca: { icon: "taca" },
  Travesseiro: { icon: "travesseiro" }, Estilete: { icon: "estilete" }, Catalogo: { icon: "livro" },
  Luvas: { icon: "luva" }, Cravo: { icon: "flor" },
  // perícia / laboratório
  "Frasco de acido": { icon: "frasco", hex: "#7a8a39" }, "Seringa contaminada": { icon: "seringa" },
  Seringa: { icon: "seringa" }, "Cracha clonado": { icon: "cracha" }, "Pen drive": { icon: "pendrive" },
  "Luva rasgada": { icon: "luva" },
  // vinícola
  Sacarrolhas: { icon: "sacarrolhas" }, Decanter: { icon: "decanter" }, Foice: { icon: "foice" },
  Tesoura: { icon: "tesoura" }, Lampiao: { icon: "lampiao" },
  // observatório / GP (tech)
  Telescopio: { icon: "telescopio" }, Caderno: { icon: "livro" }, Laser: { icon: "laser" },
  Chave: { icon: "chave" }, Camera: { icon: "camera" }, ChaveInglesa: { icon: "chaveinglesa" },
  Macaco: { icon: "macaco" }, Combustivel: { icon: "combustivel" }, Software: { icon: "chip" },
  Pneu: { icon: "pneu" },
  // disfarces (museu)
  Uniforme: { icon: "uniforme" }, Terno: { icon: "terno" }, "Macacão": { icon: "macacao" }, Capa: { icon: "capa" },
  // comida / padaria
  Cafezinho: { icon: "cafe", hex: "#6b4a2f" }, "Pao de queijo": { icon: "pao", hex: "#b9892f" }, Sonho: { icon: "sonho", hex: "#c26a8a" },
  // bebidas (spa / hotel / embaixada)
  ChaVerde: { icon: "cha", hex: "#5b8a52" }, ChaPreto: { icon: "cha", hex: "#5a4636" },
  Espumante: { icon: "flute", hex: "#be9b3f" }, Mimosa: { icon: "flute", hex: "#cf8a3a" },
  Limonada: { icon: "copo", hex: "#b8a93a" }, Vinho: { icon: "taca", hex: "#7a2f3a" },
  Champanhe: { icon: "flute", hex: "#c9a84a" }, Uisque: { icon: "uisque", hex: "#a9701f" },
  Cafe: { icon: "cafe", hex: "#5a4636" }, Agua: { icon: "copo", hex: "#4f8fa6" },
  Sopa: { icon: "sopa", hex: "#b07a36" }, Caviar: { icon: "caviar", hex: "#2f2a26" },
  // gemas (joalheria)
  Diamante: { icon: "gema", hex: "#6f7e8c" }, Esmeralda: { icon: "gema", hex: "#2f8f6f" },
  Rubi: { icon: "gema", hex: "#b23a3a" }, Safira: { icon: "gema", hex: "#3a5fa0" },
  Perola: { icon: "perola", hex: "#8a7f86" },
  // fichas de cassino
  Vermelha: { icon: "ficha", hex: "#b23a3a" }, Azul: { icon: "ficha", hex: "#3a5fa0" },
  Verde: { icon: "ficha", hex: "#2f8f6f" }, Preta: { icon: "ficha", hex: "#33302b" },
  Dourada: { icon: "ficha", hex: "#b9892f" },
};
