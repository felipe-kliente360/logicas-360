// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "sebo-livros-raros",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Segredo no sebo",
  "story": "O sebo cheirava a couro velho e papel adoecido, e foi entre as estantes centenárias que encontraram o dono caído, um incunábulo aberto ao seu lado como se a página fosse a última coisa que ele quisera ler. Naquela tarde, quatro conhecedores haviam cruzado a soleira — cada um recolhido a um canto da loja, cada um com um objeto na mão, cada um numa hora certa marcada pelo relógio de pêndulo do balcão. As lombadas guardam o resto.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Livreiro",
      "Colecionador",
      "Restauradora",
      "Leiloeiro"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Canto",
      "values": [
        {
          "id": "Acervo",
          "label": "Acervo",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Balcao",
          "label": "Balcão",
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
        },
        {
          "id": "Vitrine",
          "label": "Vitrine",
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
          "id": "Lupa",
          "label": "Lupa",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Estilete",
          "label": "Estilete",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Luva",
          "label": "Luva",
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
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo pericial situa a morte às 17h. O corpo jazia no Acervo, entre as prateleiras mais antigas do sebo, o incunábulo ainda aberto a poucos palmos da mão.",
    "evidence": [
      {
        "cat": "local",
        "value": "Acervo"
      },
      {
        "cat": "hora",
        "value": "17h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem trazia a Lupa consigo já se fora antes de o relógio bater 18h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Lupa"
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
      "text": "No Depósito, entre caixas de saldos, ninguém empunhava a Lupa.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Deposito"
          },
          "b": {
            "cat": "objeto",
            "value": "Lupa"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quem se demorou junto à Vitrine foi visto ali às 16h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Vitrine"
          },
          "b": {
            "cat": "hora",
            "value": "16h"
          }
        }
      ]
    },
    {
      "id": "c4",
      "text": "O Estilete não passou pelas mãos do Colecionador.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Estilete",
          "pos": 1
        }
      ]
    },
    {
      "id": "c5",
      "text": "O Leiloeiro fez ponto junto à Vitrine, de olho nas raridades expostas.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Vitrine",
          "pos": 3
        }
      ]
    },
    {
      "id": "c6",
      "text": "A Restauradora, curiosamente, não vestia a Luva naquele dia.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Luva",
          "pos": 2
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem calçava a Luva já circulava pela loja às 15h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Luva"
          },
          "b": {
            "cat": "hora",
            "value": "15h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Era a Chave que o Leiloeiro trazia consigo.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Chave",
          "pos": 3
        }
      ]
    },
    {
      "id": "c9",
      "text": "Tampouco a Luva pertencia ao Colecionador.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Luva",
          "pos": 1
        }
      ]
    },
    {
      "id": "c10",
      "text": "Quem se acomodou junto ao Balcão já estava lá às 15h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Balcao"
          },
          "b": {
            "cat": "hora",
            "value": "15h"
          }
        }
      ]
    }
  ]
};
