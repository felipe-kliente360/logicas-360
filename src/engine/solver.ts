// engine/solver.ts
// Backtracking posição-major com poda por constraint. Resolve, conta soluções
// (unicidade) e serve de base pro gerador. Validado contra "No ponto" e o Einstein.
import type { Puzzle, Constraint } from "./types";

type Grid = Record<string, (string | null)[]>;

function posOf(g: Grid, cat: string, value: string): number {
  const a = g[cat];
  for (let i = 0; i < a.length; i++) if (a[i] === value) return i;
  return -1;
}

/** Retorna false só quando a atribuição PARCIAL já viola a constraint. */
function ok(g: Grid, n: number, c: Constraint): boolean {
  switch (c.k) {
    case "at": {
      const v = g[c.cat][c.pos];
      if (v !== null && v !== c.value) return false;
      const p = posOf(g, c.cat, c.value);
      return !(p !== -1 && p !== c.pos);
    }
    case "notAt":
      return g[c.cat][c.pos] !== c.value;
    case "same": {
      const pa = posOf(g, c.a.cat, c.a.value),
        pb = posOf(g, c.b.cat, c.b.value);
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
      const pa = posOf(g, c.a.cat, c.a.value),
        pb = posOf(g, c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && pa === pb);
    }
    case "before": {
      const pa = posOf(g, c.a.cat, c.a.value),
        pb = posOf(g, c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && !(pa < pb));
    }
    case "immediateLeft": {
      const pa = posOf(g, c.a.cat, c.a.value),
        pb = posOf(g, c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && pa + 1 !== pb);
    }
    case "adjacent": {
      const pa = posOf(g, c.a.cat, c.a.value),
        pb = posOf(g, c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && Math.abs(pa - pb) !== 1);
    }
    case "offset": {
      const pa = posOf(g, c.a.cat, c.a.value),
        pb = posOf(g, c.b.cat, c.b.value);
      return !(pa !== -1 && pb !== -1 && pa !== pb + c.delta);
    }
    case "end": {
      const p = posOf(g, c.cat, c.value);
      if (p === -1) return true;
      return c.which === "first" ? p === 0 : p === n - 1;
    }
    case "notEnd": {
      const p = posOf(g, c.cat, c.value);
      if (p === -1) return true;
      return c.which === "first" ? p !== 0 : p !== n - 1;
    }
  }
}

/** Conta soluções até `cap` (use cap=2 pra checar unicidade). */
export function countSolutions(puzzle: Puzzle, cap = 2): number {
  const cats = puzzle.categories.map((c) => c.id);
  const vals: Record<string, string[]> = {};
  puzzle.categories.forEach((c) => (vals[c.id] = c.values.map((v) => v.id)));
  const n = puzzle.size;
  const cons = puzzle.clues.flatMap((cl) => cl.constraints);
  const g: Grid = {};
  cats.forEach((c) => (g[c] = Array(n).fill(null)));
  const cells: [number, string][] = [];
  for (let p = 0; p < n; p++) for (const c of cats) cells.push([p, c]);
  let count = 0;
  (function bt(idx: number) {
    if (count >= cap || idx === cells.length) {
      if (idx === cells.length) count++;
      return;
    }
    const [p, cat] = cells[idx];
    for (const v of vals[cat]) {
      if (g[cat].includes(v)) continue; // permutação: sem repetir na categoria
      g[cat][p] = v;
      if (cons.every((c) => ok(g, n, c))) bt(idx + 1);
      g[cat][p] = null;
      if (count >= cap) return;
    }
  })(0);
  return count;
}

/** Resolve e devolve o grid (ou null). */
export function solve(puzzle: Puzzle): Grid | null {
  const cats = puzzle.categories.map((c) => c.id);
  const vals: Record<string, string[]> = {};
  puzzle.categories.forEach((c) => (vals[c.id] = c.values.map((v) => v.id)));
  const n = puzzle.size;
  const cons = puzzle.clues.flatMap((cl) => cl.constraints);
  const g: Grid = {};
  cats.forEach((c) => (g[c] = Array(n).fill(null)));
  const cells: [number, string][] = [];
  for (let p = 0; p < n; p++) for (const c of cats) cells.push([p, c]);
  let res: Grid | null = null;
  (function bt(i: number) {
    if (res || i === cells.length) {
      if (i === cells.length) res = JSON.parse(JSON.stringify(g));
      return;
    }
    const [p, cat] = cells[i];
    for (const v of vals[cat]) {
      if (g[cat].includes(v)) continue;
      g[cat][p] = v;
      if (cons.every((c) => ok(g, n, c))) bt(i + 1);
      g[cat][p] = null;
      if (res) return;
    }
  })(0);
  return res;
}

export type { Grid };
