// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "escavacao-arqueologica",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "A maldição da tumba",
  "story": "A areia ainda guardava o calor das tochas quando o sítio recém-aberto amanheceu em silêncio: o chefe da escavação jazia diante da tumba lacrada, os olhos voltados para a soleira de pedra que ninguém deveria ter tocado. Os locais murmuravam sobre a maldição que dorme sob as dunas, mas as marcas no chão contavam de mãos vivas. Cinco integrantes da expedição rondavam as ruínas naquela manhã — o Arqueólogo, a Financiadora, o Guia, a Fotógrafa e o Capataz —, e cada um deles esteve num ponto do sítio, empunhando um objeto, sob um horário certo do relógio. Entre a poeira e as sombras das galerias, um deles cruzou a linha que separa a escavação do túmulo.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Arqueólogo",
      "Financiadora",
      "Guia",
      "Fotógrafa",
      "Capataz"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Ponto",
      "values": [
        {
          "id": "Tumba",
          "label": "Tumba",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Acampamento",
          "label": "Acampamento",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Poco",
          "label": "Poço",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Tenda",
          "label": "Tenda",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Galeria",
          "label": "Galeria",
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
          "id": "Pá",
          "label": "Pá",
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
        },
        {
          "id": "Faca",
          "label": "Faca",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Pincel",
          "label": "Pincel",
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
          "id": "10h",
          "label": "10h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "11h",
          "label": "11h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "12h",
          "label": "12h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "13h",
          "label": "13h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "14h",
          "label": "14h",
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
    "prompt": "O laudo pericial situa a morte às 14h, sob o sol alto do deserto. O corpo do chefe da escavação foi encontrado diante da Tumba, na soleira lacrada das ruínas.",
    "evidence": [
      {
        "cat": "local",
        "value": "Tumba"
      },
      {
        "cat": "hora",
        "value": "14h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Nas sombras da Galeria, quem lá se embrenhou levava consigo a Faca.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Galeria"
          },
          "b": {
            "cat": "objeto",
            "value": "Faca"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Junto ao Poço, quem por ali baixou empunhava a Pá.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Poco"
          },
          "b": {
            "cat": "objeto",
            "value": "Pá"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "O Capataz não arredou pé do Acampamento.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Acampamento",
          "pos": 4
        }
      ]
    },
    {
      "id": "c4",
      "text": "O Guia foi visto em seu posto ao soar das 12h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "12h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c5",
      "text": "Nas mãos do Guia repousava a Lanterna.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Lanterna",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "A Fotógrafa jamais tocou no Pincel.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Pincel",
          "pos": 3
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem manejava o Pincel não estava por ali às 11h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Pincel"
          },
          "b": {
            "cat": "hora",
            "value": "11h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Nenhum Pincel foi visto nas mãos de quem permaneceu no Acampamento.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Acampamento"
          },
          "b": {
            "cat": "objeto",
            "value": "Pincel"
          }
        }
      ]
    },
    {
      "id": "c9",
      "text": "A Financiadora carregava a Pá, para surpresa de todos.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Pá",
          "pos": 1
        }
      ]
    },
    {
      "id": "c10",
      "text": "Quem se enfiou na Galeria não foi flagrado ali às 11h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Galeria"
          },
          "b": {
            "cat": "hora",
            "value": "11h"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "O Guia se abrigava na Tenda.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Tenda",
          "pos": 2
        }
      ]
    },
    {
      "id": "c12",
      "text": "Ao descer ao Poço, essa mesma pessoa marcava as 13h no relógio.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Poco"
          },
          "b": {
            "cat": "hora",
            "value": "13h"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "O Arqueólogo não deu as caras às 10h.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "10h",
          "pos": 0
        }
      ]
    }
  ]
};
