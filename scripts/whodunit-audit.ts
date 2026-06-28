// Audita os casos de investigação: profundidade do culpado (quão tarde ele fica
// único) — se a evidência é a peça deduzida por último (ideal) ou um atalho.
//   npx tsx scripts/whodunit-audit.ts
import { WHODUNITS } from "../src/puzzles/index.ts";
import { culpritAudit, difficultyScore } from "../src/engine/difficulty.ts";

const pad = (s: unknown, n: number) => String(s).padEnd(n);
console.log(
  pad("CASO", 20),
  pad("nível", 6),
  pad("evid", 5),
  pad("rodadas", 8),
  pad("único@", 7),
  pad("abertas", 8),
  pad("atalho%", 8),
  "veredito"
);
console.log("-".repeat(86));
for (const p of WHODUNITS) {
  const a = culpritAudit(p);
  if (!a) continue;
  const lvl = difficultyScore(p).score;
  const verdict = a.shortcutPct >= 35 ? "ENCURTÁVEL ✗" : a.shortcutPct >= 15 ? "ok~" : "profundo ✓";
  console.log(
    pad(p.id, 20),
    pad(lvl + "/10", 6),
    pad(a.evidence, 5),
    pad(a.roundsToSolve, 8),
    pad(a.uniqueRound, 7),
    pad(`${a.openCellsWhenUnique}/${a.totalCells}`, 8),
    pad(a.shortcutPct + "%", 8),
    verdict
  );
}
console.log("-".repeat(86));
console.log("atalho% = células ainda indeterminadas quando o culpado já era único (0% = só no fim = ideal).");
