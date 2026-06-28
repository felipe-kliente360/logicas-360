// Linha de glifos técnicos (dossiê) — SVG puro, traço único, currentColor.
// Mesma gramática da família GLYPHS: 24×24, stroke 1.9, sem preenchimento.
import type { JSX } from "react";
const g = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.9,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const TECH_GLYPHS: Record<string, (size: number) => JSX.Element> = {
  // chave inglesa — cabo diagonal + cabeça com boca aberta
  chaveinglesa: (s) => (
    <svg {...g(s)}>
      <path d="M6.2 17.8 13 11" />
      <path d="M15.2 6.2a3.6 3.6 0 0 0 4.6 4.6L17 13.6l-2.6-2.6 2.8-2.8a3.6 3.6 0 0 0-2-2Z" />
      <path d="M5 19l-1.4-1.4" />
    </svg>
  ),
  // macaco — losango em tesoura com parafuso central
  macaco: (s) => (
    <svg {...g(s)}>
      <path d="M12 4.5 18 12l-6 7.5L6 12Z" />
      <path d="M5 12h14" />
      <path d="M19 11v2" />
    </svg>
  ),
  // pneu — círculo externo + interno + sulcos curtos
  pneu: (s) => (
    <svg {...g(s)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3.5v2" />
      <path d="M12 18.5v2" />
      <path d="M3.5 12h2" />
      <path d="M18.5 12h2" />
    </svg>
  ),
  // chip — corpo quadrado + pernas curtas nas laterais
  chip: (s) => (
    <svg {...g(s)}>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9.5 4v3" />
      <path d="M14.5 4v3" />
      <path d="M9.5 17v3" />
      <path d="M14.5 17v3" />
      <path d="M4 9.5h3" />
      <path d="M4 14.5h3" />
      <path d="M17 9.5h3" />
      <path d="M17 14.5h3" />
    </svg>
  ),
  // laser — corpo de caneta + feixe terminando em ponto
  laser: (s) => (
    <svg {...g(s)}>
      <path d="M4 9.5 9.5 4l3 3-5.5 5.5Z" />
      <path d="M13 7.5 16 10.5" />
      <path d="M16.5 12 19 14.5" />
      <circle cx="20.4" cy="15.9" r=".7" fill="currentColor" stroke="none" />
    </svg>
  ),
  // chave — palhetão redondo no topo + haste + 2 dentes
  chave: (s) => (
    <svg {...g(s)}>
      <circle cx="12" cy="6.5" r="3.5" />
      <path d="M12 10v9.5" />
      <path d="M12 14.5h2.8" />
      <path d="M12 17.5h2.2" />
    </svg>
  ),
  // câmera — corpo + lente + ressalto do visor/flash
  camera: (s) => (
    <svg {...g(s)}>
      <rect x="3.5" y="7" width="17" height="11" rx="1.5" />
      <path d="M8.5 7 10 4.8h4L15.5 7" />
      <circle cx="12" cy="12.5" r="3.2" />
    </svg>
  ),
  // telescópio — tubo inclinado + tripé
  telescopio: (s) => (
    <svg {...g(s)}>
      <path d="M5 9.5 14.5 5.5l1.6 3.8-9.5 4Z" />
      <path d="M9.6 11.3 11.6 16" />
      <path d="M11.6 16 8 20.5" />
      <path d="M11.6 16 15 20.5" />
    </svg>
  ),
  // estilete — cabo fino + ponta de lâmina angular
  estilete: (s) => (
    <svg {...g(s)}>
      <path d="M4.5 14.5 13 6l4 4-8.5 8.5Z" />
      <path d="M13 6l4-2 1 1-2 4" />
      <path d="M6.5 12.5l4 4" />
    </svg>
  ),
  // livro — capa + lombada + linhas de página
  livro: (s) => (
    <svg {...g(s)}>
      <rect x="5" y="3.5" width="14" height="17" rx="1" />
      <path d="M8.5 3.5v17" />
      <path d="M11 8h5" />
      <path d="M11 11.5h5" />
    </svg>
  ),
};
