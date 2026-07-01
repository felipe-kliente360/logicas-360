// engine/whodunit-craft.ts
// Métricas de OFÍCIO do whodunit, derivadas do estado da arte do gênero
// (Van Dine / Knox / Christie / Knives Out + teoria de design: Three Clue Rule,
// Method Moriarty). Complementa difficulty.culpritAudit (que mede "culpado
// profundo") com o eixo de RESILIÊNCIA DE TRILHA:
//
//   Three Clue Rule (Justin Alexander): o mistério "morre no gargalo" quando uma
//   dedução obrigatória depende de UMA única pista. Aqui medimos quantas pistas são
//   "load-bearing" — cuja remoção quebra a unicidade. 100% = trilha única/quebradiça
//   (todo clue é gargalo); < 100% = há pistas redundantes que abrem trilhas
//   alternativas de dedução, desejável sobretudo em níveis fáceis (mais perdão).
//
// Nota estrutural sobre RED HERRINGS: na nossa grade os valores são uma permutação
// (cada valor pertence a UM suspeito), então nenhum inocente pode "compartilhar" um
// valor de evidência com o culpado — a isca por atributo é impossível por construção.
// A nossa contrapartida é a MISDIRECTION POR ELIMINAÇÃO: com culpritAudit.shortcutPct
// = 0, todo inocente segue suspeito plausível até o fim. Red herring, para nós, é
// ofício de PROSA (ver docs/whodunit-craft.md), não métrica do motor.
import type { Puzzle } from "./types";
import { countSolutions, solve } from "./solver";

export interface CraftAudit {
  clues: number;
  loadBearing: number; // pistas cuja remoção quebra a unicidade (gargalos)
  redundantClues: number; // clues - loadBearing (trilhas alternativas)
  chokepointPct: number; // loadBearing / clues * 100 (100 = trilha única/quebradiça)
  fairPlay: boolean; // solução única
  culpritIndex: number; // posição do culpado na spine (-1 se indefinido)
  culpritLabel: string;
}

/** Um clue é "load-bearing" (gargalo) se removê-lo deixa o caso com >1 solução. */
export function loadBearingCount(puzzle: Puzzle): number {
  const clues = puzzle.clues;
  if (clues.length === 0) return 0;
  let n = 0;
  for (let i = 0; i < clues.length; i++) {
    const trial: Puzzle = { ...puzzle, clues: clues.filter((_, j) => j !== i) };
    if (countSolutions(trial, 2) !== 1) n++; // sem esta pista, some a unicidade
  }
  return n;
}

export function craftAudit(puzzle: Puzzle): CraftAudit | null {
  if (puzzle.kind !== "whodunit" || !puzzle.crime) return null;
  const grid = solve(puzzle);
  const fairPlay = countSolutions(puzzle, 2) === 1 && !!grid;
  const ev = puzzle.crime.evidence;

  let culpritIndex = -1;
  if (grid) {
    for (let p = 0; p < puzzle.size; p++) {
      if (ev.every((e) => grid[e.cat]?.[p] === e.value)) { culpritIndex = p; break; }
    }
  }

  const loadBearing = loadBearingCount(puzzle);
  const clues = puzzle.clues.length;
  return {
    clues,
    loadBearing,
    redundantClues: clues - loadBearing,
    chokepointPct: clues ? Math.round((loadBearing / clues) * 100) : 0,
    fairPlay,
    culpritIndex,
    culpritLabel: culpritIndex >= 0 ? puzzle.spine.labels[culpritIndex] : "—",
  };
}
