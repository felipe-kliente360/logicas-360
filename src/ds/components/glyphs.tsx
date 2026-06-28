// Linha autoral de glifos temáticos (dossiê) — SVG puro, traço branco sobre a
// etiqueta colorida do valor. Mesma gramática dos ícones: 24×24, currentColor.
// Usados quando um valor declara display { kind:"icon", icon:"<nome>" }.
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

export const GLYPHS: Record<string, (size: number) => JSX.Element> = {
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
