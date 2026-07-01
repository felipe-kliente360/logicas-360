// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "parque-de-diversoes",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Terror no parque de diversões",
  "story": "As luzes do parque foram se apagando uma a uma depois que o último cliente cruzou a catraca. No silêncio recém-nascido, entre atrações que ainda balançavam sozinhas, o dono foi encontrado sem vida ao pé de uma delas. Quatro funcionários fechavam o expediente naquela madrugada — cada qual recolhido a uma atração, com um objeto nas mãos e um horário anotado no ponto. A noite guardou os passos de todos eles.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Operador",
      "Bilheteira",
      "Mecânico",
      "Zelador"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Atração",
      "values": [
        {
          "id": "Roda-gigante",
          "label": "Roda-gigante",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Carrossel",
          "label": "Carrossel",
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
          "id": "Tunel do terror",
          "label": "Túnel do terror",
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
          "id": "Chave inglesa",
          "label": "Chave inglesa",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ingresso",
          "label": "Ingresso",
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
        },
        {
          "id": "Corda",
          "label": "Corda",
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
    "prompt": "Sob as cabines paradas da Roda-gigante repousava o corpo, e a perícia cravou nas 22h o instante em que o coração se calou.",
    "evidence": [
      {
        "cat": "local",
        "value": "Roda-gigante"
      },
      {
        "cat": "hora",
        "value": "22h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "As mãos que seguravam a Chave inglesa já haviam deixado o parque antes das 23h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Chave inglesa"
          },
          "b": {
            "cat": "hora",
            "value": "23h"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Na Bilheteria, nenhuma Chave inglesa foi vista repousando sobre o balcão.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Bilheteria"
          },
          "b": {
            "cat": "objeto",
            "value": "Chave inglesa"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quem se embrenhou no Túnel do terror teve o ponto registrado às 21h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Tunel do terror"
          },
          "b": {
            "cat": "hora",
            "value": "21h"
          }
        }
      ]
    },
    {
      "id": "c4",
      "text": "A Bilheteira, curiosamente, não tinha um único Ingresso consigo.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Ingresso",
          "pos": 1
        }
      ]
    },
    {
      "id": "c5",
      "text": "O Zelador passou o fim da noite recolhido ao Túnel do terror.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Tunel do terror",
          "pos": 3
        }
      ]
    },
    {
      "id": "c6",
      "text": "Nas mãos do Mecânico não havia Lanterna alguma.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Lanterna",
          "pos": 2
        }
      ]
    },
    {
      "id": "c7",
      "text": "O facho da Lanterna cortou o breu na mesma pessoa que bateu o ponto às 20h.",
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
            "value": "20h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "O Zelador carregava uma Corda enrolada ao ombro.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Corda",
          "pos": 3
        }
      ]
    },
    {
      "id": "c9",
      "text": "A Bilheteira também não portava Lanterna nenhuma.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Lanterna",
          "pos": 1
        }
      ]
    },
    {
      "id": "c10",
      "text": "Junto ao Carrossel de cavalos imóveis, o ponto marcava 20h para quem ali estava.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Carrossel"
          },
          "b": {
            "cat": "hora",
            "value": "20h"
          }
        }
      ]
    }
  ]
};
