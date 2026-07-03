// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "sao-tome-vigilia",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "Vigília na pedra",
  "story": "São Tomé das Letras dorme sobre o quartzito, a 1.440 metros do mar, e há quem jure que a montanha respira — que suas grutas são bocas de portais e que, em noites certas, o céu desce até a Pedra do Disco. Foi numa dessas madrugadas que a vigília ufológica se ajuntou, terços de fumaça e olhos voltados às estrelas. Quando a névoa se rasgou com o primeiro sol, o mestre que guiava o grupo — o único que dizia guardar o segredo dos portais — jazia frio entre as pedras, o rosto virado para o alto. Cinco velaram com ele naquela noite: cada qual num ponto da cidade de cristal, cada qual com algo nas mãos, cada qual sob uma hora diferente do relógio. A montanha viu tudo e não fala. Reconstrua a madrugada, cruze os lugares, os objetos e os horários, e descubra quem sobra quando todos os portais se fecham.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Ufólogo",
      "Médium",
      "Guia",
      "Fotógrafo",
      "Morador"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Local",
      "values": [
        {
          "id": "Gruta do Carimbado",
          "label": "Gruta do Carimbado",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Pedra do Disco",
          "label": "Pedra do Disco",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Casa da Piramide",
          "label": "Casa da Pirâmide",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Igreja Matriz",
          "label": "Igreja Matriz",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Mirante",
          "label": "Mirante",
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
          "id": "Lanterna",
          "label": "Lanterna",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cristal",
          "label": "Cristal",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Camera",
          "label": "Câmera",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Corda",
          "label": "Corda",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Cantil",
          "label": "Cantil",
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
    }
  ],
  "solution": {},
  "difficulty": 0,
  "crime": {
    "prompt": "O laudo é seco onde a montanha é lendária: a temperatura hepática e o rigor cadavérico situam a parada cardíaca à 01h. O corpo do mestre foi recolhido no Mirante, sobre a laje de quartzito voltada para o vale, sem sinais de arrasto — a morte se deu ali mesmo, àquela hora, com a cidade já em silêncio.",
    "evidence": [
      {
        "cat": "local",
        "value": "Mirante"
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
      "text": "O cantil rodou de mão em mão pela noite, mas não pertencia a quem já vagava entre as pedras às 21h — eram vultos distintos.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Cantil"
          },
          "b": {
            "cat": "hora",
            "value": "21h"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "A mesma figura que empunhava a câmera já rondava a montanha desde as 21h, à espreita da primeira luz no céu.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Camera"
          },
          "b": {
            "cat": "hora",
            "value": "21h"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "O Ufólogo, por mais que se vangloriasse de enxergar no escuro, não trazia consigo a lanterna.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "objeto",
          "value": "Lanterna",
          "pos": 0
        }
      ]
    },
    {
      "id": "c4",
      "text": "Quem desceu à Gruta do Carimbado, ventre úmido de quartzito, levava a câmera a tiracolo.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Gruta do Carimbado"
          },
          "b": {
            "cat": "objeto",
            "value": "Camera"
          }
        }
      ]
    },
    {
      "id": "c5",
      "text": "O Morador, que conhecia cada fenda e cada eco daquela pedra, foi visto à meia-noite em ponto — perto demais da hora fatídica para o gosto de muitos.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "00h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c6",
      "text": "O Fotógrafo trazia um cristal preso ao pescoço, que reluzia frio a cada facho de luz.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Cristal",
          "pos": 3
        }
      ]
    },
    {
      "id": "c7",
      "text": "Quem se postou na Pedra do Disco, olhos varando o firmamento, não era o dono do cristal — esse guardava-o em outro ponto da noite.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Pedra do Disco"
          },
          "b": {
            "cat": "objeto",
            "value": "Cristal"
          }
        }
      ]
    },
    {
      "id": "c8",
      "text": "O Médium, apesar de invocar as luzes do alto, não pôs os pés na Pedra do Disco naquela madrugada.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Pedra do Disco",
          "pos": 1
        }
      ]
    },
    {
      "id": "c9",
      "text": "Quem carregava o cantil não foi a mesma alma avistada às 23h — outra sombra ocupava aquele horário.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "objeto",
            "value": "Cantil"
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
      "text": "O Médium surgiu entre as névoas às 23h, murmurando que os portais estavam quase abertos.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "23h",
          "pos": 1
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quem quer que segurasse o cantil ainda rondava as pedras à 00h, quando a madrugada apertou o frio.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "Cantil"
          },
          "b": {
            "cat": "hora",
            "value": "00h"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Na Casa da Pirâmide houve quem velasse, mas não era o portador do cristal.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Casa da Piramide"
          },
          "b": {
            "cat": "objeto",
            "value": "Cristal"
          }
        }
      ]
    },
    {
      "id": "c13",
      "text": "Às 22h, ninguém pôde jurar ter cruzado com o Morador — não era a hora dele.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "22h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c14",
      "text": "A lanterna e o horário das 22h pertenciam à mesma pessoa, cujo facho riscou a escuridão naquele instante.",
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
            "value": "22h"
          }
        }
      ]
    },
    {
      "id": "c15",
      "text": "Tampouco às 21h o Morador havia se juntado à vigília — chegara mais tarde à pedra.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "21h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c16",
      "text": "Quem velou junto à Igreja Matriz, sob o sino mudo, trazia o cantil a tiracolo.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Igreja Matriz"
          },
          "b": {
            "cat": "objeto",
            "value": "Cantil"
          }
        }
      ]
    }
  ],
  "baseRaw": 5.322432511694039
};
