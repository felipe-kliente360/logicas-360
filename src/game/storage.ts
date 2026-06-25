// Progresso no MVP: localStorage. Quando quiser login/sync/ranking, troca por Supabase
// atrás desta mesma interface (não acoplar cedo).
const KEY = "logicas360.progress.v1";

export interface Progress {
  completed: string[]; // ids de puzzles resolvidos
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completed: [] };
    const p = JSON.parse(raw) as Progress;
    return { completed: Array.isArray(p.completed) ? p.completed : [] };
  } catch {
    return { completed: [] };
  }
}

export function markCompleted(id: string): Progress {
  const p = loadProgress();
  if (!p.completed.includes(id)) p.completed.push(id);
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage cheio/indisponível — segue sem persistir */
  }
  return p;
}
