// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "balneario-caxambu",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "O segredo do balneário",
  "story": "Em Caxambu, joia do Circuito das Águas de Minas Gerais, o balneário hidroterápico é o coração da estância: há mais de um século banhistas de todo o país sobem a serra para tomar as águas minerais tidas como milagrosas. Foi entre vapores, duchas e fontes que o Comendador — hóspede ilustre que há anos fazia a cura — apareceu sem vida, e logo correu o boato de que uma das águas fora adulterada. Cinco pessoas tinham livre acesso às alas naquela manhã: o Doutor das águas, a Enfermeira, o Químico do engarrafamento, a Herdeira e o Diretor do balneário. Cada uma passou por um ponto, com um objeto nas mãos, a uma hora certa. Reconstrua a manhã e veja quem sobra.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Doutor",
      "Enfermeira",
      "Químico",
      "Herdeira",
      "Diretor"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Ala",
      "values": [
        {
          "id": "Banhos de imersao",
          "label": "Banhos de imersão",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sauna",
          "label": "Sauna",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ducha",
          "label": "Ducha",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Fonte Mayrink",
          "label": "Fonte Mayrink",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Piscina termal",
          "label": "Piscina termal",
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
          "id": "Frasco",
          "label": "Frasco",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Seringa",
          "label": "Seringa",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Toalha",
          "label": "Toalha",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Calice",
          "label": "Cálice",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ampola",
          "label": "Ampola",
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
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo do legista foi claro: a morte veio por volta das 09h, e o corpo do Comendador foi encontrado caído sob a Ducha, a água ainda escorrendo pelos ladrilhos. Os sinais apontavam envenenamento.",
    "evidence": [
      {
        "cat": "local",
        "value": "Ducha"
      },
      {
        "cat": "hora",
        "value": "09h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem relaxava na Piscina termal não era a mesma pessoa que segurava o Cálice.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Piscina termal"
          },
          "b": {
            "cat": "objeto",
            "value": "Calice"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "No vapor denso da Sauna, quem ali estava trazia uma Seringa — detalhe que fez o delegado prender a respiração.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Sauna"
          },
          "b": {
            "cat": "objeto",
            "value": "Seringa"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "O Doutor das águas passou a manhã nos Banhos de imersão, receitando temperaturas.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Banhos de imersao",
          "pos": 0
        }
      ]
    },
    {
      "id": "c4",
      "text": "Às 08h, a Herdeira ainda não havia aparecido no balneário.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "08h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c5",
      "text": "O Doutor foi anotado no livro de ponto às 11h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "11h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c6",
      "text": "A Enfermeira levava consigo um Cálice de água mineral.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Calice",
          "pos": 1
        }
      ]
    },
    {
      "id": "c7",
      "text": "A Herdeira não pôs os pés na Piscina termal.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Piscina termal",
          "pos": 3
        }
      ]
    },
    {
      "id": "c8",
      "text": "A Enfermeira foi vista junto à Fonte Mayrink, a que abastece o engarrafamento.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Fonte Mayrink",
          "pos": 1
        }
      ]
    },
    {
      "id": "c9",
      "text": "Ao meio-dia, às 12h, o Doutor já havia deixado o balneário.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "12h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c10",
      "text": "O Diretor do balneário foi registrado nas dependências às 10h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "10h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quem guardava a Ampola no bolso foi flagrado no balneário já às 12h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Ampola"
          },
          "b": {
            "cat": "hora",
            "value": "12h"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "A Herdeira carregava apenas uma Toalha — nada que chamasse atenção.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Toalha",
          "pos": 3
        }
      ]
    }
  ],
  "baseRaw": 5.500171079680357
};
