import { useEffect, useState } from "react";
import { PUZZLES, getPuzzle } from "./puzzles";
import { Home } from "./game/Home";
import { Board } from "./game/Board";
import { Settings } from "./game/Settings";
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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [settings, setSettings] = useState<SettingsT>(() => loadSettings());
  const [showSettings, setShowSettings] = useState(false);

  const active = activeId ? getPuzzle(activeId) : undefined;

  // tema do mundo conforme a tela
  useEffect(() => {
    document.body.dataset.theme = active ? active.themeId : "home";
  }, [active]);

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

  return (
    <>
      {active.themeId === "ponto-de-onibus" && <div className="rain" />}
      <Board
        key={active.id}
        puzzle={active}
        realtimeFeedback={settings.realtimeFeedback}
        onBack={() => setActiveId(null)}
        onSolved={() => setProgress(markCompleted(active.id))}
        onOpenSettings={() => setShowSettings(true)}
      />
      {settingsOverlay}
    </>
  );
}
