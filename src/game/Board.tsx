// Tela da fase — tabuleiro de atribuição (o coração do jogo). Consome o Puzzle
// genérico; tema vem do data-theme no <body>. Cronômetro inicia ao abrir; grava
// recorde ao concluir; zera ao limpar. Feedback em tempo real é opcional.
import { useEffect, useMemo, useRef, useState } from "react";
import type { Puzzle } from "../engine/types";
import { Swatch } from "../ds/components/Swatch";
import { BottomSheet, type SheetTarget } from "../ds/components/BottomSheet";
import { getRecord, submitTime, formatTime } from "./storage";

type Board = Record<string, (string | null)[]>;

function emptyBoard(puzzle: Puzzle): Board {
  const b: Board = {};
  puzzle.categories.forEach((c) => (b[c.id] = Array(puzzle.size).fill(null)));
  return b;
}

interface Props {
  puzzle: Puzzle;
  realtimeFeedback: boolean;
  onBack: () => void;
  onSolved: () => void;
  onOpenSettings: () => void;
}

export function Board({ puzzle, realtimeFeedback, onBack, onSolved, onOpenSettings }: Props) {
  const [board, setBoard] = useState<Board>(() => emptyBoard(puzzle));
  const [openClues, setOpenClues] = useState(false);
  const [litClue, setLitClue] = useState<string | null>(null);
  const [sheet, setSheet] = useState<SheetTarget | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [won, setWon] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);
  const litTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // cronômetro
  const startRef = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);
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

  // tique do cronômetro enquanto rodando
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 500);
    return () => clearInterval(id);
  }, [running]);

  function showToast(msg: string) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }

  function pick(valueId: string, movedFrom: number) {
    if (!sheet) return;
    const cat = sheet.cat.id;
    const pos = sheet.pos;
    setBoard((prev) => {
      const next: Board = { ...prev, [cat]: [...prev[cat]] };
      if (next[cat][pos] === valueId) {
        next[cat][pos] = null; // toggle off
      } else {
        if (movedFrom !== -1) next[cat][movedFrom] = null; // mantém permutação: move
        next[cat][pos] = valueId;
      }
      return next;
    });
    setSheet(null);
  }

  function lightClue(id: string) {
    setLitClue(id);
    if (litTimer.current) clearTimeout(litTimer.current);
    litTimer.current = setTimeout(() => setLitClue(null), 2600);
  }

  function isLit(catId: string, pos: number): boolean {
    if (!litClue) return false;
    const clue = puzzle.clues.find((c) => c.id === litClue);
    if (!clue) return false;
    return clue.highlights.some((h) => h.cat === catId && (h.pos === undefined || h.pos === pos));
  }

  // só destaca o cartão certo se o feedback em tempo real estiver ligado (ou já venceu)
  function seatSolved(pos: number): boolean {
    if (!realtimeFeedback && !won) return false;
    return puzzle.categories.every((c) => board[c.id][pos] && board[c.id][pos] === puzzle.solution[c.id][pos]);
  }

  function check() {
    if (filled < totalSlots) {
      showToast(`Faltam ${totalSlots - filled} espaços. Continue!`);
      return;
    }
    let wrong = 0;
    puzzle.categories.forEach((c) => {
      for (let p = 0; p < puzzle.size; p++) if (board[c.id][p] !== puzzle.solution[c.id][p]) wrong++;
    });
    if (wrong === 0) {
      const ms = Date.now() - startRef.current;
      setElapsed(ms);
      setRunning(false);
      const { best, isNew } = submitTime(puzzle.id, ms);
      setRecord(best);
      setResult({ ms, isNew });
      setWon(true);
      onSolved();
    } else {
      const okSeats = Array.from({ length: puzzle.size }, (_, p) => p).filter((p) =>
        puzzle.categories.every((c) => board[c.id][p] === puzzle.solution[c.id][p])
      ).length;
      showToast(`${okSeats} de ${puzzle.size} certas. Reveja as pistas.`);
    }
  }

  // limpar/recomeçar: zera tabuleiro E cronômetro
  function reset() {
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

  const diffLabel =
    puzzle.difficulty <= 2 ? "fácil" : puzzle.difficulty <= 6 ? "médio" : puzzle.difficulty <= 8 ? "difícil" : "expert";

  return (
    <div className="app">
      <header>
        <div className="topbar">
          <button className="backbtn" onClick={onBack} aria-label="Voltar para a home">
            ← Início
          </button>
          <div className="topbar-right">
            <span className="timer" aria-label="tempo">
              ⏱ {formatTime(elapsed)}
            </span>
            <button className="iconbtn" onClick={onOpenSettings} aria-label="Configurações">
              ⚙
            </button>
          </div>
        </div>
        <p className="eyebrow" style={{ marginTop: 14 }}>
          Desafio de lógica · {diffLabel} · nível {puzzle.difficulty}
        </p>
        <h1 className="title">{puzzle.title}</h1>
        <p className="sub">{puzzle.story}</p>
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
          <span className="meta">{puzzle.clues.length} · toque para destacar ▾</span>
          <span className="chev">▾</span>
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
      <section className={"queue" + (puzzle.spine.ordered ? " ordered" : "")}>
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

      {/* barra inferior */}
      <div className="bar">
        <div className="bar-inner">
          <button className="act ghost" onClick={reset}>
            Limpar
          </button>
          <button className="act primary" onClick={check}>
            Verificar
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

      {/* win */}
      <div className={"win" + (won ? " show" : "")}>
        <div className="win-card">
          <div className="badge-win">{result?.isNew ? "🏆" : "🎉"}</div>
          <div className="big">{result?.isNew ? "Novo recorde!" : "Resolvido!"}</div>
          <p>
            Você deduziu todas as {puzzle.size} entidades de {puzzle.title} em{" "}
            <strong>{formatTime(result?.ms ?? elapsed)}</strong>.
            {result && !result.isNew && record != null && <> Seu recorde: {formatTime(record)}.</>}
          </p>
          <button className="act primary" style={{ width: "100%", marginBottom: 10 }} onClick={onBack}>
            Voltar pras fases
          </button>
          <button className="act ghost" style={{ width: "100%" }} onClick={reset}>
            Jogar de novo
          </button>
        </div>
      </div>
    </div>
  );
}
