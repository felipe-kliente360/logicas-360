// Renderiza o "dot" de um valor conforme seu display (cor, ícone/emoji ou texto).
// O mesmo componente serve qualquer mundo — é isso que mantém o DS genérico.
import type { CategoryValue } from "../../engine/types";
import { Glyph, GLYPHS } from "./glyphs";

// Paleta de etiquetas — cores distintas, tom médio (texto branco legível por cima).
// Pensada p/ ler bem tanto no papel pardo claro quanto no dossiê noir (dark).
const PALETTE = [
  "#b8473a", // vermelho-tijolo
  "#c97b2c", // âmbar
  "#3f8f7d", // verde-azulado
  "#41699c", // azul-tinta
  "#8a5fa6", // ametista
  "#7a8a39", // oliva
  "#c25775", // rosé
  "#5a7d8c", // azul-ardósia
  "#a86a3c", // ocre
  "#5b8a52", // musgo
  "#a4823a", // mostarda
  "#7a5cc4", // violeta
];

// hash estável p/ quando não recebemos o índice (cor determinística por id)
function hashIndex(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % PALETTE.length;
}

export function swatchTint(index: number): string {
  const i = ((index % PALETTE.length) + PALETTE.length) % PALETTE.length;
  return PALETTE[i];
}

export function Swatch({ value, index }: { value?: CategoryValue; index?: number }) {
  if (!value) return <span className="dot" aria-hidden />;
  const d = value.display;
  if (d.kind === "color") {
    return <span className="dot color" style={{ background: d.hex, borderColor: "rgba(0,0,0,.2)" }} aria-hidden />;
  }
  // glifo temático da nossa linha autoral, em emblema branco sobre a etiqueta colorida
  if (d.kind === "icon" && GLYPHS[d.icon]) {
    const tint = d.hex ?? swatchTint(index ?? hashIndex(value.id));
    return (
      <span className="dot tint glyph" style={{ background: tint }} aria-hidden>
        <Glyph name={d.icon} />
      </span>
    );
  }
  // texto: etiqueta colorida + inicial em alto contraste (legível, nada de hachura)
  const tint = swatchTint(index ?? hashIndex(value.id));
  return (
    <span className="dot tint" style={{ background: tint }} aria-hidden>
      <span className="dot-i">{value.label.charAt(0).toUpperCase()}</span>
    </span>
  );
}
