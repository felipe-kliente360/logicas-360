// Linha autoral de glifos de comida/bebida (dossiê) — SVG puro, traço branco
// sobre a etiqueta colorida do valor. Mesma gramática dos ícones: 24×24,
// currentColor, traço único. Usados quando um valor declara
// display { kind:"icon", icon:"<nome>" }.
import type { JSX } from "react";
const g = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.9,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const FOOD_GLYPHS: Record<string, (size: number) => JSX.Element> = {
  // café — xícara com pires e fumaça
  cafe: (s) => (
    <svg {...g(s)}>
      <path d="M5.5 10h11v3.6c0 2.2-1.8 4-4 4H9.5c-2.2 0-4-1.8-4-4Z" />
      <path d="M16.5 10.6h1.8a2 2 0 0 1 0 4h-1.5" />
      <path d="M4 20h14" />
      <path d="M9 4.6c-.7.9-.7 1.7 0 2.6" />
      <path d="M12.5 4.6c-.7.9-.7 1.7 0 2.6" />
    </svg>
  ),
  // pão — pãozinho arredondado com corte no topo
  pao: (s) => (
    <svg {...g(s)}>
      <path d="M4 14.5C4 10.9 7.6 8 12 8s8 2.9 8 6.5c0 .8-.6 1.5-1.4 1.5H5.4C4.6 16 4 15.3 4 14.5Z" />
      <path d="M8 12.6c1-.9 2.2-1.4 4-1.4s3 .5 4 1.4" />
    </svg>
  ),
  // sonho — pastel/donut redondo recheado com açúcar
  sonho: (s) => (
    <svg {...g(s)}>
      <ellipse cx="12" cy="13" rx="7.5" ry="6.5" />
      <circle cx="9" cy="11" r=".5" fill="currentColor" />
      <circle cx="13.5" cy="9.5" r=".5" fill="currentColor" />
      <circle cx="15" cy="13" r=".5" fill="currentColor" />
      <circle cx="10.5" cy="15" r=".5" fill="currentColor" />
    </svg>
  ),
  // chá — xícara em pires com etiqueta de saquinho
  cha: (s) => (
    <svg {...g(s)}>
      <path d="M6 9.5h12v3.5c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4Z" />
      <path d="M4.5 19.5h15" />
      <path d="M14.5 9.5V6" />
      <path d="M14.5 6h2v1.6h-2z" />
    </svg>
  ),
  // flute — taça de champanhe alta com bolhas
  flute: (s) => (
    <svg {...g(s)}>
      <path d="M9.5 3h5l-.7 7c-.1 1-.9 1.7-1.8 1.7s-1.7-.7-1.8-1.7Z" />
      <path d="M12 11.7V20" />
      <path d="M9 20h6" />
      <circle cx="12" cy="14.5" r=".5" fill="currentColor" />
      <circle cx="12" cy="17" r=".5" fill="currentColor" />
    </svg>
  ),
  // copo — copo reto levemente cônico com linha de líquido
  copo: (s) => (
    <svg {...g(s)}>
      <path d="M7 4h10l-1 16H8Z" />
      <path d="M7.4 9h9.2" />
    </svg>
  ),
  // uísque — copo baixo com líquido e pedra de gelo
  uisque: (s) => (
    <svg {...g(s)}>
      <path d="M6.5 7h11l-1 12H7.5Z" />
      <path d="M6.9 12h10.2" />
      <path d="M9 13.5h3.5v3.5H9Z" />
    </svg>
  ),
  // taça — taça de vinho com bojo arredondado, haste e base
  taca: (s) => (
    <svg {...g(s)}>
      <path d="M7 4h10c0 3.6-2 6.5-5 6.5S7 7.6 7 4Z" />
      <path d="M12 10.5V19" />
      <path d="M8.5 19.5h7" />
    </svg>
  ),
  // sopa — tigela larga e rasa com fumaça
  sopa: (s) => (
    <svg {...g(s)}>
      <path d="M3.5 12h17c0 3.6-2.9 6.5-6.5 6.5h-4C6.4 18.5 3.5 15.6 3.5 12Z" />
      <path d="M10 6.5c-.7.9-.7 1.7 0 2.6" />
      <path d="M13.5 6.5c-.7.9-.7 1.7 0 2.6" />
    </svg>
  ),
  // caviar — lata redonda e rasa com ovas
  caviar: (s) => (
    <svg {...g(s)}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="10.5" cy="11" r=".5" fill="currentColor" />
      <circle cx="13.5" cy="11" r=".5" fill="currentColor" />
      <circle cx="12" cy="13.2" r=".5" fill="currentColor" />
    </svg>
  ),
};

export function FoodGlyph({ name, size = 15 }: { name: string; size?: number }) {
  return FOOD_GLYPHS[name]?.(size) ?? null;
}
