// engine/whodunit-gen.ts
// Gerador determinístico de CASOS DE INVESTIGAÇÃO (whodunit), build-time, zero IA.
//
// Ideia: sorteia uma solução; escolhe o culpado e suas evidências (E categorias);
// enumera pistas VERDADEIRAS (at/notAt/same/diff) EXCLUINDO qualquer uma que toque
// nos valores-evidência do culpado; minimiza (greedy) até solução ÚNICA. Como
// nenhuma pista fixa a evidência, ela só se resolve por eliminação no fim →
// "culpado profundo" (atalho 0%) POR CONSTRUÇÃO. Valida com solver + culpritAudit
// e mira uma faixa de dificuldade (raw) variando a semente.
//
// A "pele" (tema, nomes, valores, narrativa) entra pronta; o texto das pistas é
// funcional (templated) — a narrativa polida pode ser reescrita depois à mão.
import type { Puzzle, Clue, Constraint, Category, Spine, Crime } from "./types";
import { countSolutions } from "./solver";
import { difficultyRaw, culpritAudit } from "./difficulty";
import { mulberry32 } from "./generator";

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface WhoSkin {
  id: string;
  title: string;
  story: string; // enunciado (sem revelar valores da evidência)
  themeId: string; // "dossie"
  size: number; // nº de suspeitos
  spine: Spine; // { id:"suspeito", label:"Suspeito", ordered:false, labels:[...] }
  categories: Category[];
  evidenceCats: string[]; // categorias que formam a evidência do crime
  // "o que se sabe até agora" (laudo). Como o culpado é sorteado, aceite uma função
  // que recebe os RÓTULOS da evidência escolhida e monta o texto (sem redundância
  // com o enunciado, que não revela valores).
  crimePrompt: string | ((ev: Record<string, string>) => string);
  clueVerb?: Record<string, string>; // verbo por categoria p/ texto natural ("estava em", "portava", "foi visto às")
}

export interface WhoGenOptions {
  seed?: number;
  rawMin?: number;
  rawMax?: number;
  maxAttempts?: number;
  maxShortcut?: number; // atalho% máximo aceito (0 = culpado estritamente profundo)
  // Three Clue Rule: nº de pistas CORROBORANTES a acrescentar além do conjunto
  // mínimo, abrindo trilhas alternativas de dedução (menos "gargalos"). Recomendado
  // em níveis fáceis, onde o perdão importa mais; 0 = conjunto mínimo/enxuto.
  redundancy?: number;
}
export interface WhoGenResult {
  puzzle: Puzzle;
  raw: number;
  atalho: number;
  clueCount: number;
  attempts: number;
}

type Solution = Record<string, string[]>;

function buildSolution(categories: Category[], rng: () => number): Solution {
  const sol: Solution = {};
  for (const c of categories) sol[c.id] = shuffle(c.values.map((v) => v.id), rng);
  return sol;
}

/** Enumera pistas verdadeiras (at/notAt/same/diff) EXCETO as que tocam a evidência. */
function enumerate(cats: Category[], n: number, sol: Solution, banned: Set<string>): Constraint[] {
  const ids = cats.map((c) => c.id);
  const ban = (cat: string, val: string) => banned.has(cat + "|" + val);
  const pos = (cat: string, val: string) => sol[cat].indexOf(val);
  const cons: Constraint[] = [];
  // at / notAt
  for (const c of ids) {
    for (let p = 0; p < n; p++) {
      const v = sol[c][p];
      if (ban(c, v)) continue;
      cons.push({ k: "at", cat: c, value: v, pos: p });
      for (let q = 0; q < n; q++) if (q !== p) cons.push({ k: "notAt", cat: c, value: v, pos: q });
    }
  }
  // same / diff entre categorias
  for (let i = 0; i < ids.length; i++)
    for (let j = i + 1; j < ids.length; j++) {
      for (const va of sol[ids[i]]) {
        if (ban(ids[i], va)) continue;
        for (const vb of sol[ids[j]]) {
          if (ban(ids[j], vb)) continue;
          const same = pos(ids[i], va) === pos(ids[j], vb);
          cons.push({ k: same ? "same" : "diff", a: { cat: ids[i], value: va }, b: { cat: ids[j], value: vb } });
        }
      }
    }
  return cons;
}

const labelOf = (cats: Category[], cat: string, value: string) =>
  cats.find((x) => x.id === cat)?.values.find((v) => v.id === value)?.label ?? value;

