// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "estacao-de-esqui",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Neve vermelha",
  "story": "A nevasca fechou a estrada ao meio-dia e, quando a noite caiu, o resort de esqui já era uma ilha branca cercada de vento. Foi nesse cerco de neve que encontraram a herdeira sem vida, e a tempestade prendeu quatro hóspedes entre as paredes de madeira e o silêncio dos abismos. Cada um jura ter passado a tarde num lugar diferente da montanha, empunhando um objeto qualquer, numa hora que ninguém mais confirma. Enquanto o gelo range lá fora, resta cruzar esses relatos.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Instrutor",
      "Herdeira",
      "Guia",
      "Recepcionista"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Local",
      "values": [
        {
          "id": "Teleferico",
          "label": "Teleférico",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Chale",
          "label": "Chalé",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Pista",
          "label": "Pista",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Lareira",
          "label": "Lareira",
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
          "id": "Bastao",
          "label": "Bastão",
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
        },
        {
          "id": "Cachecol",
          "label": "Cachecol",
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
        }
      ]
    },
    {
      "id": "hora",
      "label": "Horário",
      "values": [
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
        },
        {
          "id": "19h",
          "label": "19h",
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
    "prompt": "Sob a luz fraca das lanternas, a perícia estabeleceu a hora da morte às 18h. O corpo, meio coberto pela neve recente, jazia na Pista.",
    "evidence": [
      {
        "cat": "local",
        "value": "Pista"
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
      "text": "Nenhuma corda foi vista nas mãos de quem se abrigava no Chalé.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Chale"
          },
          "b": {
            "cat": "objeto",
            "value": "Corda"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "O Instrutor garante que não pôs os pés no Teleférico naquela tarde.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Teleferico",
          "pos": 0
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quem carregava a corda não foi avistado por ninguém às 17h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Corda"
          },
          "b": {
            "cat": "hora",
            "value": "17h"
          }
        }
      ]
    },
    {
      "id": "c4",
      "text": "No bolso do Guia, encontraram o frasco.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Frasco",
          "pos": 2
        }
      ]
    },
    {
      "id": "c5",
      "text": "O cachecol, seja de quem for, não pertencia ao Instrutor.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Cachecol",
          "pos": 0
        }
      ]
    },
    {
      "id": "c6",
      "text": "O frasco não estava com quem se recolheu ao Chalé.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Chale"
          },
          "b": {
            "cat": "objeto",
            "value": "Frasco"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "A corda não era da Herdeira.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Corda",
          "pos": 1
        }
      ]
    },
    {
      "id": "c8",
      "text": "Aquele que trazia o cachecol foi o mesmo visto às 19h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Cachecol"
          },
          "b": {
            "cat": "hora",
            "value": "19h"
          }
        }
      ]
    },
    {
      "id": "c9",
      "text": "Junto à Lareira, quem ali esteve trazia o cachecol.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Lareira"
          },
          "b": {
            "cat": "objeto",
            "value": "Cachecol"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "Às 16h, ninguém pôde situar o Instrutor em parte alguma.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "16h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c11",
      "text": "A Herdeira não foi vista às 19h.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "19h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c12",
      "text": "Tampouco às 16h alguém cruzou com a Herdeira.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "16h",
          "pos": 1
        }
      ]
    }
  ]
};
