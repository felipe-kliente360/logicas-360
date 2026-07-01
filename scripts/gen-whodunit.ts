// Prova do motor gerador de whodunit: gera casos com tema novo e valida
// (única + culpado profundo + nível medido). Mostra o "dial" de dificuldade.
//   npx tsx scripts/gen-whodunit.ts [level] [seed]
import { generateWhodunit, type WhoSkin } from "../src/engine/whodunit-gen.ts";
import { countSolutions, solve } from "../src/engine/solver.ts";
import { culpritAudit } from "../src/engine/difficulty.ts";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// tema NOVO (não existe entre os 20): crime num set de cinema
const skin: WhoSkin = {
  id: "crime-set-cinema",
  title: "O crime no set de cinema",
  themeId: "dossie",
  size: 5,
  story:
    "Nas gravações do filme mais caro do ano, o astro foi achado sem vida entre os refletores. Cinco pessoas do set rondavam os bastidores — cada uma num ponto do estúdio, com um objeto em mãos, num horário. Reconstrua a diária inteira e veja quem sobra.",
  spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Diretor", "Atriz", "Dublê", "Roteirista", "Produtora"] },
  categories: [
    { id: "cena", label: "Cena", values: ["Estudio A", "Camarim", "Backlot", "Ilha de edicao", "Refeitorio"].map((v) => tx(v)) },
    { id: "objeto", label: "Objeto", values: ["Claquete", "Corda", "Holofote", "Faca", "Frasco"].map((v) => tx(v)) },
    { id: "hora", label: "Horário", values: ["14h", "16h", "18h", "20h", "22h"].map((v) => tx(v)) },
  ],
  evidenceCats: ["cena", "hora"],
  crimePrompt: "O legista fixou a morte no fim da tarde, e a claquete de cena caída marcava o set onde o corpo foi achado. Cruzando o local e a hora, quem matou o astro?",
  clueVerb: { cena: "estava em", objeto: "portava", hora: "foi visto às" },
};

// faixas de raw -> nível (iguais ao who-eval)
const BANDS: [number, number][] = [[0, 4.5], [4.5, 5.0], [5.0, 5.28], [5.28, 5.5], [5.5, 5.85], [5.85, 6.1], [6.1, 6.48], [6.48, 7.05], [7.05, 8.45], [8.45, 99]];
const levelOf = (raw: number) => BANDS.findIndex(([a, b]) => raw >= a && raw < b) + 1;
const bandFor = (lvl: number) => BANDS[lvl - 1];

const level = Number(process.argv[2] || 5);
const seed = Number(process.argv[3] || 1);
const [rawMin, rawMax] = bandFor(level);

console.log(`\nGerando "${skin.title}" — alvo nível ${level} (raw ${rawMin}–${rawMax})…\n`);
const res = generateWhodunit(skin, { seed, rawMin, rawMax, maxAttempts: 200 });
if (!res) {
  console.log("Não consegui gerar (pele inconsistente?).");
  process.exit(1);
}
const p = res.puzzle;
const sols = countSolutions(p, 2);
const g = solve(p)!;
const a = culpritAudit(p)!;
const culpritIdx = p.spine.labels.findIndex((_, i) => p.crime!.evidence.every((e) => g[e.cat]?.[i] === e.value));

console.log("solução única:", sols === 1 ? "✓" : "✗", "| pistas:", res.clueCount, "| tentativas:", res.attempts);
console.log("raw:", res.raw.toFixed(2), "→ nível", levelOf(res.raw), "| atalho:", a.shortcutPct + "%", a.shortcutPct === 0 ? "(profundo ✓)" : "");
console.log("culpado:", p.spine.labels[culpritIdx], "| evidência:", p.crime!.evidence.map((e) => e.value).join(" + "));
console.log("\nsolução:");
for (let i = 0; i < p.size; i++) console.log("  " + p.spine.labels[i].padEnd(11), p.categories.map((c) => g[c.id][i]).join(" · "));
console.log("\npistas geradas:");
p.clues.forEach((c) => console.log("  •", c.text));

// varredura do "dial": quantos níveis distintos o motor alcança neste grid 5×3
console.log("\n=== dial de dificuldade (grid 5×3, seeds 1..8 por nível-alvo) ===");
for (let lv = 3; lv <= 7; lv++) {
  const [lo, hi] = bandFor(lv);
  let hit = null;
  for (let s = 1; s <= 8 && !hit; s++) {
    const r = generateWhodunit(skin, { seed: s * 13, rawMin: lo, rawMax: hi, maxAttempts: 120 });
    if (r && r.raw >= lo && r.raw <= hi) hit = r;
  }
  console.log(`  nível ${lv}: ${hit ? `raw ${hit.raw.toFixed(2)} ✓ (${hit.clueCount} pistas)` : "não atingido neste grid"}`);
}
