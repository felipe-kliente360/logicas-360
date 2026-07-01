// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "redacao-de-jornal",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Manchete de sangue",
  "story": "A rotativa ainda mastigava a última edição quando o corpo do editor-chefe esfriava entre as bancadas da redação. Era a madrugada do fechamento, e o cheiro de café requentado e tinta fresca abafava tudo, menos o silêncio que caiu quando alguém gritou. Cinco jornalistas tinham virado a noite no prédio, presos ao prazo como moscas no papel-caça: cada um trancado num setor, com um objeto ao alcance da mão, marcado por um horário no relógio da parede, e carregando um motivo que ninguém confessa. As luzes fluorescentes zumbiam sobre páginas que ninguém mais assinaria. Em algum ponto daquela noite, um deles trocou a pauta pela lâmina.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Editor-chefe",
      "Repórter",
      "Diagramador",
      "Colunista",
      "Estagiária"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Setor",
      "values": [
        {
          "id": "Redacao",
          "label": "Redação",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Arquivo",
          "label": "Arquivo",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Grafica",
          "label": "Gráfica",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sala do editor",
          "label": "Sala do editor",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Recepcao",
          "label": "Recepção",
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
          "id": "Tesoura",
          "label": "Tesoura",
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
          "id": "Cabo",
          "label": "Cabo",
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
          "id": "Frasco",
          "label": "Frasco",
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
        },
        {
          "id": "02h",
          "label": "02h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "03h",
          "label": "03h",
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
          "id": "Chantagem",
          "label": "Chantagem",
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
          "id": "Inveja",
          "label": "Inveja",
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
    "prompt": "O laudo do legista não deixa margem: a morte ocorreu às 02h, no calor abafado da gráfica, entre bobinas e o ronco das máquinas. O corte foi limpo, feito por mão firme, e o exame das contas do morto aponta o estopim — dinheiro, sujo o bastante para molhar mais de uma mão naquela redação.",
    "evidence": [
      {
        "cat": "local",
        "value": "Grafica"
      },
      {
        "cat": "hora",
        "value": "02h"
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
      "text": "Nas mãos de quem enrolava a Fita não havia rastro de Chantagem; esse veneno pesava sobre outra consciência.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Fita"
          },
          "b": {
            "cat": "motivo",
            "value": "Chantagem"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "O Editor-chefe passou a noite atrás da porta fechada da Sala do editor, cercado por provas e originais.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Sala do editor",
          "pos": 0
        }
      ]
    },
    {
      "id": "c3",
      "text": "O relógio da parede marcava 23h quando o Colunista cravou seus passos no prédio.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "23h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c4",
      "text": "Quem trazia a Fita já rondava as bancadas antes ou depois, mas não às 01h — nesse horário estava longe dali.",
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
            "value": "01h"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "Sobre a mesa do Editor-chefe havia de tudo, menos o Frasco — esse não passou por suas mãos.",
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
      "id": "c6",
      "text": "A mesma mão que empunhava a Tesoura ardia de Vingança, um rancor afiado como o metal.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Tesoura"
          },
          "b": {
            "cat": "motivo",
            "value": "Vinganca"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem se enfurnou na Redação, entre teclados e provas amassadas, tinha um Estilete à mão.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Redacao"
          },
          "b": {
            "cat": "objeto",
            "value": "Estilete"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "O Diagramador não largava a Fita, ferramenta velha de quem monta páginas na correria do fechamento.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Fita",
          "pos": 2
        }
      ]
    },
    {
      "id": "c9",
      "text": "O Colunista se refugiou no Arquivo, entre pastas empoeiradas e edições que ninguém mais folheava.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Arquivo",
          "pos": 3
        }
      ]
    },
    {
      "id": "c10",
      "text": "O que movia o Repórter era um Segredo — algo que ele não deixaria vazar por nada neste mundo.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Segredo",
          "pos": 1
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quem montou guarda na Recepção, junto ao balcão vazio, alimentava a mesma Vingança que corroía por dentro.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Recepcao"
          },
          "b": {
            "cat": "motivo",
            "value": "Vinganca"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "A meia-noite bateu, 00h no ponto, e foi aí que o Editor-chefe fez sua última ronda pelo prédio.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "00h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c13",
      "text": "Aquele que só surgiu às 03h, com a madrugada já fria, guardava um Segredo por trás do olhar cansado.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "hora",
            "value": "03h"
          },
          "b": {
            "cat": "motivo",
            "value": "Segredo"
          }
        }
      ]
    },
    {
      "id": "c14",
      "text": "Quem cruzou o saguão às 00h trazia a Inveja estampada, corroído pelo brilho alheio.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "hora",
            "value": "00h"
          },
          "b": {
            "cat": "motivo",
            "value": "Inveja"
          }
        }
      ]
    }
  ]
};
