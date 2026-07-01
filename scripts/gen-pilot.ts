// Lote piloto: gera 3 casos de investigação de TEMAS NOVOS pelo motor e escreve
// os arquivos em src/puzzles/whodunit/. Rode e depois plugue no index.
//   npx tsx scripts/gen-pilot.ts
import fs from "node:fs";
import { generateWhodunit, type WhoSkin } from "../src/engine/whodunit-gen.ts";
import { countSolutions, solve } from "../src/engine/solver.ts";
import { culpritAudit } from "../src/engine/difficulty.ts";

const V = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const cat = (id: string, label: string, vals: [string, string?][]) => ({ id, label, values: vals.map(([i, l]) => V(i, l ?? i)) });
const BANDS: [number, number][] = [[0, 4.5], [4.5, 5.0], [5.0, 5.28], [5.28, 5.5], [5.5, 5.85], [5.85, 6.1], [6.1, 6.48], [6.48, 7.05], [7.05, 8.45], [8.45, 99]];
const band = (lv: number) => BANDS[lv - 1];
const levelOf = (raw: number) => BANDS.findIndex(([a, b]) => raw >= a && raw < b) + 1;

// verbo por categoria — todos NEUTROS de gênero (evita "visto/vista")
const HORA = "apareceu às";

const pilots: { skin: WhoSkin; level: number }[] = [
  {
    level: 4,
    skin: {
      id: "crime-set-cinema", title: "O crime no set de cinema", themeId: "dossie", size: 5,
      story: "Nas gravações do filme mais caro do ano, o astro foi achado sem vida entre os refletores. Cinco pessoas do set rondavam os bastidores — cada uma num ponto do estúdio, com um objeto, num horário. Reconstrua a diária inteira e veja quem sobra.",
      spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Diretor", "Atriz", "Dublê", "Roteirista", "Produtora"] },
      categories: [
        cat("cena", "Cena", [["Estudio A", "Estúdio A"], ["Camarim"], ["Backlot"], ["Ilha de edicao", "Ilha de edição"], ["Refeitorio", "Refeitório"]]),
        cat("objeto", "Objeto", [["Corda"], ["Faca"], ["Frasco"], ["Estatueta"], ["Lanterna"]]),
        cat("hora", "Horário", [["14h"], ["16h"], ["18h"], ["20h"], ["22h"]]),
      ],
      evidenceCats: ["cena", "hora"],
      clueVerb: { cena: "estava em", objeto: "portava", hora: HORA },
      crimePrompt: (ev) => `O legista fixou a morte por volta das ${ev.hora}, e a claquete caída marcava o set onde o corpo foi achado: ${ev.cena}.`,
    },
  },
  {
    level: 6,
    skin: {
      id: "terror-no-circo", title: "Terror no circo", themeId: "dossie", size: 5,
      story: "Na noite de estreia, o trapezista principal despencou — e a perícia garante que não foi acidente. Cinco artistas circulavam pela lona, cada um num ponto do picadeiro, com um objeto, num horário. Reconstrua a noite inteira e veja quem sobra.",
      spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Palhaço", "Mágico", "Domadora", "Contorcionista", "Ilusionista"] },
      categories: [
        cat("local", "Local", [["Picadeiro"], ["Camarim"], ["Jaula"], ["Bilheteria"], ["Arquibancada"]]),
        cat("objeto", "Objeto", [["Corda"], ["Faca"], ["Adaga"], ["Charuto"], ["Lanterna"]]),
        cat("hora", "Horário", [["19h"], ["20h"], ["21h"], ["22h"], ["23h"]]),
      ],
      evidenceCats: ["local", "hora"],
      clueVerb: { local: "estava em", objeto: "portava", hora: HORA },
      crimePrompt: (ev) => `A perícia cravou a hora da queda às ${ev.hora}, e o corpo foi encontrado em ${ev.local}.`,
    },
  },
  {
    level: 8,
    skin: {
      id: "sabotagem-submarino", title: "Sabotagem no submarino", themeId: "dossie", size: 5,
      story: "A 200 metros de profundidade, um oficial foi achado sem vida e um sistema vital sabotado na mesma vigília. Cinco tripulantes tinham acesso aos compartimentos — cada um num setor, com um objeto, num horário, movido por um motivo. Reconstrua o turno inteiro e veja quem sobra.",
      spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Comandante", "Sonarista", "Cozinheiro", "Médica", "Maquinista"] },
      categories: [
        cat("setor", "Setor", [["Torpedos"], ["Sonar"], ["Cozinha"], ["Reator"], ["Comando"]]),
        cat("objeto", "Objeto", [["Corda"], ["Faca"], ["Frasco"], ["Chave"], ["Cabo de aco", "Cabo de aço"]]),
        cat("hora", "Horário", [["22h"], ["23h"], ["00h"], ["01h"], ["02h"]]),
        cat("motivo", "Motivo", [["Motim"], ["Espionagem"], ["Vinganca", "Vingança"], ["Sabotagem"], ["Segredo"]]),
      ],
      evidenceCats: ["setor", "hora", "motivo"],
      clueVerb: { setor: "estava no", objeto: "portava", hora: HORA, motivo: "agiu por" },
      crimePrompt: (ev) => `O laudo é taxativo: a morte foi às ${ev.hora}, o ponto de sabotagem foi ${ev.setor}, e o estopim foi ${String(ev.motivo).toLowerCase()}.`,
    },
  },
];

for (const { skin, level } of pilots) {
  const [lo, hi] = band(level);
  const res = generateWhodunit(skin, { seed: 7, rawMin: lo, rawMax: hi, maxAttempts: 900, maxShortcut: 0 });
  if (!res) { console.log(skin.id, "→ FALHOU"); continue; }
  const p = res.puzzle;
  const g = solve(p)!;
  const a = culpritAudit(p)!;
  const cIdx = p.spine.labels.findIndex((_, i) => p.crime!.evidence.every((e) => g[e.cat]?.[i] === e.value));
  const file = `src/puzzles/whodunit/${skin.id}.ts`;
  const body = `// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.\nimport type { Puzzle } from "../../engine/types";\nexport const puzzle: Puzzle = ${JSON.stringify(p, null, 2)};\n`;
  fs.writeFileSync(file, body);
  console.log(
    `${skin.id.padEnd(22)} sols ${countSolutions(p, 2)} | raw ${res.raw.toFixed(2)} → nível ${levelOf(res.raw)} (alvo ${level}) | atalho ${a.shortcutPct}% | culpado ${p.spine.labels[cIdx]} | ${res.clueCount} pistas`
  );
}