function clueText(con: Constraint, cats: Category[], spine: Spine, verb: Record<string, string>): string {
  const L = (cat: string, value: string) => labelOf(cats, cat, value);
  const V = (cat: string) => verb[cat] ?? "estava com";
  switch (con.k) {
    case "at":
      return `${spine.labels[con.pos]} ${V(con.cat)} ${L(con.cat, con.value)}.`;
    case "notAt":
      return `${spine.labels[con.pos]} não ${V(con.cat)} ${L(con.cat, con.value)}.`;
    case "same":
      return `Quem ${V(con.a.cat)} ${L(con.a.cat, con.a.value)} também ${V(con.b.cat)} ${L(con.b.cat, con.b.value)}.`;
    case "diff":
      return `Quem ${V(con.a.cat)} ${L(con.a.cat, con.a.value)} não ${V(con.b.cat)} ${L(con.b.cat, con.b.value)}.`;
    default:
      return "(pista)";
  }
}

/** Minimiza mantendo solução única (greedy sobre ordem embaralhada). */
function minimize(base: Omit<Puzzle, "clues">, cons: Constraint[], rng: () => number): Constraint[] | null {
  let kept = shuffle(cons, rng);
  const asPuzzle = (cs: Constraint[]): Puzzle => ({
    ...base,
    clues: cs.map((c, i) => ({ id: `m${i}`, text: "", highlights: [], constraints: [c] })),
  });
  if (countSolutions(asPuzzle(kept), 2) !== 1) return null; // pool insuficiente p/ unicidade
  for (const c of [...kept]) {
    const trial = kept.filter((x) => x !== c);
    if (countSolutions(asPuzzle(trial), 2) === 1) kept = trial;
  }
  return kept;
}

/** Uma tentativa: devolve o puzzle válido (único + culpado profundo) ou null. */
function attemptOnce(skin: WhoSkin, rng: () => number, maxShortcut: number, redundancy: number): { puzzle: Puzzle; raw: number; atalho: number } | null {
  const n = skin.size;
  const sol = buildSolution(skin.categories, rng);
  const culprit = Math.floor(rng() * n);
  const evidence = skin.evidenceCats.map((cat) => ({ cat, value: sol[cat][culprit] }));
  const banned = new Set(evidence.map((e) => e.cat + "|" + e.value));
  const evLabels: Record<string, string> = {};
  for (const e of evidence) evLabels[e.cat] = labelOf(skin.categories, e.cat, e.value);
  const prompt = typeof skin.crimePrompt === "function" ? skin.crimePrompt(evLabels) : skin.crimePrompt;

  const base: Omit<Puzzle, "clues"> = {
    id: skin.id,
    kind: "whodunit",
    source: "gerador",
    themeId: skin.themeId,
    title: skin.title,
    story: skin.story,
    size: n,
    spine: skin.spine,
    categories: skin.categories,
    solution: {},
    difficulty: 0,
    crime: { prompt, evidence } as Crime,
  };

  const pool = enumerate(skin.categories, n, sol, banned);
  const minimal = minimize(base, pool, rng);
  if (!minimal) return null;

  // Three Clue Rule: acrescenta pistas corroborantes (redundantes, portanto não
  // revelam a evidência e não quebram a unicidade) para abrir trilhas alternativas.
  let chosen = minimal;
  if (redundancy > 0) {
    const extra = shuffle(pool.filter((c) => !minimal.includes(c)), rng).slice(0, redundancy);
    chosen = [...minimal, ...extra];
  }

  const verb = skin.clueVerb ?? {};
  const clues: Clue[] = shuffle(chosen, rng).map((c, i) => ({
    id: `c${i + 1}`,
    text: clueText(c, skin.categories, skin.spine, verb),
    highlights: [],
    constraints: [c],
  }));
  const puzzle: Puzzle = { ...base, clues };

  if (countSolutions(puzzle, 2) !== 1) return null;
  const audit = culpritAudit(puzzle);
  if (!audit || audit.shortcutPct > maxShortcut) return null; // exige culpado profundo
  return { puzzle, raw: difficultyRaw(puzzle), atalho: audit.shortcutPct };
}

/** Gera um caso mirando a faixa de raw; varia a semente e devolve o melhor. */
export function generateWhodunit(skin: WhoSkin, opts: WhoGenOptions = {}): WhoGenResult | null {
  const { seed = 1, rawMin = 0, rawMax = 99, maxAttempts = 120, maxShortcut = 0, redundancy = 0 } = opts;
  let best: WhoGenResult | null = null;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rng = mulberry32(seed + attempt * 7919);
    const r = attemptOnce(skin, rng, maxShortcut, redundancy);
    if (!r) continue;
    const result: WhoGenResult = { puzzle: r.puzzle, raw: r.raw, atalho: r.atalho, clueCount: r.puzzle.clues.length, attempts: attempt + 1 };
    if (r.raw >= rawMin && r.raw <= rawMax) return result;
    const dist = (x: WhoGenResult) => Math.max(0, rawMin - x.raw) + Math.max(0, x.raw - rawMax);
    if (!best || dist(result) < dist(best)) best = result;
  }
  return best;
}
