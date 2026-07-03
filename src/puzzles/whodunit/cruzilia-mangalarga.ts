// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "cruzilia-mangalarga",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Sangue de campeão",
  "story": "Cruzília amanhece em névoa fina, encostada na Serra da Mantiqueira, e não há mineiro que não saiba: foi deste chão que saiu o Mangalarga Marchador, o cavalo de andadura macia que fez a fama da região. Naquela semana, a Fazenda Campo Alegre — centenária, de porteira sempre lustrada — recebia a grande exposição da raça, e criadores de todo o país haviam subido a serra para o leilão do garanhão premiado, sangue de campeão que valia uma vida inteira de tropa. O velho Barão, senhor da casa e guardião da melhor linhagem, presidiria o pregão. Não presidiu. Ao raiar do dia marcado, acharam-no sem vida, e a manhã inteira virou suspeita. Cinco figuras do turfe rondavam as instalações — cada uma num local da propriedade, com um objeto nas mãos, numa hora certa entre o primeiro cantar do galo e o sol alto. Refaça os passos daquela manhã e veja quem não tem para onde correr.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Criador",
      "Herdeira",
      "Domador",
      "Capataz",
      "Jurado"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Local",
      "values": [
        {
          "id": "Fazenda Campo Alegre",
          "label": "Fazenda Campo Alegre",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Museu do Mangalarga",
          "label": "Museu do Mangalarga",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Pouso do Tropeiro",
          "label": "Pouso do Tropeiro",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Picadeiro",
          "label": "Picadeiro",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Pasto",
          "label": "Pasto",
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
          "id": "Rebenque",
          "label": "Rebenque",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cabresto",
          "label": "Cabresto",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Trofeu",
          "label": "Troféu",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Ferradura",
          "label": "Ferradura",
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
    "prompt": "Laudo pericial: a temperatura do corpo e a rigidez cadavérica situam a morte por volta das 07h. O Barão foi encontrado caído no Pouso do Tropeiro, o velho abrigo de tropeiros nos fundos da fazenda.",
    "evidence": [
      {
        "cat": "local",
        "value": "Pouso do Tropeiro"
      },
      {
        "cat": "hora",
        "value": "07h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "No Pasto, entre o capim ainda orvalhado, quem por ali andava não trazia consigo a Ferradura.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Pasto"
          },
          "b": {
            "cat": "objeto",
            "value": "Ferradura"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Entre as vitrines e os arreios antigos do Museu do Mangalarga, quem circulava levava o Cabresto na mão.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Museu do Mangalarga"
          },
          "b": {
            "cat": "objeto",
            "value": "Cabresto"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "O Criador não arredou pé da sede da Fazenda Campo Alegre.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Fazenda Campo Alegre",
          "pos": 0
        }
      ]
    },
    {
      "id": "c4",
      "text": "Às 06h, quando o galo mal terminara o primeiro canto, o Capataz ainda não fora avistado.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "06h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c5",
      "text": "O Criador só deu as caras quando os ponteiros marcavam 09h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "09h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c6",
      "text": "A Herdeira segurava a Ferradura, aquela ferradura de sorte que o Barão jurava ter tirado do casco do primeiro campeão da casa.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Ferradura",
          "pos": 1
        }
      ]
    },
    {
      "id": "c7",
      "text": "O Capataz, homem de conhecer cada palmo da propriedade, não pisou o Pasto naquela manhã.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Pasto",
          "pos": 3
        }
      ]
    },
    {
      "id": "c8",
      "text": "A Herdeira passou a manhã no Picadeiro, onde os animais eram apresentados aos compradores.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Picadeiro",
          "pos": 1
        }
      ]
    },
    {
      "id": "c9",
      "text": "Às 10h, com o sol já alto sobre a serra, o Criador não estava mais por perto.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "10h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c10",
      "text": "O Jurado, pontual como manda a comissão da raça, cravou sua presença às 08h.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "08h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c11",
      "text": "A Faca — a lâmina que a todos fez pensar no pior — só esteve em mãos às 10h, quando a manhã já ia longe.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Faca"
          },
          "b": {
            "cat": "hora",
            "value": "10h"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "O Capataz carregava o Troféu, a taça de prata que seria entregue ao vencedor do pregão.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Trofeu",
          "pos": 3
        }
      ]
    }
  ],
  "baseRaw": 5.500171079680357
};
