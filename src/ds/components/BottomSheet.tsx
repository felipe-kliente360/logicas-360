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
  onPick: (valueId: string, movedFrom: number) => void;
  onClose: () => void;
}

export function BottomSheet({ target, spineLabel, column, onPick, onClose }: Props) {
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
            return (
              <div
                key={v.id}
                className={"opt" + (isCurrent ? " current" : "")}
                onClick={() => onPick(v.id, usedElsewhere ? usedAt : -1)}
              >
                <Swatch value={v} />
                <span className="name">{v.label}</span>
                {isCurrent ? (
                  <span className="used clear-x">remover ✕</span>
                ) : usedElsewhere ? (
                  <span className="used">em uso → move</span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
