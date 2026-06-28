// Abertura: marca + barra de carregamento. Auto-avança após 2300ms; toque pula.
import { useEffect } from "react";
import { Logo } from "../ds/components/Logo";

export function Splash({ onEnter }: { onEnter: () => void }) {
  useEffect(() => {
    const t = setTimeout(onEnter, 2300);
    return () => clearTimeout(t);
  }, [onEnter]);

  return (
    <div className="splash" onClick={onEnter} role="button" aria-label="Entrar">
      <div className="splash-icon">
        <Logo size={112} />
      </div>
      <div>
        <div className="splash-word">Lógicas 360</div>
        <div className="splash-eyebrow">Investigação &amp; Lógica</div>
      </div>
      <div className="loadtrack">
        <div className="loadfill" />
      </div>
      <div className="splash-foot">toque para abrir o arquivo</div>
    </div>
  );
}
