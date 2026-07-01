// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "desfile-de-moda",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Morte na passarela",
  "story": "Os holofotes ainda queimavam a passarela quando o coro de aplausos virou grito: a estrela da temporada, aquela que abriria e fecharia o desfile, jazia imóvel enquanto a trilha seguia tocando no vazio. Sob o cheiro de laquê e cetim, quatro nomes do casting cruzaram a produção naquela noite — a Estilista, a Modelo, o Fotógrafo e a Costureira. Cada um ocupava um ponto da casa, carregava um objeto e foi visto num horário certo. As luzes se apagaram sobre o mistério; cabe a você reacendê-las e desvendar quem selou o último desfile.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Estilista",
      "Modelo",
      "Fotógrafo",
      "Costureira"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Ponto",
      "values": [
        {
          "id": "Passarela",
          "label": "Passarela",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Backstage",
          "label": "Backstage",
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
          "id": "Plateia",
          "label": "Plateia",
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
          "id": "Tesoura",
          "label": "Tesoura",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Alfinete",
          "label": "Alfinete",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Espelho",
          "label": "Espelho",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Salto",
          "label": "Salto",
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
        },
        {
          "id": "20h",
          "label": "20h",
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
    "prompt": "O laudo do legista cravou o horário da morte às 20h, quando a plateia deveria estar de pé em ovação. O corpo, porém, não foi achado nos refletores: repousava entre as poltronas da Plateia, longe do palco que a vítima nunca chegou a pisar naquela hora.",
    "evidence": [
      {
        "cat": "local",
        "value": "Plateia"
      },
      {
        "cat": "hora",
        "value": "20h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "A mão que segurava a Tesoura não era a mesma que foi vista rondando os corredores às 17h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Tesoura"
          },
          "b": {
            "cat": "hora",
            "value": "17h"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Nas mãos da Modelo, ninguém viu qualquer Espelho naquela noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Espelho",
          "pos": 1
        }
      ]
    },
    {
      "id": "c3",
      "text": "Por mais irônico que soe, a Modelo jamais pôs os pés na Passarela durante o desfile.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Passarela",
          "pos": 1
        }
      ]
    },
    {
      "id": "c4",
      "text": "O Salto que rolou pelo chão não pertencia à Estilista — não foi ela quem o carregava.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Salto",
          "pos": 0
        }
      ]
    },
    {
      "id": "c5",
      "text": "Entre os equipamentos do Fotógrafo, brilhava uma Tesoura que era dele, e de mais ninguém.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Tesoura",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "Sob a luz da Passarela, uma única figura desfilava — e era ela, também, quem trazia consigo o Salto.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Passarela"
          },
          "b": {
            "cat": "objeto",
            "value": "Salto"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem quer que carregasse o Espelho, não era a mesma pessoa flagrada pelos corredores às 17h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Espelho"
          },
          "b": {
            "cat": "hora",
            "value": "17h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "E o dono do Espelho tampouco coincidia com a figura registrada nos corredores às 19h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Espelho"
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
      "text": "O Alfinete estava nas mãos de quem, pelas anotações da produção, circulava exatamente às 18h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Alfinete"
          },
          "b": {
            "cat": "hora",
            "value": "18h"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "No Backstage, entre araras e ferros de passar, quem se instalou ali era justamente quem empunhava a Tesoura.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Backstage"
          },
          "b": {
            "cat": "objeto",
            "value": "Tesoura"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "No Camarim, diante do espelho de lâmpadas, a pessoa que ali se recolheu era a mesma que trazia o Alfinete.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Camarim"
          },
          "b": {
            "cat": "objeto",
            "value": "Alfinete"
          }
        }
      ]
    }
  ]
};
