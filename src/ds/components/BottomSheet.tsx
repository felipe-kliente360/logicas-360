// Bottom sheet de escolha de valor. Auto-move: escolher um valor já usado naquela
// categoria move ele do outro cartão (a fila nunca fica inválida).
import type { Category, CategoryValue } from "../../engine/types";
import { Swatch } from "./Swatch";

export interface SheetTarget {
  cat: Category;
  pos: number;
}

interface Props {
  target: SheetTarget | null;
  spineLabel: string; // ex.: "Posição 3 da fila"
  column: (string | null)[]; // estado atual da coluna (categoryId) por posição
  lockedPos?: Set<number>; // posições cravadas por ajuda nesta categoria
  posLabel?: (i: number) => string; // rótulo da posição i (ex.: "2 anos", "R$ 60")
  ruledOut?: Set<string>; // valores marcados como "não é aqui" nesta posição
  onToggleNote?: (valueId: string) => void;
  onPick: (valueId: string, movedFrom: number) => void;
  onClose: () => void;
}

export function BottomSheet({
  target,
  spineLabel,
  column,
  lockedPos,
  posLabel,
  ruledOut,
  onToggleNote,
  onPick,
  onClose,
}: Props) {
  const open = target !== null;
  const current = target ? column[target.pos] : null;

  return (
    <>
      <div className={"scrim" + (open ? " show" : "")} onClick={onClose} />
      <div className={"sheet" + (open ? " show" : "")} role="dialog" aria-modal="true">
        <div className="grab" />
        <h3>{target?.cat.label ?? ""}</h3>
        <div className="ctx">{spineLabel}</div>
        <div className="opts">
          {target?.cat.values.map((v: CategoryValue) => {
            const usedAt = column.indexOf(v.id);
            const usedElsewhere = usedAt !== -1 && usedAt !== target.pos;
            const isCurrent = v.id === current;
            const lockedElsewhere = usedElsewhere && !!lockedPos?.has(usedAt); // cravado pela ajuda
            const movable = usedElsewhere && !lockedElsewhere; // usado em outra posição, mas pode mover
            const free = !isCurrent && !usedElsewhere; // livre: pode marcar "não é aqui"
            const ruled = free && !!ruledOut?.has(v.id);
            const whereLabel = usedAt !== -1 ? posLabel?.(usedAt) ?? `${usedAt + 1}ª` : "";
            return (
              <div
                key={v.id}
                className={
                  "opt" +
                  (isCurrent ? " current" : "") +
                  (lockedElsewhere ? " locked" : "") +
                  (movable ? " taken" : "") +
                  (ruled ? " ruled" : "")
                }
                onClick={() => {
                  if (lockedElsewhere) return; // não move um valor cravado
                  onPick(v.id, usedElsewhere ? usedAt : -1);
                }}
              >
                <span className="opt-swatch">
                  <Swatch value={v} />
                  {(movable || lockedElsewhere || ruled) && <span className="opt-x" aria-hidden>✕</span>}
                </span>
                <span className="name">{v.label}</span>
                {isCurrent ? (
                  <span className="used clear-x">remover ✕</span>
                ) : lockedElsewhere ? (
                  <span className="used">💡 dica</span>
                ) : movable ? (
                  <span className="used">em {whereLabel} · mover</span>
                ) : (
                  <button
                    className={"note-x" + (ruled ? " on" : "")}
                    aria-label={ruled ? "desmarcar não é aqui" : "marcar que não é aqui"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleNote?.(v.id);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
