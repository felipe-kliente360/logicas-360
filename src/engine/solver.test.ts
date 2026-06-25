import { describe, it, expect } from "vitest";
import { countSolutions, solve } from "./solver";
import { noPonto } from "../puzzles/no-ponto";
import { einstein } from "../puzzles/einstein";

describe("solver — unicidade das fases", () => {
  it("No ponto tem solução única", () => {
    expect(countSolutions(noPonto, 2)).toBe(1);
  });

  it("Einstein tem solução única", () => {
    expect(countSolutions(einstein, 2)).toBe(1);
  });

  it("solve() devolve a solução declarada de No ponto", () => {
    const g = solve(noPonto);
    expect(g).not.toBeNull();
    expect(g).toEqual(noPonto.solution);
  });

  it("solve() devolve a solução declarada do Einstein (alemão com o peixe na casa 4)", () => {
    const g = solve(einstein);
    expect(g).not.toBeNull();
    expect(g).toEqual(einstein.solution);
    // sanidade clássica: o peixe é do alemão
    const peixePos = g!.animal.indexOf("Peixe");
    expect(g!.nac[peixePos]).toBe("Alemao");
  });
});
