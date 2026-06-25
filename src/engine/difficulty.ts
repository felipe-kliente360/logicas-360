// engine/difficulty.ts
// Avalia a dificuldade de um puzzle "da nossa perspectiva", resolvendo-o por dois
// caminhos e medindo o esforço:
//   1) Propagação (dedução humana): elimina candidatos até o ponto fixo. Se resolve
//      sem chutar => fácil/médio. Quantas rodadas precisou e quanta ambiguidade sobra.
//   2) Backtracking instrumentado: conta nós explorados e retrocessos (hipóteses).
// Combina com tamanho e mix de tipos de pista numa escala 1..10, calibrada pelas
// âncoras do projeto: "No ponto" = 6, "Einstein" = 10.
import type { Puzzle, Constraint } from "./types";

export interface Trace {
  size: number; // N * M (células)
  n: number; // entidades
  cats: number; // categorias
  clues: number;
  constraints: number;
  ordered: boolean;
  propagationSolved: boolean; // resolveu só por eliminação?
  propRounds: number; // rodadas de propagação até estabilizar
  residualAmbiguity: number; // candidatos extra que sobraram após propagar
  searchNodes: number; // atribuições testadas no backtracking
  backtracks: number; // retrocessos (proxy de "hipóteses")
  clueTypeScore: number; // peso somado dos tipos de constraint
}

type Cands = Record<string, Set<string>[]>; // [cat][pos] = valores possíveis

// pesos por tipo: diretas baratas, ordem/negação caras
const KIND_WEIGHT: Record<Constraint["k"], number> = {
  at: 1,
  notAt: 2,
  same: 1.2,
  diff: 1.6,
  end: 1,
  notEnd: 1.5,
  before: 2.2,
  adjacent: 2.6,
  immediateLeft: 2.4,
  offset: 2.8,
};

function posSet(c: Cands, cat: string, value: string): number[] {
  const out: number[] = [];
  c[cat].forEach((s, p) => {
    if (s.has(value)) out.push(p);
  });
  return out;
}

function only(c: Cands, cat: string, value: string): number | -1 {
  const ps = posSet(c, cat, value);
  return ps.length === 1 ? ps[0] : -1;
}

/** Aplica uma constraint à grade de candidatos. Retorna true se removeu algo. */
function prune(c: Cands, n: number, k: Constraint): boolean {
  let changed = false;
  const drop = (cat: string, pos: number, val: string) => {
    if (c[cat][pos].has(val)) {
      c[cat][pos].delete(val);
      changed = true;
    }
  };
  const keepOnly = (cat: string, val: string, allowed: Set<number>) => {
    for (let p = 0; p < n; p++) if (!allowed.has(p)) drop(cat, p, val);
  };
  switch (k.k) {
    case "at": {
      keepOnly(k.cat, k.value, new Set([k.pos]));
      // ninguém mais ocupa essa posição nessa categoria
      for (const v of [...c[k.cat][k.pos]]) if (v !== k.value) drop(k.cat, k.pos, v);
      break;
    }
    case "notAt":
      drop(k.cat, k.pos, k.value);
      break;
    case "end":
      keepOnly(k.cat, k.value, new Set([k.which === "first" ? 0 : n - 1]));
      break;
    case "notEnd":
      drop(k.cat, k.which === "first" ? 0 : n - 1, k.value);
      break;
    case "same": {
      const pa = posSet(c, k.a.cat, k.a.value);
      const pb = posSet(c, k.b.cat, k.b.value);
      const inter = new Set(pa.filter((p) => pb.includes(p)));
      keepOnly(k.a.cat, k.a.value, inter);
      keepOnly(k.b.cat, k.b.value, inter);
      break;
    }
    case "diff": {
      const da = only(c, k.a.cat, k.a.value);
      const db = only(c, k.b.cat, k.b.value);
      if (da !== -1) drop(k.b.cat, da, k.b.value);
      if (db !== -1) drop(k.a.cat, db, k.a.value);
      break;
    }
    case "before": {
      const pa = posSet(c, k.a.cat, k.a.value);
      const pb = posSet(c, k.b.cat, k.b.value);
      const maxB = Math.max(...pb);
      const minA = Math.min(...pa);
      keepOnly(k.a.cat, k.a.value, new Set(pa.filter((p) => p < maxB)));
      keepOnly(k.b.cat, k.b.value, new Set(pb.filter((p) => p > minA)));
      break;
    }
    case "immediateLeft": {
      const pa = posSet(c, k.a.cat, k.a.value);
      const pb = posSet(c, k.b.cat, k.b.value);
      keepOnly(k.a.cat, k.a.value, new Set(pa.filter((p) => pb.includes(p + 1))));
      keepOnly(k.b.cat, k.b.value, new Set(pb.filter((p) => pa.includes(p - 1))));
      break;
    }
    case "adjacent": {
      const pa = posSet(c, k.a.cat, k.a.value);
      const pb = posSet(c, k.b.cat, k.b.value);
      keepOnly(k.a.cat, k.a.value, new Set(pa.filter((p) => pb.includes(p - 1) || pb.includes(p + 1))));
      keepOnly(k.b.cat, k.b.value, new Set(pb.filter((p) => pa.includes(p - 1) || pa.includes(p + 1))));
      break;
    }
    case "offset": {
      const pa = posSet(c, k.a.cat, k.a.value);
      const pb = posSet(c, k.b.cat, k.b.value);
      keepOnly(k.a.cat, k.a.value, new Set(pa.filter((p) => pb.includes(p - k.delta))));
      keepOnly(k.b.cat, k.b.value, new Set(pb.filter((p) => pa.includes(p + k.delta))));
      break;
    }
  }
  return changed;
}

