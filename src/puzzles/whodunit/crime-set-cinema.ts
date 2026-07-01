// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "crime-set-cinema",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "O crime no set de cinema",
  "story": "Nas gravações do filme mais caro do ano, o astro foi achado sem vida entre os refletores. Cinco pessoas do set rondavam os bastidores — cada uma num ponto do estúdio, com um objeto, num horário. Reconstrua a diária inteira e veja quem sobra.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Diretor",
      "Atriz",
      "Dublê",
      "Roteirista",
      "Produtora"
    ]
  },
  "categories": [
    {
      "id": "cena",
      "label": "Cena",
      "values": [
        {
          "id": "Estudio A",
          "label": "Estúdio A",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Camarim",
          "label": "Camarim",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Backlot",
          "label": "Backlot",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ilha de edicao",
          "label": "Ilha de edição",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Refeitorio",
          "label": "Refeitório",
          "display": {
            "kind": "text"
          }
        }
      ]
    },
    {
      "id": "objeto",
      "label": "Objeto",
      "values": [
        {
          "id": "Corda",
          "label": "Corda",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Faca",
          "label": "Faca",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Frasco",
          "label": "Frasco",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Estatueta",
          "label": "Estatueta",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Lanterna",
          "label": "Lanterna",
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
          "id": "16h",
          "label": "16h",
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
        },
        {
          "id": "20h",
          "label": "20h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "22h",
          "label": "22h",
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
    "prompt": "O legista fixou a morte por volta das 14h, e a claquete caída marcava o set onde o corpo foi achado: Refeitório.",
    "evidence": [
      {
        "cat": "cena",
        "value": "Refeitorio"
      },
      {
        "cat": "hora",
        "value": "14h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Diretor não portava Corda.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Corda",
          "pos": 0
        }
      ]
    },
    {
      "id": "c2",
      "text": "Produtora estava em Camarim.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "cena",
          "value": "Camarim",
          "pos": 4
        }
      ]
    },
    {
      "id": "c3",
      "text": "Produtora apareceu às 18h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "18h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c4",
      "text": "Quem estava em Ilha de edição também apareceu às 22h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "cena",
            "value": "Ilha de edicao"
          },
          "b": {
            "cat": "hora",
            "value": "22h"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "Quem estava em Estúdio A também portava Frasco.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "cena",
            "value": "Estudio A"
          },
          "b": {
            "cat": "objeto",
            "value": "Frasco"
          }
        }
      ]
    },
    {
      "id": "c6",
      "text": "Produtora não portava Corda.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Corda",
          "pos": 4
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem estava em Backlot também portava Lanterna.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "cena",
            "value": "Backlot"
          },
          "b": {
            "cat": "objeto",
            "value": "Lanterna"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Roteirista não estava em Estúdio A.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "cena",
          "value": "Estudio A",
          "pos": 3
        }
      ]
    },
    {
      "id": "c9",
      "text": "Quem portava Frasco também apareceu às 20h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Frasco"
          },
          "b": {
            "cat": "hora",
            "value": "20h"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "Quem portava Lanterna também apareceu às 16h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Lanterna"
          },
          "b": {
            "cat": "hora",
            "value": "16h"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "Diretor não portava Frasco.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Frasco",
          "pos": 0
        }
      ]
    },
    {
      "id": "c12",
      "text": "Atriz estava em Ilha de edição.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "cena",
          "value": "Ilha de edicao",
          "pos": 1
        }
      ]
    },
    {
      "id": "c13",
      "text": "Atriz portava Faca.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Faca",
          "pos": 1
        }
      ]
    }
  ]
};
