// AUTO-GERADO por scripts/generate.ts (seed 2). Lógica determinística; narrativa autoral.
import type { Puzzle } from "../../engine/types";

export const puzzle: Puzzle = {
  id: "podio-hackathon",
  title: "Pódio do hackathon",
  story: "Quatro finalistas subiram ao palco para a premiação do hackathon. Cada um apresentou um projeto numa linguagem diferente. Descubra a colocação de cada um.",
  themeId: "casas-classico",
  size: 4,
  spine: {
    id: "colocacao",
    label: "Colocação",
    ordered: true,
    labels: [
      "1º lugar",
      "2º lugar",
      "3º lugar",
      "4º lugar"
    ],
    referential: "1º lugar = campeão (topo do pódio); 4º lugar = último colocado."
  },
  categories: [
    {
      id: "nome",
      label: "Finalista",
      values: [
        {
          id: "Bia",
          label: "Bia",
          display: {
            kind: "text"
          }
        },
        {
          id: "Caio",
          label: "Caio",
          display: {
            kind: "text"
          }
        },
        {
          id: "Duda",
          label: "Duda",
          display: {
            kind: "text"
          }
        },
        {
          id: "Enzo",
          label: "Enzo",
          display: {
            kind: "text"
          }
        }
      ]
    },
    {
      id: "projeto",
      label: "Projeto",
      values: [
        {
          id: "App de caronas",
          label: "App de caronas",
          display: {
            kind: "text"
          }
        },
        {
          id: "Jogo educativo",
          label: "Jogo educativo",
          display: {
            kind: "text"
          }
        },
        {
          id: "Bot financeiro",
          label: "Bot financeiro",
          display: {
            kind: "text"
          }
        },
        {
          id: "Site de receitas",
          label: "Site de receitas",
          display: {
            kind: "text"
          }
        }
      ]
    },
    {
      id: "linguagem",
      label: "Linguagem",
      values: [
        {
          id: "Python",
          label: "Python",
          display: {
            kind: "text"
          }
        },
        {
          id: "Rust",
          label: "Rust",
          display: {
            kind: "text"
          }
        },
        {
          id: "TypeScript",
          label: "TypeScript",
          display: {
            kind: "text"
          }
        },
        {
          id: "Go",
          label: "Go",
          display: {
            kind: "text"
          }
        }
      ]
    }
  ],
  solution: {
    nome: [
      "Caio",
      "Enzo",
      "Bia",
      "Duda"
    ],
    projeto: [
      "App de caronas",
      "Jogo educativo",
      "Site de receitas",
      "Bot financeiro"
    ],
    linguagem: [
      "Python",
      "TypeScript",
      "Go",
      "Rust"
    ]
  },
  difficulty: 6,
  source: "gerador",
  clues: [
    {
      id: "g0",
      text: "Caio e App de caronas estão na mesma colocação.",
      highlights: [
        {
          cat: "nome"
        },
        {
          cat: "projeto"
        }
      ],
      constraints: [
        {
          k: "same",
          a: {
            cat: "nome",
            value: "Caio"
          },
          b: {
            cat: "projeto",
            value: "App de caronas"
          }
        }
      ]
    },
    {
      id: "g1",
      text: "Jogo educativo e TypeScript estão na mesma colocação.",
      highlights: [
        {
          cat: "projeto"
        },
        {
          cat: "linguagem"
        }
      ],
      constraints: [
        {
          k: "same",
          a: {
            cat: "projeto",
            value: "Jogo educativo"
          },
          b: {
            cat: "linguagem",
            value: "TypeScript"
          }
        }
      ]
    },
    {
      id: "g2",
      text: "Site de receitas fica em 3º lugar.",
      highlights: [
        {
          cat: "projeto",
          pos: 2
        }
      ],
      constraints: [
        {
          k: "at",
          cat: "projeto",
          value: "Site de receitas",
          pos: 2
        }
      ]
    },
    {
      id: "g3",
      text: "TypeScript vem antes de Bia (mais perto do início).",
      highlights: [
        {
          cat: "linguagem"
        },
        {
          cat: "nome"
        }
      ],
      constraints: [
        {
          k: "before",
          a: {
            cat: "linguagem",
            value: "TypeScript"
          },
          b: {
            cat: "nome",
            value: "Bia"
          }
        }
      ]
    },
    {
      id: "g4",
      text: "Bia vem antes de Rust (mais perto do início).",
      highlights: [
        {
          cat: "nome"
        },
        {
          cat: "linguagem"
        }
      ],
      constraints: [
        {
          k: "before",
          a: {
            cat: "nome",
            value: "Bia"
          },
          b: {
            cat: "linguagem",
            value: "Rust"
          }
        }
      ]
    },
    {
      id: "g5",
      text: "Python fica imediatamente antes de TypeScript.",
      highlights: [
        {
          cat: "linguagem"
        },
        {
          cat: "linguagem"
        }
      ],
      constraints: [
        {
          k: "immediateLeft",
          a: {
            cat: "linguagem",
            value: "Python"
          },
          b: {
            cat: "linguagem",
            value: "TypeScript"
          }
        }
      ]
    },
    {
      id: "g6",
      text: "Duda fica em 4º lugar.",
      highlights: [
        {
          cat: "nome",
          pos: 3
        }
      ],
      constraints: [
        {
          k: "at",
          cat: "nome",
          value: "Duda",
          pos: 3
        }
      ]
    }
  ]
};
