// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "sao-lourenco-lago",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Segredos no lago",
  "story": "São Lourenço, joia mineira do Circuito das Águas, oferecia naquele fim de tarde a sua melhor máscara: o Parque das Águas aceso a lampiões, uma soirée de verão vestida à maneira da Belle Époque, valsas escorrendo dos coretos e pedalinhos deslizando sobre o espelho parado do lago. Foi ali, à sombra da Ilha dos Amores, que a silhueta pálida da rica Baronesa surgiu boiando entre os nenúfares — a anfitriã de todas as festas, subitamente imóvel. Cinco convidados circulavam com trânsito livre pelo parque, cada qual num recanto, com um objeto nas mãos e a uma hora bem precisa. Resta cruzar o local, o objeto e o horário de cada um até que, das cortesias e dos álibis, sobre um único rosto sem para onde fugir.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Barqueiro",
      "Cantora",
      "Coronel",
      "Jornalista",
      "Jardineiro"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Local",
      "values": [
        {
          "id": "Lago",
          "label": "Lago",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ilha dos Amores",
          "label": "Ilha dos Amores",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Vaporario",
          "label": "Vaporário",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Jardim Japones",
          "label": "Jardim Japonês",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Coreto",
          "label": "Coreto",
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
          "id": "Remo",
          "label": "Remo",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sombrinha",
          "label": "Sombrinha",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Taca",
          "label": "Taça",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Camera",
          "label": "Câmera",
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
          "id": "15h",
          "label": "15h",
          "display": {
            "kind": "text"
          }
        },
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
    "prompt": "O laudo do legista foi lacônico: a Baronesa deixou de respirar por volta das 16h, e o corpo foi recolhido das águas mornas do Vaporário.",
    "evidence": [
      {
        "cat": "local",
        "value": "Vaporario"
      },
      {
        "cat": "hora",
        "value": "16h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Fosse quem fosse que se demorou no Coreto, não trazia consigo a Câmera.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Coreto"
          },
          "b": {
            "cat": "objeto",
            "value": "Camera"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Quem pisou a Ilha dos Amores levava, aberta contra o sereno, a Sombrinha.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Ilha dos Amores"
          },
          "b": {
            "cat": "objeto",
            "value": "Sombrinha"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "O Barqueiro não desgrudou do Lago em toda a soirée.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Lago",
          "pos": 0
        }
      ]
    },
    {
      "id": "c4",
      "text": "Às 15h, o Jornalista ainda não havia dado as caras.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "15h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c5",
      "text": "Foi às 18h que se avistou o Barqueiro.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "18h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c6",
      "text": "A Cantora trazia a Câmera a tiracolo.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Camera",
          "pos": 1
        }
      ]
    },
    {
      "id": "c7",
      "text": "O Jornalista, esse, em momento algum se aproximou do Coreto.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Coreto",
          "pos": 3
        }
      ]
    },
    {
      "id": "c8",
      "text": "A Cantora foi vista entre as pontes do Jardim Japonês.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Jardim Japones",
          "pos": 1
        }
      ]
    },
    {
      "id": "c9",
      "text": "Às 19h, já não restava sinal do Barqueiro.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "19h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c10",
      "text": "O Jardineiro cumpriu sua ronda pontualmente às 17h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "17h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c11",
      "text": "A Corda — que a todos pareceu, de pronto, a mais óbvia das armas — pendia das mãos de quem só surgiu às 19h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Corda"
          },
          "b": {
            "cat": "hora",
            "value": "19h"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Na mão do Jornalista repousava uma Taça.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Taca",
          "pos": 3
        }
      ]
    }
  ],
  "baseRaw": 5.500171079680357
};
