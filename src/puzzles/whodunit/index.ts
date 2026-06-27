// Casos de investigação (whodunit).
import type { Puzzle } from "../../engine/types";
import { puzzle as sumicoPadaria } from "./sumico-padaria";
import { puzzle as rouboMuseu } from "./roubo-museu";
import { puzzle as crimeMansao } from "./crime-mansao";
import { puzzle as tragediaTeatro } from "./tragedia-teatro";
import { puzzle as expressoNoturno } from "./expresso-noturno";
import { puzzle as mansaoSegredos } from "./mansao-segredos";

export const WHODUNIT: Puzzle[] = [
  sumicoPadaria,
  rouboMuseu,
  crimeMansao,
  tragediaTeatro,
  expressoNoturno,
  mansaoSegredos,
];
