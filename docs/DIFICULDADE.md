# Dificuldade: fonte (Geniol) × nossa avaliação

A coluna **Fonte** é a dificuldade declarada pelo Geniol (ícones de cérebro, 1–5).
A coluna **Nossa** é calculada por `engine/difficulty.ts`: resolvemos cada puzzle por
propagação (dedução) e por backtracking instrumentado, e combinamos esforço de busca,
tamanho e mix de pistas numa escala 1–10 (calibrada: *No ponto* = 6, *Einstein* = 10).
"Prop." = resolvível só por eliminação (sem hipótese). "Nós" = atribuições testadas na busca.

| # | Fase | Tam. | Fonte | Fonte×2 | Nossa | Prop. | Nós |
|---|------|------|-------|---------|-------|-------|-----|
| 1 | Sucos no quintal | 3×2 | ●○○○○ 1/5 | 2 | **1/10** | sim | 7 |
| 2 | Roteiro pelo Brasil | 4×2 | ●○○○○ 1/5 | 2 | **1/10** | sim | 15 |
| 3 | Meninas na Escola | 3×3 | ●○○○○ 1/5 | 2 | **1/10** | sim | 25 |
| 4 | Compras no Mercado | 4×2 | ●●○○○ 2/5 | 4 | **1/10** | sim | 17 |
| 5 | Coleção de miniaturas | 4×2 | ●●○○○ 2/5 | 4 | **1/10** | sim | 24 |
| 6 | Café da tarde | 4×2 | ●●○○○ 2/5 | 4 | **1/10** | sim | 23 |
| 7 | Concurso de Beleza | 4×2 | ●●○○○ 2/5 | 4 | **1/10** | sim | 18 |
| 8 | Reunião de Professores | 4×2 | ●●○○○ 2/5 | 4 | **2/10** | sim | 13 |
| 9 | Contas para Pagar | 4×2 | ●●○○○ 2/5 | 4 | **2/10** | sim | 45 |
| 10 | Almoço de Natal | 4×2 | ●●○○○ 2/5 | 4 | **2/10** | sim | 21 |
| 11 | Caixa Eletrônico | 4×2 | ●●○○○ 2/5 | 4 | **2/10** | sim | 44 |
| 12 | Dia dos Namorados | 4×3 | ●●●○○ 3/5 | 6 | **2/10** | sim | 17 |
| 13 | Jogadores de Basquete | 4×2 | ●●○○○ 2/5 | 4 | **3/10** | sim | 50 |
| 14 | Aulas de reforço | 4×2 | ●●○○○ 2/5 | 4 | **3/10** | sim | 65 |
| 15 | Tarde no zoológico | 4×2 | ●●○○○ 2/5 | 4 | **3/10** | sim | 40 |
| 16 | Competição de Kart | 4×2 | ●●○○○ 2/5 | 4 | **3/10** | sim | 78 |
| 17 | Jogo de Boliche | 4×2 | ●●○○○ 2/5 | 4 | **3/10** | sim | 65 |
| 18 | Blogueiros de Sucesso | 4×3 | ●●●○○ 3/5 | 6 | **3/10** | sim | 18 |
| 19 | Investindo em Ações | 4×2 | ●●○○○ 2/5 | 4 | **4/10** | sim | 74 |
| 20 | Conta de Água | 4×2 | ●●○○○ 2/5 | 4 | **4/10** | não | 13 |
| 21 | Décimo Terceiro | 5×2 | ●●○○○ 2/5 | 4 | **4/10** | sim | 52 |
| 22 | Cheque Especial | 4×2 | ●●○○○ 2/5 | 4 | **4/10** | sim | 101 |
| 23 | Sanduíches Naturais | 4×2 | ●●○○○ 2/5 | 4 | **4/10** | sim | 126 |
| 24 | Livros de Colorir | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 88 |
| 25 | Posto de Combustível | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 117 |
| 26 | Pipas coloridas | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 134 |
| 27 | Self-Service | 4×3 | ●●●○○ 3/5 | 6 | **5/10** | sim | 48 |
| 28 | Escola de Música | 4×3 | ●●●○○ 3/5 | 6 | **5/10** | sim | 54 |
| 29 | Turistas no Brasil | 4×2 | ●●○○○ 2/5 | 4 | **6/10** | sim | 127 |
| 30 | Cachorros no parque | 4×2 | ●●○○○ 2/5 | 4 | **6/10** | sim | 199 |
| 31 | Festa a Fantasia | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 87 |
| 32 | Viagem aos Estados Unidos | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 81 |
| 33 | Pacientes no Psiquiatra | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 86 |
| 34 | Carros no Mecânico | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 65 |
| 35 | No ponto | 5×3 | — | — | **7/10** | sim | 62 |
| 36 | Salas de Cinema | 4×2 | ●●○○○ 2/5 | 4 | **7/10** | não | 42 |
| 37 | Happy Hour | 4×3 | ●●●○○ 3/5 | 6 | **7/10** | sim | 136 |
| 38 | Ovos de Páscoa | 4×3 | ●●●○○ 3/5 | 6 | **7/10** | não | 19 |
| 39 | Casais de Férias | 4×3 | ●●●●○ 4/5 | 8 | **7/10** | sim | 160 |
| 40 | Campeonato de Xadrez | 4×2 | ●●○○○ 2/5 | 4 | **8/10** | não | 92 |
| 41 | Pacientes na Fisioterapia | 4×3 | ●●●○○ 3/5 | 6 | **8/10** | sim | 235 |
| 42 | Dia das Mães | 5×2 | ●●●○○ 3/5 | 6 | **8/10** | sim | 434 |
| 43 | Festa da Faculdade | 4×3 | ●●●●○ 4/5 | 8 | **8/10** | sim | 182 |
| 44 | Visita ao Aquário | 4×3 | ●●●○○ 3/5 | 6 | **9/10** | sim | 418 |
| 45 | Passageiros no Aeroporto | 4×3 | ●●●○○ 3/5 | 6 | **9/10** | sim | 489 |
| 46 | Cantores Famosos | 4×3 | ●●●○○ 3/5 | 6 | **9/10** | sim | 594 |
| 47 | Aulas na academia | 4×3 | ●●●○○ 3/5 | 6 | **9/10** | sim | 1352 |
| 48 | Campeonato de Natação | 4×3 | ●●●●○ 4/5 | 8 | **9/10** | sim | 390 |
| 49 | O enigma de Einstein | 5×5 | — | — | **10/10** | sim | 4194 |
| 50 | Apresentações de Dança | 4×3 | ●●●○○ 3/5 | 6 | **10/10** | não | 500 |
| 51 | Vizinhança em Perigo | 4×3 | ●●●●○ 4/5 | 8 | **10/10** | não | 268 |

**51 fases.** Correlação (Pearson) entre a fonte (×2) e a nossa escala: **0.73**.

> Observação: a escala do Geniol satura em 5 e é grosseira; a nossa diferencia melhor
> os puzzles que exigem hipótese ("e se…") dos que se resolvem por eliminação direta,
> por isso vários "2/5" da fonte se espalham entre 4 e 9 na nossa.