/** Regras estruturais: singles "nu" (posição com 1 candidato) e "escondido"
 * (valor com 1 posição possível) — a base da dedução por eliminação. */
function structural(c: Cands, cats: string[], n: number): boolean {
  let changed = false;
  for (const cat of cats) {
    // posição com candidato único => remove esse valor das outras posições
    for (let p = 0; p < n; p++) {
      if (c[cat][p].size === 1) {
        const v = [...c[cat][p]][0];
        for (let q = 0; q < n; q++)
          if (q !== p && c[cat][q].has(v)) {
            c[cat][q].delete(v);
            changed = true;
          }
      }
    }
    // valor com posição única => essa posição fica só com esse valor
    const allVals = new Set<string>();
    c[cat].forEach((s) => s.forEach((v) => allVals.add(v)));
    for (const v of allVals) {
      const ps = posSet(c, cat, v);
      if (ps.length === 1) {
        const p = ps[0];
        for (const w of [...c[cat][p]])
          if (w !== v) {
            c[cat][p].delete(w);
            changed = true;
          }
      }
    }
  }
  return changed;
}

function initCands(puzzle: Puzzle): Cands {
  const c: Cands = {};
  puzzle.categories.forEach((cat) => {
    const all = cat.values.map((v) => v.id);
    c[cat.id] = Array.from({ length: puzzle.size }, () => new Set(all));
  });
  return c;
}

function propagate(puzzle: Puzzle): { solved: boolean; rounds: number; residual: number } {
  const cats = puzzle.categories.map((x) => x.id);
  const cons = puzzle.clues.flatMap((cl) => cl.constraints);
  const c = initCands(puzzle);
  let rounds = 0;
  let changed = true;
  while (changed && rounds < 200) {
    changed = false;
    for (const k of cons) if (prune(c, puzzle.size, k)) changed = true;
    if (structural(c, cats, puzzle.size)) changed = true;
    rounds++;
  }
  let residual = 0;
  let solved = true;
  for (const cat of cats)
    for (let p = 0; p < puzzle.size; p++) {
      const sz = c[cat][p].size;
      if (sz !== 1) solved = false;
      residual += Math.max(0, sz - 1);
    }
  return { solved, rounds, residual };
}

