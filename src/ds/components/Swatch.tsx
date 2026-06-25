// Renderiza o "dot" de um valor conforme seu display (cor, ícone/emoji ou texto).
// O mesmo componente serve qualquer mundo — é isso que mantém o DS genérico.
import type { CategoryValue } from "../../engine/types";

export function Swatch({ value }: { value?: CategoryValue }) {
  if (!value) return <span className="dot" aria-hidden />;
  const d = value.display;
  if (d.kind === "color") {
    return <span className="dot color" style={{ background: d.hex, borderColor: "rgba(0,0,0,.2)" }} aria-hidden />;
  }
  if (d.kind === "icon") {
    return (
      <span className="dot" aria-hidden>
        {d.icon}
      </span>
    );
  }
  // texto: marca neutra com a inicial
  return (
    <span className="dot" aria-hidden>
      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-dim)" }}>{value.label.charAt(0)}</span>
    </span>
  );
}
