import { useEffect, useState } from "react";
import { PUZZLES, GRID_PUZZLES, WHODUNITS, getPuzzle } from "./puzzles";
import { Home, type HomeTab } from "./game/Home";
import { Board } from "./game/Board";
import { Settings } from "./game/Settings";
import { Splash } from "./game/Splash";
import {
  loadProgress,
  markCompleted,
  resetProgress,
  loadSettings,
  saveSettings,
  resetRecords,
  type Progress,
  type Settings as SettingsT,
} from "./game/storage";

export default function App() {
  const [splash, setSplash] = useState(true);
  const [tab, setTab] = useState<HomeTab>("investigacoes");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [settings, setSettings] = useState<SettingsT>(() => loadSettings());
  const [showSettings, setShowSettings] = useState(false);

  const active = activeId ? getPuzzle(activeId) : undefined;

  // tema: investigações = dossiê (papel pardo); resto = Neon Petróleo
  useEffect(() => {
    const dossie = active ? active.kind === "whodunit" : tab === "investigacoes";
    document.body.dataset.theme = dossie ? "dossie" : "home";
  }, [active, tab]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeId, splash, tab]);

  useEffect(() => {
    document.body.dataset.mode = settings.theme;
  }, [settings.theme]);

  function updateSettings(next: SettingsT) {
    setSettings(saveSettings(next));
  }

  const settingsOverlay = showSettings && (
    <Settings
      settings={settings}
      completed={progress.completed.length}
      total={PUZZLES.length}
      onChange={updateSettings}
      onResetProgress={() => setProgress(resetProgress())}
      onResetRecords={() => resetRecords()}
      onClose={() => setShowSettings(false)}
    />
  );

  if (splash) {
    return <Splash onEnter={() => setSplash(false)} />;
  }

  if (!active) {
    const list = tab === "investigacoes" ? WHODUNITS : GRID_PUZZLES;
    return (
      <>
        <Home
          puzzles={list}
          tab={tab}
          onTab={setTab}
          investigacoesCount={WHODUNITS.length}
          progress={progress}
          onPick={(id) => setActiveId(id)}
          onOpenSettings={() => setShowSettings(true)}
        />
        {settingsOverlay}
      </>
    );
  }

  // próxima fase não concluída à frente, DENTRO da mesma seção (grade ou investigação)
  const section = active.kind === "whodunit" ? WHODUNITS : GRID_PUZZLES;
  const idx = section.findIndex((p) => p.id === active.id);
  const nextId = section.slice(idx + 1).find((p) => !progress.completed.includes(p.id))?.id ?? null;
  const allDone = section.every((p) => progress.completed.includes(p.id));

  return (
    <>
      <Board
        key={active.id}
        puzzle={active}
        settings={settings}
        nextId={nextId}
        allDone={allDone}
        onBack={() => setActiveId(null)}
        onNext={() => nextId && setActiveId(nextId)}
        onSolved={() => setProgress(markCompleted(active.id))}
        onOpenSettings={() => setShowSettings(true)}
      />
      {settingsOverlay}
    </>
  );
}
