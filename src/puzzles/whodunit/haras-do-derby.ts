// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "haras-do-derby",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Sangue no haras",
  "story": "A névoa ainda subia da grama quando o haras acordou para a véspera do grande derby, e o proprietário — dono das cavalariças e de metade das apostas da região — foi encontrado sem vida junto às baias, o cheiro de feno e sangue misturado no ar frio da madrugada. Quatro figuras do turfe circulavam as instalações naquela manhã, e todas juram inocência: o Jóquei, o Treinador, a Veterinária e o próprio nome do morto no páreo do destino. Cada uma esteve num setor diferente do haras, cada uma trazia consigo um objeto, e cada uma cruzou os portões numa hora distinta entre o primeiro clarão e o sino do treino.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Jóquei",
      "Treinador",
      "Veterinária",
      "Proprietário"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Setor",
      "values": [
        {
          "id": "Baias",
          "label": "Baias",
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
          "id": "Tribuna",
          "label": "Tribuna",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Selaria",
          "label": "Selaria",
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
          "id": "Chicote",
          "label": "Chicote",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ferradura",
          "label": "Ferradura",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Seringa",
          "label": "Seringa",
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
          "id": "06h",
          "label": "06h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "07h",
          "label": "07h",
          "display": {
            "kind": "text"
          }
        },
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
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo pericial situa a hora da morte nas 08h daquela manhã, com o rigor ainda incipiente. O corpo, porém, não jazia junto às baias onde correra o primeiro alarme: foi recolhido na Tribuna vazia, sob as arquibancadas que horas depois se encheriam para o derby.",
    "evidence": [
      {
        "cat": "local",
        "value": "Tribuna"
      },
      {
        "cat": "hora",
        "value": "08h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem pisou a Pista de treino naquela manhã tinha as mãos livres de qualquer Ferradura — essa peça ficou com outra pessoa.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Pista"
          },
          "b": {
            "cat": "objeto",
            "value": "Ferradura"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "O Jóquei jura que nem chegou perto das Baias àquela hora — seu lugar era outro setor do haras.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Baias",
          "pos": 0
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quem carregava a Ferradura não foi visto cruzando os portões às 07h — nesse horário andava por ali outra figura.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Ferradura"
          },
          "b": {
            "cat": "hora",
            "value": "07h"
          }
        }
      ]
    },
    {
      "id": "c4",
      "text": "A Veterinária trazia consigo uma Corda enrolada, dessas que se usam para conter animal assustado.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Corda",
          "pos": 2
        }
      ]
    },
    {
      "id": "c5",
      "text": "A Seringa não pertencia ao Jóquei — instrumento daquele feitio não estava entre seus pertences.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Seringa",
          "pos": 0
        }
      ]
    },
    {
      "id": "c6",
      "text": "Na Pista, quem lá esteve não levava Corda alguma — esse cabo ficou nas mãos de outra pessoa.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Pista"
          },
          "b": {
            "cat": "objeto",
            "value": "Corda"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "O Treinador não segurava Ferradura nenhuma naquela manhã — o ferro estava com outro dos presentes.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Ferradura",
          "pos": 1
        }
      ]
    },
    {
      "id": "c8",
      "text": "A mesma pessoa que trazia a Seringa foi a que só cruzou os portões às 09h, já com o sol alto.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Seringa"
          },
          "b": {
            "cat": "hora",
            "value": "09h"
          }
        }
      ]
    },
    {
      "id": "c9",
      "text": "Quem se demorou na Selaria, entre selas e arreios, era exatamente quem tinha a Seringa em mãos.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Selaria"
          },
          "b": {
            "cat": "objeto",
            "value": "Seringa"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "Às 06h, no primeiro clarão, o Jóquei ainda não havia aparecido no haras.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "06h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c11",
      "text": "Às 09h o Treinador já não estava por ali — àquela hora quem chegava era outro.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "09h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c12",
      "text": "E às 06h tampouco foi o Treinador quem transpôs os portões do haras.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "06h",
          "pos": 1
        }
      ]
    }
  ]
};
