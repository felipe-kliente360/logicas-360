// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "crime-set-cinema",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "O crime no set de cinema",
  "story": "A superprodução mais cara do ano rodava havia semanas quando os holofotes se apagaram de vez: o astro do elenco foi encontrado sem vida no set, a claquete ainda tombada a seus pés. Cinco figuras conhecidas dos bastidores tinham circulado pelo estúdio naquela diária — o Diretor, a Atriz, o Dublê, o Roteirista e a Produtora —, e cada uma delas ocupou um ponto diferente das gravações, empunhou um objeto e foi vista num horário certo. Reconstrua a diária inteira, minuto a minuto, e veja quem sobra sob a luz.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Diretor",
      "Atriz",
      "Dublê",
      "Roteirista",
      "Produtora"
    ]
  },
  "categories": [
    {
      "id": "cena",
      "label": "Cena",
      "values": [
        {
          "id": "Estudio A",
          "label": "Estúdio A",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Camarim",
          "label": "Camarim",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Backlot",
          "label": "Backlot",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ilha de edicao",
          "label": "Ilha de edição",
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
          "id": "Frasco",
          "label": "Frasco",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Estatueta",
          "label": "Estatueta",
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
        }
      ]
    },
    {
      "id": "hora",
      "label": "Horário",
      "values": [
        {
          "id": "14h",
          "label": "14h",
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
          "id": "18h",
          "label": "18h",
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
    "prompt": "O laudo do legista foi seco e definitivo: a morte ocorreu por volta das 14h, ainda no comecinho da diária. E a claquete tombada não deixava dúvida sobre o cenário — o corpo esfriava no Refeitório, longe dos refletores, onde ninguém deveria estar àquela hora.",
    "evidence": [
      {
        "cat": "cena",
        "value": "Refeitorio"
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
      "text": "Reviraram os bolsos do Diretor e nada de corda: aquele nó não passou pelas mãos dele.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Corda",
          "pos": 0
        }
      ]
    },
    {
      "id": "c2",
      "text": "A Produtora passou aquela diária trancada no Camarim, entre espelhos e figurinos.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "cena",
          "value": "Camarim",
          "pos": 4
        }
      ]
    },
    {
      "id": "c3",
      "text": "Foi às 18h em ponto que a Produtora surgiu na planilha de presença.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "18h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c4",
      "text": "Quem se enfiou na Ilha de edição só marcou ponto tarde, às 22h, com a moviola ainda ligada.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "cena",
            "value": "Ilha de edicao"
          },
          "b": {
            "cat": "hora",
            "value": "22h"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "Sob os refletores do Estúdio A, quem lá estava carregava consigo o frasco.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "cena",
            "value": "Estudio A"
          },
          "b": {
            "cat": "objeto",
            "value": "Frasco"
          }
        }
      ]
    },
    {
      "id": "c6",
      "text": "A corda também não era da Produtora — nenhuma fibra dela nas mãos que assinavam os cheques.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Corda",
          "pos": 4
        }
      ]
    },
    {
      "id": "c7",
      "text": "No breu do Backlot, quem circulava por ali abria caminho com uma lanterna na mão.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "cena",
            "value": "Backlot"
          },
          "b": {
            "cat": "objeto",
            "value": "Lanterna"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "O Roteirista jurou que não pôs os pés no Estúdio A naquele dia, e as testemunhas confirmaram.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "cena",
          "value": "Estudio A",
          "pos": 3
        }
      ]
    },
    {
      "id": "c9",
      "text": "O frasco só apareceu em cena às 20h — foi essa a hora de quem o segurava.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Frasco"
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
      "text": "O facho da lanterna cortou o set às 16h; quem a empunhava foi visto nessa hora.",
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
            "value": "16h"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "Também não foi o Diretor quem levou o frasco: aquele vidro nunca esteve com ele.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Frasco",
          "pos": 0
        }
      ]
    },
    {
      "id": "c12",
      "text": "A Atriz se refugiou na Ilha de edição, longe do burburinho dos refletores.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "cena",
          "value": "Ilha de edicao",
          "pos": 1
        }
      ]
    },
    {
      "id": "c13",
      "text": "Nas mãos da Atriz brilhava uma faca — de cena, dizia ela, mas faca.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Faca",
          "pos": 1
        }
      ]
    }
  ]
};
