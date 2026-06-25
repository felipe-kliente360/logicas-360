# Dificuldade: fonte (Geniol) × nossa avaliação

A coluna **Fonte** é a dificuldade declarada pelo Geniol (ícones de cérebro, 1–5).
A coluna **Nossa** é calculada por `engine/difficulty.ts`: resolvemos cada puzzle por
propagação (dedução) e por backtracking instrumentado, e combinamos esforço de busca,
tamanho e mix de pistas numa escala 1–10 (calibrada: *No ponto* = 6, *Einstein* = 10).
"Prop." = resolvível só por eliminação (sem hipótese). "Nós" = atribuições testadas na busca.

| # | Fase | Tam. | Fonte | Fonte×2 | Nossa | Prop. | Nós |
|---|------|------|-------|---------|-------|-------|-----|
| 1 | Básico 1 | 3×2 | ●○○○○ 1/5 | 2 | **4/10** | sim | 7 |
| 2 | Básico 2 | 4×2 | ●○○○○ 1/5 | 2 | **4/10** | sim | 15 |
| 3 | Meninas na Escola | 3×3 | ●○○○○ 1/5 | 2 | **4/10** | sim | 25 |
| 4 | Básico 3 | 4×2 | ●●○○○ 2/5 | 4 | **4/10** | sim | 24 |
| 5 | Café da tarde | 4×2 | ●●○○○ 2/5 | 4 | **4/10** | sim | 23 |
| 6 | Compras no Mercado | 4×2 | ●●○○○ 2/5 | 4 | **4/10** | sim | 17 |
| 7 | Concurso de Beleza | 4×2 | ●●○○○ 2/5 | 4 | **4/10** | sim | 18 |
| 8 | Almoço de Natal | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 21 |
| 9 | Aulas de reforço | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 65 |
| 10 | Caixa Eletrônico | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 44 |
| 11 | Cheque Especial | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 101 |
| 12 | Competição de Kart | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 78 |
| 13 | Conta de Água | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | não | 13 |
| 14 | Contas para Pagar | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 45 |
| 15 | Décimo Terceiro | 5×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 52 |
| 16 | Investindo em Ações | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 74 |
| 17 | Jogadores de Basquete | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 50 |
| 18 | Jogo de Boliche | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 65 |
| 19 | Reunião de Professores | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 13 |
| 20 | Sanduíches Naturais | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 126 |
| 21 | Tarde no zoológico | 4×2 | ●●○○○ 2/5 | 4 | **5/10** | sim | 40 |
| 22 | Blogueiros de Sucesso | 4×3 | ●●●○○ 3/5 | 6 | **5/10** | sim | 18 |
| 23 | Dia dos Namorados | 4×3 | ●●●○○ 3/5 | 6 | **5/10** | sim | 17 |
| 24 | Self-Service | 4×3 | ●●●○○ 3/5 | 6 | **5/10** | sim | 48 |
| 25 | No ponto | 5×3 | — | — | **6/10** | sim | 62 |
| 26 | Cachorros no parque | 4×2 | ●●○○○ 2/5 | 4 | **6/10** | sim | 199 |
| 27 | Livros de Colorir | 4×2 | ●●○○○ 2/5 | 4 | **6/10** | sim | 88 |
| 28 | Pipas coloridas | 4×2 | ●●○○○ 2/5 | 4 | **6/10** | sim | 134 |
| 29 | Posto de Combustível | 4×2 | ●●○○○ 2/5 | 4 | **6/10** | sim | 117 |
| 30 | Salas de Cinema | 4×2 | ●●○○○ 2/5 | 4 | **6/10** | não | 42 |
| 31 | Turistas no Brasil | 4×2 | ●●○○○ 2/5 | 4 | **6/10** | sim | 127 |
| 32 | Carros no Mecânico | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 65 |
| 33 | Escola de Música | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 54 |
| 34 | Festa a Fantasia | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 87 |
| 35 | Happy Hour | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 136 |
| 36 | Ovos de Páscoa | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | não | 19 |
| 37 | Pacientes no Psiquiatra | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 86 |
| 38 | Viagem aos Estados Unidos | 4×3 | ●●●○○ 3/5 | 6 | **6/10** | sim | 81 |
| 39 | Casais de Férias | 4×3 | ●●●●○ 4/5 | 8 | **6/10** | sim | 160 |
| 40 | Campeonato de Xadrez | 4×2 | ●●○○○ 2/5 | 4 | **7/10** | não | 92 |
| 41 | Cantores Famosos | 4×3 | ●●●○○ 3/5 | 6 | **7/10** | sim | 594 |
| 42 | Dia das Mães | 5×2 | ●●●○○ 3/5 | 6 | **7/10** | sim | 434 |
| 43 | Pacientes na Fisioterapia | 4×3 | ●●●○○ 3/5 | 6 | **7/10** | sim | 235 |
| 44 | Passageiros no Aeroporto | 4×3 | ●●●○○ 3/5 | 6 | **7/10** | sim | 489 |
| 45 | Visita ao Aquário | 4×3 | ●●●○○ 3/5 | 6 | **7/10** | sim | 418 |
| 46 | Campeonato de Natação | 4×3 | ●●●●○ 4/5 | 8 | **7/10** | sim | 390 |
| 47 | Festa da Faculdade | 4×3 | ●●●●○ 4/5 | 8 | **7/10** | sim | 182 |
| 48 | Aulas na academia | 4×3 | ●●●○○ 3/5 | 6 | **8/10** | sim | 1352 |
| 49 | Vizinhança em Perigo | 4×3 | ●●●●○ 4/5 | 8 | **8/10** | não | 268 |
| 50 | Apresentações de Dança | 4×3 | ●●●○○ 3/5 | 6 | **9/10** | não | 500 |
| 51 | O enigma de Einstein | 5×5 | — | — | **10/10** | sim | 4194 |

**51 fases.** Correlação (Pearson) entre a fonte (×2) e a nossa escala: **0.69**.

> Observação: a escala do Geniol satura em 5 e é grosseira; a nossa diferencia melhor
> os puzzles que exigem hipótese ("e se…") dos que se resolvem por eliminação direta,
> por isso vários "2/5" da fonte se espalham entre 4 e 9 na nossa.
