// Estende a pirâmide de investigações: gera 17 casos de TEMAS NOVOS pelo motor,
// em quatro tiers de grade (4×3 base → 6×4 topo), e escreve os arquivos em
// src/puzzles/whodunit/. Depois é só plugar no index e revisar a prosa.
//   npx tsx scripts/gen-pyramid.ts
import fs from "node:fs";
import { generateWhodunit, type WhoSkin } from "../src/engine/whodunit-gen.ts";
import { countSolutions, solve } from "../src/engine/solver.ts";
import { culpritAudit } from "../src/engine/difficulty.ts";

const V = (id: string, label = id) => ({ id, label, display: { kind: "text" as const } });
const cat = (id: string, label: string, vals: [string, string?][]) => ({ id, label, values: vals.map(([i, l]) => V(i, l ?? i)) });
const BANDS: [number, number][] = [[0, 4.5], [4.5, 5.0], [5.0, 5.28], [5.28, 5.5], [5.5, 5.85], [5.85, 6.1], [6.1, 6.48], [6.48, 7.05], [7.05, 8.45], [8.45, 99]];
const band = (lv: number) => BANDS[lv - 1];
const levelOf = (raw: number) => BANDS.findIndex(([a, b]) => raw >= a && raw < b) + 1;

// verbos NEUTROS de gênero (a prosa final reescreve tudo, isto é só andaime)
const HORA = "apareceu às";
const verb3 = { local: "estava em", objeto: "portava", hora: HORA };
const verb4 = { local: "estava em", objeto: "portava", hora: HORA, motivo: "agiu por" };

// laudo (só fatos forenses — SEM instrução de jogo)
const crime2 = (ev: Record<string, string>) => `A perícia fixou a morte às ${ev.hora}, e o corpo foi encontrado em ${ev.local}.`;
const crime3 = (ev: Record<string, string>) => `O laudo é taxativo: a morte foi às ${ev.hora}, o ponto foi ${ev.local}, e o estopim foi ${String(ev.motivo).toLowerCase()}.`;

