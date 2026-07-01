// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "restaurante-estrelado",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Jantar fatal",
  "story": "Três estrelas no guia, dois turnos de reservas esgotadas e, na noite mais cheia do ano, o chef renomado tombou entre as chamas dos fogões enquanto o rush devorava a casa. A brigada inteira estava de plantão quando o serviço parou de repente: cada profissional ocupava a sua área, empunhava um instrumento do ofício e cumpria o seu horário na escala, do primeiro couvert à última sobremesa. O maître circulava pelo salão, o sommelier descia à adega, a confeiteira montava pratos na copa, e alguém permaneceu perto do fogo. Os pedidos esfriaram nas passadeiras; resta separar, nome a nome, onde cada um esteve, com o quê, e a que horas.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Chef",
      "Maître",
      "Sommelier",
      "Confeiteira"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Área",
      "values": [
        {
          "id": "Cozinha",
          "label": "Cozinha",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Salao",
          "label": "Salão",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Adega",
          "label": "Adega",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Copa",
          "label": "Copa",
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
          "id": "Faca",
          "label": "Faca",
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
          "id": "Saca-rolhas",
          "label": "Saca-rolhas",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Rolo",
          "label": "Rolo",
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
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo cravou a hora da morte às 21h, no auge do serviço. O corpo do chef jazia na Cozinha, caído junto à linha de fogo, entre panelas ainda fumegantes.",
    "evidence": [
      {
        "cat": "local",
        "value": "Cozinha"
      },
      {
        "cat": "hora",
        "value": "21h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem tinha a Faca em mãos já havia deixado o serviço antes das 22h — não foi essa a pessoa marcada nesse horário.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Faca"
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
      "text": "Na penumbra da Adega, entre as garrafas deitadas, não havia lâmina alguma: quem ali se postava não trazia a Faca.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Adega"
          },
          "b": {
            "cat": "objeto",
            "value": "Faca"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quem ocupava a Copa era exatamente a mesma pessoa cuja escala marcava as 20h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Copa"
          },
          "b": {
            "cat": "hora",
            "value": "20h"
          }
        }
      ]
    },
    {
      "id": "c4",
      "text": "Nenhuma Taça repousava na mão do maître naquela noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Taca",
          "pos": 1
        }
      ]
    },
    {
      "id": "c5",
      "text": "A confeiteira passou o serviço inteiro na Copa, montando suas sobremesas.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Copa",
          "pos": 3
        }
      ]
    },
    {
      "id": "c6",
      "text": "Por ironia do ofício, o Saca-rolhas não estava com o sommelier.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Saca-rolhas",
          "pos": 2
        }
      ]
    },
    {
      "id": "c7",
      "text": "A mão que segurava o Saca-rolhas pertencia à mesma pessoa que a escala registrava às 19h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Saca-rolhas"
          },
          "b": {
            "cat": "hora",
            "value": "19h"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "Era o Rolo de massa que a confeiteira trazia consigo.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Rolo",
          "pos": 3
        }
      ]
    },
    {
      "id": "c9",
      "text": "Tampouco o maître empunhava o Saca-rolhas.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Saca-rolhas",
          "pos": 1
        }
      ]
    },
    {
      "id": "c10",
      "text": "Quem cuidava do Salão era a mesma figura anotada na escala das 19h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Salao"
          },
          "b": {
            "cat": "hora",
            "value": "19h"
          }
        }
      ]
    }
  ]
};
