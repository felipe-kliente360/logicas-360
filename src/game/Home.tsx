// Tela de entrada — abas (Puzzles / Investigações), seletor de fases, progresso e recordes.
import { useMemo, useState } from "react";
import type { Puzzle } from "../engine/types";
import { getRecord, getCaseRecord, formatTime, hasInProgress, type Progress } from "./storage";
import { Logo } from "../ds/components/Logo";

export type HomeTab = "puzzles" | "investigacoes";

const diffWord = (d: number) => (d <= 2 ? "Fácil" : d <= 6 ? "Médio" : d <= 8 ? "Difícil" : "Expert");

const BANDS = [
  { id: "facil", label: "Fácil", test: (d: number) => d <= 2 },
  { id: "medio", label: "Médio", test: (d: number) => d >= 3 && d <= 6 },
  { id: "dificil", label: "Difícil", test: (d: number) => d >= 7 && d <= 8 },
  { id: "expert", label: "Expert", test: (d: number) => d >= 9 },
] as const;

export function Home({
  puzzles,
  tab,
  onTab,
  investigacoesCount,
  progress,
  onPick,
  onOpenSettings,
}: {
  puzzles: Puzzle[];
  tab: HomeTab;
  onTab: (t: HomeTab) => void;
  investigacoesCount: number;
  progress: Progress;
  onPick: (id: string) => void;
  onOpenSettings: () => void;
}) {
  const invest = tab === "investigacoes";
  const doneCount = puzzles.filter((p) => progress.completed.includes(p.id)).length;
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const visible = useMemo(
    () =>
      selected.size === 0
        ? puzzles
        : puzzles.filter((p) => BANDS.some((b) => selected.has(b.id) && b.test(p.difficulty))),
    [puzzles, selected]
  );
  const counts = useMemo(
    () => BANDS.map((b) => ({ b, n: puzzles.filter((p) => b.test(p.difficulty)).length })),
    [puzzles]
  );
  const numberOf = useMemo(() => new Map(puzzles.map((p, i) => [p.id, i + 1])), [puzzles]);

  return (
    <div className="home">
      <div className="home-hero">
        <div className="topbar">
          <div className="brand">
            <Logo size={40} />
            <p className="eyebrow" style={{ margin: 0 }}>
              {invest ? "Arquivo de casos" : "Desafios de lógica"}
            </p>
          </div>
          <button className="iconbtn" onClick={onOpenSettings} aria-label="Configurações">
            ⚙
          </button>
        </div>

        {/* abas */}
        <div className="tabs">
          <button className={"tab" + (!invest ? " on" : "")} onClick={() => onTab("puzzles")}>
            Puzzles
          </button>
          <button className={"tab" + (invest ? " on" : "")} onClick={() => onTab("investigacoes")}>
            Investigações
            {investigacoesCount > 0 && <span className="tab-n">{investigacoesCount}</span>}
          </button>
        </div>

        {invest && (
          <div className="dossie-cover">
            <span className="cover-file">Arquivo Nº 360 · {puzzles.length} casos</span>
            <span className="stamp cover-stamp">Confidencial</span>
          </div>
        )}

        <h1>{invest ? "Investigações" : "Lógicas 360"}</h1>
        <p className="sub">
          {invest
            ? `${puzzles.length} casos para resolver: deduza a grade e aponte o culpado.`
            : `${puzzles.length} puzzles de dedução em grade, do mais fácil ao expert.`}
        </p>
        <div className="progress" style={{ marginTop: 16 }}>
          <div className="pbar">
            <div
              className="pfill home-grow"
              style={{ width: `${puzzles.length ? (doneCount / puzzles.length) * 100 : 0}%` }}
            />
          </div>
          <span className="pnum">
            {doneCount}/{puzzles.length}
          </span>
        </div>
      </div>

      <div className="filters">
        {counts.map(({ b, n }) =>
          n === 0 ? null : (
            <button key={b.id} className={"chip" + (selected.has(b.id) ? " on" : "")} onClick={() => toggle(b.id)}>
              {b.label}
              <span className="chip-n">{n}</span>
            </button>
          )
        )}
      </div>

      <div className="levels">
        {visible.map((p) => {
          const done = progress.completed.includes(p.id);
          const rec = getRecord(p.id);
          const caseRec = invest ? getCaseRecord(p.id) : undefined;
          const inProgress = !done && hasInProgress(p.id);
          return (
            <button key={p.id} className={"level-card" + (done ? " done" : "") + (invest ? " case" : "")} onClick={() => onPick(p.id)}>
              <div className="level-num">{invest ? "🔍" : numberOf.get(p.id)}</div>
              <div className="level-body">
                <h3>
                  {p.title}
                  {done && <span className="done-tick"> {invest ? "· encerrado" : "✓"}</span>}
                </h3>
                <p className="level-meta">
                  {invest
                    ? `Caso ${numberOf.get(p.id)} · ${diffWord(p.difficulty)} · ${p.size} suspeitos`
                    : `${diffWord(p.difficulty)} · ${p.size}×${p.categories.length}`}
                </p>
                {caseRec ? (
                  <span className="level-diff">🗄️ {caseRec.accusations}ª acusação · {formatTime(caseRec.ms)}</span>
                ) : rec != null ? (
                  <span className="level-diff">🏆 recorde {formatTime(rec)}</span>
                ) : inProgress ? (
                  <span className="level-diff resume">▸ continuar de onde parou</span>
                ) : null}
              </div>
              <span className="level-chev">›</span>
            </button>
          );
        })}
      </div>

      <p className="home-foot">
        {doneCount}/{puzzles.length} {invest ? "casos encerrados" : "fases concluídas"}
      </p>
    </div>
  );
}
