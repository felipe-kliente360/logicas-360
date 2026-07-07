// Caso GERADO pelo motor determinístico (whodunit-gen). Pele autoral, lógica gerada.
import type { Puzzle } from "../../engine/types";
export const puzzle: Puzzle = {
  "id": "cyber-permissao-indevida",
  "kind": "whodunit",
  "source": "gerador",
  "themeId": "dossie",
  "title": "A permissão indevida",
  "story": "Segunda de manhã, café ainda quente, e o canal #seguranca da Kliente 360 pega fogo: dados sigilosos de clientes amanheceram visíveis para gente que não devia enxergar nem o CEP. Alguém abriu uma fresta de acesso na org e foi embora assobiando. O log de auditoria não mente, mas também não aponta o dedo: cinco pessoas mexeram no Setup naquele dia, cada uma num escopo diferente, cada uma concedendo um tipo de acesso, cada uma num horário. Escopo, acesso e horário são tudo o que temos. Cruze as três colunas e veja quem sobra no fim da planilha.",
  "size": 5,
  "spine": {
    "id": "suspeito",
    "label": "Suspeito",
    "ordered": false,
    "labels": [
      "Mel",
      "Téo",
      "Duda",
      "Igor",
      "Bia"
    ]
  },
  "categories": [
    {
      "id": "local",
      "label": "Escopo",
      "values": [
        {
          "id": "Perfil",
          "label": "Perfil",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Sharing Rule",
          "label": "Sharing Rule",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "OWD",
          "label": "OWD",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Grupo Publico",
          "label": "Grupo público",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Fila",
          "label": "Fila",
          "display": {
            "kind": "text"
          }
        }
      ]
    },
    {
      "id": "objeto",
      "label": "Acesso",
      "values": [
        {
          "id": "View All",
          "label": "View All",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Modify All",
          "label": "Modify All",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Export Reports",
          "label": "Export Reports",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "Manage Users",
          "label": "Manage Users",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "API Enabled",
          "label": "API Enabled",
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
          "id": "14h",
          "label": "14h",
          "display": {
            "kind": "text"
          }
        },
        {
          "id": "15h",
          "label": "15h",
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
    "prompt": "A auditoria de acesso carimbou a exposição às 10h, com o escopo afetado em OWD.",
    "evidence": [
      {
        "cat": "local",
        "value": "OWD"
      },
      {
        "cat": "hora",
        "value": "10h"
      }
    ]
  },
  "clues": [
    {
      "id": "c1",
      "text": "Quem cobriu a Fila naquele dia não estava com Manage Users no crachá.",
      "highlights": [],
      "constraints": [
        {
          "k": "diff",
          "a": {
            "cat": "local",
            "value": "Fila"
          },
          "b": {
            "cat": "objeto",
            "value": "Manage Users"
          }
        }
      ]
    },
    {
      "id": "c2",
      "text": "Quem mexeu na Sharing Rule saiu de lá com Modify All ligado.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "local",
            "value": "Sharing Rule"
          },
          "b": {
            "cat": "objeto",
            "value": "Modify All"
          }
        }
      ]
    },
    {
      "id": "c3",
      "text": "Mel passou a manhã enfiada na edição do Perfil.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Perfil",
          "pos": 0
        }
      ]
    },
    {
      "id": "c4",
      "text": "Às 09h, Igor ainda não tinha dado as caras no Setup.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "09h",
          "pos": 3
        }
      ]
    },
    {
      "id": "c5",
      "text": "Mel bateu o ponto na org às 14h, logo depois do almoço.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "14h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c6",
      "text": "Téo saiu distribuindo Manage Users, a permissão que dá cópia da chave da casa de todo mundo — parece o suspeito perfeito.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Manage Users",
          "pos": 1
        }
      ]
    },
    {
      "id": "c7",
      "text": "Igor não chegou nem perto da Fila.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "local",
          "value": "Fila",
          "pos": 3
        }
      ]
    },
    {
      "id": "c8",
      "text": "Téo passou o dia remexendo no Grupo público.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "local",
          "value": "Grupo Publico",
          "pos": 1
        }
      ]
    },
    {
      "id": "c9",
      "text": "Às 15h, Mel já tinha fechado o laptop e ido embora.",
      "highlights": [],
      "constraints": [
        {
          "k": "notAt",
          "cat": "hora",
          "value": "15h",
          "pos": 0
        }
      ]
    },
    {
      "id": "c10",
      "text": "O log registra Bia entrando no Setup às 11h em ponto.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "hora",
          "value": "11h",
          "pos": 4
        }
      ]
    },
    {
      "id": "c11",
      "text": "Quem ligou o API Enabled é a mesma pessoa que ainda aparecia logada às 15h.",
      "highlights": [],
      "constraints": [
        {
          "k": "same",
          "a": {
            "cat": "objeto",
            "value": "API Enabled"
          },
          "b": {
            "cat": "hora",
            "value": "15h"
          }
        }
      ]
    },
    {
      "id": "c12",
      "text": "Igor deixou o Export Reports liberado.",
      "highlights": [],
      "constraints": [
        {
          "k": "at",
          "cat": "objeto",
          "value": "Export Reports",
          "pos": 3
        }
      ]
    }
  ],
  "baseRaw": 5.500171079680357
};
