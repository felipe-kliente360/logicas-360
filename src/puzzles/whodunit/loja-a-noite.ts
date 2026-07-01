// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "loja-a-noite",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Crime na loja de departamentos",
  "story": "As grades desceram sobre a vitrine e a grande loja de departamentos afundou naquele silêncio de neon zumbindo que só as lojas fechadas conhecem. Entre manequins cegos e prateleiras altas, o gerente foi encontrado sem vida — o homem que trancava tudo, trancado agora na própria escuridão. Quatro empregados haviam ficado depois do expediente, e a noite os espalhou: cada um em seu setor, cada um com um objeto nas mãos, cada um marcado por um horário no relógio de ponto que ninguém mais conferia.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Segurança",
      "Gerente",
      "Vitrinista",
      "Estoquista"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Setor",
      "values": [
        {
          "id": "Vitrine",
          "label": "Vitrine",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Estoque",
          "label": "Estoque",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Caixa",
          "label": "Caixa",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Provador",
          "label": "Provador",
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
          "id": "Chaves",
          "label": "Chaves",
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
          "id": "Fita",
          "label": "Fita",
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
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo pericial cravou a hora da morte à 01h, quando a loja já dormia por completo. O corpo jazia no Provador, meio oculto pela cortina puxada, longe dos corredores por onde a ronda costumava passar.",
    "evidence": [
      {
        "cat": "local",
        "value": "Provador"
      },
      {
        "cat": "hora",
        "value": "01h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Às 22h, o molho de Chaves ainda não tilintava nos corredores: quem o carregava só surgiu mais tarde.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Chaves"
          },
          "b": {
            "cat": "hora",
            "value": "22h"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Nas mãos do Gerente não havia rolo de Fita algum naquela noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Fita",
          "pos": 1
        }
      ]
    },
    {
      "id": "c3",
      "text": "O Gerente jurava não ter chegado perto da Vitrine, e nada o desmente.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Vitrine",
          "pos": 1
        }
      ]
    },
    {
      "id": "c4",
      "text": "O Estilete, seja lá quem o empunhasse, não estava com o Segurança.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Estilete",
          "pos": 0
        }
      ]
    },
    {
      "id": "c5",
      "text": "Era o Vitrinista quem trazia o molho de Chaves preso ao cinto.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Chaves",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "Quem trabalhava na Vitrine tinha, consigo, o Estilete de lâmina fina.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Vitrine"
          },
          "b": {
            "cat": "objeto",
            "value": "Estilete"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem manuseava a Fita não constava nos registros das 22h.",
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
            "value": "22h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "E tampouco à 00h aparecia o portador da Fita: aquela hora o encontrou noutro lugar.",
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
            "value": "00h"
          }
        }
      ]
    },
    {
      "id": "c9",
      "text": "O facho da Lanterna cortou o escuro às 23h — hora em que seu dono estava de fato ali.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Lanterna"
          },
          "b": {
            "cat": "hora",
            "value": "23h"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "No Estoque, entre as caixas empilhadas, quem estava lá trazia consigo as Chaves.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Estoque"
          },
          "b": {
            "cat": "objeto",
            "value": "Chaves"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "No Caixa, junto às gavetas silenciosas, quem ali se postava segurava a Lanterna.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Caixa"
          },
          "b": {
            "cat": "objeto",
            "value": "Lanterna"
          }
        }
      ]
    }
  ]
};