type Pilot = { skin: WhoSkin; level: number };
const pilots: Pilot[] = [
  // ── Tier A: 4 suspeitos × 3 categorias (2 evidências) — base da pirâmide ──
  { level: 3, skin: {
    id: "desfile-de-moda", title: "Morte na passarela", themeId: "dossie", size: 4,
    story: "Na noite mais aguardada da temporada, a estrela do desfile foi achada sem vida nos bastidores. Quatro figuras do casting circulavam pela produção — cada uma num ponto, com um objeto, num horário. Reconstrua a noite e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Estilista", "Modelo", "Fotógrafo", "Costureira"] },
    categories: [
      cat("local", "Ponto", [["Passarela"], ["Backstage"], ["Camarim"], ["Plateia"]]),
      cat("objeto", "Objeto", [["Tesoura"], ["Alfinete"], ["Espelho"], ["Salto"]]),
      cat("hora", "Horário", [["17h"], ["18h"], ["19h"], ["20h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 3, skin: {
    id: "estudio-de-radio", title: "Silêncio no ar", themeId: "dossie", size: 4,
    story: "Durante o programa da madrugada, o locutor mais ouvido do país foi calado para sempre dentro dos estúdios. Quatro pessoas tinham acesso à emissora — cada uma num ponto, com um objeto, num horário. Reconstrua a madrugada e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Locutor", "Produtor", "Sonoplasta", "Convidada"] },
    categories: [
      cat("local", "Sala", [["Estudio", "Estúdio"], ["Cabine"], ["Saguao", "Saguão"], ["Arquivo"]]),
      cat("objeto", "Objeto", [["Microfone"], ["Fita"], ["Fone"], ["Roteiro"]]),
      cat("hora", "Horário", [["22h"], ["23h"], ["00h"], ["01h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 3, skin: {
    id: "loja-a-noite", title: "Crime na loja de departamentos", themeId: "dossie", size: 4,
    story: "Depois que as portas fecharam, o gerente da grande loja foi encontrado sem vida entre as prateleiras. Quatro funcionários ficaram após o expediente — cada um num setor, com um objeto, num horário. Reconstrua a noite e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Segurança", "Gerente", "Vitrinista", "Estoquista"] },
    categories: [
      cat("local", "Setor", [["Vitrine"], ["Estoque"], ["Caixa"], ["Provador"]]),
      cat("objeto", "Objeto", [["Chaves"], ["Lanterna"], ["Fita"], ["Estilete"]]),
      cat("hora", "Horário", [["22h"], ["23h"], ["00h"], ["01h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 4, skin: {
    id: "sebo-livros-raros", title: "Segredo no sebo", themeId: "dossie", size: 4,
    story: "Entre estantes centenárias, o dono do sebo de livros raros foi achado sem vida com um incunábulo aberto ao lado. Quatro conhecedores estiveram na loja — cada um num canto, com um objeto, num horário. Reconstrua a tarde e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Livreiro", "Colecionador", "Restauradora", "Leiloeiro"] },
    categories: [
      cat("local", "Canto", [["Acervo"], ["Balcao", "Balcão"], ["Deposito", "Depósito"], ["Vitrine"]]),
      cat("objeto", "Objeto", [["Lupa"], ["Estilete"], ["Luva"], ["Chave"]]),
      cat("hora", "Horário", [["15h"], ["16h"], ["17h"], ["18h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 4, skin: {
    id: "parque-de-diversoes", title: "Terror no parque de diversões", themeId: "dossie", size: 4,
    story: "Depois do último cliente ir embora, o dono do parque foi encontrado sem vida ao pé de uma atração. Quatro funcionários fechavam o expediente — cada um num ponto, com um objeto, num horário. Reconstrua a noite e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Operador", "Bilheteira", "Mecânico", "Zelador"] },
    categories: [
      cat("local", "Atração", [["Roda-gigante"], ["Carrossel"], ["Bilheteria"], ["Tunel do terror", "Túnel do terror"]]),
      cat("objeto", "Objeto", [["Chave inglesa"], ["Ingresso"], ["Lanterna"], ["Corda"]]),
      cat("hora", "Horário", [["20h"], ["21h"], ["22h"], ["23h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 4, skin: {
    id: "restaurante-estrelado", title: "Jantar fatal", themeId: "dossie", size: 4,
    story: "Na cozinha do restaurante três estrelas, o chef renomado foi achado sem vida na hora do rush. Quatro profissionais da casa estavam de serviço — cada um numa área, com um objeto, num horário. Reconstrua o serviço e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Chef", "Maître", "Sommelier", "Confeiteira"] },
    categories: [
      cat("local", "Área", [["Cozinha"], ["Salao", "Salão"], ["Adega"], ["Copa"]]),
      cat("objeto", "Objeto", [["Faca"], ["Taca", "Taça"], ["Saca-rolhas"], ["Rolo"]]),
      cat("hora", "Horário", [["19h"], ["20h"], ["21h"], ["22h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 5, skin: {
    id: "estacao-de-esqui", title: "Neve vermelha", themeId: "dossie", size: 4,
    story: "Isolada por uma nevasca, a herdeira do resort de esqui foi encontrada sem vida no chalé. Quatro hóspedes ficaram presos pela tempestade — cada um num local, com um objeto, num horário. Reconstrua a tarde e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Instrutor", "Herdeira", "Guia", "Recepcionista"] },
    categories: [
      cat("local", "Local", [["Teleferico", "Teleférico"], ["Chale", "Chalé"], ["Pista"], ["Lareira"]]),
      cat("objeto", "Objeto", [["Bastao", "Bastão"], ["Corda"], ["Cachecol"], ["Frasco"]]),
      cat("hora", "Horário", [["16h"], ["17h"], ["18h"], ["19h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 5, skin: {
    id: "haras-do-derby", title: "Sangue no haras", themeId: "dossie", size: 4,
    story: "Na véspera do grande derby, o proprietário do haras foi achado sem vida junto às baias. Quatro figuras do turfe rondavam as instalações — cada uma num setor, com um objeto, num horário. Reconstrua a manhã e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Jóquei", "Treinador", "Veterinária", "Proprietário"] },
    categories: [
      cat("local", "Setor", [["Baias"], ["Pista"], ["Tribuna"], ["Selaria"]]),
      cat("objeto", "Objeto", [["Chicote"], ["Ferradura"], ["Seringa"], ["Corda"]]),
      cat("hora", "Horário", [["06h"], ["07h"], ["08h"], ["09h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 5, skin: {
    id: "clube-de-jazz", title: "Blues de meia-noite", themeId: "dossie", size: 4,
    story: "Sob a fumaça do clube de jazz, o dono da casa foi encontrado sem vida quando as luzes se acenderam. Quatro artistas fechavam a noite — cada um num ponto, com um objeto, num horário. Reconstrua a madrugada e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Cantora", "Pianista", "Barman", "Empresário"] },
    categories: [
      cat("local", "Local", [["Palco"], ["Camarim"], ["Bar"], ["Mezanino"]]),
      cat("objeto", "Objeto", [["Microfone"], ["Copo"], ["Charuto"], ["Isqueiro"]]),
      cat("hora", "Horário", [["23h"], ["00h"], ["01h"], ["02h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },

  // ── Tier B: 5 suspeitos × 3 categorias (2 evidências) — meio ──
  { level: 5, skin: {
    id: "base-antartida", title: "Gelo mortal", themeId: "dossie", size: 5,
    story: "Isolados pelo inverno polar, os cientistas da base antártica acordaram com um dos seus sem vida. Cinco pesquisadores dividiam a estação — cada um num setor, com um objeto, num horário. Reconstrua a noite e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Glaciologista", "Médico", "Cozinheira", "Piloto", "Radialista"] },
    categories: [
      cat("local", "Setor", [["Laboratorio", "Laboratório"], ["Enfermaria"], ["Cozinha"], ["Hangar"], ["Torre"]]),
      cat("objeto", "Objeto", [["Picareta"], ["Bisturi"], ["Faca"], ["Cabo"], ["Sinalizador"]]),
      cat("hora", "Horário", [["20h"], ["21h"], ["22h"], ["23h"], ["00h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 6, skin: {
    id: "escavacao-arqueologica", title: "A maldição da tumba", themeId: "dossie", size: 5,
    story: "No sítio arqueológico recém-aberto, o chefe da escavação foi achado sem vida diante da tumba lacrada. Cinco integrantes da expedição tinham acesso ao sítio — cada um num ponto, com um objeto, num horário. Reconstrua o dia e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Arqueólogo", "Financiadora", "Guia", "Fotógrafa", "Capataz"] },
    categories: [
      cat("local", "Ponto", [["Tumba"], ["Acampamento"], ["Poco", "Poço"], ["Tenda"], ["Galeria"]]),
      cat("objeto", "Objeto", [["Pá"], ["Lanterna"], ["Corda"], ["Faca"], ["Pincel"]]),
      cat("hora", "Horário", [["10h"], ["11h"], ["12h"], ["13h"], ["14h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 6, skin: {
    id: "mosteiro-isolado", title: "Pecado no mosteiro", themeId: "dossie", size: 5,
    story: "Antes das matinas, o abade do mosteiro nas montanhas foi encontrado sem vida no claustro. Cinco religiosos partilhavam o silêncio — cada um num local, com um objeto, num horário. Reconstrua a madrugada e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Abade", "Noviço", "Bibliotecário", "Enfermeira", "Jardineiro"] },
    categories: [
      cat("local", "Local", [["Claustro"], ["Biblioteca"], ["Capela"], ["Refeitorio", "Refeitório"], ["Jardim"]]),
      cat("objeto", "Objeto", [["Castical", "Castiçal"], ["Corda"], ["Faca"], ["Frasco"], ["Chave"]]),
      cat("hora", "Horário", [["03h"], ["04h"], ["05h"], ["06h"], ["07h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },
  { level: 6, skin: {
    id: "estudio-de-gravacao", title: "Faixa final", themeId: "dossie", size: 5,
    story: "Na madrugada da última sessão, o vocalista da banda foi achado sem vida dentro do estúdio de gravação. Cinco pessoas do projeto estavam presentes — cada uma num ponto, com um objeto, num horário. Reconstrua a sessão e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Vocalista", "Baixista", "Produtor", "Tecladista", "Empresária"] },
    categories: [
      cat("local", "Local", [["Estudio", "Estúdio"], ["Cabine"], ["Controle"], ["Lounge"], ["Deposito", "Depósito"]]),
      cat("objeto", "Objeto", [["Cabo"], ["Baqueta"], ["Corda"], ["Isqueiro"], ["Fita"]]),
      cat("hora", "Horário", [["22h"], ["23h"], ["00h"], ["01h"], ["02h"]]),
    ], evidenceCats: ["local", "hora"], clueVerb: verb3, crimePrompt: crime2 } },

  // ── Tier C: 5 suspeitos × 4 categorias (3 evidências, com MOTIVO) — alto ──
  { level: 7, skin: {
    id: "farol-isolado", title: "A luz que se apagou", themeId: "dossie", size: 5,
    story: "No promontório batido pelas ondas, o velho faroleiro foi encontrado sem vida e a luz do farol, apagada. Cinco pessoas estavam na ilha — cada uma num setor, com um objeto, num horário, movida por um motivo. Reconstrua a noite e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Faroleiro", "Bióloga", "Pescador", "Herdeira", "Telegrafista"] },
    categories: [
      cat("local", "Setor", [["Lanterna do farol"], ["Casa de maquinas", "Casa de máquinas"], ["Ancoradouro"], ["Torre"], ["Deposito", "Depósito"]]),
      cat("objeto", "Objeto", [["Corda"], ["Faca"], ["Querosene"], ["Cabo"], ["Sinalizador"]]),
      cat("hora", "Horário", [["21h"], ["22h"], ["23h"], ["00h"], ["01h"]]),
      cat("motivo", "Motivo", [["Heranca", "Herança"], ["Vinganca", "Vingança"], ["Segredo"], ["Ciume", "Ciúme"], ["Dinheiro"]]),
    ], evidenceCats: ["local", "hora", "motivo"], clueVerb: verb4, crimePrompt: crime3 } },
  { level: 7, skin: {
    id: "dirigivel-de-luxo", title: "Tragédia nas alturas", themeId: "dossie", size: 5,
    story: "A bordo do dirigível de luxo, em pleno voo transatlântico, um passageiro ilustre foi achado sem vida. Cinco pessoas circulavam pela aeronave — cada uma num setor, com um objeto, num horário, movida por um motivo. Reconstrua o voo e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Comandante", "Aristocrata", "Engenheiro", "Cantora", "Comissário"] },
    categories: [
      cat("local", "Setor", [["Gondola", "Gôndola"], ["Salao", "Salão"], ["Casa de maquinas", "Casa de máquinas"], ["Cabine"], ["Convés"]]),
      cat("objeto", "Objeto", [["Corda"], ["Chave"], ["Frasco"], ["Cabo"], ["Ancora", "Âncora"]]),
      cat("hora", "Horário", [["20h"], ["21h"], ["22h"], ["23h"], ["00h"]]),
      cat("motivo", "Motivo", [["Espionagem"], ["Heranca", "Herança"], ["Vinganca", "Vingança"], ["Sabotagem"], ["Segredo"]]),
    ], evidenceCats: ["local", "hora", "motivo"], clueVerb: verb4, crimePrompt: crime3 } },
  { level: 8, skin: {
    id: "redacao-de-jornal", title: "Manchete de sangue", themeId: "dossie", size: 5,
    story: "Na madrugada do fechamento, o editor-chefe do grande jornal foi encontrado sem vida entre as bancadas da redação. Cinco jornalistas viraram a noite no prédio — cada um num setor, com um objeto, num horário, movido por um motivo. Reconstrua a madrugada e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Editor-chefe", "Repórter", "Diagramador", "Colunista", "Estagiária"] },
    categories: [
      cat("local", "Setor", [["Redacao", "Redação"], ["Arquivo"], ["Grafica", "Gráfica"], ["Sala do editor"], ["Recepcao", "Recepção"]]),
      cat("objeto", "Objeto", [["Tesoura"], ["Estilete"], ["Cabo"], ["Fita"], ["Frasco"]]),
      cat("hora", "Horário", [["23h"], ["00h"], ["01h"], ["02h"], ["03h"]]),
      cat("motivo", "Motivo", [["Chantagem"], ["Vinganca", "Vingança"], ["Inveja"], ["Segredo"], ["Dinheiro"]]),
    ], evidenceCats: ["local", "hora", "motivo"], clueVerb: verb4, crimePrompt: crime3 } },

  // ── Tier D: 6 suspeitos × 4 categorias (3 evidências) — topo da pirâmide ──
  { level: 10, skin: {
    id: "estacao-espacial", title: "Vácuo", themeId: "dossie", size: 6,
    story: "Em órbita, a 400 km da Terra, a tripulação da estação espacial encontrou o comandante sem vida e um módulo sabotado. Seis astronautas dividiam a estação — cada um num setor, com um objeto, num horário, movido por um motivo. Reconstrua o turno e veja quem sobra.",
    spine: { id: "suspeito", label: "Suspeito", ordered: false, labels: ["Comandante", "Engenheira", "Médico", "Cientista", "Piloto", "Especialista"] },
    categories: [
      cat("local", "Setor", [["Modulo central", "Módulo central"], ["Laboratorio", "Laboratório"], ["Eclusa"], ["Ponte"], ["Reator"], ["Estufa"]]),
      cat("objeto", "Objeto", [["Chave"], ["Cabo"], ["Bisturi"], ["Frasco"], ["Extintor"], ["Cilindro"]]),
      cat("hora", "Horário", [["22h"], ["23h"], ["00h"], ["01h"], ["02h"], ["03h"]]),
      cat("motivo", "Motivo", [["Sabotagem"], ["Espionagem"], ["Motim"], ["Segredo"], ["Vinganca", "Vingança"], ["Ganancia", "Ganância"]]),
    ], evidenceCats: ["local", "hora", "motivo"], clueVerb: verb4, crimePrompt: crime3 } },
];

const rows: string[] = [];
for (const { skin, level } of pilots) {
  const [lo, hi] = band(level);
  const res = generateWhodunit(skin, { seed: 7, rawMin: lo, rawMax: hi, maxAttempts: 1400, maxShortcut: 0 });
  if (!res) { console.log(skin.id.padEnd(24), "→ FALHOU"); continue; }
  const p = res.puzzle;
  const g = solve(p)!;
  const a = culpritAudit(p)!;
  const cIdx = p.spine.labels.findIndex((_, i) => p.crime!.evidence.every((e) => g[e.cat]?.[i] === e.value));
  const file = `src/puzzles/whodunit/${skin.id}.ts`;
  const body = `// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.\nimport type { Puzzle } from "../../engine/types";\nexport const puzzle: Puzzle = ${JSON.stringify(p, null, 2)};\n`;
  fs.writeFileSync(file, body);
  rows.push(
    `${skin.id.padEnd(24)} sols ${countSolutions(p, 2)} | raw ${res.raw.toFixed(2)} → nível ${levelOf(res.raw)} (alvo ${level}) | atalho ${a.shortcutPct}% | culpado ${p.spine.labels[cIdx]} | ${res.clueCount} pistas`
  );
}
console.log(rows.join("\n"));
