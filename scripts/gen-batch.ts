// Receita GO-FORWARD para novos casos (lotes pequenos, 3–4 por vez).
// Aplica automaticamente a curva de redundância por nível (Three Clue Rule),
// mira a banda de dificuldade pelo NÚCLEO mínimo (baseRaw) e reporta o ofício.
// SEGURANÇA: nunca sobrescreve um arquivo existente (protege a prosa já lapidada).
//
// Uso: edite o array `batch` abaixo com as PELES NOVAS do lote e rode:
//   npx tsx scripts/gen-batch.ts
// Depois: revisar a prosa (2 passadas, ver docs/whodunit-craft.md) e plugar no index.
import fs from "node:fs";
import { generateWhodunit, redundancyForLevel, type WhoSkin } from "../src/engine/whodunit-gen.ts";
import { countSolutions, solve } from "../src/engine/solver.ts";
import { culpritAudit } from "../src/engine/difficulty.ts";
import { craftAudit } from "../src/engine/whodunit-craft.ts";

const V = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const cat = (id: string, label: string, vals: [string, string?][]) => ({ id, label, values: vals.map(([i, l]) => V(i, l ?? i)) });
const BANDS: [number, number][] = [[0, 4.5], [4.5, 5.0], [5.0, 5.28], [5.28, 5.5], [5.5, 5.85], [5.85, 6.1], [6.1, 6.48], [6.48, 7.05], [7.05, 8.45], [8.45, 99]];
const band = (lv: number) => BANDS[lv - 1];
const levelOf = (raw: number) => BANDS.findIndex(([a, b]) => raw >= a && raw < b) + 1;
const HORA = "apareceu às";
const verb3 = { local: "estava em", objeto: "portava", hora: HORA };
const verb4 = { local: "estava em", objeto: "portava", hora: HORA, motivo: "agiu por" };
const crime2 = (ev: Record<string, string>) => `A perícia fixou a morte às ${ev.hora}, e o corpo foi encontrado em ${ev.local}.`;
const crime3 = (ev: Record<string, string>) => `O laudo é taxativo: a morte foi às ${ev.hora}, o ponto foi ${ev.local}, e o estopim foi ${String(ev.motivo).toLowerCase()}.`;
void verb4; void crime3; // disponíveis para peles de 4 categorias (com motivo)

// ————————————————————————————————————————————————————————————————
// LOTE ATUAL — troque pelas peles novas (temas SEMPRE inéditos no catálogo).
// ————————————————————————————————————————————————————————————————
const batch: { skin: WhoSkin; level: number }[] = [
  // exemplo (remova/edite): um caso fácil de teleférico
  // { level: 3, skin: { id: "teleferico-na-serra", title: "...", themeId: "dossie", size: 4,
  //   story: "...", spine: { id:"suspeito", label:"Suspeito", ordered:false, labels:[...] },
  //   categories: [cat("local","Ponto",[...]), cat("objeto","Objeto",[...]), cat("hora","Horário",[...])],
  //   evidenceCats: ["local","hora"], clueVerb: verb3, crimePrompt: crime2 } },
];

if (batch.length === 0) {
  console.log("batch vazio — edite scripts/gen-batch.ts com as peles do lote.");
  process.exit(0);
}
if (batch.length > 4) console.log(`⚠️  ${batch.length} casos — recomendado ≤4 por lote para a prosa manter qualidade.`);

for (const { skin, level } of batch) {
  const file = `src/puzzles/whodunit/${skin.id}.ts`;
  if (fs.existsSync(file)) { console.log(`${skin.id.padEnd(24)} → PULADO (arquivo já existe; não sobrescrevo prosa)`); continue; }
  const [lo, hi] = band(level);
  const redundancy = redundancyForLevel(level);
  const res = generateWhodunit(skin, { seed: 7, rawMin: lo, rawMax: hi, maxAttempts: 1400, maxShortcut: 0, redundancy });
  if (!res) { console.log(`${skin.id.padEnd(24)} → FALHOU`); continue; }
  const p = res.puzzle;
  const body = `// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.\nimport type { Puzzle } from "../../engine/types";\nexport const puzzle: Puzzle = ${JSON.stringify(p, null, 2)};\n`;
  fs.writeFileSync(file, body);
  const a = culpritAudit(p)!;
  const cr = craftAudit(p)!;
  const g = solve(p)!;
  const cIdx = p.spine.labels.findIndex((_, i) => p.crime!.evidence.every((e) => g[e.cat]?.[i] === e.value));
  console.log(
    `${skin.id.padEnd(24)} sols ${countSolutions(p, 2)} | núcleo raw ${res.raw.toFixed(2)} → N${levelOf(res.raw)} (alvo ${level}) | ` +
    `atalho ${a.shortcutPct}% | gargalo ${cr.chokepointPct}% (red ${redundancy}) | culpado ${p.spine.labels[cIdx]} | ${cr.clues} pistas`
  );
}
console.log("\npróximo passo: revisar a prosa (2 passadas, docs/whodunit-craft.md §4) e importar no index.");
