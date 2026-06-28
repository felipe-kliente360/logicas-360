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
  getCaseRecord,
  submitCaseRecord,
  type InProgress,
  type Settings,
} from "./storage";
import { chime, winChime, buzz, typeTick, fileClick, stamp, thunk } from "./feedback";
import {
  IconRefresh,
  IconCheck,
  IconBulb,
  IconHelp,
  IconArrowRight,
  IconGear,
  IconSearch,
  IconFolder,
  IconStar,
  IconX,
  IconChevronDown,
  IconSuspect,
} from "../ds/components/icons";

type Board = Record<string, (string | null)[]>;
type TutStep = {
  text: string;
  intro?: boolean;
  slot?: { cat: string; pos: number; value: string };
  accuseBtn?: boolean;
  accuseOpt?: boolean;
};

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
  const [accuseOpen, setAccuseOpen] = useState(false);
  const isWho = puzzle.kind === "whodunit";
  // tutorial guiado (só no caso de treino, na primeira vez)
  const isTutorial = puzzle.id === "sumico-padaria";
  const [tut, setTut] = useState<number>(() => (isTutorial && !getCaseRecord(puzzle.id) ? 0 : -1));
  const [tutFlash, setTutFlash] = useState(false); // pisca o alvo logo após o auto-scroll
  const litTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // cronômetro — retoma de onde parou (startRef recuado pelo tempo já decorrido)
  const startRef = useRef<number>(Date.now() - (saved?.elapsedMs ?? 0));
  const [elapsed, setElapsed] = useState(saved?.elapsedMs ?? 0);
  const [running, setRunning] = useState(true);
  const [record, setRecord] = useState<number | undefined>(() => getRecord(puzzle.id));
  const [caseRecord, setCaseRecord] = useState(() => getCaseRecord(puzzle.id));
  const [accusations, setAccusations] = useState<number>(() => saved?.accusations ?? 0);
  const [result, setResult] = useState<{ ms: number; isNew: boolean; accusations?: number } | null>(null);

  const totalSlots = puzzle.size * puzzle.categories.length;
  const valueOf = useMemo(() => {
    const m = new Map<string, Map<string, (typeof puzzle.categories)[0]["values"][0]>>();
    puzzle.categories.forEach((c) => m.set(c.id, new Map(c.values.map((v) => [v.id, v]))));
    return (catId: string, valId: string | null) => (valId ? m.get(catId)?.get(valId) : undefined);
  }, [puzzle]);
  // índice do valor dentro da categoria — dá a cor estável da etiqueta (Swatch)
  const valIndex = useMemo(() => {
    const m = new Map<string, Map<string, number>>();
    puzzle.categories.forEach((c) => m.set(c.id, new Map(c.values.map((v, i) => [v.id, i]))));
    return (catId: string, valId: string | null) => (valId ? m.get(catId)?.get(valId) : undefined);
  }, [puzzle]);

  // roteiro do tutorial: intro → preenche cada campo (na ordem que deixa o balcão
  // por último) → abre Acusar → aponta o culpado.
  const tutSteps = useMemo<TutStep[]>(() => {
    if (!isTutorial) return [];
    const order: [string, number][] = [
      ["item", 0], ["item", 1], ["item", 2], ["lugar", 1], ["lugar", 2], ["lugar", 0],
    ];
    const fills: TutStep[] = order.map(([cat, pos]) => {
      const value = puzzle.solution[cat]?.[pos] as string;
      const vlabel = valueOf(cat, value)?.label ?? value;
      const clabel = puzzle.categories.find((c) => c.id === cat)?.label ?? cat;
      return { text: `Toque no campo ${clabel} de ${puzzle.spine.labels[pos]} e escolha ${vlabel}.`, slot: { cat, pos, value } };
    });
    return [
      { text: "Bem-vindo, detetive. Vou te guiar até o culpado neste caso de treino.", intro: true },
      ...fills,
      { text: "Grade fechada! A câmera flagrou o culpado no balcão. Toque em Acusar.", accuseBtn: true },
      { text: "Quem ficou no balcão? Aponte o culpado.", accuseOpt: true },
    ];
  }, [isTutorial, puzzle, valueOf]);
  const tcur = tut >= 0 ? tutSteps[tut] : undefined;
  const tutSlot = tcur?.slot;
  const tutAccuseIdx = tcur?.accuseOpt ? puzzle.culprit ?? -1 : -1;

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
  const accusationsRef = useRef(accusations);
  accusationsRef.current = accusations;

  const persist = useCallback(() => {
    if (wonRef.current) return;
    const ms = runningRef.current ? Date.now() - startRef.current : elapsedRef.current;
    const filledNow = puzzle.categories.reduce((a, c) => a + boardRef.current[c.id].filter(Boolean).length, 0);
    const hasContent = filledNow > 0 || notesRef.current.size > 0 || accusationsRef.current > 0;
    if (!hasContent) clearInProgress(puzzle.id);
    else
      saveInProgress(puzzle.id, {
        board: boardRef.current,
        elapsedMs: ms,
        notes: [...notesRef.current],
        accusations: accusationsRef.current,
      });
  }, [puzzle]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 500);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    persist();
  }, [board, notes, persist]);

  // tutorial: avança ao preencher o campo guiado (passos 1..6) ou ao abrir Acusar (7→8)
  useEffect(() => {
    if (tut < 1 || !isTutorial) return;
    let s = tut;
    while (s >= 1 && s <= 6) {
      const st = tutSteps[s];
      if (st?.slot && board[st.slot.cat][st.slot.pos] === st.slot.value) s++;
      else break;
    }
    if (s !== tut) setTut(s);
  }, [board, tut, isTutorial, tutSteps]);
  useEffect(() => {
    if (isTutorial && tut === 7 && accuseOpen) setTut(8);
  }, [accuseOpen, tut, isTutorial]);

  // a cada passo do tutorial: traz o próximo alvo pra tela (auto-scroll) e pisca nele
  useEffect(() => {
    if (tut < 0 || !isTutorial || won) return;
    setTutFlash(false);
    const t1 = setTimeout(() => {
      const el = document.querySelector<HTMLElement>(".tut-on");
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      setTutFlash(true);
    }, 60);
    const t2 = setTimeout(() => setTutFlash(false), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [tut, isTutorial, won]);

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
    fileClick(settings.som);
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
    // numa investigação, a dica nunca entrega um atributo da evidência do crime
    // (seria atalho — não exigimos a grade inteira pra acusar). Só cai nesses
    // como último recurso, se for o único que falta.
    const evCells =
      isWho && puzzle.culprit != null
        ? new Set((puzzle.crime?.evidence ?? []).map((e) => cellKey(e.cat, puzzle.culprit!)))
        : null;
    const pool = evCells ? wrong.filter((w) => !evCells.has(cellKey(w.cat, w.pos))) : wrong;
    const from = pool.length > 0 ? pool : wrong;
    const pick = from[Math.floor(Math.random() * from.length)];
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
    chime(settings.som);
    buzz(settings.vib, 12);
    saveHints(puzzle.id, { used: nextLocks.length, cells: nextLocks });
  }

  function lightClue(id: string) {
    typeTick(settings.som);
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

  const gridCorrect = () =>
    puzzle.categories.every((c) => board[c.id].every((v, p) => v === puzzle.solution[c.id][p]));

  function triggerWin(accCount?: number) {
    const ms = Date.now() - startRef.current;
    setElapsed(ms);
    setRunning(false);
    if (isWho) {
      const { rec, isNew } = submitCaseRecord(puzzle.id, ms, accCount ?? accusations);
      setCaseRecord(rec);
      setResult({ ms, isNew, accusations: accCount ?? accusations });
    } else {
      const { best, isNew } = submitTime(puzzle.id, ms);
      setRecord(best);
      setResult({ ms, isNew });
    }
    wonRef.current = true;
    setWon(true);
    clearInProgress(puzzle.id);
    clearHints(puzzle.id);
    if (isWho) stamp(settings.som);
    winChime(settings.som);
    buzz(settings.vib, [18, 40, 18]);
    onSolved();
  }

  function wrongShake(msg: string) {
    showToast(msg);
    thunk(settings.som);
    buzz(settings.vib, 40);
    setShake(true);
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    shakeTimer.current = setTimeout(() => setShake(false), 500);
  }

  function check() {
    if (filled < totalSlots) {
      showToast("Preencha todas as posições.");
      return;
    }
    if (gridCorrect()) triggerWin();
    else wrongShake("Ainda não — revise as pistas.");
  }

  // a acusação precisa estar SUSTENTADA: o suspeito acusado já tem, na sua grade,
  // todos os atributos das evidências do crime (não dá pra acusar quem você não deduziu).
  const accusationSupported = (idx: number) =>
    (puzzle.crime?.evidence ?? []).every((e) => board[e.cat][idx] === e.value);

  function accuse(idx: number) {
    setAccuseOpen(false);
    if (!accusationSupported(idx)) {
      showToast("Suas anotações ainda não sustentam essa acusação.");
      return; // não conta como acusação
    }
    const n = accusations + 1;
    setAccusations(n);
    if (idx === puzzle.culprit) triggerWin(n);
    else wrongShake("As evidências não fecham — esse não é o culpado.");
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
    setAccusations(0);
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

  const source = isWho ? "INVESTIGAÇÃO" : (puzzle.source ?? "desafio").toUpperCase();
  const showComoLer = puzzle.spine.ordered && !!puzzle.spine.referential;

  return (
    <div className={"app screen-in" + (isTutorial && tut >= 0 ? " tut-active" : "")}>
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
              <IconGear size={18} />
            </button>
          </div>
        </div>
      <header>
        <p className="eyebrow" style={{ marginTop: 16 }}>
          {source} · nível {puzzle.difficulty}
        </p>
        <h1 className="title board-h1">{puzzle.title}</h1>
        {isWho
          ? caseRecord && (
              <p className="record-line">
                <IconFolder size={13} /> Caso encerrado · {caseRecord.accusations}ª acusação · {formatTime(caseRecord.ms)}
              </p>
            )
          : record != null && (
              <p className="record-line">
                <IconStar size={13} /> Seu recorde: {formatTime(record)}
              </p>
            )}
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
          <h2>{isWho ? "O caso" : "Enunciado"}</h2>
          <span className="chev"><IconChevronDown size={16} /></span>
        </div>
        <div className="clue-list">
          <p className="story-text">{puzzle.story}</p>
        </div>
      </section>

      {/* briefing do crime (whodunit) */}
      {isWho && puzzle.crime && (
        <section className="briefing">
          <h2><IconSearch size={16} /> O que se sabe até agora</h2>
          <p className="briefing-q">{puzzle.crime.prompt}</p>
        </section>
      )}

      {/* pistas */}
      <section className={"clues" + (openClues ? " open" : "")}>
        <div className="clues-head" onClick={() => setOpenClues((o) => !o)}>
          <h2>Pistas</h2>
          <span className="meta">{puzzle.clues.length} · toque p/ destacar</span>
          <span className="chev"><IconChevronDown size={16} /></span>
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
                    className={
                      "slot" +
                      (v ? " filled" : "") +
                      (isLit(cat.id, p) ? " lit" : "") +
                      (locked ? " locked" : "") +
                      (tutSlot && tutSlot.cat === cat.id && tutSlot.pos === p ? " tut-on" + (tutFlash ? " tut-flash" : "") : "")
                    }
                    onClick={locked ? undefined : () => setSheet({ cat, pos: p })}
                    aria-disabled={locked}
                  >
                    <Swatch value={v} index={valIndex(cat.id, board[cat.id][p])} />
                    <span className="scol">
                      <span className="slabel">{cat.label}</span>
                      <span className="sval">{v ? v.label : "tocar para escolher"}</span>
                    </span>
                    {locked ? (
                      <span className="lock" aria-label="preenchido pela ajuda">
                        <IconBulb size={14} />
                      </span>
                    ) : ruledCount > 0 ? (
                      <span className="ruled-n" aria-label={`${ruledCount} descartados`}>
                        <IconX size={10} />
                        {ruledCount}
                      </span>
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
          {isWho ? (
            <button
              className={"act primary verificar" + (tcur?.accuseBtn ? " tut-on" + (tutFlash ? " tut-flash" : "") : "")}
              onClick={() => setAccuseOpen(true)}
            >
              <IconSearch size={18} /> Acusar{accusations > 0 ? ` · ${accusations}ª` : ""}
            </button>
          ) : (
            <button className="act primary verificar" onClick={check} disabled={filled < totalSlots}>
              <IconCheck /> Verificar
            </button>
          )}
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

      {/* coach do tutorial (caso de treino) */}
      {isTutorial && tcur && !won && (
        <div className="coach">
          <div className="coach-card">
            <span className="coach-step">
              Treino · passo {Math.min(tut + 1, tutSteps.length)} de {tutSteps.length}
            </span>
            <p>{tcur.text}</p>
            <div className="coach-actions">
              {tcur.intro && (
                <button className="mini glow" onClick={() => setTut(1)}>
                  Começar
                </button>
              )}
              <button className="coach-skip" onClick={() => setTut(-1)}>
                Pular tutorial
              </button>
            </div>
          </div>
        </div>
      )}

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
        highlightValue={
          tutSlot && sheet && sheet.cat.id === tutSlot.cat && sheet.pos === tutSlot.pos ? tutSlot.value : undefined
        }
        onToggleNote={(valueId) => sheet && toggleNote(sheet.cat.id, sheet.pos, valueId)}
        onPick={pick}
        onClose={() => setSheet(null)}
      />

      {/* sheet de acusação (whodunit) */}
      {isWho && (
        <>
          <div className={"scrim" + (accuseOpen ? " show" : "")} onClick={() => setAccuseOpen(false)} />
          <div className={"sheet" + (accuseOpen ? " show" : "")} role="dialog" aria-modal="true">
            <div className="grab" />
            <h3>Apontar o culpado</h3>
            <div className="ctx">{puzzle.crime?.prompt}</div>
            <div className="opts">
              {puzzle.spine.labels.map((name, i) => {
                const ok = accusationSupported(i);
                return (
                  <button className={"opt accuse" + (ok ? "" : " taken") + (tutAccuseIdx === i ? " tut-on" + (tutFlash ? " tut-flash" : "") : "")} key={i} onClick={() => accuse(i)}>
                    <span className="name">{name}</span>
                    <span className="used">{ok ? "acusar →" : "faltam evidências"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

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
        {isWho ? (
          <div className="case-closed">
            <div className="win-eyebrow cc-eyebrow">Caso encerrado</div>
            <div className="stamp win-stamp">Caso fechado</div>
            {puzzle.culprit != null && (
              <div className="culprit-card">
                <div className="mug">
                  <IconSuspect size={46} />
                </div>
                <div className="culprit-meta">
                  <span className="culprit-role">O culpado</span>
                  <span className="culprit-name">{puzzle.spine.labels[puzzle.culprit]}</span>
                </div>
                <span className="tarja">Culpado</span>
              </div>
            )}
            {puzzle.crime && (
              <div className="conviction">
                <span className="conv-label">Provas que fecharam o caso</span>
                <div className="conv-tags">
                  {puzzle.crime.evidence.map((e, i) => {
                    const v = valueOf(e.cat, e.value);
                    return (
                      <span className="conv-tag" key={i}>
                        <Swatch value={v} index={valIndex(e.cat, e.value)} />
                        {v?.label ?? e.value}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="win-medal">
              <IconCheck size={42} />
            </div>
            <div className="win-eyebrow">Puzzle resolvido</div>
            <div className="win-title">Resolvido!</div>
            <p className="win-sub">
              {puzzle.title} · nível {puzzle.difficulty}
            </p>
          </>
        )}
        <div className="win-stats">
          <div className="win-stat">
            <div className="k">Tempo</div>
            <div className="v">{formatTime(result?.ms ?? elapsed)}</div>
          </div>
          {isWho ? (
            <>
              <div className="win-stat">
                <div className="k">Acusações</div>
                <div className="v">{result?.accusations ?? accusations}</div>
              </div>
              <div className="win-stat rec">
                <div className="k">No registro</div>
                <div className="v">
                  {result?.isNew ? (
                    <><IconStar size={13} /> cravado</>
                  ) : caseRecord ? (
                    `${caseRecord.accusations}ª · ${formatTime(caseRecord.ms)}`
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="win-stat rec">
                <div className="k">Recorde</div>
                <div className="v">
                  {result?.isNew ? <><IconStar size={13} /> novo</> : formatTime(record ?? result?.ms ?? elapsed)}
                </div>
              </div>
              <div className="win-stat">
                <div className="k">Pistas</div>
                <div className="v">{puzzle.clues.length}</div>
              </div>
            </>
          )}
        </div>
        {allDone && (
          <p className="win-alldone">
            <IconStar size={15} /> Você concluiu todas as fases!
          </p>
        )}
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
