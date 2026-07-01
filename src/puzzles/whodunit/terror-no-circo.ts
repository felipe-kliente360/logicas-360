// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "terror-no-circo",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Terror no circo",
  "story": "Estreia esgotada, refletores acesos — e então o trapezista principal despencou da altura da lona, sem rede, diante de todos. A perícia foi curta e brutal: não houve acidente. Naquela noite, cinco artistas rondavam a trupe, cada um ancorado num canto do picadeiro, empunhando um objeto, marcado por um horário. Remonte quem esteve onde, com o quê e a que hora — e o nome que sobrar na lona é o do assassino.",
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
    "prompt": "O laudo não deixa margem: a queda fatal deu-se às 23h, quando o público já se retirava, e o corpo foi recolhido caído no Picadeiro, sob a serragem batida pelos refletores. Fixe esses dois fatos e reconstrua o resto da noite em torno deles.",
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
      "text": "Nas tábuas vazias da Arquibancada, ficou o cheiro adocicado de fumo: quem se sentou ali trazia consigo o Charuto.",
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
      "text": "Junto às grades da Jaula, entre o bafo das feras, havia uma Corda enrolada — e ela pertencia a quem lá esteve.",
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
      "text": "O Ilusionista jurou não ter deixado o Camarim, trancado entre espelhos e cartazes desbotados.",
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
      "text": "A Domadora só foi vista em cena às 21h, quando o relógio da bilheteria batia a hora.",
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
      "text": "Presa à cintura da Domadora, reluzia uma Faca — arma de ofício, dizia ela.",
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
      "text": "Nas mãos flexíveis do Contorcionista, nenhuma Lanterna — disso os assistentes tinham certeza.",
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
      "text": "O facho da Lanterna não cortou a escuridão às 20h: quem a segurava não estava em cena naquela hora.",
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
      "text": "No Camarim havia luz de sobra dos espelhos; ninguém ali precisou de uma Lanterna, nem a portava.",
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
      "text": "Sob a capa do Mágico, escondida como num truque, estava enrolada a Corda.",
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
      "text": "Às 20h, as fileiras da Arquibancada seguiam desertas de artistas: quem por lá andou, andou em outra hora.",
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
      "text": "A Domadora foi flagrada na Bilheteria, longe das feras, entre canhotos de ingresso.",
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
      "text": "O rosnar das feras na Jaula marcou as 22h: quem esteve entre as grades, esteve nessa hora.",
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
      "text": "Às 19h, quando a lona abriu, o Palhaço ainda não havia surgido em parte alguma.",
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
