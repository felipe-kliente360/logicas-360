// Tela da fase — tabuleiro de atribuição (o coração do jogo). Redesign Direção A.
// Cronômetro inicia ao abrir; grava recorde ao concluir; retoma fase abandonada.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Puzzle } from "../engine/types";
import { Swatch } from "../ds/components/Swatch";
import { BottomSheet, type SheetTarget } from "../ds/components/BottomSheet";
import {
  getRecord,
  submitTime,
  formatTime,
  loadInProgress,
  saveInProgress,
  clearInProgress,
  loadHints,
  saveHints,
  clearHints,
  type InProgress,
  type Settings,
} from "./storage";
import { chime, winChime, buzz } from "./feedback";
import { IconRefresh, IconCheck, IconBulb, IconHelp, IconArrowRight } from "../ds/components/icons";

type Board = Record<string, (string | null)[]>;

function emptyBoard(puzzle: Puzzle): Board {
  const b: Board = {};
  puzzle.categories.forEach((c) => (b[c.id] = Array(puzzle.size).fill(null)));
  return b;
}

// restaura o tabuleiro salvo, validando o formato contra o puzzle atual
function restoreBoard(puzzle: Puzzle, saved?: InProgress): Board {
  const b = emptyBoard(puzzle);
  if (!saved?.board) return b;
  for (const c of puzzle.categories) {
    const col = saved.board[c.id];
    if (!Array.isArray(col) || col.length !== puzzle.size) return emptyBoard(puzzle); // formato mudou
    b[c.id] = col.map((v) => (typeof v === "string" ? v : null));
  }
  return b;
}

const seatMatches = (b: Board, puzzle: Puzzle, pos: number) =>
  puzzle.categories.every((c) => b[c.id][pos] && b[c.id][pos] === puzzle.solution[c.id][pos]);

const MAX_HINTS = 3;
const cellKey = (cat: string, pos: number) => `${cat}:${pos}`;
const noteKey = (cat: string, pos: number, value: string) => `${cat}:${pos}:${value}`;

// força os valores corretos nas posições cravadas pela ajuda
function applyLocks(board: Board, puzzle: Puzzle, locks: { cat: string; pos: number }[]): Board {
  if (!locks.length) return board;
  const next: Board = {};
  for (const c of puzzle.categories) next[c.id] = [...board[c.id]];
  for (const { cat, pos } of locks) if (next[cat]) next[cat][pos] = puzzle.solution[cat][pos];
  return next;
}

interface Props {
  puzzle: Puzzle;
  settings: Settings;
  nextId: string | null; // próxima fase não concluída à frente (ou null)
  allDone: boolean; // todas as fases concluídas
  onBack: () => void;
  onNext: () => void;
  onSolved: () => void;
  onOpenSettings: () => void;
}

