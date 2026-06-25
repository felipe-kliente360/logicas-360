# Lógicas 360

Jogo mobile (retrato-first) de **logic grid puzzles** — dedução em grade no estilo "Teste do Einstein".
Lógica 100% determinística (solver/gerador); só a narrativa usaria LLM (em build-time).

## Stack

Vite + React + TypeScript + Tailwind. Build estático, deploy no Netlify. Progresso em `localStorage`.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm test         # testes do solver (unicidade das fases)
npm run build    # build de produção → dist/
```

## Arquitetura

```
src/
  engine/     # modelo + solver (TS puro, testável isolado)
  puzzles/    # fases (No ponto = nível 6, Einstein = nível 10)
  ds/         # design system: tokens estruturais (fixos) + temas por fase
  game/       # telas (Home/seletor de fases, Board/tela da fase) + persistência
```

**Princípio central:** o DS estrutural é fixo entre fases; só o **tema** (CSS variables)
muda por mundo. O schema do puzzle é genérico (N entidades × M categorias), e cada valor
declara como se exibe (cor, ícone/emoji ou texto) — o mesmo DS renderiza qualquer mundo.

## Telas

- **Home** — seletor de fases com progresso salvo.
- **Fase** — tabuleiro de atribuição (fila de cartões × slots), pistas que acendem os slots
  ao toque, bottom sheet com auto-move, verificação gentil e botão **← Início** pra voltar.

## Próximos passos

- Camada de notas (painéis pareados X/✓) pras fases 9–10.
- Gerador de puzzles offline (build-time) + camada de narrativa via Anthropic SDK.
