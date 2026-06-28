// Linha autoral de glifos de ferramentas/objetos (dossiê) — SVG puro, traço
// branco sobre a etiqueta colorida do valor. Mesma gramática dos demais ícones:
// 24×24, currentColor, traço único 1.9. Usados quando um valor declara
// display { kind:"icon", icon:"<nome>" }.
import type { JSX } from "react";
const g = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.9,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const TOOL_GLYPHS: Record<string, (size: number) => JSX.Element> = {
  // seringa — flange, êmbolo, corpo graduado e agulha
  seringa: (s) => (
    <svg {...g(s)}>
      <path d="M12 2.5V5" />
      <path d="M9.6 5h4.8" />
      <path d="M10 7.2h4v9.2h-4z" />
      <path d="M10.8 9h2.4" />
      <path d="M10.8 11h2.4" />
      <path d="M12 16.4v3.4" />
      <path d="M12 21.5v-.3" />
    </svg>
  ),
  // crachá — cartão com clipe, foto e linha de dados
  cracha: (s) => (
    <svg {...g(s)}>
      <path d="M10.4 3.4h3.2v2h-3.2z" />
      <rect x="5.5" y="5.4" width="13" height="15.2" rx="1.8" />
      <rect x="7.8" y="8.2" width="4.2" height="4.2" rx="0.5" />
      <path d="M14 9.2h2.8" />
      <path d="M14 11.4h2.8" />
      <path d="M8 15.6h8" />
      <path d="M8 17.8h5.4" />
    </svg>
  ),
  // pendrive — corpo com tampa e conector metálico saliente
  pendrive: (s) => (
    <svg {...g(s)}>
      <rect x="9" y="6.5" width="6" height="13" rx="1.6" />
      <path d="M9.5 9.4h5" />
      <path d="M10.4 6.5V4.2h3.2v2.3" />
      <path d="M11 4.2V2.6" />
      <path d="M13 4.2V2.6" />
    </svg>
  ),
  // luva — silhueta de mão/luva com quatro dedos e polegar
  luva: (s) => (
    <svg {...g(s)}>
      <path d="M8 11V5.6a1 1 0 0 1 2 0V10" />
      <path d="M10 9.6V4.6a1 1 0 0 1 2 0V9.6" />
      <path d="M12 9.6V5a1 1 0 0 1 2 0V10" />
      <path d="M14 10V7.4a1 1 0 0 1 2 0V13c0 4-2.4 7.5-5 7.5s-5-2.6-5-6.5v-2.6a1 1 0 0 1 2-1.8" />
    </svg>
  ),
  // saca-rolhas — barra superior, haste e hélice em espiral
  sacarrolhas: (s) => (
    <svg {...g(s)}>
      <path d="M7 4.2h10" />
      <path d="M12 4.2v4" />
      <path d="M12 8.2c2 0 2 2 0 2s-2 2 0 2 2 2 0 2-2 2 0 2 2 2 0 2" />
    </svg>
  ),
  // decanter — gargalo estreito e bojo largo arredondado
  decanter: (s) => (
    <svg {...g(s)}>
      <path d="M9.8 3.2h4.4" />
      <path d="M10.6 3.2v4.6c0 .8-.4 1.4-1.1 2C7.4 11.4 6 13.6 6 16c0 2.7 2.7 4.4 6 4.4s6-1.7 6-4.4c0-2.4-1.4-4.6-3.5-6.2-.7-.6-1.1-1.2-1.1-2V3.2" />
    </svg>
  ),
  // foice — lâmina em crescente e cabo curto reto
  foice: (s) => (
    <svg {...g(s)}>
      <path d="M19 5c-1.6-.9-6 .4-8.6 3S7 14.6 7 16" />
      <path d="M19 5c.4 3-1.4 6.4-4 8" />
      <path d="M7 16l-2.4 4" />
      <path d="M5.4 14.6l3.2 2" />
    </svg>
  ),
  // tesoura — dois anéis e lâminas cruzadas
  tesoura: (s) => (
    <svg {...g(s)}>
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
      <path d="M8.3 15.7 19 4.5" />
      <path d="M15.7 15.7 5 4.5" />
      <circle cx="12" cy="12" r=".7" />
    </svg>
  ),
  // lampião — alça superior, corpo de vidro e chama interna
  lampiao: (s) => (
    <svg {...g(s)}>
      <path d="M9.5 4.2c0-1.4 5-1.4 5 0" />
      <path d="M9 5.2h6l-.7 2h-4.6z" />
      <path d="M9 7.2h6l1 4.6c.4 1.9.4 5-.5 6.4-.5.8-1.3 1.2-2.5 1.2h-2c-1.2 0-2-.4-2.5-1.2-.9-1.4-.9-4.5-.5-6.4z" />
      <path d="M12 10.6c1 1 1 2.2 0 3.2-1-1-1-2.2 0-3.2Z" />
    </svg>
  ),
  // combustível — galão retangular com bico lateral e tampa
  combustivel: (s) => (
    <svg {...g(s)}>
      <path d="M5 7.2c0-.8.6-1.4 1.4-1.4H15c.8 0 1.4.6 1.4 1.4v11.4c0 .8-.6 1.4-1.4 1.4H6.4c-.8 0-1.4-.6-1.4-1.4z" />
      <path d="M16.4 9.4h1.8c.8 0 1.4.6 1.4 1.4v1.6c0 .8-.6 1.4-1.4 1.4h-1.8" />
      <path d="M8.6 5.8V4.4h3.8v1.4" />
      <path d="M9.6 10h2.2" />
    </svg>
  ),
};
