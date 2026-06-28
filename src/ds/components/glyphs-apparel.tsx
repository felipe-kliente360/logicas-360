// Linha de glifos temáticos (vestuário e objetos) — SVG puro, traço branco
// sobre a etiqueta colorida do valor. Mesma gramática dos ícones: 24×24,
// currentColor. Usados quando um valor declara display { kind:"icon", icon }.
import type { JSX } from "react";
const g = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.9,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const APPAREL_GLYPHS: Record<string, (size: number) => JSX.Element> = {
  // uniforme — camisa com gola, carcela frontal, botões e distintivo no peito
  uniforme: (s) => (
    <svg {...g(s)}>
      <path d="M8.5 4 6 6 4 8l2 2 1-1v9h10v-9l1 1 2-2-2-2-2.5-2" />
      <path d="M8.5 4 12 7l3.5-3" />
      <path d="M12 7v11" />
      <circle cx="12" cy="10.5" r=".5" />
      <circle cx="12" cy="13.5" r=".5" />
      <path d="M14.6 9.3h2.4v2.4h-2.4z" />
    </svg>
  ),
  // terno — paletó com duas lapelas em V, um botão e bolso
  terno: (s) => (
    <svg {...g(s)}>
      <path d="M7 4 6 19h12L17 4l-5 6Z" />
      <path d="M7 4l5 6" />
      <path d="M17 4l-5 6" />
      <circle cx="12" cy="14.5" r=".55" />
      <path d="M13.5 16.5h3" />
    </svg>
  ),
  // macacão — torso de jardineira, duas alças e bolso no peito
  macacao: (s) => (
    <svg {...g(s)}>
      <path d="M7 9v10h10V9" />
      <path d="M9 4l-2 5" />
      <path d="M15 4l2 5" />
      <path d="M9 4v3" />
      <path d="M15 4v3" />
      <path d="M10 11h4v3h-4z" />
    </svg>
  ),
  // capa — manto drapejado com fecho no pescoço
  capa: (s) => (
    <svg {...g(s)}>
      <path d="M8 5c1.5 2 6.5 2 8 0" />
      <path d="M8 5C5 7 4 14 4 19c2.7-1.2 5.3-1.2 8-1.2s5.3 0 8 1.2c0-5-1-12-4-14" />
      <path d="M12 6.2v1.6" />
      <circle cx="12" cy="9" r="1.1" />
    </svg>
  ),
  // gema — diamante lapidado: mesa no topo, facetas da coroa e ponta inferior
  gema: (s) => (
    <svg {...g(s)}>
      <path d="M8 5h8l3 4-7 10-7-10Z" />
      <path d="M5 9h14" />
      <path d="M8 5l-3 4" />
      <path d="M16 5l3 4" />
      <path d="M9.5 9 12 19l2.5-10" />
    </svg>
  ),
  // pérola — círculo limpo com arco de brilho em crescente
  perola: (s) => (
    <svg {...g(s)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 9c-1.3 1-1.7 3-.8 4.7" />
    </svg>
  ),
  // ficha — fixa de pôquer: círculo externo, anel interno e entalhes na borda
  ficha: (s) => (
    <svg {...g(s)}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.4" />
      <path d="M12 4v2.2" />
      <path d="M12 17.8V20" />
      <path d="M4 12h2.2" />
      <path d="M17.8 12H20" />
    </svg>
  ),
  // flor — cravo: corola franzida no topo, caule e uma folha
  flor: (s) => (
    <svg {...g(s)}>
      <path d="M8 7.5c-.8-1.4.6-2.8 1.8-2 .2-1.6 2.2-1.6 2.2 0 0-1.6 2-1.6 2.2 0 1.2-.8 2.6.6 1.8 2 1.4.4 1.2 2.4-.3 2.6.6 1.2-.9 2.4-1.9 1.5-.6 1.2-2.6.7-2.6-.7 0 1.4-2 1.9-2.6.7-1 .9-2.5-.3-1.9-1.5-1.5-.2-1.7-2.2-.3-2.6Z" />
      <path d="M12 12v6.5" />
      <path d="M12 16c1.8-.3 3-1.6 3.2-3.4-1.8.2-3 1.6-3.2 3.4Z" />
    </svg>
  ),
  // pulseira — argola oval com um pingente/gema pendurado
  pulseira: (s) => (
    <svg {...g(s)}>
      <ellipse cx="12" cy="10" rx="6" ry="6.5" />
      <path d="M12 16.5v1.8" />
      <path d="M10.4 19 12 21l1.6-2-1.6-1.2Z" />
    </svg>
  ),
  // travesseiro — fronha rechonchuda com costura e borlas nos cantos
  travesseiro: (s) => (
    <svg {...g(s)}>
      <path d="M6 8c-1 1.5-1 6.5 0 8 3.5 1 10.5 1 14 0 1-1.5 1-6.5 0-8-3.5-1-10.5-1-14 0Z" />
      <path d="M8 9.5c2.5-.5 5.5-.5 8 0" />
      <path d="M5.5 7.5 4.5 6.5" />
      <path d="M18.5 7.5 19.5 6.5" />
      <path d="M5.5 16.5 4.5 17.5" />
      <path d="M18.5 16.5 19.5 17.5" />
    </svg>
  ),
};
