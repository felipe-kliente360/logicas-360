// Relatório de dificuldade: para cada fase, valida unicidade, resolve, mede o
// esforço (propagação vs hipótese, nós de busca) e propõe nosso nível 1..10.
// Compara com a dificuldade declarada da fonte (geniol: ícones de cérebro 1..5).
//   npm run report
import { PUZZLES } from "../src/puzzles/index.ts";
import { countSolutions } from "../src/engine/solver.ts";
import { difficultyScore } from "../src/engine/difficulty.ts";

// dificuldade declarada pela fonte (geniol), 1..5 -> escala aprox. /2 só p/ leitura
const SOURCE: Record<string, number> = {};
for (const p of PUZZLES) {
  const s = (p as unknown as { sourceDifficulty?: number }).sourceDifficulty;
  if (typeof s === "number") SOURCE[p.id] = s;
}

const rows = PUZZLES.map((p) => {
  const sols = countSolutions(p, 2);
  const { trace } = difficultyScore(p);
  return { p, sols, score: p.difficulty, trace }; // score = nível calibrado
});

rows.sort((a, b) => a.score - b.score || a.trace.size - b.trace.size);

const pad = (s: string | number, n: number) => String(s).padEnd(n);
console.log(
  pad("FASE", 26),
  pad("uniq", 5),
  pad("N×M", 6),
  pad("prop?", 6),
  pad("nós", 8),
  pad("back", 7),
  pad("fonte", 6),
  pad("NOSSO", 6)
);
console.log("-".repeat(82));
let bad = 0;
for (const r of rows) {
  if (r.sols !== 1) bad++;
  console.log(
    pad(r.p.id, 26),
    pad(r.sols === 1 ? "ok" : `!${r.sols}`, 5),
    pad(`${r.trace.n}×${r.trace.cats}`, 6),
    pad(r.trace.propagationSolved ? "sim" : "NÃO", 6),
    pad(r.trace.searchNodes, 8),
    pad(r.trace.backtracks, 7),
    pad(SOURCE[r.p.id] != null ? `${SOURCE[r.p.id]}/5` : "—", 6),
    pad(`${r.score}/10`, 6)
  );
}
console.log("-".repeat(82));
console.log(`${rows.length} fases · ${bad} com unicidade quebrada`);
