// engine/types.ts
// Modelo de dados genérico do puzzle. Nada de cor/capa hardcoded: é N entidades × M
// categorias, e cada valor declara como se exibe (cor, ícone/emoji ou texto).

export type ValueDisplay =
  | { kind: "color"; hex: string }
  | { kind: "icon"; icon: string } // emoji ou nome de ícone
  | { kind: "text" };

export interface CategoryValue {
  id: string; // id estável, ex.: "amarelo"
  label: string; // rótulo exibido, ex.: "Amarelo"
  display: ValueDisplay;
}

export interface Category {
  id: string; // "capa"
  label: string; // "Capa"
  values: CategoryValue[];
}

/** Eixo "espinha": as entidades dispostas em sequência (fila, casas em linha). */
export interface Spine {
  id: string; // "posicao" | "casa"
  label: string; // "Posição na fila" | "Casa"
  ordered: boolean; // true => pistas de ordem/adjacência fazem sentido
  labels: string[]; // ["1ª","2ª",...] | ["Casa 1",...]
  /** SEMPRE preencher quando ordered=true. Declara o referencial de direção. */
  referential?: string; // ex.: "Posição 1 = frente da fila (embarca primeiro); 5 = fim."
}

/** Predicado verificável pela máquina. Toda pista é composta de 1+ constraints. */
export type Constraint =
  | { k: "at"; cat: string; value: string; pos: number } // valor está na posição
  | { k: "notAt"; cat: string; value: string; pos: number }
  | { k: "same"; a: Ref; b: Ref } // mesma entidade
  | { k: "diff"; a: Ref; b: Ref } // entidades diferentes
  | { k: "before"; a: Ref; b: Ref } // pos(a) < pos(b)
  | { k: "immediateLeft"; a: Ref; b: Ref } // pos(a)+1 === pos(b)
  | { k: "adjacent"; a: Ref; b: Ref } // |pos(a)-pos(b)| === 1
  | { k: "offset"; a: Ref; b: Ref; delta: number } // pos(a) === pos(b)+delta
  | { k: "end"; cat: string; value: string; which: "first" | "last" }
  | { k: "notEnd"; cat: string; value: string; which: "first" | "last" };

export interface Ref {
  cat: string;
  value: string;
}

export interface Highlight {
  cat: string;
  pos?: number;
} // sem pos => coluna inteira (categoria)

export interface Clue {
  id: string;
  text: string; // texto exibido (escrito/polido pela camada de narrativa)
  highlights: Highlight[]; // slots que "acendem" ao tocar a pista
  constraints: Constraint[]; // predicados que o solver avalia (pode ser composta)
}

export interface Puzzle {
  id: string;
  title: string;
  story: string; // historinha de abertura
  themeId: string;
  size: number; // nº de entidades (ex.: 5)
  spine: Spine;
  categories: Category[];
  clues: Clue[];
  solution: Record<string /*categoryId*/, string[] /*valueId por índice de posição*/>;
  difficulty: number; // 1..10
}
