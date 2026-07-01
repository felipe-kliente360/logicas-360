// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "base-antartida",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Gelo mortal",
  "story": "O inverno polar selou a base como uma tampa de chumbo: sem voos, sem resgate, apenas o uivo do vento raspando o metal e a noite de seis meses lá fora. Cinco pesquisadores sobraram na estação, e ao romper do turno um deles não acordou. Cada sobrevivente passou aquelas horas confinado num setor da base, com algum objeto ao alcance da mão, num momento preciso da longa madrugada. Ninguém entrou; ninguém saiu. O frio guardou tudo — os passos, os silêncios, as mentiras — e agora resta destrinchar quem esteve onde, com o quê, e a que hora.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Glaciologista",
      "Médico",
      "Cozinheira",
      "Piloto",
      "Radialista"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Setor",
      "values": [
        {
          "id": "Laboratorio",
          "label": "Laboratório",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Enfermaria",
          "label": "Enfermaria",
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
          "id": "Hangar",
          "label": "Hangar",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Torre",
          "label": "Torre",
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
          "id": "Picareta",
          "label": "Picareta",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Bisturi",
          "label": "Bisturi",
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
          "id": "Cabo",
          "label": "Cabo",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sinalizador",
          "label": "Sinalizador",
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
        },
        {
          "id": "00h",
          "label": "00h",
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
    "prompt": "Sob a luz crua da lâmpada de emergência, o exame do corpo estabeleceu a hora da morte às 22h. O cadáver jazia no Hangar, entre as carcaças congeladas das aeronaves imobilizadas pelo inverno.",
    "evidence": [
      {
        "cat": "local",
        "value": "Hangar"
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
      "text": "Nas mãos do Médico, enrolado como um garrote, encontrava-se o Cabo.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Cabo",
          "pos": 1
        }
      ]
    },
    {
      "id": "c2",
      "text": "Fosse qual fosse o refúgio da Cozinheira naquela madrugada, não era o Laboratório.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Laboratorio",
          "pos": 2
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quem se refugiou na Torre foi a mesma pessoa que os registros situam às 20h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Torre"
          },
          "b": {
            "cat": "hora",
            "value": "20h"
          }
        }
      ]
    },
    {
      "id": "c4",
      "text": "Quem carregava o Bisturi e quem foi visto à meia-noite, às 00h, eram pessoas distintas.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Bisturi"
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
      "text": "A Faca, por mais óbvia que parecesse, não pertencia à Cozinheira naquela noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Faca",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "Tampouco o Glaciologista tinha consigo a Faca.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Faca",
          "pos": 0
        }
      ]
    },
    {
      "id": "c7",
      "text": "O relógio de bordo marcava 20h quando o Piloto foi registrado.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "20h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c8",
      "text": "Era a Picareta que o Piloto empunhava, o gelo ainda agarrado à ponta de metal.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Picareta",
          "pos": 3
        }
      ]
    },
    {
      "id": "c9",
      "text": "O portador do Bisturi não coincidia com a figura anotada às 21h; eram dois nomes diferentes.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Bisturi"
          },
          "b": {
            "cat": "hora",
            "value": "21h"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "O Médico se manteve na Enfermaria, entre frascos e o zumbido do gerador.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Enfermaria",
          "pos": 1
        }
      ]
    },
    {
      "id": "c11",
      "text": "Às 21h, o nome anotado no diário era o do Glaciologista.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "21h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c12",
      "text": "Às 23h, seja lá onde estivesse, não foi a Cozinheira quem os registros apontaram.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "23h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c13",
      "text": "A pessoa que ocupava a Cozinha é a mesma que consta às 00h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Cozinha"
          },
          "b": {
            "cat": "hora",
            "value": "00h"
          }
        }
      ]
    }
  ]
};
