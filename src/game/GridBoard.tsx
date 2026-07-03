// Visão em GRADE (matriz triangular, estilo revistinha) — visão alternativa à lista.
// Sub-grids Suspeito×categoria derivam de board/notes (mesma fonte de verdade da
// lista → vitória/acusação inalteradas). Sub-grids categoria×categoria usam `cross`
// (anotação exclusiva da grade). Coluna de rótulos congelada + cabeçalho fixo;
// rola na horizontal no retrato. Propagação entre sub-grids é MANUAL (fiel ao papel).
import { Fragment, useMemo } from "react";
import type { Puzzle } from "../engine/types";
import { Swatch } from "../ds/components/Swatch";
import { SuspectAvatar } from "../ds/components/Avatar";
import { IconCheck, IconX } from "../ds/components/icons";

type Cross = Record<string, "yes" | "no">;
type CellState = "yes" | "no" | "empty";

export const crossKey = (a: string, va: string, b: string, vb: string) => `${a}|${va}|${b}|${vb}`;
const noteKey = (cat: string, pos: number, value: string) => `${cat}:${pos}:${value}`;

interface Attr {
  id: string;
  label: string;
  suspect: boolean;
  values: { id: string; label: string; pos: number; cv?: Puzzle["categories"][0]["values"][0] }[];
}

export function GridBoard({
  puzzle,
  board,
  notes,
  cross,
  valIndex,
  onSuspect,
  onCross,
}: {
  puzzle: Puzzle;
  board: Record<string, (string | null)[]>;
  notes: Set<string>;
  cross: Cross;
  valIndex: (catId: string, valId: string | null) => number | undefined;
  onSuspect: (catId: string, pos: number, value: string) => void;
  onCross: (aId: string, va: string, bId: string, vb: string) => void;
}) {
  // atributos: Suspeito (spine) + categorias
  const attrs: Attr[] = useMemo(
    () => [
      {
        id: "__suspeito",
        label: puzzle.spine.label,
        suspect: true,
        values: puzzle.spine.labels.map((l, i) => ({ id: String(i), label: l, pos: i })),
      },
      ...puzzle.categories.map((c) => ({
        id: c.id,
        label: c.label,
        suspect: false,
        values: c.values.map((v) => ({ id: v.id, label: v.label, pos: -1, cv: v })),
      })),
    ],
    [puzzle]
  );

  // colunas = atributos 1..K-1 (nunca o Suspeito); linhas = atributos 0..K-2
  const colAttrs = attrs.slice(1);
  const rowAttrs = attrs.slice(0, -1);
  const colDefs = useMemo(
    () => colAttrs.flatMap((a, aj) => a.values.map((v, vi) => ({ attr: a, attrIdx: aj + 1, v, first: vi === 0 }))),
    [attrs]
  );
  const rowDefs = useMemo(
    () => rowAttrs.flatMap((a, ai) => a.values.map((v, vi) => ({ attr: a, attrIdx: ai, v, first: vi === 0 }))),
    [attrs]
  );
  const ncol = colDefs.length;

  function cellState(rAttr: Attr, rv: Attr["values"][0], cAttr: Attr, cv: Attr["values"][0]): CellState {
    if (rAttr.suspect) {
      const c = cAttr.id;
      const i = rv.pos;
      const col = board[c] ?? [];
      if (col[i] === cv.id) return "yes";
      if (col[i] != null) return "no";
      if (col.includes(cv.id)) return "no";
      if (notes.has(noteKey(c, i, cv.id))) return "no";
      return "empty";
    }
    return (cross[crossKey(rAttr.id, rv.id, cAttr.id, cv.id)] as CellState) ?? "empty";
  }

  const gridStyle = {
    gridTemplateColumns: `var(--mx-label) repeat(${ncol}, minmax(var(--mx-cell), 1fr))`,
  };

  return (
    <div className="matrix-scroll">
      <div className="matrix" style={gridStyle}>
        {/* canto */}
        <div className="mx-corner" style={{ gridRow: 1, gridColumn: 1 }} />
        {/* cabeçalho de colunas */}
        {colDefs.map((cd, k) => (
          <div
            key={"h" + k}
            className={"mx-chead" + (cd.first ? " band" : "") + (cd.attr.suspect ? " sus" : "")}
            style={{ gridRow: 1, gridColumn: k + 2 }}
            title={`${cd.attr.label}: ${cd.v.label}`}
          >
            <span className="mx-dot">
              <Swatch value={cd.v.cv} index={valIndex(cd.attr.id, cd.v.id)} />
            </span>
            <span className="mx-hlabel">{cd.v.label}</span>
          </div>
        ))}
        {/* linhas */}
        {rowDefs.map((rd, r) => (
          <Fragment key={"row" + r}>
            {/* rótulo da linha (coluna congelada) */}
            <div
              className={"mx-rhead" + (rd.first ? " band" : "") + (rd.attr.suspect ? " sus" : "")}
              style={{ gridRow: r + 2, gridColumn: 1 }}
              title={`${rd.attr.label}: ${rd.v.label}`}
            >
              {rd.attr.suspect ? (
                <span className="mx-ava">
                  <SuspectAvatar name={rd.v.label} size={26} />
                </span>
              ) : (
                <span className="mx-dot">
                  <Swatch value={rd.v.cv} index={valIndex(rd.attr.id, rd.v.id)} />
                </span>
              )}
              <span className="mx-rlabel">{rd.v.label}</span>
            </div>
            {/* células */}
            {colDefs.map((cd, k) => {
              if (cd.attrIdx <= rd.attrIdx) return null; // escada: só j > i
              const st = cellState(rd.attr, rd.v, cd.attr, cd.v);
              const onTap = rd.attr.suspect
                ? () => onSuspect(cd.attr.id, rd.v.pos, cd.v.id)
                : () => onCross(rd.attr.id, rd.v.id, cd.attr.id, cd.v.id);
              return (
                <button
                  key={"c" + r + "-" + k}
                  className={"mx-cell " + st + (cd.first ? " bandL" : "") + (rd.first ? " bandT" : "")}
                  style={{ gridRow: r + 2, gridColumn: k + 2 }}
                  onClick={onTap}
                  aria-label={`${rd.v.label} × ${cd.v.label}: ${st === "yes" ? "sim" : st === "no" ? "não" : "vazio"}`}
                >
                  {st === "yes" ? <IconCheck size={15} /> : st === "no" ? <IconX size={12} /> : null}
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
