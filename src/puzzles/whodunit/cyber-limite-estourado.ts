// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "cyber-limite-estourado",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "O limite estourado",
  "story": "Sexta-feira, meio da tarde, e um processo crítico da Kliente 360 travou feio: alguém estourou um governor limit no pior momento possível e a org inteira sentiu o soluço. A thread do time virou um velório de emojis. Naquele intervalo, cinco pessoas rodaram código ao mesmo tempo — cada uma num processo diferente, cada uma esbarrando em algum limite da plataforma, cada uma num horário. Nenhum defunto, só um job pendurado e muita gente jurando inocência. Reconstrua a apuração e veja quem sobra sem álibi.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Nando",
      "Kai",
      "Lud",
      "Sol",
      "Rafa"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Processo",
      "values": [
        {
          "id": "Trigger de Conta",
          "label": "Trigger de Conta",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Flow de Pedido",
          "label": "Flow de Pedido",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Batch Apex",
          "label": "Batch Apex",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Integracao REST",
          "label": "Integração REST",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Fila Assincrona",
          "label": "Fila assíncrona",
          "display": {
            "kind": "text"
          }
        }
      ]
    },
    {
      "id": "objeto",
      "label": "Limite",
      "values": [
        {
          "id": "SOQL 101",
          "label": "SOQL 101",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "CPU Timeout",
          "label": "CPU Timeout",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "DML 151",
          "label": "DML 151",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Heap Size",
          "label": "Heap Size",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Callout 100",
          "label": "Callout 100",
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
        },
        {
          "id": "12h",
          "label": "12h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "13h",
          "label": "13h",
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
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O post-mortem fixou o estouro do limite às 13h, no Flow de Pedido.",
    "evidence": [
      {
        "cat": "local",
        "value": "Flow de Pedido"
      },
      {
        "cat": "hora",
        "value": "13h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Kai não deu as caras no log das 12h.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "12h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c2",
      "text": "Quem rodava o Batch Apex não foi quem estourou a DML 151.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Batch Apex"
          },
          "b": {
            "cat": "objeto",
            "value": "DML 151"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quem estourou o CPU Timeout não estava logado às 11h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "CPU Timeout"
          },
          "b": {
            "cat": "hora",
            "value": "11h"
          }
        }
      ]
    },
    {
      "id": "c4",
      "text": "Sol não foi quem estourou o Callout 100.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Callout 100",
          "pos": 3
        }
      ]
    },
    {
      "id": "c5",
      "text": "Quem estourou o CPU Timeout também aparece no log das 14h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "CPU Timeout"
          },
          "b": {
            "cat": "hora",
            "value": "14h"
          }
        }
      ]
    },
    {
      "id": "c6",
      "text": "Quem estourou a DML 151 não estava por perto às 12h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "DML 151"
          },
          "b": {
            "cat": "hora",
            "value": "12h"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem tocava a Fila assíncrona não aparece no log das 14h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Fila Assincrona"
          },
          "b": {
            "cat": "hora",
            "value": "14h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Lud aparece no log das 14h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "14h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c9",
      "text": "Nando aparece no log das 11h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "11h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c10",
      "text": "Sol não deu as caras às 12h.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "12h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c11",
      "text": "Sol não foi quem estourou a DML 151.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "DML 151",
          "pos": 3
        }
      ]
    },
    {
      "id": "c12",
      "text": "Quem rodava o Batch Apex também aparece no log das 10h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Batch Apex"
          },
          "b": {
            "cat": "hora",
            "value": "10h"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "Rafa não foi quem estourou o Heap Size.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Heap Size",
          "pos": 4
        }
      ]
    },
    {
      "id": "c14",
      "text": "Quem mexia no Trigger de Conta — o suspeito clássico de toda org — também estourou o Callout 100.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Trigger de Conta"
          },
          "b": {
            "cat": "objeto",
            "value": "Callout 100"
          }
        }
      ]
    },
    {
      "id": "c15",
      "text": "Kai não estava no Trigger de Conta.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Trigger de Conta",
          "pos": 1
        }
      ]
    },
    {
      "id": "c16",
      "text": "Quem cuidava da Integração REST também estourou o CPU Timeout.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Integracao REST"
          },
          "b": {
            "cat": "objeto",
            "value": "CPU Timeout"
          }
        }
      ]
    },
    {
      "id": "c17",
      "text": "Quem tocava a Fila assíncrona também aparece no log das 12h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Fila Assincrona"
          },
          "b": {
            "cat": "hora",
            "value": "12h"
          }
        }
      ]
    }
  ],
  "baseRaw": 6.002106650900414
};
