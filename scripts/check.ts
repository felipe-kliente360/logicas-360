// Valida UM arquivo de puzzle: unicidade, solução derivada e nossa dificuldade.
//   npx tsx scripts/check.ts src/puzzles/geniol/<slug>.ts
import path from "node:path";
import { countSolutions, solve } from "../src/engine/solver.ts";
import { difficultyScore } from "../src/engine/difficulty.ts";
import type { Puzzle } from "../src/engine/types.ts";

const file = process.argv[2];
if (!file) {
  console.error("uso: tsx scripts/check.ts <arquivo.ts>");
  process.exit(2);
}
const mod = await import(path.resolve(process.cwd(), file));
const puzzle: Puzzle = mod.puzzle ?? (Object.values(mod).find((v: any) => v && v.clues) as Puzzle);
if (!puzzle) {
  console.error("nenhum Puzzle exportado (espere `export const puzzle`)");
  process.exit(2);
}

const sols = countSolutions(puzzle, 2);
console.log("id:", puzzle.id);
console.log("solutions:", sols, sols === 1 ? "✓ ÚNICA" : "✗ NÃO-ÚNICA (revise as pistas)");
if (sols === 1) {
  const { score, trace } = difficultyScore(puzzle);
  console.log("solution:", JSON.stringify(solve(puzzle)));
  console.log("nossa-dificuldade:", score + "/10", "| fonte:", puzzle.sourceDifficulty ?? "—", "| prop:", trace.propagationSolved, "| nós:", trace.searchNodes);
}
process.exit(sols === 1 ? 0 : 1);
