// Catálogo de fases — 100% investigações (whodunit). A solução é derivada pelo
// solver; a dificuldade (1..10) vem de BANDAS ABSOLUTAS do sinal contínuo do
// engine (difficultyRaw), calibradas historicamente com "No ponto" ≈ 7 e o
// desafio de Einstein ≈ 10 como âncora do nível máximo. Como cada caso é gerado
// mirando uma banda, a distribuição por nível fica sob controle (pirâmide).
import type { Puzzle } from "../engine/types";
import { solve } from "../engine/solver";
import { difficultyRaw } from "../engine/difficulty";
import { GLYPH_FOR } from "../ds/components/glyphs";
import { WHODUNIT } from "./whodunit"; // casos de investigação

const RAW: Puzzle[] = [...WHODUNIT];

// Cortes de raw -> nível 1..10 (âncoras de referência: No ponto≈7, Einstein≈10).
const LEVEL_CUTS = [4.5, 5.0, 5.28, 5.5, 5.85, 6.1, 6.48, 7.05, 8.45];
function levelFromRaw(r: number): number {
  let lvl = 1;
  for (const c of LEVEL_CUTS) if (r >= c) lvl++;
  return Math.min(10, lvl);
}

// Nível vem da COMPLEXIDADE ESSENCIAL: se o caso traz pistas redundantes (Three Clue
// Rule), o gerador grava `baseRaw` (raw do núcleo mínimo) — usamos ele para que a
// corroboração, que facilita a dedução, não infle o nível.
const raw = new Map(RAW.map((p) => [p.id, p.baseRaw ?? difficultyRaw(p)]));

// Coleção "Especial": casos ambientados em locais reais (Circuito das Águas / Sul de MG).
const SPECIAL = new Set([
  "balneario-caxambu",
  "baependi-romaria",
  "sao-lourenco-lago",
  "cruzilia-mangalarga",
  "sao-tome-vigilia",
]);

function hydrate(p: Puzzle): Puzzle {
  const hasSolution = p.solution && Object.keys(p.solution).length > 0;
  const solution = hasSolution ? p.solution : (solve(p) as Record<string, string[]> | null);
  if (!solution) console.warn(`[puzzles] ${p.id} sem solução — verifique as pistas`);
  // culpado (whodunit): entidade cujos atributos batem com todas as evidências
  let culprit: number | undefined;
  if (p.kind === "whodunit" && p.crime && solution) {
    for (let i = 0; i < p.size; i++) {
      if (p.crime.evidence.every((e) => solution[e.cat]?.[i] === e.value)) {
        culprit = i;
        break;
      }
    }
    if (culprit === undefined) console.warn(`[puzzles] ${p.id}: evidências não apontam culpado`);
  }
  // glifos temáticos: nos casos de investigação, troca os valores de texto cujo id
  // tem glifo na nossa linha autoral por display de ícone (cor semântica opcional).
  const categories =
    p.kind === "whodunit"
      ? p.categories.map((c) => ({
          ...c,
          values: c.values.map((v) => {
            const g = v.display.kind === "text" ? GLYPH_FOR[v.id] : undefined;
            return g ? { ...v, display: { kind: "icon" as const, icon: g.icon, hex: g.hex } } : v;
          }),
        }))
      : p.categories;
  return { ...p, categories, solution: solution ?? {}, difficulty: levelFromRaw(raw.get(p.id)!), culprit, special: SPECIAL.has(p.id) };
}

export const PUZZLES: Puzzle[] = RAW.map(hydrate).sort(
  (a, b) => a.difficulty - b.difficulty || raw.get(a.id)! - raw.get(b.id)!
);

// Só existe uma seção: investigações. (Alias mantido por clareza nos consumidores.)
export const WHODUNITS: Puzzle[] = PUZZLES.filter((p) => p.kind === "whodunit");

export function getPuzzle(id: string): Puzzle | undefined {
  return PUZZLES.find((p) => p.id === id);
}
