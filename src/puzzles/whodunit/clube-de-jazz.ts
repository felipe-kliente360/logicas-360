// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "clube-de-jazz",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Blues de meia-noite",
  "story": "A fumaça ainda pairava sobre as mesas quando o último acorde morreu e as luzes da casa se acenderam de uma vez. Ali, entre o cheiro de uísque e cinza fria, o dono do clube jazia sem vida — o homem que assinava os contratos e contava a bilheteria não veria o amanhecer. Quatro artistas haviam fechado a noite naquele salão esfumaçado: a Cantora, o Pianista, o Barman e o Empresário. Cada um ocupara um canto da casa, cada um trazia consigo um objeto, e cada um tem uma hora certa a explicar naquela madrugada de blues.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Cantora",
      "Pianista",
      "Barman",
      "Empresário"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Local",
      "values": [
        {
          "id": "Palco",
          "label": "Palco",
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
          "id": "Bar",
          "label": "Bar",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Mezanino",
          "label": "Mezanino",
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
          "id": "Microfone",
          "label": "Microfone",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Copo",
          "label": "Copo",
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
          "id": "Isqueiro",
          "label": "Isqueiro",
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
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo do legista crava a hora da morte na batida das 01h, quando a casa já cochilava entre um número e outro. O corpo foi recolhido junto ao Bar, caído sobre o balcão de mogno onde as garrafas ainda reluziam à meia-luz.",
    "evidence": [
      {
        "cat": "local",
        "value": "Bar"
      },
      {
        "cat": "hora",
        "value": "01h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "No recolhimento do Camarim, entre plumas e espelhos embaçados, nenhum Copo foi encontrado nas mãos de quem ali se recolhera.",
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
            "value": "Copo"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Por mais que o holofote a procurasse, a Cantora jura que naquela hora não pisara o Palco.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Palco",
          "pos": 0
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quem carregava o Copo pela casa não é a mesma pessoa que foi vista quando o relógio marcou 00h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Copo"
          },
          "b": {
            "cat": "hora",
            "value": "00h"
          }
        }
      ]
    },
    {
      "id": "c4",
      "text": "O Barman trazia sempre um Isqueiro no bolso do colete, pronto para acender o cigarro de qualquer freguês.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Isqueiro",
          "pos": 2
        }
      ]
    },
    {
      "id": "c5",
      "text": "Fumaça a Cantora detestava, e nenhum Charuto lhe pesou os dedos naquela madrugada.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Charuto",
          "pos": 0
        }
      ]
    },
    {
      "id": "c6",
      "text": "No mesmo Camarim, à luz trêmula das lâmpadas, quem ali se abrigava não tinha consigo Isqueiro algum.",
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
            "value": "Isqueiro"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "As mãos do Pianista pertenciam às teclas, não ao balcão: nenhum Copo esteve entre os dedos dele.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Copo",
          "pos": 1
        }
      ]
    },
    {
      "id": "c8",
      "text": "A mesma mão que segurava o Charuto foi a que apareceu na casa às 02h, quando a noite já se arrastava.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Charuto"
          },
          "b": {
            "cat": "hora",
            "value": "02h"
          }
        }
      ]
    },
    {
      "id": "c9",
      "text": "Do Mezanino, debruçado sobre o parapeito na penumbra, quem observava o salão era justamente quem trazia o Charuto.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Mezanino"
          },
          "b": {
            "cat": "objeto",
            "value": "Charuto"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "Às 23h, quando a casa esquentava, a Cantora ainda não havia surgido em parte alguma.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "23h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quando o relógio bateu 02h, o Pianista já não figurava em canto nenhum da casa.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "02h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c12",
      "text": "E lá pelas 23h tampouco havia sinal do Pianista rondando o salão.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "23h",
          "pos": 1
        }
      ]
    }
  ]
};
