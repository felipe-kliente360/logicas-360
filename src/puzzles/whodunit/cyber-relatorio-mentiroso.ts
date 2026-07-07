// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "cyber-relatorio-mentiroso",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "O relatório mentiroso",
  "story": "Na Kliente 360, o dashboard da diretoria abriu a reunião do trimestre com números que não fechavam — a receita brilhava verde onde deveria estar vermelha. Alguém mexeu na fonte antes do primeiro café, e o post-mortem começou com aquele silêncio elegante de quem sabe que o log de auditoria vai falar. Quatro pessoas do time de dados tinham acesso à plataforma naquela manhã: cada uma passou por um artefato, executou uma ação e deixou seu carimbo num horário diferente entre 08h e 11h.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Duda",
      "Téo",
      "Bia",
      "Rafa"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Artefato",
      "values": [
        {
          "id": "Dashboard",
          "label": "Dashboard",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Relatorio fonte",
          "label": "Relatório fonte",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Campo formula",
          "label": "Campo fórmula",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Tipo de registro",
          "label": "Tipo de registro",
          "display": {
            "kind": "text"
          }
        }
      ]
    },
    {
      "id": "objeto",
      "label": "Ação",
      "values": [
        {
          "id": "Formula",
          "label": "Fórmula",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Filtro",
          "label": "Filtro",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Snapshot",
          "label": "Snapshot",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Import CSV",
          "label": "Import CSV",
          "display": {
            "kind": "text"
          }
        }
      ]
    },
    {
      "id": "hora",
      "label": "Horário",
      "values": [
        {
          "id": "08h",
          "label": "08h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "09h",
          "label": "09h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "10h",
          "label": "10h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "11h",
          "label": "11h",
          "display": {
            "kind": "text"
          }
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "A apuração cravou o número furado às 09h, com origem no Relatório fonte.",
    "evidence": [
      {
        "cat": "local",
        "value": "Relatorio fonte"
      },
      {
        "cat": "hora",
        "value": "09h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Bia não bateu ponto na plataforma às 08h.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "08h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c2",
      "text": "O login de Bia ficou registrado às 11h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "11h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c3",
      "text": "Duda não chegou perto do Campo fórmula.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Campo formula",
          "pos": 0
        }
      ]
    },
    {
      "id": "c4",
      "text": "Téo também não pôs a mão no Campo fórmula.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Campo formula",
          "pos": 1
        }
      ]
    },
    {
      "id": "c5",
      "text": "Quem estava mexendo no Dashboard foi a mesma pessoa que rodou o Snapshot.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Dashboard"
          },
          "b": {
            "cat": "objeto",
            "value": "Snapshot"
          }
        }
      ]
    },
    {
      "id": "c6",
      "text": "Téo não encostou no Tipo de registro.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Tipo de registro",
          "pos": 1
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem ajustou o Filtro deixou o carimbo das 08h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Filtro"
          },
          "b": {
            "cat": "hora",
            "value": "08h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Quem rodou o Import CSV não foi a mesma pessoa que apareceu às 11h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Import CSV"
          },
          "b": {
            "cat": "hora",
            "value": "11h"
          }
        }
      ]
    },
    {
      "id": "c9",
      "text": "Rafa foi o primeiro a logar, às 08h, sozinho no sistema antes de a equipe chegar.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "08h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c10",
      "text": "Rafa não rodou nenhum Import CSV.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Import CSV",
          "pos": 3
        }
      ]
    },
    {
      "id": "c11",
      "text": "Téo já tinha saído da plataforma antes das 11h.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "11h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c12",
      "text": "Duda não mexeu no Tipo de registro.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Tipo de registro",
          "pos": 0
        }
      ]
    },
    {
      "id": "c13",
      "text": "Quem disparou o Snapshot fez isso às 10h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Snapshot"
          },
          "b": {
            "cat": "hora",
            "value": "10h"
          }
        }
      ]
    },
    {
      "id": "c14",
      "text": "Quem editou o Campo fórmula foi a mesma pessoa que aplicou o Filtro.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Campo formula"
          },
          "b": {
            "cat": "objeto",
            "value": "Filtro"
          }
        }
      ]
    },
    {
      "id": "c15",
      "text": "Téo não rodou Snapshot nenhum naquela manhã.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Snapshot",
          "pos": 1
        }
      ]
    }
  ],
  "baseRaw": 5.119868931922144
};
