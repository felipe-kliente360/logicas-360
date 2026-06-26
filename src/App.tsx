import { useEffect, useState } from "react";
import { PUZZLES, getPuzzle } from "./puzzles";
import { Home } from "./game/Home";
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

// Navegação leve (home ↔ fase) por estado. Tema do mundo no data-theme; claro/escuro no data-mode.
export default function App() {
  const [splash, setSplash] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [settings, setSettings] = useState<SettingsT>(() => loadSettings());
  const [showSettings, setShowSettings] = useState(false);

  const active = activeId ? getPuzzle(activeId) : undefined;

  // tema único "Neon Petróleo" no app inteiro (sem tema por fase)
  useEffect(() => {
    document.body.dataset.theme = "home";
  }, []);

  // ao trocar de tela, volta o scroll pro topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeId, splash]);

  // claro/escuro global
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
    return (
      <>
        <Home
          puzzles={PUZZLES}
          progress={progress}
          onPick={(id) => setActiveId(id)}
          onOpenSettings={() => setShowSettings(true)}
        />
        {settingsOverlay}
      </>
    );
  }

  // próxima fase não concluída ESTRITAMENTE à frente na lista (nunca volta nível)
  const idx = PUZZLES.findIndex((p) => p.id === active.id);
  const nextId = PUZZLES.slice(idx + 1).find((p) => !progress.completed.includes(p.id))?.id ?? null;
  const allDone = PUZZLES.every((p) => progress.completed.includes(p.id));

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
