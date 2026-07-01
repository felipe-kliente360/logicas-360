// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "estudio-de-radio",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Silêncio no ar",
  "story": "A voz mais ouvida do país apagou-se de vez no meio da madrugada, ali mesmo, entre os corredores surdos da emissora. Enquanto o país dormia embalado pelo programa noturno, quatro pessoas rondavam o prédio como sombras — cada uma refugiada numa sala diferente, cada uma segurando um objeto, cada uma marcada por um horário próprio. A luz vermelha do 'no ar' piscava sobre o silêncio, e o eco daquela última transmissão ainda parecia rondar as paredes.",
  "size": 4,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Locutor",
      "Produtor",
      "Sonoplasta",
      "Convidada"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Sala",
      "values": [
        {
          "id": "Estudio",
          "label": "Estúdio",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cabine",
          "label": "Cabine",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Saguao",
          "label": "Saguão",
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
        }
      ]
    },
    {
      "id": "objeto",
      "label": "Objeto",
      "values": [
        {
          "id": "Microfone",
          "label": "Microfone",
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
          "id": "Fone",
          "label": "Fone",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Roteiro",
          "label": "Roteiro",
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
    "prompt": "O laudo pericial cravou a hora da morte à 01h. O corpo, já frio, jazia entre as prateleiras empoeiradas do Arquivo.",
    "evidence": [
      {
        "cat": "local",
        "value": "Arquivo"
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
      "text": "Fosse quem fosse a mão que segurava o Microfone, ela não foi vista pela emissora às 22h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Microfone"
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
      "text": "Nas mãos do Produtor, o Fone jamais foi encontrado.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Fone",
          "pos": 1
        }
      ]
    },
    {
      "id": "c3",
      "text": "O Produtor, garantem os registros, não pôs os pés no Estúdio naquela noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Estudio",
          "pos": 1
        }
      ]
    },
    {
      "id": "c4",
      "text": "O Locutor, por mais que o procurassem, nunca esteve de posse do Roteiro.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Roteiro",
          "pos": 0
        }
      ]
    },
    {
      "id": "c5",
      "text": "Era o Sonoplasta quem trazia o Microfone consigo, disso não restou dúvida.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Microfone",
          "pos": 2
        }
      ]
    },
    {
      "id": "c6",
      "text": "Aquele que se trancou no Estúdio tinha, entre as mãos, o Roteiro.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Estudio"
          },
          "b": {
            "cat": "objeto",
            "value": "Roteiro"
          }
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem carregava o Fone não deu as caras às 22h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Fone"
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
      "text": "E esse mesmo dono do Fone tampouco surgiu quando o relógio bateu 00h.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Fone"
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
      "text": "A pessoa que guardava a Fita foi flagrada de ronda às 23h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Fita"
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
      "text": "Na Cabine abafada, quem lá se encontrava tinha em punho o Microfone.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Cabine"
          },
          "b": {
            "cat": "objeto",
            "value": "Microfone"
          }
        }
      ]
    },
    {
      "id": "c11",
      "text": "No Saguão deserto, quem por ali passava trazia a Fita consigo.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Saguao"
          },
          "b": {
            "cat": "objeto",
            "value": "Fita"
          }
        }
      ]
    }
  ]
};
