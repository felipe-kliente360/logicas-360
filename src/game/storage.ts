// Persistência no MVP: localStorage. Quando quiser login/sync/ranking, troca por
// Supabase atrás destas mesmas funções (não acoplar cedo).
const PROGRESS_KEY = "logicas360.progress.v1";
const SETTINGS_KEY = "logicas360.settings.v1";
const RECORDS_KEY = "logicas360.records.v1";
const TUTSEEN_KEY = "logicas360.tutseen.v1";

/* ---------- onboarding (tutorial guiado visto) ---------- */
export function getTutorialSeen(): boolean {
  return read<boolean>(TUTSEEN_KEY, false) === true;
}
export function setTutorialSeen(v = true): void {
  write(TUTSEEN_KEY, v);
}

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage cheio/indisponível — segue sem persistir */
  }
};

/* ---------- progresso ---------- */
export interface Progress {
  completed: string[]; // ids de puzzles resolvidos
}

export function loadProgress(): Progress {
  const p = read<Progress>(PROGRESS_KEY, { completed: [] });
  return { completed: Array.isArray(p.completed) ? p.completed : [] };
}

export function markCompleted(id: string): Progress {
  const p = loadProgress();
  if (!p.completed.includes(id)) p.completed.push(id);
  write(PROGRESS_KEY, p);
  return p;
}

export function resetProgress(): Progress {
  const empty = { completed: [] };
  write(PROGRESS_KEY, empty);
  write(TUTSEEN_KEY, false); // reabilita o onboarding
  return empty;
}

/* ---------- configurações ---------- */
export type ThemeMode = "dark" | "light";
export interface Settings {
  realtimeFeedback: boolean; // acende o cartão quando os atributos batem (antes de Verificar)
  theme: ThemeMode;
  som: boolean; // efeitos sonoros ao acertar
  vib: boolean; // feedback tátil (vibração)
}
const DEFAULT_SETTINGS: Settings = { realtimeFeedback: false, theme: "dark", som: true, vib: true };

export function loadSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...read<Partial<Settings>>(SETTINGS_KEY, {}) };
}
export function saveSettings(s: Settings): Settings {
  write(SETTINGS_KEY, s);
  return s;
}

/* ---------- recordes de tempo (ms por puzzle) ---------- */
export type Records = Record<string, number>;

export function loadRecords(): Records {
  const r = read<Records>(RECORDS_KEY, {});
  return r && typeof r === "object" ? r : {};
}
export function getRecord(id: string): number | undefined {
  return loadRecords()[id];
}
/** Grava se for o melhor tempo. Retorna o melhor atual e se houve recorde novo. */
export function submitTime(id: string, ms: number): { best: number; isNew: boolean } {
  const records = loadRecords();
  const prev = records[id];
  if (prev == null || ms < prev) {
    records[id] = ms;
    write(RECORDS_KEY, records);
    return { best: ms, isNew: true };
  }
  return { best: prev, isNew: false };
}
export function resetRecords(): Records {
  write(RECORDS_KEY, {});
  write(CASEREC_KEY, {});
  return {};
}

/* ---------- recordes de CASO (investigação): tempo + acusações, CRAVADO ---------- */
export interface CaseRecord {
  ms: number;
  accusations: number; // acusações usadas até acertar (1 = de primeira)
}
const CASEREC_KEY = "logicas360.caserecords.v1";

function loadAllCaseRecords(): Record<string, CaseRecord> {
  const r = read<Record<string, CaseRecord>>(CASEREC_KEY, {});
  return r && typeof r === "object" ? r : {};
}
export function getCaseRecord(id: string): CaseRecord | undefined {
  return loadAllCaseRecords()[id];
}
/** Grava o resultado do caso UMA vez (cravado — não melhora em rejogadas). */
export function submitCaseRecord(id: string, ms: number, accusations: number): { rec: CaseRecord; isNew: boolean } {
  const all = loadAllCaseRecords();
  if (all[id]) return { rec: all[id], isNew: false }; // já cravado: não atualiza
  const rec = { ms, accusations };
  all[id] = rec;
  write(CASEREC_KEY, all);
  return { rec, isNew: true };
}

/* ---------- estado em andamento (fase abandonada) ---------- */
export interface InProgress {
  board: Record<string, (string | null)[]>;
  elapsedMs: number;
  notes?: string[]; // anotações "não é aqui" — chaves "cat:pos:valor"
  accusations?: number; // acusações já feitas neste caso (whodunit)
  // marcas da matriz (visão em grade) entre categorias — chave "catA|valA|catB|valB".
  // "no" = ✗ manual; "auto" = ✗ gerado pelo auto-preenchimento (renderiza igual a ✗).
  cross?: Record<string, "yes" | "no" | "auto">;
}
const INPROGRESS_KEY = "logicas360.inprogress.v1";

function loadAllInProgress(): Record<string, InProgress> {
  const r = read<Record<string, InProgress>>(INPROGRESS_KEY, {});
  return r && typeof r === "object" ? r : {};
}
export function loadInProgress(id: string): InProgress | undefined {
  return loadAllInProgress()[id];
}
export function hasInProgress(id: string): boolean {
  return !!loadAllInProgress()[id];
}
export function saveInProgress(id: string, ip: InProgress): void {
  const all = loadAllInProgress();
  all[id] = ip;
  write(INPROGRESS_KEY, all);
}
export function clearInProgress(id: string): void {
  const all = loadAllInProgress();
  if (id in all) {
    delete all[id];
    write(INPROGRESS_KEY, all);
  }
}

/* ---------- ajudas por fase (orçamento gasto + posições cravadas) ---------- */
export interface PhaseHints {
  used: number; // quantas ajudas já foram gastas nesta fase
  cells: { cat: string; pos: number }[]; // posições reveladas (cravadas)
}
const HINTS_KEY = "logicas360.hints.v1";

function loadAllHints(): Record<string, PhaseHints> {
  const r = read<Record<string, PhaseHints>>(HINTS_KEY, {});
  return r && typeof r === "object" ? r : {};
}
export function loadHints(id: string): PhaseHints {
  const h = loadAllHints()[id];
  return h && Array.isArray(h.cells) ? { used: h.used || h.cells.length, cells: h.cells } : { used: 0, cells: [] };
}
export function saveHints(id: string, h: PhaseHints): void {
  const all = loadAllHints();
  all[id] = h;
  write(HINTS_KEY, all);
}
export function clearHints(id: string): void {
  const all = loadAllHints();
  if (id in all) {
    delete all[id];
    write(HINTS_KEY, all);
  }
}

/** mm:ss a partir de ms. */
export function formatTime(ms: number): string {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
