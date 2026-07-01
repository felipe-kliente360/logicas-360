// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "estacao-espacial",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Vácuo",
  "story": "A 400 quilômetros da Terra, onde o único som é o zumbido dos filtros de ar e o silêncio do vácuo pressiona cada anteparo, a estação girava em sua órbita como um caixão iluminado. Ao fim do turno noturno, a tripulação encontrou o comandante sem vida e um módulo sabotado, os sistemas piscando em vermelho contra as janelas escuras. Seis astronautas partilhavam aquela lata de metal suspensa no nada — e, naquelas horas mortas, cada um esteve num setor, empunhando um objeto, num horário preciso, arrastado por um motivo que ninguém confessa. Lá fora, nenhuma testemunha; só as estrelas frias e a Terra girando, indiferente.",
  "size": 6,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Comandante",
      "Engenheira",
      "Médico",
      "Cientista",
      "Piloto",
      "Especialista"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Setor",
      "values": [
        {
          "id": "Modulo central",
          "label": "Módulo central",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Laboratorio",
          "label": "Laboratório",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Eclusa",
          "label": "Eclusa",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ponte",
          "label": "Ponte",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Reator",
          "label": "Reator",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Estufa",
          "label": "Estufa",
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
          "id": "Chave",
          "label": "Chave",
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
          "id": "Bisturi",
          "label": "Bisturi",
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
          "id": "Extintor",
          "label": "Extintor",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cilindro",
          "label": "Cilindro",
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
          "id": "Sabotagem",
          "label": "Sabotagem",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Espionagem",
          "label": "Espionagem",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Motim",
          "label": "Motim",
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
          "id": "Vinganca",
          "label": "Vingança",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ganancia",
          "label": "Ganância",
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
    "prompt": "O laudo de bordo não deixa margem: o coração parou às 03h, na Ponte, sob as luzes de emergência que varriam os controles mortos. E o que armou a mão do assassino, gravado entre as entrelinhas do relatório, foi a ganância — a mais terrestre das fomes, acesa aqui onde nada se pode gastar.",
    "evidence": [
      {
        "cat": "local",
        "value": "Ponte"
      },
      {
        "cat": "hora",
        "value": "03h"
      },
      {
        "cat": "motivo",
        "value": "Ganancia"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "As mãos do Cientista não seguravam o Frasco quando as luzes caíram.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Frasco",
          "pos": 3
        }
      ]
    },
    {
      "id": "c2",
      "text": "O Bisturi jamais esteve com a Engenheira; ferramenta de médico não combina com mãos de reator.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Bisturi",
          "pos": 1
        }
      ]
    },
    {
      "id": "c3",
      "text": "Quem se enfiou no Reator, entre os canos que pulsavam calor, carregava consigo o Cilindro.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Reator"
          },
          "b": {
            "cat": "objeto",
            "value": "Cilindro"
          }
        }
      ]
    },
    {
      "id": "c4",
      "text": "A Chave pendia dos dedos do Especialista, fria como o metal do casco.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Chave",
          "pos": 5
        }
      ]
    },
    {
      "id": "c5",
      "text": "A mão que empunhava o Extintor era a mesma que servia à Espionagem, olhos vendidos a quem paga em terra firme.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Extintor"
          },
          "b": {
            "cat": "motivo",
            "value": "Espionagem"
          }
        }
      ]
    },
    {
      "id": "c6",
      "text": "Quem enrolava o Cabo nas mãos agia por Sabotagem, decidido a apagar a estação como se apaga uma vela.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Cabo"
          },
          "b": {
            "cat": "motivo",
            "value": "Sabotagem"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "O Especialista passou aquele turno trancado no Laboratório, entre bancadas e o brilho estéril das placas.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Laboratorio",
          "pos": 5
        }
      ]
    },
    {
      "id": "c8",
      "text": "O que movia o Médico era a Sabotagem, um rancor que apodrecera na órbita silenciosa.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Sabotagem",
          "pos": 2
        }
      ]
    },
    {
      "id": "c9",
      "text": "Entre as plantas pálidas da Estufa, quem lá respirava mantinha o Extintor ao alcance da mão.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Estufa"
          },
          "b": {
            "cat": "objeto",
            "value": "Extintor"
          }
        }
      ]
    },
    {
      "id": "c10",
      "text": "Fosse o que fosse que agitava o Comandante, não era guardar um Segredo; sua inquietação vinha de outro lugar.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "motivo",
          "value": "Segredo",
          "pos": 0
        }
      ]
    },
    {
      "id": "c11",
      "text": "Às 22h, quando o turno mal começava, o Frasco ainda não havia passado por mão alguma; quem o carregava surgiu mais tarde.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Frasco"
          },
          "b": {
            "cat": "hora",
            "value": "22h"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Quem cruzou o Módulo central foi registrado ali à 01h, sob a luz azulada dos monitores.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Modulo central"
          },
          "b": {
            "cat": "hora",
            "value": "01h"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "O relógio de bordo cravou o Especialista em movimento às 23h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "23h",
          "pos": 5
        }
      ]
    },
    {
      "id": "c14",
      "text": "A lâmina do Bisturi acompanhava quem ardia em Motim, pronto a virar a hierarquia de cabeça para baixo.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Bisturi"
          },
          "b": {
            "cat": "motivo",
            "value": "Motim"
          }
        }
      ]
    },
    {
      "id": "c15",
      "text": "O Piloto agia por Espionagem, vendendo os segredos da estação para ouvidos lá embaixo.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Espionagem",
          "pos": 4
        }
      ]
    },
    {
      "id": "c16",
      "text": "O Comandante não chegou perto da Eclusa naquela noite — o portal para o vácuo permaneceu longe dele.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Eclusa",
          "pos": 0
        }
      ]
    },
    {
      "id": "c17",
      "text": "O Médico não pisou no Módulo central; seu turno correu por outros corredores da estação.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Modulo central",
          "pos": 2
        }
      ]
    },
    {
      "id": "c18",
      "text": "O Frasco tampouco esteve com a Engenheira; suas mãos cheiravam a graxa, não a laboratório.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Frasco",
          "pos": 1
        }
      ]
    },
    {
      "id": "c19",
      "text": "Quem carregava a Chave não era movido por Vingança; outro fogo ardia sob aquele capacete.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Chave"
          },
          "b": {
            "cat": "motivo",
            "value": "Vinganca"
          }
        }
      ]
    },
    {
      "id": "c20",
      "text": "À 01h, o Comandante já não constava nos registros de movimento; sua ronda seguira outro compasso.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "01h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c21",
      "text": "Quem segurava o Cilindro deixou seu rastro às 02h, quando a estação mergulhava em sua parte mais escura.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Cilindro"
          },
          "b": {
            "cat": "hora",
            "value": "02h"
          }
        }
      ]
    },
    {
      "id": "c22",
      "text": "Quem se moveu à 00h, na virada muda do dia orbital, agia por Espionagem.",
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
            "value": "Espionagem"
          }
        }
      ]
    },
    {
      "id": "c23",
      "text": "Quem trazia o Frasco não agia por Vingança; o veneno em suas mãos servia a outro propósito.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Frasco"
          },
          "b": {
            "cat": "motivo",
            "value": "Vinganca"
          }
        }
      ]
    }
  ]
};
