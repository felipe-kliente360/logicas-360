// Glifos de objetos (dossiê) — SVG puro, mesma gramática dos ícones de GLYPHS:
// 24×24, traço único de 1.9, currentColor, sem preenchimento.
import type { JSX } from "react";

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

export const OBJECT_GLYPHS: Record<string, (size: number) => JSX.Element> = {
  // frasco — gargalo, rolha e corpo
  frasco: (s) => (
    <svg {...g(s)}>
      <path d="M10 3.4h4v1.8h-4z" />
      <path d="M10.4 5.2v2.6" />
      <path d="M13.6 5.2v2.6" />
      <path d="M9.4 8.6c-.7.6-1.1 1.5-1.1 2.5v7.1c0 1.2.9 2.1 2 2.1h3.4c1.1 0 2-.9 2-2.1v-7.1c0-1-.4-1.9-1.1-2.5Z" />
    </svg>
  ),
  // faca — lâmina de chef e cabo
  faca: (s) => (
    <svg {...g(s)}>
      <path d="M3 14.2c4-3.6 8.5-6 13-7.2v5.4c-3.6 1.3-7.4 1.8-13 1.8Z" />
      <path d="M16 8.4h3.6c.8 0 1.4.6 1.4 1.4v1.2c0 .8-.6 1.4-1.4 1.4H16Z" />
    </svg>
  ),
  // bengala — haste longa e punho curvo
  bengala: (s) => (
    <svg {...g(s)}>
      <path d="M9 7.2c0-2.3 1.8-4.2 4-4.2s4 1.9 4 4.2" />
      <path d="M9 7.2v1.6" />
      <path d="M13 7.2v13.6" />
    </svg>
  ),
  // lenço — pano de seda dobrado em ondas
  lenco: (s) => (
    <svg {...g(s)}>
      <path d="M4 7.5c2.7-2.4 5.3-2.4 8 0s5.3 2.4 8 0" />
      <path d="M4 12c2.7-2.4 5.3-2.4 8 0s5.3 2.4 8 0" />
      <path d="M4 16.5c2.7-2.4 5.3-2.4 8 0s5.3 2.4 8 0" />
    </svg>
  ),
  // relógio — mostrador, coroa e anel da corrente
  relogio: (s) => (
    <svg {...g(s)}>
      <circle cx="12" cy="13.5" r="6.5" />
      <path d="M12 13.5V10" />
      <path d="M12 13.5h2.4" />
      <path d="M10.6 4.8h2.8v1.8h-2.8z" />
      <circle cx="12" cy="3.2" r="1.1" />
    </svg>
  ),
  // charuto — cilindro, anel e fumaça
  charuto: (s) => (
    <svg {...g(s)}>
      <path d="M3.5 14.5h13.8c1 0 1.7-.8 1.7-1.7s-.7-1.7-1.7-1.7H3.5Z" />
      <path d="M6.6 11.1v3.4" />
      <path d="M19.5 9.2c1-.6 1-1.6 0-2.2" />
    </svg>
  ),
  // bússola — círculo e agulha em losango
  bussola: (s) => (
    <svg {...g(s)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.5 14 12 12 17.5 10 12Z" />
      <circle cx="12" cy="12" r=".55" />
    </svg>
  ),
  // binóculo — dois barris verticais e ponte
  binoculo: (s) => (
    <svg {...g(s)}>
      <circle cx="7" cy="13.5" r="4" />
      <circle cx="17" cy="13.5" r="4" />
      <path d="M7 9.5V6.5h2.5l1.5 2" />
      <path d="M17 9.5V6.5h-2.5L13 8.5" />
      <path d="M10.5 13.5h3" />
    </svg>
  ),
  // cantil — corpo arredondado, tampa e argola
  cantil: (s) => (
    <svg {...g(s)}>
      <circle cx="12" cy="14" r="6.5" />
      <path d="M10.4 4.5h3.2v3h-3.2z" />
      <path d="M14.2 4.5h2.3" />
      <path d="M16.5 4.5v2.2" />
    </svg>
  ),
  // lanterna — corpo, cabeça e feixe
  lanterna: (s) => (
    <svg {...g(s)}>
      <path d="M5 9.5h7.5v5H5Z" />
      <path d="M12.5 8.5 16 6.5v11l-3.5-2Z" />
      <path d="M18.5 9h2" />
      <path d="M18.5 12h2.5" />
      <path d="M18.5 15h2" />
    </svg>
  ),
  // estatueta — busto sobre pedestal
  estatueta: (s) => (
    <svg {...g(s)}>
      <circle cx="12" cy="6" r="2.6" />
      <path d="M8.5 15.5c0-2.8 1.6-5 3.5-5s3.5 2.2 3.5 5Z" />
      <path d="M9 18h6" />
      <path d="M8 21h8" />
      <path d="M9 18l-1 3" />
      <path d="M15 18l1 3" />
    </svg>
  ),
  // cabo — cabo de aço ondulado com argola
  cabo: (s) => (
    <svg {...g(s)}>
      <path d="M4 6c3 0 3 4 6 4s3-4 6-4" />
      <path d="M4 11c3 0 3 4 6 4s3-3.4 5.4-3.9" />
      <circle cx="18.5" cy="13.5" r="2.8" />
    </svg>
  ),
};
