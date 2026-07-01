// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "sabotagem-submarino",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Sabotagem no submarino",
  "story": "Duzentos metros abaixo da superfície, o casco range sob a pressão e o único som constante é o zumbido do reator. Naquela vigília, um oficial foi encontrado sem vida numa das anteparas e um sistema vital amanheceu sabotado — os dois golpes vieram no mesmo turno de escuridão. Cinco tripulantes tinham as escotilhas abertas para si: cada um passou por um setor, empunhou um objeto, cruzou um horário do relógio de bordo e carregava um motivo abafado desde a última imersão. Refaça a vigília inteira, compartimento por compartimento, e descubra quem sobra quando as portas estanques se fecham.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Comandante",
      "Sonarista",
      "Cozinheiro",
      "Médica",
      "Maquinista"
    ]
  },
  "categories": [
    {
      "id": "setor",
      "label": "Setor",
      "values": [
        {
          "id": "Torpedos",
          "label": "Torpedos",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sonar",
          "label": "Sonar",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cozinha",
          "label": "Cozinha",
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
          "id": "Comando",
          "label": "Comando",
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
          "id": "Chave",
          "label": "Chave",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cabo de aco",
          "label": "Cabo de aço",
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
        }
      ]
    },
    {
      "id": "motivo",
      "label": "Motivo",
      "values": [
        {
          "id": "Motim",
          "label": "Motim",
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
          "id": "Vinganca",
          "label": "Vingança",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sabotagem",
          "label": "Sabotagem",
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
        }
      ]
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo do médico de bordo não deixa margem: o relógio do morto parou às 01h, marca da hora exata em que o coração cedeu. A sabotagem foi rastreada até a Cozinha, onde uma válvula manipulada quase levou a tripulação junto. E o estopim de tudo, sussurram os autos, foi um segredo que alguém a bordo estava disposto a matar para manter submerso.",
    "evidence": [
      {
        "cat": "setor",
        "value": "Cozinha"
      },
      {
        "cat": "hora",
        "value": "01h"
      },
      {
        "cat": "motivo",
        "value": "Segredo"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Aquele que trazia a Chave presa ao cinto não se movia por Motim — sua sublevação era de outra natureza.",
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
            "value": "Motim"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "O Comandante passou a vigília junto ao Reator, o rosto lavado pela luz âmbar dos mostradores.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "setor",
          "value": "Reator",
          "pos": 0
        }
      ]
    },
    {
      "id": "c3",
      "text": "O relógio de bordo registrou a Médica em ronda logo no início do turno, às 22h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "22h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c4",
      "text": "À meia-noite, às 00h, o portador da Chave não constava em lugar nenhum do diário — não foi ele quem cruzou aquele horário.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Chave"
          },
          "b": {
            "cat": "hora",
            "value": "00h"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "Vasculharam o Comandante de alto a baixo: nenhum Cabo de aço em suas mãos naquela noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Cabo de aco",
          "pos": 0
        }
      ]
    },
    {
      "id": "c6",
      "text": "A mesma mão que enrolava a Corda servia a interesses estrangeiros: quem a carregava agia por Espionagem.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Corda"
          },
          "b": {
            "cat": "motivo",
            "value": "Espionagem"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "Entre os tubos frios da sala de Torpedos, quem ali montava guarda tinha uma Faca à cintura.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "setor",
            "value": "Torpedos"
          },
          "b": {
            "cat": "objeto",
            "value": "Faca"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "O Cozinheiro trazia consigo a Chave — a mesma que abria a despensa e boa parte das anteparas.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Chave",
          "pos": 2
        }
      ]
    },
    {
      "id": "c9",
      "text": "A Médica passou o turno debruçada sobre o Sonar, os fones colados aos ouvidos escutando o breu lá fora.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "setor",
          "value": "Sonar",
          "pos": 3
        }
      ]
    },
    {
      "id": "c10",
      "text": "O que movia o Sonarista era a Sabotagem pura e simples — vontade de ver o barco ceder.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "motivo",
          "value": "Sabotagem",
          "pos": 1
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quem cruzou o posto de Comando naquela vigília não estava ali por dever: agia por Espionagem.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "setor",
            "value": "Comando"
          },
          "b": {
            "cat": "motivo",
            "value": "Espionagem"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "O diário anota o Comandante em sua estação às 23h, uma hora após o mergulho da noite se firmar.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "23h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c13",
      "text": "Na derradeira ronda, às 02h, quem ainda rondava os corredores movia-se por Sabotagem.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "hora",
            "value": "02h"
          },
          "b": {
            "cat": "motivo",
            "value": "Sabotagem"
          }
        }
      ]
    },
    {
      "id": "c14",
      "text": "Aquele cuja passagem o relógio marcou às 23h carregava Vingança no peito, uma conta velha a acertar.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "hora",
            "value": "23h"
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
