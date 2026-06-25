// engine/generator.ts
// Gerador determinístico (build-time, zero IA): sorteia uma solução, enumera todas
// as pistas VERDADEIRAS daquela solução a partir do vocabulário de constraints,
// e minimiza (greedy) até um conjunto mínimo com solução ÚNICA. A "pele" (tema,
// categorias, valores, labels) entra pronta; a narrativa polida vem depois (Stack C).
import type { Puzzle, Clue, Constraint, Category, Spine, Ref } from "./types";
import { countSolutions } from "./solver";
import { difficultyScore } from "./difficulty";

/** PRNG seedável (reprodutível) — não usamos Math.random pra gerar puzzles estáveis. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pele do puzzle: o que o tema/narrativa fornece. Cada categoria tem `size` valores. */
export interface Skin {
  id: string;
  title: string;
  story: string;
  themeId: string;
  size: number;
  spine: Spine;
  categories: Category[];
}

export interface GenOptions {
  seed?: number;
  targetMin?: number; // faixa de dificuldade-alvo (escala de referência 1..10)
  targetMax?: number;
  maxAttempts?: number;
}

export interface GenResult {
  puzzle: Puzzle;
  score: number; // dificuldade de referência (engine/difficulty)
  attempts: number;
  clueCount: number;
}

type Solution = Record<string, string[]>;

function buildSolution(categories: Category[], rng: () => number): Solution {
  const sol: Solution = {};
  for (const c of categories) sol[c.id] = shuffle(c.values.map((v) => v.id), rng);
  return sol;
}

/** Enumera TODAS as constraints verdadeiras para a solução dada. */
function enumerateConstraints(categories: Category[], spine: Spine, n: number, sol: Solution): Constraint[] {
  const cats = categories.map((c) => c.id);
  const pos = (cat: string, val: string) => sol[cat].indexOf(val);
  const cons: Constraint[] = [];

  // same: dois valores de categorias diferentes na mesma posição
  for (let p = 0; p < n; p++) {
    for (let i = 0; i < cats.length; i++)
      for (let j = i + 1; j < cats.length; j++) {
        cons.push({ k: "same", a: { cat: cats[i], value: sol[cats[i]][p] }, b: { cat: cats[j], value: sol[cats[j]][p] } });
      }
  }
  // at: valor na posição exata (pistas diretas)
  for (const c of cats) for (let p = 0; p < n; p++) cons.push({ k: "at", cat: c, value: sol[c][p], pos: p });

  if (spine.ordered) {
    const allVals: Ref[] = [];
    for (const c of cats) for (const v of sol[c]) allVals.push({ cat: c, value: v });
    for (const A of allVals)
      for (const B of allVals) {
        if (A.cat === B.cat && A.value === B.value) continue;
        const pa = pos(A.cat, A.value);
        const pb = pos(B.cat, B.value);
        if (pa < pb) cons.push({ k: "before", a: A, b: B });
        if (pa + 1 === pb) cons.push({ k: "immediateLeft", a: A, b: B });
        if (pa < pb && pb - pa === 1) cons.push({ k: "adjacent", a: A, b: B });
      }
    for (const c of cats) {
      cons.push({ k: "end", cat: c, value: sol[c][0], which: "first" });
      cons.push({ k: "end", cat: c, value: sol[c][n - 1], which: "last" });
    }
  }
  return cons;
}

// ---- texto placeholder das pistas (a narrativa via Anthropic reescreve depois) ----
function labelOf(categories: Category[], cat: string, value: string): string {
  const c = categories.find((x) => x.id === cat)!;
  return c.values.find((v) => v.id === value)?.label ?? value;
}

