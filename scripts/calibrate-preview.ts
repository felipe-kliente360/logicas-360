// Pré-visualização da calibração ancorada. Não escreve nada — só mostra.
import { PUZZLES } from "../src/puzzles/index.ts";
import { difficultyRaw } from "../src/engine/difficulty.ts";

const LOW_IDS = ["basico-1", "basico-2", "meninas-na-escola"]; // -> nível 1
const MID_ID = "no-ponto"; // -> 7
const HIGH_ID = "einstein"; // -> 10

const raw = new Map(PUZZLES.map((p) => [p.id, difficultyRaw(p)]));
const sorted = [...PUZZLES].sort((a, b) => raw.get(a.id)! - raw.get(b.id)!);
const rank = new Map(sorted.map((p, i) => [p.id, i])); // 0..N-1

const lowRaw = Math.max(...LOW_IDS.map((id) => raw.get(id)!));
const midRaw = raw.get(MID_ID)!;
const highRaw = raw.get(HIGH_ID)!;
const lowRank = Math.max(...LOW_IDS.map((id) => rank.get(id)!));
const midRank = rank.get(MID_ID)!;
const highRank = rank.get(HIGH_ID)!;

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const lerp = (x: number, x0: number, x1: number, y0: number, y1: number) =>
  x1 === x0 ? y0 : y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);

// mapeamento por VALOR bruto, piecewise através das âncoras
function byValue(r: number): number {
  let lvl: number;
  if (r <= lowRaw) lvl = 1;
  else if (r <= midRaw) lvl = lerp(r, lowRaw, midRaw, 1, 7);
  else lvl = lerp(r, midRaw, highRaw, 7, 10);
  return clamp(Math.round(lvl), 1, 10);
}
// mapeamento por RANKING (posição), piecewise através das âncoras
function byRank(rk: number): number {
  let lvl: number;
  if (rk <= lowRank) lvl = 1;
  else if (rk <= midRank) lvl = lerp(rk, lowRank, midRank, 1, 7);
  else lvl = lerp(rk, midRank, highRank, 7, 10);
  return clamp(Math.round(lvl), 1, 10);
}

const pad = (s: any, n: number) => String(s).padEnd(n);
console.log(pad("FASE", 26), pad("raw", 7), pad("rank", 5), pad("porValor", 9), pad("porRank", 8));
console.log("-".repeat(60));
for (const p of sorted) {
  console.log(
    pad(p.id, 26),
    pad(raw.get(p.id)!.toFixed(2), 7),
    pad(rank.get(p.id)! + 1, 5),
    pad(byValue(raw.get(p.id)!), 9),
    pad(byRank(rank.get(p.id)!), 8)
  );
}
const cover = (fn: (p: any) => number) => {
  const set = new Set(sorted.map(fn));
  const missing = [...Array(10)].map((_, i) => i + 1).filter((l) => !set.has(l));
  const counts = [...Array(10)].map((_, i) => sorted.filter((p) => fn(p) === i + 1).length);
  return { missing, counts };
};
const cv = cover((p) => byValue(raw.get(p.id)!));
const cr = cover((p) => byRank(rank.get(p.id)!));
console.log("-".repeat(60));
console.log("porValor: contagem/nível", cv.counts, "| faltando:", cv.missing);
console.log("porRank : contagem/nível", cr.counts, "| faltando:", cr.missing);
console.log(`anchors raw: low=${lowRaw.toFixed(2)} mid(no-ponto)=${midRaw.toFixed(2)} high(einstein)=${highRaw.toFixed(2)}`);
console.log(`anchors rank(1-based): low=${lowRank + 1} mid=${midRank + 1} high=${highRank + 1} de ${sorted.length}`);
