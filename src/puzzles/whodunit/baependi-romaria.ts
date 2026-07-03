// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "baependi-romaria",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Fé e cobiça",
  "story": "Baependi acordou coberta de incenso. Uma das vilas mais antigas da Estrada Real, encravada no Circuito das Águas de Minas, ela vivia o seu dia maior: a romaria descia as ladeiras de pedra rumo ao Santuário de Nhá Chica, a beata cujo nome atravessou o sertão mineiro em fama de milagres. Sinos, rojões e ladainhas se enroscavam no rio de fiéis que enchia o casario colonial. Mas, antes que o sol vencesse a serra, o velho benfeitor do santuário — o homem que prometera à causa boa parte de sua fortuna — foi achado sem vida. Cinco figuras familiares à devoção haviam cruzado a vila naquela manhã, cada qual num ponto, com um objeto nas mãos, numa hora certa. Sob o cheiro de cera derretida e a poeira das velhas relíquias, a fé e a cobiça rezavam lado a lado no mesmo banco de igreja.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Pároco",
      "Sacristão",
      "Romeira",
      "Antiquário",
      "Zelador"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Local",
      "values": [
        {
          "id": "Santuario",
          "label": "Santuário",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Casa de Nha Chica",
          "label": "Casa de Nhá Chica",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Igreja Matriz",
          "label": "Igreja Matriz",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cachoeira",
          "label": "Cachoeira",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Casario",
          "label": "Casario",
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
          "id": "Relicario",
          "label": "Relicário",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Terço",
          "label": "Terço",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ex-voto",
          "label": "Ex-voto",
          "display": {
            "kind": "text"
          }
        },
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
        }
      ]
    },
    {
      "id": "hora",
      "label": "Horário",
      "values": [
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
        },
        {
          "id": "08h",
          "label": "08h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "09h",
          "label": "09h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "10h",
          "label": "10h",
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
    "prompt": "A perícia fixou a hora da morte às 10h. O corpo do velho benfeitor foi recolhido no Casario, caído entre as paredes caiadas do arruado antigo, quando os últimos romeiros já haviam passado.",
    "evidence": [
      {
        "cat": "local",
        "value": "Casario"
      },
      {
        "cat": "hora",
        "value": "10h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "A corda passou por mãos que, quando bateram as 06h, ainda não haviam surgido na vila.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Corda"
          },
          "b": {
            "cat": "hora",
            "value": "06h"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "A alma que trazia o ex-voto foi das primeiras a despontar, ainda às 06h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Ex-voto"
          },
          "b": {
            "cat": "hora",
            "value": "06h"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "O Pároco, por mais devoto que se mostrasse, não trazia consigo o relicário.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Relicario",
          "pos": 0
        }
      ]
    },
    {
      "id": "c4",
      "text": "No Santuário, quem ali se ajoelhava tinha o ex-voto nas mãos.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Santuario"
          },
          "b": {
            "cat": "objeto",
            "value": "Ex-voto"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "O Zelador só deu as caras às 09h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "09h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c6",
      "text": "O Antiquário apertava o terço entre os dedos, contas gastas de tanto cobiçar o que era sagrado.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Terço",
          "pos": 3
        }
      ]
    },
    {
      "id": "c7",
      "text": "Na Casa de Nhá Chica, quem por lá rondava não levava o terço.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Casa de Nha Chica"
          },
          "b": {
            "cat": "objeto",
            "value": "Terço"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "O Sacristão não pôs os pés na Casa de Nhá Chica.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Casa de Nha Chica",
          "pos": 1
        }
      ]
    },
    {
      "id": "c9",
      "text": "A corda tampouco esteve com quem se mostrou às 08h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Corda"
          },
          "b": {
            "cat": "hora",
            "value": "08h"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "O Sacristão surgiu às 08h, entre uma badalada e outra.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "08h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c11",
      "text": "E a corda — nó já feito, pronta para o pior — pesava nas mãos de quem rondava a vila às 09h, na hora que antecedeu o crime.",
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
            "value": "09h"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Na Igreja Matriz, quem lá se encontrava não segurava o terço.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Igreja Matriz"
          },
          "b": {
            "cat": "objeto",
            "value": "Terço"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "Às 07h, do Zelador não havia sinal.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "07h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c14",
      "text": "O relicário acompanhou quem se apresentou às 07h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Relicario"
          },
          "b": {
            "cat": "hora",
            "value": "07h"
          }
        }
      ]
    },
    {
      "id": "c15",
      "text": "Tampouco às 06h o Zelador foi visto pela vila.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "06h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c16",
      "text": "À beira da Cachoeira, longe dos olhos da romaria, quem ali estava trazia a corda.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Cachoeira"
          },
          "b": {
            "cat": "objeto",
            "value": "Corda"
          }
        }
      ]
    }
  ],
  "baseRaw": 5.322432511694039
};