export function Board({ puzzle, settings, nextId, allDone, onBack, onNext, onSolved, onOpenSettings }: Props) {
  const saved = useMemo(() => loadInProgress(puzzle.id), [puzzle.id]);
  const savedHints = useMemo(() => loadHints(puzzle.id), [puzzle.id]);

  // posições cravadas pela ajuda (persistem ao Limpar; só zeram ao concluir)
  const [locks, setLocks] = useState<{ cat: string; pos: number }[]>(() => savedHints.cells);
  const [hintsLeft, setHintsLeft] = useState(() => Math.max(0, MAX_HINTS - savedHints.used));
  const lockedSet = useMemo(() => new Set(locks.map((l) => cellKey(l.cat, l.pos))), [locks]);

  const [board, setBoard] = useState<Board>(() => applyLocks(restoreBoard(puzzle, saved), puzzle, savedHints.cells));
  const [notes, setNotes] = useState<Set<string>>(() => new Set(saved?.notes ?? [])); // "não é aqui"
  const [openStory, setOpenStory] = useState(true);
  const [openClues, setOpenClues] = useState(true);
  const [litClue, setLitClue] = useState<string | null>(null);
  const [sheet, setSheet] = useState<SheetTarget | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const litTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // cronômetro — retoma de onde parou (startRef recuado pelo tempo já decorrido)
  const startRef = useRef<number>(Date.now() - (saved?.elapsedMs ?? 0));
  const [elapsed, setElapsed] = useState(saved?.elapsedMs ?? 0);
  const [running, setRunning] = useState(true);
  const [record, setRecord] = useState<number | undefined>(() => getRecord(puzzle.id));
  const [result, setResult] = useState<{ ms: number; isNew: boolean } | null>(null);

  const totalSlots = puzzle.size * puzzle.categories.length;
  const valueOf = useMemo(() => {
    const m = new Map<string, Map<string, (typeof puzzle.categories)[0]["values"][0]>>();
    puzzle.categories.forEach((c) => m.set(c.id, new Map(c.values.map((v) => [v.id, v]))));
    return (catId: string, valId: string | null) => (valId ? m.get(catId)?.get(valId) : undefined);
  }, [puzzle]);

  const filled = puzzle.categories.reduce((a, c) => a + board[c.id].filter(Boolean).length, 0);

  // refs "vivos" para salvar o estado em handlers (fechar app / desmontar)
  const boardRef = useRef(board);
  boardRef.current = board;
  const runningRef = useRef(running);
  runningRef.current = running;
  const elapsedRef = useRef(elapsed);
  elapsedRef.current = elapsed;
  const wonRef = useRef(won);
  wonRef.current = won;
  const notesRef = useRef(notes);
  notesRef.current = notes;

  const persist = useCallback(() => {
    if (wonRef.current) return;
    const ms = runningRef.current ? Date.now() - startRef.current : elapsedRef.current;
    const filledNow = puzzle.categories.reduce((a, c) => a + boardRef.current[c.id].filter(Boolean).length, 0);
    const hasContent = filledNow > 0 || notesRef.current.size > 0;
    if (!hasContent) clearInProgress(puzzle.id);
    else saveInProgress(puzzle.id, { board: boardRef.current, elapsedMs: ms, notes: [...notesRef.current] });
  }, [puzzle]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 500);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    persist();
  }, [board, notes, persist]);

  useEffect(() => {
    const onHide = () => persist();
    const onVis = () => {
      if (document.hidden) persist();
    };
    window.addEventListener("pagehide", onHide);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", onHide);
      document.removeEventListener("visibilitychange", onVis);
      persist();
    };
  }, [persist]);

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }

  // efeito de acerto (som+vibração) ao resolver uma posição — alinhado ao feedback visual
  function maybeCelebrateSeat(next: Board, pos: number, was: boolean) {
    if (!settings.realtimeFeedback) return;
    if (!was && seatMatches(next, puzzle, pos)) {
      chime(settings.som);
      buzz(settings.vib);
    }
  }

  function pick(valueId: string, movedFrom: number) {
    if (!sheet) return;
    const cat = sheet.cat.id;
    const pos = sheet.pos;
    const was = seatMatches(board, puzzle, pos);
    const col = [...board[cat]];
    if (col[pos] === valueId) col[pos] = null; // toggle off
    else {
      if (movedFrom !== -1) col[movedFrom] = null; // mantém permutação: move
      col[pos] = valueId;
    }
    const next: Board = { ...board, [cat]: col };
    maybeCelebrateSeat(next, pos, was);
    setBoard(next);
    // ao escolher um valor, some a marca "não é aqui" dele (decisão oposta)
    if (col[pos] === valueId) {
      const k = noteKey(cat, pos, valueId);
      if (notes.has(k)) {
        const n = new Set(notes);
        n.delete(k);
        setNotes(n);
      }
    }
    setSheet(null);
  }

  // marca/desmarca "este valor NÃO é aqui" (anotação de dedução)
  function toggleNote(cat: string, pos: number, value: string) {
    const k = noteKey(cat, pos, value);
    setNotes((prev) => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  }

  // dica: revela um slot ALEATÓRIO ainda errado (vazio ou preenchido errado) e o
  // CRAVA. Orçamento gasto de verdade — persiste ao Limpar; só zera ao concluir.
  function hint() {
    if (hintsLeft <= 0) return;
    const wrong: { cat: string; pos: number }[] = [];
    for (const c of puzzle.categories)
      for (let p = 0; p < puzzle.size; p++)
        if (board[c.id][p] !== puzzle.solution[c.id][p]) wrong.push({ cat: c.id, pos: p });
    if (wrong.length === 0) {
      showToast("Tudo já preenchido — toque em Verificar.");
      return;
    }
    const pick = wrong[Math.floor(Math.random() * wrong.length)];
    const val = puzzle.solution[pick.cat][pick.pos];
    const col = [...board[pick.cat]];
    const dup = col.indexOf(val); // mantém permutação: tira o valor de onde estava
    if (dup !== -1) col[dup] = null;
    col[pick.pos] = val;
    const next: Board = { ...board, [pick.cat]: col };
    const nextLocks = [...locks, pick];
    maybeCelebrateSeat(next, pick.pos, seatMatches(board, puzzle, pick.pos));
    setBoard(next);
    setLocks(nextLocks);
    setHintsLeft((n) => n - 1);
    saveHints(puzzle.id, { used: nextLocks.length, cells: nextLocks });
  }

  function lightClue(id: string) {
    setLitClue((cur) => (cur === id ? null : id));
    if (litTimer.current) clearTimeout(litTimer.current);
    litTimer.current = setTimeout(() => setLitClue(null), 4000);
  }

  function isLit(catId: string, pos: number): boolean {
    if (!litClue) return false;
    const clue = puzzle.clues.find((c) => c.id === litClue);
    if (!clue) return false;
    return clue.highlights.some((h) => h.cat === catId && (h.pos === undefined || h.pos === pos));
  }

  function seatSolved(pos: number): boolean {
    if (!settings.realtimeFeedback && !won) return false;
    return seatMatches(board, puzzle, pos);
  }

  function check() {
    if (filled < totalSlots) {
      showToast("Preencha todas as posições.");
      return;
    }
    const ok = puzzle.categories.every((c) => board[c.id].every((v, p) => v === puzzle.solution[c.id][p]));
    if (ok) {
      const ms = Date.now() - startRef.current;
      setElapsed(ms);
      setRunning(false);
      const { best, isNew } = submitTime(puzzle.id, ms);
      setRecord(best);
      setResult({ ms, isNew });
      wonRef.current = true;
      setWon(true);
      clearInProgress(puzzle.id);
      clearHints(puzzle.id); // fase concluída: ajudas voltam ao máximo num próximo jogo
      winChime(settings.som);
      buzz(settings.vib, [18, 40, 18]);
      onSolved();
    } else {
      showToast("Ainda não — revise as pistas.");
      buzz(settings.vib, 40);
      setShake(true);
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
      shakeTimer.current = setTimeout(() => setShake(false), 500);
    }
  }

  // Limpar/reiniciar: zera o tabuleiro MAS mantém as posições cravadas pela ajuda
  // (e o orçamento já gasto). Após uma vitória, os travados já foram descartados.
  function reset() {
    clearInProgress(puzzle.id);
    const fresh = won ? [] : locks; // se veio da vitória, recomeça limpo
    if (won) {
      setLocks([]);
      setHintsLeft(MAX_HINTS);
    }
    setNotes(new Set());
    setBoard(applyLocks(emptyBoard(puzzle), puzzle, fresh));
    setWon(false);
    setResult(null);
    startRef.current = Date.now();
    setElapsed(0);
    setRunning(true);
  }

  useEffect(
    () => () => {
      if (litTimer.current) clearTimeout(litTimer.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
    },
    []
  );

  const source = (puzzle.source ?? "desafio").toUpperCase();
  const showComoLer = puzzle.spine.ordered && !!puzzle.spine.referential;

  return (
    <div className="app screen-in">
      <header>
        <div className="topbar">
          <button className="backbtn" onClick={onBack} aria-label="Voltar para as fases">
            ‹ Fases
          </button>
          <div className="topbar-right">
            {showComoLer && (
              <button
                className="iconbtn"
                onClick={() => setInfoOpen(true)}
                aria-label="Como ler as posições"
                title="Como ler as posições"
              >
                <IconHelp size={18} />
              </button>
            )}
            <span className="timer" aria-label="tempo">
              {formatTime(elapsed)}
            </span>
            <button className="iconbtn" onClick={onOpenSettings} aria-label="Configurações">
              ⚙
            </button>
          </div>
        </div>
        <p className="eyebrow" style={{ marginTop: 16 }}>
          {source} · nível {puzzle.difficulty}
        </p>
        <h1 className="title board-h1">{puzzle.title}</h1>
        {record != null && <p className="record-line">🏆 Seu recorde: {formatTime(record)}</p>}
        <div className="progress">
          <div className="pbar">
            <div className="pfill" style={{ width: `${(filled / totalSlots) * 100}%` }} />
          </div>
          <span className="pnum">
            {filled}/{totalSlots}
          </span>
        </div>
      </header>

      {/* enunciado (colapsável, aberto por padrão) */}
      <section className={"clues" + (openStory ? " open" : "")}>
        <div className="clues-head" onClick={() => setOpenStory((o) => !o)}>
          <h2>Enunciado</h2>
          <span className="chev">⌄</span>
        </div>
        <div className="clue-list">
          <p className="story-text">{puzzle.story}</p>
        </div>
      </section>

      {/* pistas */}
      <section className={"clues" + (openClues ? " open" : "")}>
        <div className="clues-head" onClick={() => setOpenClues((o) => !o)}>
          <h2>Pistas</h2>
          <span className="meta">{puzzle.clues.length} · toque p/ destacar ⌄</span>
          <span className="chev">⌄</span>
        </div>
        <div className="clue-list">
          {puzzle.clues.map((c, i) => (
            <div key={c.id} className={"clue" + (litClue === c.id ? " lit" : "")} onClick={() => lightClue(c.id)}>
              <span className="n">{i + 1}</span>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* fila / seats */}
      <section className={"queue" + (puzzle.spine.ordered ? " ordered" : "") + (shake ? " shake" : "")}>
        {Array.from({ length: puzzle.size }, (_, p) => (
          <div key={p} className={"seat" + (seatSolved(p) ? " solved" : "")}>
            <div className="badge">{puzzle.spine.labels[p]}</div>
            <div className="slots">
              {puzzle.categories.map((cat) => {
                const v = valueOf(cat.id, board[cat.id][p]);
                const locked = lockedSet.has(cellKey(cat.id, p));
                const ruledCount = v ? 0 : [...notes].filter((k) => k.startsWith(cellKey(cat.id, p) + ":")).length;
                return (
                  <button
                    key={cat.id}
                    className={"slot" + (v ? " filled" : "") + (isLit(cat.id, p) ? " lit" : "") + (locked ? " locked" : "")}
                    onClick={locked ? undefined : () => setSheet({ cat, pos: p })}
                    aria-disabled={locked}
                  >
                    <Swatch value={v} />
                    <span className="scol">
                      <span className="slabel">{cat.label}</span>
                      <span className="sval">{v ? v.label : "tocar para escolher"}</span>
                    </span>
                    {locked ? (
                      <span className="lock" aria-label="preenchido pela ajuda">
                        <IconBulb size={14} />
                      </span>
                    ) : ruledCount > 0 ? (
                      <span className="ruled-n" aria-label={`${ruledCount} descartados`}>✕{ruledCount}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* barra de ação: Limpar · Verificar · Ajuda (contador) */}
      <div className="bar">
        <div className="bar-inner">
          <button
            className="act ghost sq"
            onClick={() => setConfirmClear(true)}
            aria-label="Limpar e reiniciar"
            title="Limpar"
          >
            <IconRefresh />
          </button>
          <button className="act primary verificar" onClick={check} disabled={filled < totalSlots}>
            <IconCheck /> Verificar
          </button>
          <button
            className="act help"
            onClick={hint}
            disabled={hintsLeft <= 0}
            aria-label={`Ajuda — ${hintsLeft} restantes`}
            title="Ajuda: revela uma posição"
          >
            <IconBulb />
            <span className="help-n">{hintsLeft}</span>
          </button>
        </div>
      </div>

      {/* confirmação de limpar (duplo fator) */}
      {confirmClear && (
        <div className="confirm-wrap" onClick={() => setConfirmClear(false)}>
          <div className="confirm-dialog" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>Limpar o tabuleiro?</h3>
            <p>
              Isso apaga o que você preencheu e zera o cronômetro.
              {locks.length > 0 && " As posições reveladas pela ajuda continuam."}
            </p>
            <div className="confirm-btns">
              <button className="mini ghost" onClick={() => setConfirmClear(false)}>
                Cancelar
              </button>
              <button
                className="mini danger"
                onClick={() => {
                  reset();
                  setConfirmClear(false);
                }}
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* folha "como ler as posições" */}
      {showComoLer && (
        <>
          <div className={"scrim" + (infoOpen ? " show" : "")} onClick={() => setInfoOpen(false)} />
          <div className={"sheet" + (infoOpen ? " show" : "")} role="dialog" aria-modal="true">
            <div className="grab" />
            <h3>Como ler as posições</h3>
            <div className="ctx">{puzzle.spine.label}</div>
            <div className="readbar">
              {puzzle.spine.labels.map((l, i) => (
                <span className="readbar-row" key={i}>
                  <span className="readpos">{l}</span>
                  {i < puzzle.size - 1 && (
                    <span className="readarrow">
                      <IconArrowRight size={14} />
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p className="info-text">{puzzle.spine.referential}</p>
          </div>
        </>
      )}

      {/* bottom sheet */}
      <BottomSheet
        target={sheet}
        spineLabel={sheet ? `${puzzle.spine.label} · ${puzzle.spine.labels[sheet.pos]}` : ""}
        column={sheet ? board[sheet.cat.id] : []}
        lockedPos={
          sheet
            ? new Set(locks.filter((l) => l.cat === sheet.cat.id).map((l) => l.pos))
            : undefined
        }
        posLabel={(i) => puzzle.spine.labels[i]}
        ruledOut={
          sheet
            ? new Set(
                [...notes]
                  .filter((k) => k.startsWith(cellKey(sheet.cat.id, sheet.pos) + ":"))
                  .map((k) => k.slice((cellKey(sheet.cat.id, sheet.pos) + ":").length))
              )
            : undefined
        }
        onToggleNote={(valueId) => sheet && toggleNote(sheet.cat.id, sheet.pos, valueId)}
        onPick={pick}
        onClose={() => setSheet(null)}
      />

      {/* toast */}
      <div className={"toast" + (toast ? " show" : "")}>{toast}</div>

      {/* vitória (redesign) */}
      <div className={"winscreen" + (won ? " show" : "")}>
        {won && (
          <div className="confetti" aria-hidden>
            <i style={{ top: 120, left: 40, width: 9, height: 9, borderRadius: 2, background: "var(--glow)", transform: "rotate(20deg)" }} />
            <i style={{ top: 150, right: 48, width: 11, height: 11, borderRadius: 2, background: "var(--glow2)", transform: "rotate(-15deg)", animationDelay: ".1s" }} />
            <i style={{ top: 230, left: 58, width: 7, height: 7, borderRadius: "50%", background: "var(--glow2)", animationDelay: ".2s" }} />
            <i style={{ top: 200, right: 64, width: 7, height: 7, borderRadius: 2, background: "var(--glow)", transform: "rotate(35deg)", animationDelay: ".15s" }} />
          </div>
        )}
        <div className="win-medal">✓</div>
        <div className="win-eyebrow">Puzzle resolvido</div>
        <div className="win-title">Resolvido!</div>
        <p className="win-sub">
          {puzzle.title} · nível {puzzle.difficulty}
        </p>
        <div className="win-stats">
          <div className="win-stat">
            <div className="k">Tempo</div>
            <div className="v">{formatTime(result?.ms ?? elapsed)}</div>
          </div>
          <div className="win-stat rec">
            <div className="k">Recorde</div>
            <div className="v">{result?.isNew ? "★ novo" : formatTime(record ?? result?.ms ?? elapsed)}</div>
          </div>
          <div className="win-stat">
            <div className="k">Pistas</div>
            <div className="v">{puzzle.clues.length}</div>
          </div>
        </div>
        {allDone && <p className="win-alldone">🎉 Você concluiu todas as fases!</p>}
        <div className="win-actions">
          {nextId ? (
            <>
              <button className="act primary" onClick={onNext}>
                Próxima fase →
              </button>
              <button className="act ghost" style={{ marginTop: 10 }} onClick={reset}>
                Jogar de novo
              </button>
              <button className="act ghost" style={{ marginTop: 10 }} onClick={onBack}>
                Voltar às fases
              </button>
            </>
          ) : (
            <>
              <button className="act primary" onClick={reset}>
                Jogar de novo
              </button>
              <button className="act ghost" style={{ marginTop: 10 }} onClick={onBack}>
                Voltar às fases
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
