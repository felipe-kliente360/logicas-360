// Tela de entrada — seletor de fases. Lê o catálogo, o progresso e os recordes.
import { useMemo, useState } from "react";
import type { Puzzle } from "../engine/types";
import { getRecord, formatTime, hasInProgress, type Progress } from "./storage";
import { Logo } from "../ds/components/Logo";

const diffWord = (d: number) => (d <= 2 ? "Fácil" : d <= 6 ? "Médio" : d <= 8 ? "Difícil" : "Expert");

// bandas de dificuldade para o filtro (nossa escala 1..10)
const BANDS = [
  { id: "todos", label: "Todos", test: () => true },
  { id: "facil", label: "Fácil", test: (d: number) => d <= 2 },
  { id: "medio", label: "Médio", test: (d: number) => d >= 3 && d <= 6 },
  { id: "dificil", label: "Difícil", test: (d: number) => d >= 7 && d <= 8 },
  { id: "expert", label: "Expert", test: (d: number) => d >= 9 },
] as const;

export function Home({
  puzzles,
  progress,
  onPick,
  onOpenSettings,
}: {
  puzzles: Puzzle[];
  progress: Progress;
  onPick: (id: string) => void;
  onOpenSettings: () => void;
}) {
  const doneCount = puzzles.filter((p) => progress.completed.includes(p.id)).length;
  const [band, setBand] = useState<(typeof BANDS)[number]["id"]>("todos");

  const active = BANDS.find((b) => b.id === band)!;
  const visible = useMemo(() => puzzles.filter((p) => active.test(p.difficulty)), [puzzles, active]);
  const counts = useMemo(
    () => BANDS.map((b) => ({ b, n: puzzles.filter((p) => b.test(p.difficulty)).length })),
    [puzzles]
  );

  return (
    <div className="home">
      <div className="home-hero">
        <div className="topbar">
          <div className="brand">
            <Logo size={40} />
            <p className="eyebrow" style={{ margin: 0 }}>
              Desafios de lógica
            </p>
          </div>
          <button className="iconbtn" onClick={onOpenSettings} aria-label="Configurações">
            ⚙
          </button>
        </div>
        <h1>Lógicas 360</h1>
        <p className="sub">
          {puzzles.length} puzzles de dedução em grade, do mais fácil ao expert. Use as pistas pra descobrir quem é
          quem.
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
          n === 0 && b.id !== "todos" ? null : (
            <button key={b.id} className={"chip" + (band === b.id ? " on" : "")} onClick={() => setBand(b.id)}>
              {b.label}
              <span className="chip-n">{b.id === "todos" ? puzzles.length : n}</span>
            </button>
          )
        )}
      </div>

      <div className="levels">
        {visible.map((p) => {
          const done = progress.completed.includes(p.id);
          const rec = getRecord(p.id);
          const inProgress = !done && hasInProgress(p.id);
          return (
            <button key={p.id} className={"level-card" + (done ? " done" : "")} onClick={() => onPick(p.id)}>
              <div className="level-num">{p.difficulty}</div>
              <div className="level-body">
                <h3>
                  {p.title}
                  {done && <span className="done-tick"> ✓</span>}
                </h3>
                <p className="level-meta">
                  {diffWord(p.difficulty)} · nível {p.difficulty} · {p.size}×{p.categories.length}
                </p>
                {rec != null ? (
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
        {doneCount}/{puzzles.length} fases concluídas
      </p>
    </div>
  );
}
