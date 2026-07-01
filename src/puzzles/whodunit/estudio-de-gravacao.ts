// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "estudio-de-gravacao",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Faixa final",
  "story": "A última sessão devia fechar o disco. Em vez disso, a madrugada fechou sobre o corpo do vocalista, largado no chão do estúdio de gravação, entre pedestais tombados e cabos que ainda zumbiam na mesa. Lá fora, a chuva riscava o vidro do controle; lá dentro, o cheiro de cigarro velho e amplificador quente insistia em não sair do ar. Cinco nomes constavam na ficha daquela noite — o Baixista, o Produtor, o Tecladista, a Empresária e o próprio morto —, e uma banda que há meses vinha se rasgando por dentro, contrato após contrato, take após take fracassado. Cada um deles ocupou um canto daquele labirinto de espuma acústica, empunhou algo que agora pesa como prova e cravou seu nome num horário da noite. A fita rodou até o fim. Alguém sabia que rodaria.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Vocalista",
      "Baixista",
      "Produtor",
      "Tecladista",
      "Empresária"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Local",
      "values": [
        {
          "id": "Estudio",
          "label": "Estúdio",
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
          "id": "Controle",
          "label": "Controle",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Lounge",
          "label": "Lounge",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Deposito",
          "label": "Depósito",
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
          "id": "Cabo",
          "label": "Cabo",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Baqueta",
          "label": "Baqueta",
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
          "id": "Isqueiro",
          "label": "Isqueiro",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Fita",
          "label": "Fita",
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
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo é seco como o ar-condicionado do lugar: a morte ocorreu às 02h, na hora morta em que só restava o chiado da fita virgem. O corpo do vocalista foi encontrado caído no Estúdio, no piso da sala grande, sob os microfones ainda ligados.",
    "evidence": [
      {
        "cat": "local",
        "value": "Estudio"
      },
      {
        "cat": "hora",
        "value": "02h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem se enfiou no Depósito, entre caixas de fita e velhos flightcases, tinha nas mãos o Isqueiro.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Deposito"
          },
          "b": {
            "cat": "objeto",
            "value": "Isqueiro"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Diante da mesa de som, na sala de Controle, quem ali estava segurava o Cabo.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Controle"
          },
          "b": {
            "cat": "objeto",
            "value": "Cabo"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "A Empresária passou a madrugada trancada na Cabine, longe dos microfones.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Cabine",
          "pos": 4
        }
      ]
    },
    {
      "id": "c4",
      "text": "O relógio marcava 00h quando o Produtor foi visto circulando pela sessão.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "00h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c5",
      "text": "Nas mãos do Produtor havia uma Baqueta, girando entre os dedos como um velho tique.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Baqueta",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "O que quer que o Tecladista trouxesse consigo, não era a Fita.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Fita",
          "pos": 3
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem carregava a Fita não era a mesma pessoa que rondava o estúdio às 23h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Fita"
          },
          "b": {
            "cat": "hora",
            "value": "23h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Na Cabine, ninguém empunhava a Fita — quem lá estava trazia outra coisa nas mãos.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Cabine"
          },
          "b": {
            "cat": "objeto",
            "value": "Fita"
          }
        }
      ]
    },
    {
      "id": "c9",
      "text": "O Baixista tinha um Cabo enrolado no punho, daqueles de conectar instrumento à mesa.",
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
      "id": "c10",
      "text": "Quem se meteu no Depósito não é a pessoa que constava na sessão às 23h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Deposito"
          },
          "b": {
            "cat": "hora",
            "value": "23h"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "O Produtor esticou-se no Lounge, no sofá gasto onde a banda matava o tempo entre os takes.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Lounge",
          "pos": 2
        }
      ]
    },
    {
      "id": "c12",
      "text": "Quem ocupava a sala de Controle ainda estava por lá quando o relógio bateu 01h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Controle"
          },
          "b": {
            "cat": "hora",
            "value": "01h"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "Às 22h, quando a sessão começou, o Vocalista ainda não havia aparecido.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "22h",
          "pos": 0
        }
      ]
    }
  ]
};
