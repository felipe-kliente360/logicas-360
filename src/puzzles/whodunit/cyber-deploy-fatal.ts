// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "cyber-deploy-fatal",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "O deploy fatal",
  "story": "Sexta, 17h e poucos, na Kliente 360: alguém achou que dava tempo de um último deploy antes do happy hour. Deu tempo, sim — de derrubar o fluxo de faturamento inteirinho em produção. O canal do time virou um velório de emojis. No post-mortem, cinco pessoas tinham as mãos no console naquela tarde, cada uma num ambiente, com uma ferramenta, num horário. Cruze o log e descubra de onde saiu a bomba.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Rafa",
      "Nando",
      "Lud",
      "Bia",
      "Kai"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Ambiente",
      "values": [
        {
          "id": "Producao",
          "label": "Produção",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sandbox Full",
          "label": "Sandbox Full",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "QA",
          "label": "QA",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Scratch Org",
          "label": "Scratch Org",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Pipeline CI/CD",
          "label": "Pipeline CI/CD",
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
          "id": "Change Set",
          "label": "Change Set",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Metadata API",
          "label": "Metadata API",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Anonymous Apex",
          "label": "Anonymous Apex",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Data Loader",
          "label": "Data Loader",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Flow",
          "label": "Flow",
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
          "id": "14h",
          "label": "14h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "15h",
          "label": "15h",
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
        },
        {
          "id": "17h",
          "label": "17h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "18h",
          "label": "18h",
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
    "prompt": "A apuração fixou a queda às 18h, e o gatilho partiu do Pipeline CI/CD.",
    "evidence": [
      {
        "cat": "local",
        "value": "Pipeline CI/CD"
      },
      {
        "cat": "hora",
        "value": "18h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem estava mexendo no Flow não foi a mesma pessoa que bateu ponto às 14h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Flow"
          },
          "b": {
            "cat": "hora",
            "value": "14h"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Quem rodou Anonymous Apex é justamente quem já estava no console às 14h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Anonymous Apex"
          },
          "b": {
            "cat": "hora",
            "value": "14h"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "Rafa jura de pés juntos que não encostou no Change Set.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Change Set",
          "pos": 0
        }
      ]
    },
    {
      "id": "c4",
      "text": "Quem estava logado direto na Produção foi quem disparou o Anonymous Apex — clássico dos clássicos.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Producao"
          },
          "b": {
            "cat": "objeto",
            "value": "Anonymous Apex"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "Kai só aparece no log a partir das 17h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "17h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c6",
      "text": "Bia estava operando pela Metadata API.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Metadata API",
          "pos": 3
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem estava na Sandbox Full não foi quem operou pela Metadata API.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Sandbox Full"
          },
          "b": {
            "cat": "objeto",
            "value": "Metadata API"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Nando não chegou nem perto da Sandbox Full.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Sandbox Full",
          "pos": 1
        }
      ]
    },
    {
      "id": "c9",
      "text": "Quem estava no Flow não foi a mesma pessoa que aparece marcada às 16h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Flow"
          },
          "b": {
            "cat": "hora",
            "value": "16h"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "Nando estava de plantão às 16h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "16h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quem ativou o Flow é a mesma pessoa que ainda estava online às 17h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Flow"
          },
          "b": {
            "cat": "hora",
            "value": "17h"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Quem estava no QA não foi quem operou pela Metadata API.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "QA"
          },
          "b": {
            "cat": "objeto",
            "value": "Metadata API"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "Às 15h, Kai não estava por perto.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "15h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c14",
      "text": "Quem subiu o Change Set é a mesma pessoa que consta no log das 15h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Change Set"
          },
          "b": {
            "cat": "hora",
            "value": "15h"
          }
        }
      ]
    },
    {
      "id": "c15",
      "text": "Às 14h, Kai também não tinha dado as caras.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "14h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c16",
      "text": "Quem estava na Scratch Org foi justamente quem rodou o Flow.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Scratch Org"
          },
          "b": {
            "cat": "objeto",
            "value": "Flow"
          }
        }
      ]
    }
  ],
  "baseRaw": 5.322432511694039
};
