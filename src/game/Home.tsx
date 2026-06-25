// Tela de entrada — seletor de fases. Lê o catálogo e o progresso salvo.
import type { Puzzle } from "../engine/types";
import type { Progress } from "./storage";

const diffWord = (d: number) =>
  d <= 2 ? "Fácil" : d <= 6 ? "Médio" : d <= 8 ? "Difícil" : "Expert";

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

  return (
    <div className="home">
      <div className="rain" />
      <div className="home-hero">
        <p className="eyebrow">Desafios de lógica</p>
        <h1>Lógicas 360</h1>
        <p className="sub">
          Puzzles de dedução em grade. Use as pistas pra descobrir quem é quem — uma fase de cada vez.
        </p>
      </div>

      <div className="levels">
        {puzzles.map((p, i) => {
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