// --- backtracking instrumentado (sempre funciona, mesmo quando propagação trava) ---
function posOf(g: Record<string, (string | null)[]>, cat: string, value: string): number {
  const a = g[cat];
  for (let i = 0; i < a.length; i++) if (a[i] === value) return i;
  return -1;
}
function okPartial(g: Record<string, (string | null)[]>, n: number, c: Constraint): boolean {
  const P = (cat: string, v: string) => posOf(g, cat, v);
  switch (c.k) {
    case "at": {
      const v = g[c.cat][c.pos];
      if (v !== null && v !== c.value) return false;
      const p = P(c.cat, c.value);
      return !(p !== -1 && p !== c.pos);
    }
    case "notAt":
      return g[c.cat][c.pos] !== c.value;
    case "same": {
      const pa = P(c.a.cat, c.a.value),
        pb = P(c.b.cat, c.b.value);
      if (pa !== -1 && pb !== -1 && pa !== pb) return false;
      if (pa !== -1) {
        const x = g[c.b.cat][pa];
        if (x !== null && x !== c.b.value) return false;
      }
      if (pb !== -1) {
        const x = g[c.a.cat][pb];
        if (x !== null && x !== c.a.value) return false;
      }
      return true;
    }
    case "diff": {
      const pa = P(c.a.cat, c.a.value),
        pb = P(c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && pa === pb);
    }
    case "before": {
      const pa = P(c.a.cat, c.a.value),
        pb = P(c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && !(pa < pb));
    }
    case "immediateLeft": {
      const pa = P(c.a.cat, c.a.value),
        pb = P(c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && pa + 1 !== pb);
    }
    case "adjacent": {
      const pa = P(c.a.cat, c.a.value),
        pb = P(c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && Math.abs(pa - pb) !== 1);
    }
    case "offset": {
      const pa = P(c.a.cat, c.a.value),
        pb = P(c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && pa !== pb + c.delta);
    }
    case "end": {
      const p = P(c.cat, c.value);
      if (p === -1) return true;
      return c.which === "first" ? p === 0 : p === n - 1;
    }
    case "notEnd": {
      const p = P(c.cat, c.value);
      if (p === -1) return true;
      return c.which === "first" ? p !== 0 : p !== n - 1;
    }
  }
}
function instrumentedSearch(puzzle: Puzzle): { nodes: number; backtracks: number } {
  const cats = puzzle.categories.map((c) => c.id);
  const vals: Record<string, string[]> = {};
  puzzle.categories.forEach((c) => (vals[c.id] = c.values.map((v) => v.id)));
  const n = puzzle.size;
  const cons = puzzle.clues.flatMap((cl) => cl.constraints);
  const g: Record<string, (string | null)[]> = {};
  cats.forEach((c) => (g[c] = Array(n).fill(null)));
  const cells: [number, string][] = [];
  for (let p = 0; p < n; p++) for (const c of cats) cells.push([p, c]);
  let nodes = 0;
  let backtracks = 0;
  let done = false;
  (function bt(i: number) {
    if (done || i === cells.length) {
      if (i === cells.length) done = true;
      return;
    }
    const [p, cat] = cells[i];
    for (const v of vals[cat]) {
      if (g[cat].includes(v)) continue;
      nodes++;
      g[cat][p] = v;
      if (cons.every((c) => okPartial(g, n, c))) bt(i + 1);
      else backtracks++;
      g[cat][p] = null;
      if (done) return;
    }
  })(0);
  return { nodes, backtracks };
}

export function trace(puzzle: Puzzle): Trace {
  const cons = puzzle.clues.flatMap((c) => c.constraints);
  const prop = propagate(puzzle);
  const search = instrumentedSearch(puzzle);
  return {
    size: puzzle.size * puzzle.categories.length,
    n: puzzle.size,
    cats: puzzle.categories.length,
    clues: puzzle.clues.length,
    constraints: cons.length,
    ordered: puzzle.spine.ordered,
    propagationSolved: prop.solved,
    propRounds: prop.rounds,
    residualAmbiguity: prop.residual,
    searchNodes: search.nodes,
    backtracks: search.backtracks,
    clueTypeScore: cons.reduce((a, k) => a + KIND_WEIGHT[k.k], 0),
  };
}

/**
 * Score 1..10. Calibrado para "No ponto" ≈ 6 e "Einstein" ≈ 10.
 * Combina: tamanho, exigência de hipótese (o maior salto), esforço de busca,
 * ambiguidade residual após propagação e o mix de tipos de pista.
 */
export function difficultyScore(puzzle: Puzzle): { score: number; trace: Trace } {
  const t = trace(puzzle);

  const sizeF = (t.size - 9) * 0.18; // 3×3=9 é o piso
  const hypothesisF = t.propagationSolved ? 0 : 2.4 + Math.min(2.2, t.residualAmbiguity * 0.12);
  const searchF = Math.log2(t.searchNodes + 1) * 0.36;
  const typeF = (t.clueTypeScore / Math.max(1, t.constraints)) * 1.0; // peso médio por pista
  const orderF = t.ordered ? 0.4 : 0;

  let raw = 1 + sizeF + hypothesisF + searchF + typeF + orderF;
  const score = Math.max(1, Math.min(10, Math.round(raw)));
  return { score, trace: t };
}
