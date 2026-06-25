import { useEffect, useState } from "react";
import { PUZZLES, getPuzzle } from "./puzzles";
import { Home } from "./game/Home";
import { Board } from "./game/Board";
import { loadProgress, markCompleted, type Progress } from "./game/storage";

// Navegação leve (home ↔ fase) por estado. O tema vive no data-theme do <body>.
export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  const active = activeId ? getPuzzle(activeId) : undefined;

  // troca o tema do mundo conforme a tela (home tem tema próprio)
  useEffect(() => {
    document.body.dataset.theme = active ? active.themeId : "home";
  }, [active]);

  if (!active) {
    return <Home puzzles={PUZZLES} progress={progress} onPick={(id) => setActiveId(id)} />;
  }

  // motif de chuva só no mundo do ponto de ônibus
  return (
    <>
      {active.themeId === "ponto-de-onibus" && <div className="rain" />}
      <Board
        key={active.id}
        puzzle={active}
        onBack={() => setActiveId(null)}
        onSolved={() => setProgress(markCompleted(active.id))}
      />
    </>
  );
}
