// Tela de Configurações (overlay). Tudo persistido em localStorage.
import { useState } from "react";
import type { Settings } from "./storage";

interface Props {
  settings: Settings;
  completed: number;
  total: number;
  onChange: (next: Settings) => void;
  onResetProgress: () => void;
  onResetRecords: () => void;
  onClose: () => void;
}

function Toggle({ on, onClick, label, hint }: { on: boolean; onClick: () => void; label: string; hint?: string }) {
  return (
    <button className="set-row" onClick={onClick} role="switch" aria-checked={on}>
      <span className="set-text">
        <span className="set-label">{label}</span>
        {hint && <span className="set-hint">{hint}</span>}
      </span>
      <span className={"toggle" + (on ? " on" : "")}>
        <span className="knob" />
      </span>
    </button>
  );
}

export function Settings({ settings, completed, total, onChange, onResetProgress, onResetRecords, onClose }: Props) {
  const [confirm, setConfirm] = useState<null | "progress" | "records">(null);

  return (
    <div className="overlay show" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-head">
          <h2>Configurações</h2>
          <button className="x" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className="set-group">
          <Toggle
            label="Feedback em tempo real"
            hint="Acende o cartão quando todos os atributos dele batem. Desligado, você só descobre ao Verificar."
            on={settings.realtimeFeedback}
            onClick={() => onChange({ ...settings, realtimeFeedback: !settings.realtimeFeedback })}
          />
          <Toggle
            label="Tema claro"
            hint="Alterna entre o tema escuro (padrão) e o claro."
            on={settings.theme === "light"}
            onClick={() => onChange({ ...settings, theme: settings.theme === "light" ? "dark" : "light" })}
          />
        </div>

        <div className="set-stat">
          {completed}/{total} fases concluídas
        </div>

        <div className="set-group">
          {confirm === "progress" ? (
            <div className="confirm">
              <span>Apagar todo o progresso?</span>
              <div className="confirm-btns">
                <button className="mini ghost" onClick={() => setConfirm(null)}>
                  Cancelar
                </button>
                <button
                  className="mini danger"
                  onClick={() => {
                    onResetProgress();
                    setConfirm(null);
                  }}
                >
                  Apagar
                </button>
              </div>
            </div>
          ) : (
            <button className="set-row danger-row" onClick={() => setConfirm("progress")}>
              <span className="set-label">Resetar progresso</span>
              <span className="set-hint">↺</span>
            </button>
          )}

          {confirm === "records" ? (
            <div className="confirm">
              <span>Apagar todos os tempos recorde?</span>
              <div className="confirm-btns">
                <button className="mini ghost" onClick={() => setConfirm(null)}>
                  Cancelar
                </button>
                <button
                  className="mini danger"
                  onClick={() => {
                    onResetRecords();
                    setConfirm(null);
                  }}
                >
                  Apagar
                </button>
              </div>
            </div>
          ) : (
            <button className="set-row danger-row" onClick={() => setConfirm("records")}>
              <span className="set-label">Resetar tempos recorde</span>
              <span className="set-hint">↺</span>
            </button>
          )}
        </div>

        <p className="set-foot">Tudo fica salvo só neste navegador.</p>
      </div>
    </div>
  );
}