function clueFromConstraint(con: Constraint, categories: Category[], spine: Spine, n: number, idx: number): Clue {
  const L = (r: Ref) => labelOf(categories, r.cat, r.value);
  let text = "";
  const highlights: { cat: string; pos?: number }[] = [];
  switch (con.k) {
    case "at":
      text = `${labelOf(categories, con.cat, con.value)} fica em ${spine.labels[con.pos]}.`;
      highlights.push({ cat: con.cat, pos: con.pos });
      break;
    case "same":
      text = `${L(con.a)} e ${L(con.b)} estão na mesma ${spine.label.toLowerCase()}.`;
      highlights.push({ cat: con.a.cat }, { cat: con.b.cat });
      break;
    case "before":
      text = `${L(con.a)} vem antes de ${L(con.b)} (mais perto do início).`;
      highlights.push({ cat: con.a.cat }, { cat: con.b.cat });
      break;
    case "immediateLeft":
      text = `${L(con.a)} fica imediatamente antes de ${L(con.b)}.`;
      highlights.push({ cat: con.a.cat }, { cat: con.b.cat });
      break;
    case "adjacent":
      text = `${L(con.a)} e ${L(con.b)} estão lado a lado (vizinhos).`;
      highlights.push({ cat: con.a.cat }, { cat: con.b.cat });
      break;
    case "end":
      text = `${labelOf(categories, con.cat, con.value)} está ${con.which === "first" ? `no começo (${spine.labels[0]})` : `no fim (${spine.labels[n - 1]})`}.`;
      highlights.push({ cat: con.cat, pos: con.which === "first" ? 0 : n - 1 });
      break;
    case "notEnd":
      text = `${labelOf(categories, con.cat, con.value)} não está ${con.which === "first" ? "no começo" : "no fim"} da fila.`;
      highlights.push({ cat: con.cat });
      break;
    default:
      text = "(pista)";
  }
  return { id: `g${idx}`, text, highlights, constraints: [con] };
}

/** Minimiza um conjunto de constraints mantendo solução única (greedy). */
function minimize(base: Omit<Puzzle, "clues">, cons: Constraint[], rng: () => number): Constraint[] {
  let kept = shuffle(cons, rng);
  // garante ponto de partida único
  const asPuzzle = (cs: Constraint[]): Puzzle => ({
    ...base,
    clues: cs.map((c, i) => ({ id: `m${i}`, text: "", highlights: [], constraints: [c] })),
  });
  if (countSolutions(asPuzzle(kept), 2) !== 1) return kept; // pele inconsistente
  for (const c of [...kept]) {
    const trial = kept.filter((x) => x !== c);
    if (countSolutions(asPuzzle(trial), 2) === 1) kept = trial; // ainda única => descarta
  }
  return kept;
}

/**
 * Gera um puzzle com solução única e mínima. Tenta atingir a faixa de dificuldade
 * (escala de referência) variando a semente; devolve a melhor tentativa.
 */
export function generate(skin: Skin, opts: GenOptions = {}): GenResult {
  const { seed = 1, targetMin = 1, targetMax = 10, maxAttempts = 40 } = opts;
  const base = {
    id: skin.id,
    title: skin.title,
    story: skin.story,
    themeId: skin.themeId,
    size: skin.size,
    spine: skin.spine,
    categories: skin.categories,
    solution: {} as Solution,
    difficulty: 0,
    source: "gerador",
  };

  let best: GenResult | null = null;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rng = mulberry32(seed + attempt * 7919);
    const solution = buildSolution(skin.categories, rng);
    const all = enumerateConstraints(skin.categories, skin.spine, skin.size, solution);
    const minimal = minimize({ ...base, solution }, all, rng);
    const clues = minimal.map((c, i) => clueFromConstraint(c, skin.categories, skin.spine, skin.size, i));
    const puzzle: Puzzle = { ...base, solution, clues };

    if (countSolutions(puzzle, 2) !== 1) continue; // segurança
    const score = difficultyScore(puzzle).score;
    const result: GenResult = { puzzle: { ...puzzle, difficulty: score }, score, attempts: attempt + 1, clueCount: clues.length };
    if (score >= targetMin && score <= targetMax) return result;
    // guarda a tentativa mais próxima da faixa
    const dist = (r: GenResult) =>
      Math.max(0, targetMin - r.score) + Math.max(0, r.score - targetMax);
    if (!best || dist(result) < dist(best)) best = result;
  }
  return best!;
}
