// Gera uma fase de demonstração com o gerador determinístico (zero IA/API).
// A "pele" (tema, nomes, valores, história) é autoral; a lógica/pistas vêm do motor.
//   npx tsx scripts/generate.ts [seed] [targetMin] [targetMax] [--write]
import fs from "node:fs";
import { generate, type Skin } from "../src/engine/generator.ts";
import { countSolutions } from "../src/engine/solver.ts";

const tx = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });

// --- pele autoral (narrativa escrita aqui, sem API) ---
const skin: Skin = {
  id: "podio-hackathon",
  title: "Pódio do hackathon",
  story:
    "Quatro finalistas subiram ao palco para a premiação do hackathon. Cada um apresentou um projeto numa linguagem diferente. Descubra a colocação de cada um.",
  themeId: "casas-classico",
  size: 4,
  spine: {
    id: "colocacao",
    label: "Colocação",
    ordered: true,
    labels: ["1º lugar", "2º lugar", "3º lugar", "4º lugar"],
    referential: "1º lugar = campeão (topo do pódio); 4º lugar = último colocado.",
  },
  categories: [
    { id: "nome", label: "Finalista", values: ["Bia", "Caio", "Duda", "Enzo"].map((v) => tx(v)) },
    {
      id: "projeto",
      label: "Projeto",
      values: ["App de caronas", "Jogo educativo", "Bot financeiro", "Site de receitas"].map((v) => tx(v)),
    },
    { id: "linguagem", label: "Linguagem", values: ["Python", "Rust", "TypeScript", "Go"].map((v) => tx(v)) },
  ],
};

const [seedArg, minArg, maxArg] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const write = process.argv.includes("--write");
const seed = Number(seedArg ?? 7);
const targetMin = Number(minArg ?? 4);
const targetMax = Number(maxArg ?? 7);

const res = generate(skin, { seed, targetMin, targetMax, maxAttempts: 60 });
const p = res.puzzle;

console.log(`\n=== ${p.title} (seed ${seed}, alvo ${targetMin}-${targetMax}) ===`);
console.log(`tentativas: ${res.attempts} · pistas: ${res.clueCount} · dificuldade(ref): ${res.score}/10`);
console.log(`unicidade: ${countSolutions(p, 2) === 1 ? "✓ ÚNICA" : "✗ FALHOU"}`);
console.log("\nPistas:");
p.clues.forEach((c, i) => console.log(`  ${i + 1}. ${c.text}`));
console.log("\nSolução:");
for (const cat of p.categories) console.log(`  ${cat.label.padEnd(12)} ${p.solution[cat.id].join(" · ")}`);

if (write) {
  const file = `src/puzzles/generated/${p.id}.ts`;
  fs.mkdirSync("src/puzzles/generated", { recursive: true });
  const lit = JSON.stringify(p, null, 2).replace(/"([a-zA-Z_][\w]*)":/g, "$1:");
  fs.writeFileSync(
    file,
    `// AUTO-GERADO por scripts/generate.ts (seed ${seed}). Lógica determinística; narrativa autoral.\nimport type { Puzzle } from "../../engine/types";\n\nexport const puzzle: Puzzle = ${lit};\n`
  );
  console.log(`\nescrito em ${file}`);
}
