// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "jardim-botanico",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Veneno entre as orquídeas",
  "story": "Fechados os portões do jardim botânico, o silêncio caiu sobre as estufas como um lençol úmido — e foi nele que o velho curador apareceu sem vida entre os canteiros, o perfume das flores mal disfarçando um travo amargo no ar. Cinco pessoas guardavam as chaves das alas naquela noite: o Botânico, a Herdeira, a Curadora, o Jardineiro e o Mecenas. Cada uma passou por um ponto do jardim, com um objeto nas mãos, a uma hora certa. Reconstrua a ronda inteira e veja quem sobra sob a lua.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Botânico",
      "Herdeira",
      "Curadora",
      "Jardineiro",
      "Mecenas"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Ala",
      "values": [
        {
          "id": "Orquidario",
          "label": "Orquidário",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Estufa tropical",
          "label": "Estufa tropical",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Herbario",
          "label": "Herbário",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Lago",
          "label": "Lago",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Alameda",
          "label": "Alameda",
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
          "id": "Tesoura de poda",
          "label": "Tesoura de poda",
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
          "id": "Corda",
          "label": "Corda",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Regador",
          "label": "Regador",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Pá",
          "label": "Pá",
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
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo confirmou o que o cheiro amargo já denunciava: a morte veio por volta das 22h. O corpo foi recolhido na Alameda, longe das estufas, caído entre os canteiros de pedra.",
    "evidence": [
      {
        "cat": "local",
        "value": "Alameda"
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
      "text": "Quem carregava a Pá não foi a mesma figura que os vigias anotaram às 18h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Pá"
          },
          "b": {
            "cat": "hora",
            "value": "18h"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Quem trazia a Corda já rondava os canteiros logo cedo, às 18h.",
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
            "value": "18h"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "As mãos do Botânico não seguravam a tesoura de poda naquela noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Tesoura de poda",
          "pos": 0
        }
      ]
    },
    {
      "id": "c4",
      "text": "No Orquidário, entre as flores mais raras da coleção, quem ali esteve levava a Corda.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Orquidario"
          },
          "b": {
            "cat": "objeto",
            "value": "Corda"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "O Mecenas só surgiu na planilha da vigília às 21h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "21h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c6",
      "text": "O Jardineiro trazia consigo um frasco — defensivo para as plantas, jurava ele.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Frasco",
          "pos": 3
        }
      ]
    },
    {
      "id": "c7",
      "text": "Na Estufa tropical, o calor úmido não abrigava frasco algum: quem lá estava não o portava.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Estufa tropical"
          },
          "b": {
            "cat": "objeto",
            "value": "Frasco"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "A Herdeira garante que não pôs os pés na Estufa tropical.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Estufa tropical",
          "pos": 1
        }
      ]
    },
    {
      "id": "c9",
      "text": "A Pá tampouco esteve nas mãos de quem cruzou o jardim às 20h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Pá"
          },
          "b": {
            "cat": "hora",
            "value": "20h"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "A Herdeira — a que mais tinha a ganhar com a morte do velho — foi registrada no jardim às 20h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "20h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quem empunhava a Pá foi visto às 21h, terra ainda fresca na lâmina.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Pá"
          },
          "b": {
            "cat": "hora",
            "value": "21h"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "No Herbário, entre as folhas secas catalogadas, quem se demorava ali não tinha o frasco.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Herbario"
          },
          "b": {
            "cat": "objeto",
            "value": "Frasco"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "Às 19h, ninguém soube situar o Mecenas em parte alguma.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "19h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c14",
      "text": "A mão que segurava a tesoura de poda foi a mesma flagrada em ronda às 19h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Tesoura de poda"
          },
          "b": {
            "cat": "hora",
            "value": "19h"
          }
        }
      ]
    },
    {
      "id": "c15",
      "text": "Tampouco às 18h o Mecenas havia dado as caras.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "18h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c16",
      "text": "Junto ao Lago, quem rondava a água escura carregava a Pá.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Lago"
          },
          "b": {
            "cat": "objeto",
            "value": "Pá"
          }
        }
      ]
    }
  ],
  "baseRaw": 5.322432511694039
};
