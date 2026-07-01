// Casos de investigação (whodunit). 20 casos, ~2 por nível de dificuldade (1..10).
import type { Puzzle } from "../../engine/types";
import { puzzle as sumicoPadaria } from "./sumico-padaria";
import { puzzle as rouboMuseu } from "./roubo-museu";
import { puzzle as crimeMansao } from "./crime-mansao";
import { puzzle as tragediaTeatro } from "./tragedia-teatro";
import { puzzle as rouboJoalheria } from "./roubo-joalheria";
import { puzzle as venenoSpa } from "./veneno-spa";
import { puzzle as naufragioIate } from "./naufragio-iate";
import { puzzle as sabotagemLaboratorio } from "./sabotagem-laboratorio";
import { puzzle as crimeCassino } from "./crime-cassino";
import { puzzle as hotelBeiraMar } from "./hotel-beira-mar";
import { puzzle as expressoNoturno } from "./expresso-noturno";
import { puzzle as sumicoCruzeiro } from "./sumico-cruzeiro";
import { puzzle as escandaloGaleria } from "./escandalo-galeria";
import { puzzle as herancaVinicola } from "./heranca-vinicola";
import { puzzle as conspiracaoObservatorio } from "./conspiracao-observatorio";
import { puzzle as crimeInternato } from "./crime-internato";
import { puzzle as sabotagemGrandePremio } from "./sabotagem-grande-premio";
import { puzzle as banqueteEmbaixada } from "./banquete-embaixada";
import { puzzle as mansaoSegredos } from "./mansao-segredos";
import { puzzle as operaFantasma } from "./opera-fantasma";
// --- piloto do gerador (temas novos, lógica gerada) ---
import { puzzle as crimeSetCinema } from "./crime-set-cinema";
import { puzzle as terrorNoCirco } from "./terror-no-circo";
import { puzzle as sabotagemSubmarino } from "./sabotagem-submarino";

export const WHODUNIT: Puzzle[] = [
  crimeSetCinema,
  terrorNoCirco,
  sabotagemSubmarino,
  sumicoPadaria,
  rouboMuseu,
  crimeMansao,
  tragediaTeatro,
  rouboJoalheria,
  venenoSpa,
  naufragioIate,
  sabotagemLaboratorio,
  crimeCassino,
  hotelBeiraMar,
  expressoNoturno,
  sumicoCruzeiro,
  escandaloGaleria,
  herancaVinicola,
  conspiracaoObservatorio,
  crimeInternato,
  sabotagemGrandePremio,
  banqueteEmbaixada,
  mansaoSegredos,
  operaFantasma,
];
