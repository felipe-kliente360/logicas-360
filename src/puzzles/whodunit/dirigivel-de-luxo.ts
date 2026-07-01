// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "dirigivel-de-luxo",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Tragédia nas alturas",
  "story": "O grande zepelim deslizava sobre o Atlântico como um charuto de prata suspenso na noite, e lá dentro o veludo bordô, os lustres de cristal e o jazz abafado fingiam que nada podia dar errado a três mil metros de altura. Fingiram até que um passageiro ilustre foi encontrado sem vida, e o luxo art déco de repente cheirou a medo. Cinco figuras haviam cruzado os corredores da aeronave naquela travessia — cada uma ancorada num setor, cada qual empunhando um objeto, todas marcadas por um horário no relógio de bordo e movidas por um motivo que carregavam calado sob os casacos de gala. Entre o comandante, a aristocrata, o engenheiro, a cantora e o comissário, um deles mente enquanto o dirigível continua rumo ao horizonte.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Comandante",
      "Aristocrata",
      "Engenheiro",
      "Cantora",
      "Comissário"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Setor",
      "values": [
        {
          "id": "Gondola",
          "label": "Gôndola",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Salao",
          "label": "Salão",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Casa de maquinas",
          "label": "Casa de máquinas",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cabine",
          "label": "Cabine",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Convés",
          "label": "Convés",
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
          "id": "Chave",
          "label": "Chave",
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
          "id": "Cabo",
          "label": "Cabo",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ancora",
          "label": "Âncora",
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
    },
    {
      "id": "motivo",
      "label": "Motivo",
      "values": [
        {
          "id": "Espionagem",
          "label": "Espionagem",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Heranca",
          "label": "Herança",
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
    "prompt": "O laudo do médico de bordo não deixa margem: o coração parou às 20h em ponto, quando os relógios ainda marcavam o começo da noite. O corpo foi tombado no Convés, sob o vento gelado da altitude, longe do calor dos salões. E o estopim, sussurra o legista entre uma anotação e outra, foi um segredo — algo que a vítima sabia e que alguém precisava enterrar no meio do oceano.",
    "evidence": [
      {
        "cat": "local",
        "value": "Convés"
      },
      {
        "cat": "hora",
        "value": "20h"
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
      "text": "O engenheiro jura que jamais pôs os pés na Cabine naquela noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Cabine",
          "pos": 2
        }
      ]
    },
    {
      "id": "c2",
      "text": "Uma velha conta a acertar movia o comissário: era a Vingança que ardia por trás de seu sorriso de serviço.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Vinganca",
          "pos": 4
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quando o relógio de bordo bateu as 22h, o engenheiro não foi visto por vivalma.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "22h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c4",
      "text": "Nas mãos que empunhavam a Âncora pesava também a Sabotagem — eram uma só pessoa.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Ancora"
          },
          "b": {
            "cat": "motivo",
            "value": "Sabotagem"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "O brilho do Salão não testemunhou o engenheiro: ali ele não esteve.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Salao",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "Seja lá o que movia o engenheiro, não era Espionagem — disso ele se defende.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "motivo",
          "value": "Espionagem",
          "pos": 2
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem se demorava no Salão trazia consigo o Cabo — a mesma figura, o mesmo par de mãos.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Salao"
          },
          "b": {
            "cat": "objeto",
            "value": "Cabo"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "A Âncora não passou pelas mãos do engenheiro em nenhum momento.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Ancora",
          "pos": 2
        }
      ]
    },
    {
      "id": "c9",
      "text": "A aristocrata surgiu quando os ponteiros marcavam 23h, taça em riste e olhar de gelo.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "23h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c10",
      "text": "O comandante permaneceu na Gôndola, os olhos fixos no vazio negro além dos vidros.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Gondola",
          "pos": 0
        }
      ]
    },
    {
      "id": "c11",
      "text": "A Corda estava em outras mãos que não as de quem ocupava a Gôndola — dois suspeitos distintos.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Gondola"
          },
          "b": {
            "cat": "objeto",
            "value": "Corda"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Nas entranhas ruidosas da Casa de máquinas movia-se quem carregava a Sabotagem no peito — uma única pessoa.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Casa de maquinas"
          },
          "b": {
            "cat": "motivo",
            "value": "Sabotagem"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "No bolso do comissário tilintava a Chave, sempre à mão como convém a quem serve.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Chave",
          "pos": 4
        }
      ]
    },
    {
      "id": "c14",
      "text": "À meia-noite, quando o relógio marcava 00h, o comandante ainda velava o rumo da nave.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "00h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c15",
      "text": "Era a Herança, e a cobiça que ela desperta, o que guiava os passos da aristocrata.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Heranca",
          "pos": 1
        }
      ]
    },
    {
      "id": "c16",
      "text": "Aquele que circulava às 21h trazia a Sabotagem por bandeira — a mesma alma nos dois registros.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "hora",
            "value": "21h"
          },
          "b": {
            "cat": "motivo",
            "value": "Sabotagem"
          }
        }
      ]
    }
  ]
};
