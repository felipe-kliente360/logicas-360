// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "terror-no-circo",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Terror no circo",
  "story": "Na noite de estreia, o trapezista principal despencou — e a perícia garante que não foi acidente. Cinco artistas circulavam pela lona, cada um num ponto do picadeiro, com um objeto, num horário. Reconstrua a noite inteira e veja quem sobra.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Palhaço",
      "Mágico",
      "Domadora",
      "Contorcionista",
      "Ilusionista"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Local",
      "values": [
        {
          "id": "Picadeiro",
          "label": "Picadeiro",
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
          "id": "Jaula",
          "label": "Jaula",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Bilheteria",
          "label": "Bilheteria",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Arquibancada",
          "label": "Arquibancada",
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
          "id": "Adaga",
          "label": "Adaga",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Charuto",
          "label": "Charuto",
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
          "id": "19h",
          "label": "19h",
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
          "id": "21h",
          "label": "21h",
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
        },
        {
          "id": "23h",
          "label": "23h",
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
    "prompt": "A perícia cravou a hora da queda às 23h, e o corpo foi encontrado em Picadeiro.",
    "evidence": [
      {
        "cat": "local",
        "value": "Picadeiro"
      },
      {
        "cat": "hora",
        "value": "23h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem estava em Arquibancada também portava Charuto.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Arquibancada"
          },
          "b": {
            "cat": "objeto",
            "value": "Charuto"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Quem estava em Jaula também portava Corda.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Jaula"
          },
          "b": {
            "cat": "objeto",
            "value": "Corda"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "Ilusionista estava em Camarim.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Camarim",
          "pos": 4
        }
      ]
    },
    {
      "id": "c4",
      "text": "Domadora apareceu às 21h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "21h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c5",
      "text": "Domadora portava Faca.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Faca",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "Contorcionista não portava Lanterna.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Lanterna",
          "pos": 3
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem portava Lanterna não apareceu às 20h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Lanterna"
          },
          "b": {
            "cat": "hora",
            "value": "20h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Quem estava em Camarim não portava Lanterna.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Camarim"
          },
          "b": {
            "cat": "objeto",
            "value": "Lanterna"
          }
        }
      ]
    },
    {
      "id": "c9",
      "text": "Mágico portava Corda.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Corda",
          "pos": 1
        }
      ]
    },
    {
      "id": "c10",
      "text": "Quem estava em Arquibancada não apareceu às 20h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Arquibancada"
          },
          "b": {
            "cat": "hora",
            "value": "20h"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "Domadora estava em Bilheteria.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Bilheteria",
          "pos": 2
        }
      ]
    },
    {
      "id": "c12",
      "text": "Quem estava em Jaula também apareceu às 22h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Jaula"
          },
          "b": {
            "cat": "hora",
            "value": "22h"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "Palhaço não apareceu às 19h.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "19h",
          "pos": 0
        }
      ]
    }
  ]
};
