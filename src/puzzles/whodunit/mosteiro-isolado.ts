// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "mosteiro-isolado",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Pecado no mosteiro",
  "story": "Muito antes das matinas, quando a neblina ainda engolia os picos e o sino permanecia mudo, o abade do velho mosteiro cravado nas montanhas foi achado sem vida sobre as lajes frias do claustro. A regra impunha silêncio àquela hora, e cinco religiosos guardavam-no como penitência — cada qual recolhido a um recinto da casa, tendo consigo um único objeto, num momento próprio da madrugada. Nem todos, porém, rezavam. Sob as arcadas úmidas, entre a cera derretida e o eco de passos que ninguém confessa, alguém quebrou mais do que o silêncio naquele amanhecer.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Abade",
      "Noviço",
      "Bibliotecário",
      "Enfermeira",
      "Jardineiro"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Local",
      "values": [
        {
          "id": "Claustro",
          "label": "Claustro",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Biblioteca",
          "label": "Biblioteca",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Capela",
          "label": "Capela",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Refeitorio",
          "label": "Refeitório",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Jardim",
          "label": "Jardim",
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
          "id": "Castical",
          "label": "Castiçal",
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
          "id": "Frasco",
          "label": "Frasco",
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
        }
      ]
    },
    {
      "id": "hora",
      "label": "Horário",
      "values": [
        {
          "id": "03h",
          "label": "03h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "04h",
          "label": "04h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "05h",
          "label": "05h",
          "display": {
            "kind": "text"
          }
        },
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
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O exame do corpo situou o instante da morte por volta das 07h, com a primeira réstia de luz descendo pelas arcadas. O abade jazia no Claustro, estendido sobre as lajes de pedra, onde o frio da madrugada retardara a rigidez dos membros.",
    "evidence": [
      {
        "cat": "local",
        "value": "Claustro"
      },
      {
        "cat": "hora",
        "value": "07h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Aquele que velava no Jardim trazia consigo o Frasco.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Jardim"
          },
          "b": {
            "cat": "objeto",
            "value": "Frasco"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Quem se ajoelhava na Capela levava o Castiçal para iluminar as preces.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Capela"
          },
          "b": {
            "cat": "objeto",
            "value": "Castical"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "O Jardineiro, contra o costume, recolhera-se à Biblioteca naquela madrugada.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Biblioteca",
          "pos": 4
        }
      ]
    },
    {
      "id": "c4",
      "text": "O Bibliotecário foi visto de pé às 05h, quando a escuridão ainda era cerrada.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "05h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c5",
      "text": "Nas mãos do Bibliotecário repousava a Corda.",
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
      "id": "c6",
      "text": "A Enfermeira não trazia a Chave entre seus pertences.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Chave",
          "pos": 3
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem guardava a Chave não é o mesmo que foi visto às 04h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Chave"
          },
          "b": {
            "cat": "hora",
            "value": "04h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Quem se encontrava na Biblioteca não era o portador da Chave.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Biblioteca"
          },
          "b": {
            "cat": "objeto",
            "value": "Chave"
          }
        }
      ]
    },
    {
      "id": "c9",
      "text": "O Noviço segurava o Castiçal, protegendo a chama do vento das arcadas.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Castical",
          "pos": 1
        }
      ]
    },
    {
      "id": "c10",
      "text": "Quem vigiava o Jardim não é aquele que foi avistado às 04h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Jardim"
          },
          "b": {
            "cat": "hora",
            "value": "04h"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "O Bibliotecário passara a hora no Refeitório, longe das estantes.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Refeitorio",
          "pos": 2
        }
      ]
    },
    {
      "id": "c12",
      "text": "Aquele que orava na Capela ali estava às 06h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Capela"
          },
          "b": {
            "cat": "hora",
            "value": "06h"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "O Abade não foi visto às 03h.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "03h",
          "pos": 0
        }
      ]
    }
  ]
};
