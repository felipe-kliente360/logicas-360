// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "farol-isolado",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "A luz que se apagou",
  "story": "O promontório despencava sobre um mar que não parava de bater, e lá em cima, no alto da rocha, encontraram o velho faroleiro sem vida — a luz do farol apagada pela primeira vez em quarenta anos. Naquela noite a ilha não estava vazia: cinco pessoas dividiam a escuridão entre as ondas e o vento. Cada uma esteve num setor, empunhando algum objeto, numa hora precisa da madrugada, arrastada por um motivo que jurava não ter. Alguém deixou o mar engolir a luz.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Faroleiro",
      "Bióloga",
      "Pescador",
      "Herdeira",
      "Telegrafista"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Setor",
      "values": [
        {
          "id": "Lanterna do farol",
          "label": "Lanterna do farol",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Casa de maquinas",
          "label": "Casa de máquinas",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ancoradouro",
          "label": "Ancoradouro",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Torre",
          "label": "Torre",
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
          "id": "Querosene",
          "label": "Querosene",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cabo",
          "label": "Cabo",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sinalizador",
          "label": "Sinalizador",
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
    },
    {
      "id": "motivo",
      "label": "Motivo",
      "values": [
        {
          "id": "Heranca",
          "label": "Herança",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Vinganca",
          "label": "Vingança",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Segredo",
          "label": "Segredo",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ciume",
          "label": "Ciúme",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Dinheiro",
          "label": "Dinheiro",
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
    "prompt": "O laudo do legista não deixa margem: a morte ocorreu às 21h, ainda no começo da noite. O corpo caiu no Depósito, entre latões e cordame velho, longe da lanterna que deveria guardar. E o que moveu a mão foi dinheiro — frio, calculado, sem paixão nenhuma no meio.",
    "evidence": [
      {
        "cat": "local",
        "value": "Deposito"
      },
      {
        "cat": "hora",
        "value": "21h"
      },
      {
        "cat": "motivo",
        "value": "Dinheiro"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "O Pescador jurou que a Torre não o viu passar naquela noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Torre",
          "pos": 2
        }
      ]
    },
    {
      "id": "c2",
      "text": "O que movia o Telegrafista era um segredo que ele guardava a sete chaves.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Segredo",
          "pos": 4
        }
      ]
    },
    {
      "id": "c3",
      "text": "Seja qual for a hora do Pescador, não foram as 23h que o marcaram.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "23h",
          "pos": 2
        }
      ]
    },
    {
      "id": "c4",
      "text": "Nas mãos de quem carregava o Sinalizador ardia também o ciúme.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Sinalizador"
          },
          "b": {
            "cat": "motivo",
            "value": "Ciume"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "O óleo da Casa de máquinas não sujou as botas do Pescador; ele nunca pôs os pés lá.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Casa de maquinas",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "Herança nenhuma esperava o Pescador; não foi isso que o moveu.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "motivo",
          "value": "Heranca",
          "pos": 2
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem se enfiou na Casa de máquinas levava consigo o Cabo.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Casa de maquinas"
          },
          "b": {
            "cat": "objeto",
            "value": "Cabo"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "O Sinalizador não estava com o Pescador; suas mãos seguravam outra coisa.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Sinalizador",
          "pos": 2
        }
      ]
    },
    {
      "id": "c9",
      "text": "A Bióloga só rompeu a escuridão à meia-noite, às 00h em ponto.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "00h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c10",
      "text": "O Faroleiro estava, como sempre, na Lanterna do farol — o posto de toda uma vida.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Lanterna do farol",
          "pos": 0
        }
      ]
    },
    {
      "id": "c11",
      "text": "Na Lanterna do farol não havia Corda alguma; quem lá esteve trazia outra coisa nas mãos.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Lanterna do farol"
          },
          "b": {
            "cat": "objeto",
            "value": "Corda"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Quem rondou o Ancoradouro trazia o ciúme fervendo por dentro.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Ancoradouro"
          },
          "b": {
            "cat": "motivo",
            "value": "Ciume"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "Presa ao cinto do Telegrafista havia uma Faca.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Faca",
          "pos": 4
        }
      ]
    },
    {
      "id": "c14",
      "text": "O relógio do Faroleiro parou na hora certa: 01h da madrugada.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "01h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c15",
      "text": "A Bióloga carregava uma vingança antiga, e era ela que a movia.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Vinganca",
          "pos": 1
        }
      ]
    },
    {
      "id": "c16",
      "text": "Aquele que surgiu às 22h trazia consigo o ciúme como companhia.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "hora",
            "value": "22h"
          },
          "b": {
            "cat": "motivo",
            "value": "Ciume"
          }
        }
      ]
    }
  ]
};
