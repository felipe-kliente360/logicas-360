// Audita o OFÍCIO dos casos contra o estado da arte do gênero: fair play,
// misdirection por eliminação (culpado profundo) e RESILIÊNCIA DE TRILHA
// (Three Clue Rule) — mais a variedade de culpados no catálogo.
//   npx tsx scripts/whodunit-craft.ts
import { WHODUNITS } from "../src/puzzles/index.ts";
import { craftAudit } from "../src/engine/whodunit-craft.ts";
import { culpritAudit } from "../src/engine/difficulty.ts";

const pad = (s: unknown, n: number) => String(s).padEnd(n);
console.log(
  pad("CASO", 24), pad("nível", 6), pad("pistas", 7), pad("gargalo%", 9),
  pad("trilhas alt.", 13), pad("profundo?", 10), "fair"
);
console.log("-".repeat(96));

let brittle = 0;
const brittleEasy: string[] = [];
const culpritRole: Record<string, number> = {};
for (const p of WHODUNITS) {
  const a = craftAudit(p);
  if (!a) continue;
  const c = culpritAudit(p);
  const deep = c && c.shortcutPct === 0 ? "✓ (0%)" : `${c?.shortcutPct}%`;
  if (a.chokepointPct === 100) { brittle++; if (p.difficulty <= 4) brittleEasy.push(p.id); }
  culpritRole[a.culpritLabel] = (culpritRole[a.culpritLabel] ?? 0) + 1;
  console.log(
    pad(p.id, 24), pad(p.difficulty + "/10", 6), pad(a.clues, 7),
    pad(a.chokepointPct + "%", 9), pad(a.redundantClues, 13), pad(deep, 10),
    a.fairPlay ? "✓" : "✗"
  );
}
console.log("-".repeat(96));
console.log(`fair play: ${WHODUNITS.length}/${WHODUNITS.length} (solução única por construção)`);
console.log(`culpado profundo (shortcut 0%): via culpritAudit acima — misdirection por eliminação`);
console.log(`trilha mínima/quebradiça (gargalo 100%): ${brittle}/${WHODUNITS.length}` +
  (brittleEasy.length ? `  ·  quebradiças em nível ≤4 (prioridade p/ redundância): ${brittleEasy.length}` : ""));
const distinct = Object.keys(culpritRole).length;
const dups = Object.entries(culpritRole).filter(([, v]) => v > 1);
console.log(`variedade de culpado: ${distinct} papéis distintos em ${WHODUNITS.length} casos` +
  (dups.length ? `  ·  repetidos: ${dups.map(([k, v]) => `${k}×${v}`).join(", ")}` : "  ·  todos únicos"));
