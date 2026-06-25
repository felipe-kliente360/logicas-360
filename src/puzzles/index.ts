// Catálogo de fases, em ordem de dificuldade. A home lê daqui pra montar o seletor.
import type { Puzzle } from "../engine/types";
import { noPonto } from "./no-ponto";
import { einstein } from "./einstein";

export const PUZZLES: Puzzle[] = [noPonto, einstein];

export function getPuzzle(id: string): Puzzle | undefined {
  return PUZZLES.find((p) => p.id === id);
}
