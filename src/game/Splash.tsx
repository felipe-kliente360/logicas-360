// Abertura: marca + barra de carregamento. Auto-avança após 2300ms; toque pula.
import { useEffect } from "react";

const MARK = [true, false, false, false, true, false, false, false, true]; // diagonal acesa

export function Splash({ onEnter }: { onEnter: () => void }) {
  useEffect(() => {
    const t = setTimeout(onEnter, 2300);
    return () => clearTimeout(t);
  }, [onEnter]);

  return (
    <div className="splash" onClick={onEnter} role="button" aria-label="Entrar">
      <div className="splash-icon">
        <div className="splash-mark">
          {MARK.map((on, i) => (
            <span key={i} className={on ? "on" : ""} />
          ))}
        </div>
      </div>
      <div>
        <div className="splash-word">Lógicas 360</div>
        <div className="splash-eyebrow">Desafios de lógica</div>
      </div>
      <div className="loadtrack">
        <div className="loadfill" />
      </div>
      <div className="splash-foot">toque para entrar</div>
    </div>
  );
}
