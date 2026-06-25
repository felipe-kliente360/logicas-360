// Gera docs/DIFICULDADE.md: tabela comparando a dificuldade declarada pela fonte
// (Geniol, ícones de cérebro 1..5) com a nossa avaliação (engine, 1..10).
//   npx tsx scripts/table.ts
import fs from "node:fs";
import { PUZZLES } from "../src/puzzles/index.ts";
import { difficultyScore } from "../src/engine/difficulty.ts";

const rows = PUZZLES.map((p) => {
  const { trace } = difficultyScore(p);
  return { p, score: p.difficulty, trace }; // score = nível calibrado (escala oficial)
}).sort((a, b) => a.score - b.score || (a.p.sourceDifficulty ?? 0) - (b.p.sourceDifficulty ?? 0));

// fonte 1..5 normalizada p/ 1..10 (×2) só pra leitura lado a lado
const norm = (s?: number) => (s == null ? null : s * 2);

const stars = (n: number, max: number) => "●".repeat(n) + "○".repeat(max - n);

let md = `# Dificuldade: fonte (Geniol) × nossa avaliação

A coluna **Fonte** é a dificuldade declarada pelo Geniol (ícones de cérebro, 1–5).
A coluna **Nossa** é calculada por \`engine/difficulty.ts\`: resolvemos cada puzzle por
propagação (dedução) e por backtracking instrumentado, e combinamos esforço de busca,
tamanho e mix de pistas numa escala 1–10 (calibrada: *No ponto* = 6, *Einstein* = 10).
"Prop." = resolvível só por eliminação (sem hipótese). "Nós" = atribuições testadas na busca.

| # | Fase | Tam. | Fonte | Fonte×2 | Nossa | Prop. | Nós |
|---|------|------|-------|---------|-------|-------|-----|
`;

rows.forEach((r, i) => {
  const src = r.p.sourceDifficulty;
  md += `| ${i + 1} | ${r.p.title} | ${r.trace.n}×${r.trace.cats} | ${
    src != null ? stars(src, 5) + ` ${src}/5` : "—"
  } | ${norm(src) ?? "—"} | **${r.score}/10** | ${r.trace.propagationSolved ? "sim" : "não"} | ${r.trace.searchNodes} |\n`;
});

// correlação simples (Pearson) entre fonte×2 e nossa, p/ as que têm fonte
const withSrc = rows.filter((r) => r.p.sourceDifficulty != null);
const xs = withSrc.map((r) => (r.p.sourceDifficulty as number) * 2);
const ys = withSrc.map((r) => r.score);
const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
const mx = mean(xs),
  my = mean(ys);
const cov = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0);
const sx = Math.sqrt(xs.reduce((s, x) => s + (x - mx) ** 2, 0));
const sy = Math.sqrt(ys.reduce((s, y) => s + (y - my) ** 2, 0));
const r = cov / (sx * sy || 1);

md += `\n**${rows.length} fases.** Correlação (Pearson) entre a fonte (×2) e a nossa escala: **${r.toFixed(2)}**.\n`;
md += `\n> Observação: a escala do Geniol satura em 5 e é grosseira; a nossa diferencia melhor\n`;
md += `> os puzzles que exigem hipótese ("e se…") dos que se resolvem por eliminação direta,\n`;
md += `> por isso vários "2/5" da fonte se espalham entre 4 e 9 na nossa.\n`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/DIFICULDADE.md", md);
console.log("escreveu docs/DIFICULDADE.md com", rows.length, "fases · r=", r.toFixed(2));
