// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "sabotagem-submarino",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Sabotagem no submarino",
  "story": "A 200 metros de profundidade, um oficial foi achado sem vida e um sistema vital sabotado na mesma vigília. Cinco tripulantes tinham acesso aos compartimentos — cada um num setor, com um objeto, num horário, movido por um motivo. Reconstrua o turno inteiro e veja quem sobra.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Comandante",
      "Sonarista",
      "Cozinheiro",
      "Médica",
      "Maquinista"
    ]
  },
  "categories": [
    {
      "id": "setor",
      "label": "Setor",
      "values": [
        {
          "id": "Torpedos",
          "label": "Torpedos",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sonar",
          "label": "Sonar",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cozinha",
          "label": "Cozinha",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Reator",
          "label": "Reator",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Comando",
          "label": "Comando",
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
          "id": "Chave",
          "label": "Chave",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cabo de aco",
          "label": "Cabo de aço",
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
          "id": "22h",
          "label": "22h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "23h",
          "label": "23h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "00h",
          "label": "00h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "01h",
          "label": "01h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "02h",
          "label": "02h",
          "display": {
            "kind": "text"
          }
        }
      ]
    },
    {
      "id": "motivo",
      "label": "Motivo",
      "values": [
        {
          "id": "Motim",
          "label": "Motim",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Espionagem",
          "label": "Espionagem",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Vinganca",
          "label": "Vingança",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sabotagem",
          "label": "Sabotagem",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Segredo",
          "label": "Segredo",
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
    "prompt": "O laudo é taxativo: a morte foi às 01h, o ponto de sabotagem foi Cozinha, e o estopim foi segredo.",
    "evidence": [
      {
        "cat": "setor",
        "value": "Cozinha"
      },
      {
        "cat": "hora",
        "value": "01h"
      },
      {
        "cat": "motivo",
        "value": "Segredo"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem portava Chave não agiu por Motim.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Chave"
          },
          "b": {
            "cat": "motivo",
            "value": "Motim"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Comandante estava no Reator.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "setor",
          "value": "Reator",
          "pos": 0
        }
      ]
    },
    {
      "id": "c3",
      "text": "Médica apareceu às 22h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "22h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c4",
      "text": "Quem portava Chave não apareceu às 00h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Chave"
          },
          "b": {
            "cat": "hora",
            "value": "00h"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "Comandante não portava Cabo de aço.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Cabo de aco",
          "pos": 0
        }
      ]
    },
    {
      "id": "c6",
      "text": "Quem portava Corda também agiu por Espionagem.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Corda"
          },
          "b": {
            "cat": "motivo",
            "value": "Espionagem"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem estava no Torpedos também portava Faca.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "setor",
            "value": "Torpedos"
          },
          "b": {
            "cat": "objeto",
            "value": "Faca"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Cozinheiro portava Chave.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Chave",
          "pos": 2
        }
      ]
    },
    {
      "id": "c9",
      "text": "Médica estava no Sonar.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "setor",
          "value": "Sonar",
          "pos": 3
        }
      ]
    },
    {
      "id": "c10",
      "text": "Sonarista agiu por Sabotagem.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Sabotagem",
          "pos": 1
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quem estava no Comando também agiu por Espionagem.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "setor",
            "value": "Comando"
          },
          "b": {
            "cat": "motivo",
            "value": "Espionagem"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Comandante apareceu às 23h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "23h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c13",
      "text": "Quem apareceu às 02h também agiu por Sabotagem.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "hora",
            "value": "02h"
          },
          "b": {
            "cat": "motivo",
            "value": "Sabotagem"
          }
        }
      ]
    },
    {
      "id": "c14",
      "text": "Quem apareceu às 23h também agiu por Vingança.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "hora",
            "value": "23h"
          },
          "b": {
            "cat": "motivo",
            "value": "Vinganca"
          }
        }
      ]
    }
  ]
};
