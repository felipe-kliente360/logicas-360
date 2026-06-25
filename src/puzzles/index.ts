// Catálogo de fases. A solução e a nossa dificuldade são DERIVADAS pelo engine
// (solver + difficulty) no carregamento — os arquivos de fase só precisam declarar
// categorias e pistas corretas. Isso elimina erro de transcrição de gabarito.
import type { Puzzle } from "../engine/types";
import { solve } from "../engine/solver";
import { difficultyScore } from "../engine/difficulty";
import { noPonto } from "./no-ponto";
import { einstein } from "./einstein";
import { GENIOL } from "./geniol"; // acervo Geniol (auto-gerado)

const RAW: Puzzle[] = [noPonto, einstein, ...GENIOL];

/** Preenche solução e dificuldade quando não vierem prontas. */
function hydrate(p: Puzzle): Puzzle {
  const hasSolution = p.solution && Object.keys(p.solution).length > 0;
  // solve() devolve uma grade completa (sem nulls) p/ puzzles de solução única
  const solution = hasSolution ? p.solution : (solve(p) as Record<string, string[]> | null);
  if (!solution) {
    // não deveria acontecer (puzzles são validados como solução única no build)
    console.warn(`[puzzles] ${p.id} sem solução — verifique as pistas`);
  }
  const difficulty = p.difficulty || difficultyScore(p).score;
  return { ...p, solution: solution ?? {}, difficulty };
}

export const PUZZLES: Puzzle[] = RAW.map(hydrate).sort((a, b) => a.difficulty - b.difficulty);

export function getPuzzle(id: string): Puzzle | undefined {
  return PUZZLES.find((p) => p.id === id);
}
