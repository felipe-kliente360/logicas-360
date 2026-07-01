# Ofício do Whodunit — o cânone do gênero aplicado ao nosso motor

Síntese do estado da arte do *whodunit* (Van Dine, Knox, Christie, *Knives Out* +
teoria de design de mistério) traduzida para as invariantes do nosso jogo de
grade lógica determinístico. Serve de referência para gerar e revisar casos.

## 1. O que o motor já garante por construção

Muitas das "regras de ouro" da Era de Ouro são, para nós, invariantes matemáticas —
não dependem de disciplina do autor, saem de graça do gerador + solver:

| Cânone (Van Dine / Knox) | Como garantimos |
|---|---|
| **Fair Play / Igualdade de oportunidade** — a solução é dedutível só das pistas | Solução **única** verificada pelo solver (`countSolutions === 1`). O jogador tem exatamente as pistas necessárias. |
| **Círculo fechado** — pool fixo de suspeitos, sem forasteiros | A `spine` é o conjunto fechado de suspeitos; nada externo. |
| **Culpado único** | As evidências do crime apontam **um** suspeito na solução única. |
| **Culpado proeminente, presente desde o início** | O culpado é sempre um dos suspeitos listados de saída. |
| **Obviedade retrospectiva** — revelado, tudo aponta pra ele | A consistência da solução única faz cada pista bater com o culpado. |
| **Naturalismo / dedução lógica** — nada de sobrenatural, sorte ou confissão | A vitória vem só de propagação lógica; não há acaso na resolução. |
| **Sem enredo dentro do enredo redundante** | Regra de redação: `story` ambienta e dá as dimensões; **nunca** revela os valores da evidência (que vivem só em `crime.prompt`). |

## 2. Misdirection: "culpado profundo", não red herring por atributo

Na literatura, o *red herring* é um suspeito que **compartilha** um traço com o crime
e engana o leitor. **Isso é estruturalmente impossível aqui**: nossa grade é uma
permutação — cada valor (local/objeto/hora/motivo) pertence a **um** suspeito, então
só o culpado casa com cada valor da evidência. Ninguém "divide a arma" com ele.

Nossa contrapartida é a **misdirection por eliminação**, medida por
`culpritAudit.shortcutPct`: com **0%**, o culpado só fica único quando a grade inteira
está resolvida — ou seja, **todo inocente segue suspeito plausível até o fim**. É a
forma mais limpa e justa de suspense de dedução, e o gerador a garante por construção
(exclui do pool qualquer pista que toque a evidência).

➡️ **Red herring, para nós, é ofício de PROSA** (ver §4), não métrica do motor: uma
pista cujo *texto* soa incriminador mas é logicamente neutra.

## 3. Three Clue Rule — resiliência de trilha (o eixo que exige atenção)

Justin Alexander: *um mistério morre no "gargalo" quando uma dedução obrigatória
depende de UMA única pista.* Em `whodunit-craft.ts` medimos isso: um clue é
**load-bearing** (gargalo) se removê-lo quebra a unicidade. `chokepointPct = 100%`
significa **trilha única/quebradiça** — toda pista é indispensável, uma só rota de
dedução. Há redundância (< 100%) quando existem pistas corroborantes que abrem
**trilhas alternativas**.

- O `minimize()` do gerador busca o conjunto **mínimo** → tende a **100% de gargalo**.
  Isso é elegante, mas pouco "perdão": errou/não viu uma inferência, empacou.
- **Regra prática:** níveis **fáceis** (≤ L4) devem ter redundância (mais trilhas,
  mais perdão); níveis **difíceis** podem ser enxutos/quebradiços de propósito.
- **Alavanca:** opção `redundancy` em `generateWhodunit` acrescenta N pistas
  corroborantes (redundantes, logo **não revelam evidência nem quebram a unicidade**).
  Ex.: 5×3 com `redundancy 0` = 100% gargalo; `redundancy 3` ≈ 65%; `redundancy 6` ≈ 50%.

> Nota: redundância aumenta o `raw` (mais pistas para cruzar), então o sweep de
> semente re-mira a banda de dificuldade normalmente. Resiliência ≠ facilidade; uma
> trilha mais perdoável pode continuar exigente.

## 4. Ofício de prosa — o passo de revisão (2 passadas) codificado

Depois de gerada a lógica, todo caso passa por **duas passadas** de reescrita de
`story`, `crime.prompt` e **todas** as pistas. Checklist:

1. **Fidelidade absoluta** — cada `text` diz **exatamente** o que sua `constraint` diz
   (`at`/`notAt`/`same`/`diff`, conferindo posição/valor/categoria). Uma pista por
   entrada; nunca combinar nem dividir. A prosa não pode alterar a lógica.
2. **`crime.prompt` = só laudo forense** — hora, local [, motivo]. **Proibida** qualquer
   instrução ao jogador ("reconstrua", "descubra", "fixe os fatos", "veja quem sobra").
3. **`story` sem spoiler** — ambienta e cita as dimensões (cada um num lugar, com um
   objeto, numa hora [, por um motivo]); **não** revela os valores da evidência. Pode
   fechar com um convite genérico a desvendar.
4. **Red herring de prosa** — uma pista pode *soar* incriminadora ("a Faca reluzia na
   cintura da Domadora") sendo logicamente neutra. A isca é retórica, nunca lógica.
5. **Regra de três / foreshadowing** — recorrer a um motivo (objeto, gesto) ao longo
   das pistas dá textura e a sensação de inevitabilidade no fecho.
6. **Varie a estrutura** — nada de "X estava em Y" repetido; ritmo e verbos diversos.
7. **Tom noir** específico do mundo do caso (holofotes, sonar, lona, claustro…).

## 5. Anatomia do caso × os 4 atos

O arco clássico mapeia direto na nossa apresentação:

- **Ato I — Contrato de fumaça:** `story` (normalidade + o corpo + o círculo fechado).
- **Inciting facts:** `crime.prompt` (o laudo que fixa a evidência).
- **Atos II–III — labirinto:** o campo de pistas; o jogador cruza e elimina.
- **Ato IV — clímax:** a acusação. A verdade só fecha quando a grade fecha (culpado profundo).

## 6. Variedade de culpado

Nos casos gerados o culpado é sorteado (`Math.floor(rng()*n)`); no catálogo autoral,
variado à mão. `whodunit-craft.ts` reporta a distribuição de papéis culpados para
evitar que um mesmo arquétipo/posição vicie a série.

## 7. Pipeline e ferramentas

```
gerar lógica (whodunit-gen)  →  validar (check.ts: única + culpado)
  →  auditar profundidade (whodunit-audit: shortcut 0%)
  →  auditar ofício (whodunit-craft: gargalo%, variedade)
  →  revisar prosa 2× (§4)  →  plugar no index
```

- `scripts/check.ts <arquivo>` — solução única + culpado único.
- `scripts/whodunit-audit.ts` — nível + profundidade do culpado (atalho%).
- `scripts/whodunit-craft.ts` — fair play, resiliência de trilha (gargalo%), variedade.
- `src/engine/whodunit-craft.ts` — `craftAudit(puzzle)` programático.

## 8. Dívida conhecida

7 casos de nível ≤ L4 estão com gargalo 100% (trilha única). Candidatos a um passe
futuro de `redundancy` — o que exige **regerar + reescrever a prosa** deles, então
fica registrado como melhoria opcional, não aplicada retroativamente para preservar a
prosa já lapidada.
