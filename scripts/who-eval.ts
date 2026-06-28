// Avalia UM caso whodunit em desenvolvimento: unicidade da grade, culpado único,
// profundidade do culpado (atalho% — 0 = ideal) e o NÍVEL projetado a partir do
// sinal contínuo (difficultyRaw), usando as faixas observadas no acervo atual.
//   npx tsx scripts/who-eval.ts src/puzzles/whodunit/<slug>.ts [rawAlvo]
import path from "node:path";
import { countSolutions, solve } from "../src/engine/solver.ts";
import { difficultyRaw, culpritAudit } from "../src/engine/difficulty.ts";
import type { Puzzle } from "../src/engine/types.ts";

// Faixas de raw -> nível (lidas do ranking calibrado do acervo; aproximadas).
const BANDS: [number, number][] = [
  [0, 4.5],     // 1
  [4.5, 5.0],   // 2
  [5.0, 5.28],  // 3
  [5.28, 5.5],  // 4
  [5.5, 5.85],  // 5
  [5.85, 6.1],  // 6
  [6.1, 6.48],  // 7
  [6.48, 7.05], // 8
  [7.05, 8.45], // 9
  [8.45, 99],   // 10
];
const projLevel = (raw: number) => BANDS.findIndex(([a, b]) => raw >= a && raw < b) + 1;

const file = process.argv[2];
const rawAlvo = process.argv[3] ? Number(process.argv[3]) : undefined;
if (!file) {
  console.error("uso: tsx scripts/who-eval.ts <arquivo.ts> [rawAlvo]");
  process.exit(2);
}
const mod = await import(path.resolve(process.cwd(), file));
const p: Puzzle = mod.puzzle ?? (Object.values(mod).find((v: any) => v && v.clues) as Puzzle);
if (!p) { console.error("nenhum Puzzle exportado"); process.exit(2); }

const sols = countSolutions(p, 2);
const uniq = sols === 1;
console.log("id:", p.id, "|", p.size + "×" + p.categories.length, "(" + p.size * p.categories.length + " células)");
console.log("solução única:", uniq ? "✓" : "✗ NÃO-ÚNICA (revise)");

let culpritOk = false;
let atalho: number | null = null;
if (uniq) {
  const g = solve(p)!;
  if (p.kind === "whodunit" && p.crime) {
    const matches = p.spine.labels.map((_, i) => i).filter((i) => p.crime!.evidence.every((e) => g[e.cat]?.[i] === e.value));
    culpritOk = matches.length === 1;
    console.log("culpado único:", culpritOk ? "✓ " + p.spine.labels[matches[0]] : "✗ " + matches.length + " candidatos (revise evidências)");
    const a = culpritAudit(p);
    atalho = a ? a.shortcutPct : null;
    const verdict = atalho === null ? "—" : atalho === 0 ? "✓ profundo (deduzido por último)" : atalho < 15 ? "ok~ (quase no fim)" : "✗ ENCURTÁVEL — evidência fácil demais";
    console.log("atalho%:", atalho + "%", verdict);
  }
}
const raw = difficultyRaw(p);
const lvl = projLevel(raw);
const hit = rawAlvo === undefined ? "" : Math.abs(raw - rawAlvo) <= 0.18 ? "  ✓ na faixa-alvo" : `  ✗ alvo raw≈${rawAlvo} (faltam ${(rawAlvo - raw).toFixed(2)})`;
console.log("raw:", raw.toFixed(2), "→ nível projetado:", lvl + "/10" + hit);

const green = uniq && (p.kind !== "whodunit" || (culpritOk && (atalho ?? 99) <= 10));
process.exit(green ? 0 : 1);
