// Catálogo de fases. A solução é derivada pelo solver; a dificuldade (1..10) é
// calibrada por RANKING do sinal contínuo do engine, ancorada em fases-referência
// escolhidas pelo produto — garante cobertura de todos os 10 níveis.
import type { Puzzle } from "../engine/types";
import { solve } from "../engine/solver";
import { difficultyRaw } from "../engine/difficulty";
import { noPonto } from "./no-ponto";
import { einstein } from "./einstein";
import { GENIOL } from "./geniol"; // acervo Geniol (auto-gerado)

const RAW: Puzzle[] = [noPonto, einstein, ...GENIOL];

// --- calibração ancorada (níveis-referência definidos pelo produto) ---
const LOW_IDS = ["basico-1", "basico-2", "meninas-na-escola"]; // -> nível 1
const MID = { id: "no-ponto", level: 7 };
const HIGH = { id: "einstein", level: 10 };

const raw = new Map(RAW.map((p) => [p.id, difficultyRaw(p)]));
const rankOrder = [...RAW].sort((a, b) => raw.get(a.id)! - raw.get(b.id)!);
const rank = new Map(rankOrder.map((p, i) => [p.id, i])); // 0..N-1

const lowRank = Math.max(...LOW_IDS.map((id) => rank.get(id) ?? 0));
const midRank = rank.get(MID.id)!;
const highRank = rank.get(HIGH.id)!;

const clampN = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const lerp = (x: number, x0: number, x1: number, y0: number, y1: number) =>
  x1 === x0 ? y0 : y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);

/** Posição no ranking -> nível 1..10, monotônico e passando pelas âncoras. */
function levelFromRank(rk: number): number {
  let lvl: number;
  if (rk <= lowRank) lvl = 1;
  else if (rk <= midRank) lvl = lerp(rk, lowRank, midRank, 1, MID.level);
  else lvl = lerp(rk, midRank, highRank, MID.level, HIGH.level);
  return clampN(Math.round(lvl), 1, 10);
}

function hydrate(p: Puzzle): Puzzle {
  const hasSolution = p.solution && Object.keys(p.solution).length > 0;
  const solution = hasSolution ? p.solution : (solve(p) as Record<string, string[]> | null);
  if (!solution) console.warn(`[puzzles] ${p.id} sem solução — verifique as pistas`);
  return { ...p, solution: solution ?? {}, difficulty: levelFromRank(rank.get(p.id)!) };
}

export const PUZZLES: Puzzle[] = RAW.map(hydrate).sort(
  (a, b) => a.difficulty - b.difficulty || raw.get(a.id)! - raw.get(b.id)!
);

export function getPuzzle(id: string): Puzzle | undefined {
  return PUZZLES.find((p) => p.id === id);
}
