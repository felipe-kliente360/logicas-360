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
  type InProgress,
  type Settings,
} from "./storage";
import { chime, winChime, buzz } from "./feedback";

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

interface Props {
  puzzle: Puzzle;
  settings: Settings;
  onBack: () => void;
  onSolved: () => void;
  onOpenSettings: () => void;
}

export function Board({ puzzle, settings, onBack, onSolved, onOpenSettings }: Props) {
  const saved = useMemo(() => loadInProgress(puzzle.id), [puzzle.id]);

  const [board, setBoard] = useState<Board>(() => restoreBoard(puzzle, saved));
  const [openClues, setOpenClues] = useState(true);
  const [litClue, setLitClue] = useState<string | null>(null);
  const [sheet, setSheet] = useState<SheetTarget | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);
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

  const persist = useCallback(() => {
    if (wonRef.current) return;
    const ms = runningRef.current ? Date.now() - startRef.current : elapsedRef.current;
    const filledNow = puzzle.categories.reduce((a, c) => a + boardRef.current[c.id].filter(Boolean).length, 0);
    if (filledNow === 0) clearInProgress(puzzle.id);
    else saveInProgress(puzzle.id, { board: boardRef.current, elapsedMs: ms });
  }, [puzzle]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 500);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    persist();
  }, [board, persist]);

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
    setSheet(null);
  }

  // dica: preenche o primeiro slot vazio (ordem posição → categoria) com o valor correto
  function hint() {
    for (let p = 0; p < puzzle.size; p++) {
      for (const c of puzzle.categories) {
        if (!board[c.id][p]) {
          const val = puzzle.solution[c.id][p];
          const col = [...board[c.id]];
          const dup = col.indexOf(val);
          if (dup !== -1) col[dup] = null;
          col[p] = val;
          const next: Board = { ...board, [c.id]: col };
          maybeCelebrateSeat(next, p, seatMatches(board, puzzle, p));
          setBoard(next);
          return;
        }
      }
    }
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

  function reset() {
    clearInProgress(puzzle.id);
    setBoard(emptyBoard(puzzle));
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

  useEffect(() => {
    if (!hintOpen) return;
    const onDown = (e: MouseEvent) => {
      if (hintRef.current && !hintRef.current.contains(e.target as Node)) setHintOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [hintOpen]);

  const source = (puzzle.source ?? "desafio").toUpperCase();

  return (
    <div className="app screen-in">
      <header>
        <div className="topbar">
          <button className="backbtn" onClick={onBack} aria-label="Voltar para as fases">
            ‹ Fases
          </button>
          <div className="topbar-right">
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

      {/* referencial da spine — hint clicável */}
      {puzzle.spine.ordered && puzzle.spine.referential && (
        <div className="hint-wrap" ref={hintRef}>
          <button
            className={"hint-chip" + (hintOpen ? " open" : "")}
            onClick={() => setHintOpen((o) => !o)}
            aria-expanded={hintOpen}
          >
            🧭 Como ler as posições
          </button>
          {hintOpen && <div className="hint-pop">{puzzle.spine.referential}</div>}
        </div>
      )}

      {/* fila / seats */}
      <section className={"queue" + (puzzle.spine.ordered ? " ordered" : "") + (shake ? " shake" : "")}>
        {Array.from({ length: puzzle.size }, (_, p) => (
          <div key={p} className={"seat" + (seatSolved(p) ? " solved" : "")}>
            <div className="badge">{puzzle.spine.labels[p]}</div>
            <div className="slots">
              {puzzle.categories.map((cat) => {
                const v = valueOf(cat.id, board[cat.id][p]);
                return (
                  <button
                    key={cat.id}
                    className={"slot" + (v ? " filled" : "") + (isLit(cat.id, p) ? " lit" : "")}
                    onClick={() => setSheet({ cat, pos: p })}
                  >
                    <Swatch value={v} />
                    <span className="scol">
                      <span className="slabel">{cat.label}</span>
                      <span className="sval">{v ? v.label : "tocar para escolher"}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* barra de ação: Verificar + dica */}
      <div className="bar">
        <div className="bar-inner">
          <button className="act primary" onClick={check}>
            Verificar
          </button>
          <button className="act ghost hintbtn" onClick={hint} aria-label="Dica">
            ?
          </button>
        </div>
      </div>

      {/* bottom sheet */}
      <BottomSheet
        target={sheet}
        spineLabel={sheet ? `${puzzle.spine.label} · ${puzzle.spine.labels[sheet.pos]}` : ""}
        column={sheet ? board[sheet.cat.id] : []}
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
        <div className="win-actions">
          <button className="act primary" onClick={reset}>
            Jogar de novo
          </button>
          <button className="act ghost" style={{ marginTop: 10 }} onClick={onBack}>
            Voltar às fases
          </button>
        </div>
      </div>
    </div>
  );
}
