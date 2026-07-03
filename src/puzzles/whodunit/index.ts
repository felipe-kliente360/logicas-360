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
// --- pirâmide gerada (17 temas novos) ---
import { puzzle as desfileDeModa } from "./desfile-de-moda";
import { puzzle as estudioDeRadio } from "./estudio-de-radio";
import { puzzle as lojaANoite } from "./loja-a-noite";
import { puzzle as seboLivrosRaros } from "./sebo-livros-raros";
import { puzzle as parqueDeDiversoes } from "./parque-de-diversoes";
import { puzzle as restauranteEstrelado } from "./restaurante-estrelado";
import { puzzle as estacaoDeEsqui } from "./estacao-de-esqui";
import { puzzle as harasDoDerby } from "./haras-do-derby";
import { puzzle as clubeDeJazz } from "./clube-de-jazz";
import { puzzle as baseAntartida } from "./base-antartida";
import { puzzle as escavacaoArqueologica } from "./escavacao-arqueologica";
import { puzzle as mosteiroIsolado } from "./mosteiro-isolado";
import { puzzle as estudioDeGravacao } from "./estudio-de-gravacao";
import { puzzle as farolIsolado } from "./farol-isolado";
import { puzzle as dirigivelDeLuxo } from "./dirigivel-de-luxo";
import { puzzle as redacaoDeJornal } from "./redacao-de-jornal";
import { puzzle as estacaoEspacial } from "./estacao-espacial";
// --- lote go-forward (curva de redundância + prosa com red herring) ---
import { puzzle as jardimBotanico } from "./jardim-botanico";
import { puzzle as balnearioCaxambu } from "./balneario-caxambu";

export const WHODUNIT: Puzzle[] = [
  crimeSetCinema,
  terrorNoCirco,
  sabotagemSubmarino,
  desfileDeModa,
  estudioDeRadio,
  lojaANoite,
  seboLivrosRaros,
  parqueDeDiversoes,
  restauranteEstrelado,
  estacaoDeEsqui,
  harasDoDerby,
  clubeDeJazz,
  baseAntartida,
  escavacaoArqueologica,
  mosteiroIsolado,
  estudioDeGravacao,
  farolIsolado,
  dirigivelDeLuxo,
  redacaoDeJornal,
  estacaoEspacial,
  jardimBotanico,
  balnearioCaxambu,
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
