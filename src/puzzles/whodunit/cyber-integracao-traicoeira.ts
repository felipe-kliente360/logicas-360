// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "cyber-integracao-traicoeira",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "A integração traiçoeira",
  "story": "Era pra ser mais uma sexta morna na Kliente 360, daquelas de deploy tranquilo e café frio. Aí um job de integração saiu do trilho, começou a disparar bem mais do que devia e inundou a org — em minutos os sistemas ligados iam caindo feito dominó, um NullPointer atrás do outro no monitor. No cabeçalho do post-mortem, cinco nomes carimbados: Igor, Mel, Téo, Duda e Nando. Cada um encostou na camada de integração naquele dia a partir de um ponto, com uma ferramenta, em um horário, movido por uma causa técnica. A apuração está aberta. Cruze os depoimentos, elimine o que não fecha e veja quem sobra.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Igor",
      "Mel",
      "Téo",
      "Duda",
      "Nando"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Ponto",
      "values": [
        {
          "id": "Named Credential",
          "label": "Named Credential",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Middleware",
          "label": "Middleware",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Webhook",
          "label": "Webhook",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Fila de Integracao",
          "label": "Fila de integração",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "API Gateway",
          "label": "API Gateway",
          "display": {
            "kind": "text"
          }
        }
      ]
    },
    {
      "id": "objeto",
      "label": "Ferramenta",
      "values": [
        {
          "id": "Callout Apex",
          "label": "Callout Apex",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Platform Event",
          "label": "Platform Event",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Bulk API",
          "label": "Bulk API",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Change Data Capture",
          "label": "Change Data Capture",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "OAuth",
          "label": "OAuth",
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
          "id": "10h",
          "label": "10h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "12h",
          "label": "12h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "14h",
          "label": "14h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "16h",
          "label": "16h",
          "display": {
            "kind": "text"
          }
        }
      ]
    },
    {
      "id": "motivo",
      "label": "Causa",
      "values": [
        {
          "id": "Retry infinito",
          "label": "Retry infinito",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sem bulkificar",
          "label": "Sem bulkificar",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Token vazado",
          "label": "Token vazado",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Timeout curto",
          "label": "Timeout curto",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Loop de eventos",
          "label": "Loop de eventos",
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
    "prompt": "O root cause é taxativo: às 16h, no API Gateway, um retry infinito entrou em rodízio e não parou mais — foi esse laço que inundou a org.",
    "evidence": [
      {
        "cat": "local",
        "value": "API Gateway"
      },
      {
        "cat": "hora",
        "value": "16h"
      },
      {
        "cat": "motivo",
        "value": "Retry infinito"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem disparou Callout Apex acabou fritando a org por Loop de eventos.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Callout Apex"
          },
          "b": {
            "cat": "motivo",
            "value": "Loop de eventos"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Quem ligou o Change Data Capture já estava de plantão desde as 08h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Change Data Capture"
          },
          "b": {
            "cat": "hora",
            "value": "08h"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "Nando entrou na jogada autenticando via OAuth.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "OAuth",
          "pos": 4
        }
      ]
    },
    {
      "id": "c4",
      "text": "Nando jura que não chegou perto da Named Credential.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Named Credential",
          "pos": 4
        }
      ]
    },
    {
      "id": "c5",
      "text": "Téo garante que não encostou na Bulk API naquele dia.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Bulk API",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "Igor bateu o ponto às 10h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "10h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c7",
      "text": "A causa atribuída ao Igor foi código Sem bulkificar.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Sem bulkificar",
          "pos": 0
        }
      ]
    },
    {
      "id": "c8",
      "text": "Duda estava com o Change Data Capture na mão.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Change Data Capture",
          "pos": 3
        }
      ]
    },
    {
      "id": "c9",
      "text": "Quem mexeu na integração às 14h acabou penando com Timeout curto.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "hora",
            "value": "14h"
          },
          "b": {
            "cat": "motivo",
            "value": "Timeout curto"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "Quem estava plugado no Webhook também aparece no log das 08h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Webhook"
          },
          "b": {
            "cat": "hora",
            "value": "08h"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quem despejou carga pela Bulk API também travou por Timeout curto — cheiro forte de org inundada.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Bulk API"
          },
          "b": {
            "cat": "motivo",
            "value": "Timeout curto"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Quem autenticou via OAuth não foi quem deixou o Token vazado.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "OAuth"
          },
          "b": {
            "cat": "motivo",
            "value": "Token vazado"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "Quem operava pelo Middleware também disparava Callout Apex.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Middleware"
          },
          "b": {
            "cat": "objeto",
            "value": "Callout Apex"
          }
        }
      ]
    },
    {
      "id": "c14",
      "text": "Quem autenticou via OAuth não é o mesmo que aparece às 12h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "OAuth"
          },
          "b": {
            "cat": "hora",
            "value": "12h"
          }
        }
      ]
    },
    {
      "id": "c15",
      "text": "Quem bateu ponto às 10h não caiu por Timeout curto.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "hora",
            "value": "10h"
          },
          "b": {
            "cat": "motivo",
            "value": "Timeout curto"
          }
        }
      ]
    },
    {
      "id": "c16",
      "text": "Igor estava parado na Fila de integração.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Fila de Integracao",
          "pos": 0
        }
      ]
    }
  ],
  "baseRaw": 6.307627946494331
};
