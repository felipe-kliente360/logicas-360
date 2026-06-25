// Tela de entrada — seletor de fases. Lê o catálogo e o progresso salvo.
import { useMemo, useState } from "react";
import type { Puzzle } from "../engine/types";
import type { Progress } from "./storage";

const diffWord = (d: number) =>
  d <= 2 ? "Fácil" : d <= 6 ? "Médio" : d <= 8 ? "Difícil" : "Expert";

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
}: {
  puzzles: Puzzle[];
  progress: Progress;
  onPick: (id: string) => void;
}) {
  const doneCount = puzzles.filter((p) => progress.completed.includes(p.id)).length;
  const [band, setBand] = useState<(typeof BANDS)[number]["id"]>("todos");

  const active = BANDS.find((b) => b.id === band)!;
  const visible = useMemo(() => puzzles.filter((p) => active.test(p.difficulty)), [puzzles, active]);
  // contagem por banda, pra esconder filtros vazios
  const counts = useMemo(
    () => BANDS.map((b) => ({ b, n: puzzles.filter((p) => b.test(p.difficulty)).length })),
    [puzzles]
  );

  return (
    <div className="home">
      <div className="rain" />
      <div className="home-hero">
        <p className="eyebrow">Desafios de lógica</p>
        <h1>Lógicas 360</h1>
        <p className="sub">
          {puzzles.length} puzzles de dedução em grade, do mais fácil ao mais difícil. Use as pistas pra descobrir quem é
          quem.
        </p>
      </div>

      <div className="filters">
        {counts.map(({ b, n }) =>
          n === 0 && b.id !== "todos" ? null : (
            <button
              key={b.id}
              className={"chip" + (band === b.id ? " on" : "")}
              onClick={() => setBand(b.id)}
            >
              {b.label}
              <span className="chip-n">{b.id === "todos" ? puzzles.length : n}</span>
            </button>
          )
        )}
      </div>

      <div className="levels">
        {visible.map((p, i) => {
          const done = progress.completed.includes(p.id);
          return (
            <button key={p.id} className={"level-card" + (done ? " done" : "")} onClick={() => onPick(p.id)}>
              <div className="level-num">{done ? "✓" : i + 1}</div>
              <div className="level-body">
                <h3>{p.title}</h3>
                <p className="level-meta">
                  {p.size} entidades · {p.categories.length} categorias
                </p>
                <span className="level-diff">
                  {diffWord(p.difficulty)} · nível {p.difficulty}
                </span>
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
