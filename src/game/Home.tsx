// Tela de entrada — seletor de casos de investigação, progresso e recordes.
import { useMemo, useState } from "react";
import type { Puzzle } from "../engine/types";
import { getCaseRecord, formatTime, hasInProgress, getTutorialSeen, type Progress } from "./storage";
import { Logo } from "../ds/components/Logo";
import { IconGear, IconFolder, IconChevronRight, IconSearch } from "../ds/components/icons";

const diffWord = (d: number) => (d <= 2 ? "Fácil" : d <= 6 ? "Médio" : d <= 8 ? "Difícil" : "Expert");

const BANDS = [
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
              Investigação
            </p>
            <span className="confidential sm">Confidencial</span>
          </div>
          <button className="iconbtn" onClick={onOpenSettings} aria-label="Configurações">
            <IconGear size={18} />
          </button>
        </div>

        <h1>Arquivo Nº 360</h1>
        <p className="headline">Junte as pistas e aponte o culpado.</p>
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

      {puzzles[0] && !getTutorialSeen() && (
        <button className="learn-banner" onClick={() => onPick(puzzles[0].id)}>
          <span className="learn-ic">
            <IconSearch size={20} />
          </span>
          <span className="learn-tx">
            <b>Primeira vez por aqui?</b>
            <span>Aprenda a jogar com o caso de treino.</span>
          </span>
          <IconChevronRight size={20} />
        </button>
      )}

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
          const caseRec = getCaseRecord(p.id);
          const inProgress = !done && hasInProgress(p.id);
          return (
            <button key={p.id} className={"level-card case" + (done ? " done" : "")} onClick={() => onPick(p.id)}>
              <div className="level-num"><IconFolder size={22} /></div>
              <div className="level-body">
                <h3>
                  {p.title}
                  {done && <span className="done-tick">· encerrado</span>}
                </h3>
                <p className="level-meta">
                  {`Caso ${numberOf.get(p.id)} · ${diffWord(p.difficulty)} · ${p.size} suspeitos`}
                </p>
                {caseRec ? (
                  <span className="level-diff">
                    <IconFolder size={13} /> {caseRec.accusations}ª acusação · {formatTime(caseRec.ms)}
                  </span>
                ) : inProgress ? (
                  <span className="level-diff resume">
                    <IconChevronRight size={13} /> continuar de onde parou
                  </span>
                ) : null}
              </div>
              <span className="level-chev"><IconChevronRight size={18} /></span>
            </button>
          );
        })}
      </div>

      <p className="home-foot">
        {doneCount}/{puzzles.length} casos encerrados
      </p>
    </div>
  );
}
