// Efeitos de acerto: som curto (Web Audio) + vibração. Tudo opcional (Configurações).
let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  try {
    ctx ||= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, gain = 0.14) {
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.connect(g);
  g.connect(ac.destination);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

/** "ploc" curto ao acertar uma posição. */
export function chime(on: boolean) {
  if (on) tone(880, 0, 0.16);
}

/** pequeno arpejo na vitória. */
export function winChime(on: boolean) {
  if (!on) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.1, 0.22, 0.12));
}

/** rajada de ruído filtrado — base dos sons percussivos (máquina, carimbo). */
function noise(start: number, dur: number, freq: number, q: number, gain: number, type: BiquadFilterType = "bandpass") {
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + start;
  const len = Math.max(1, Math.floor(ac.sampleRate * dur));
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const f = ac.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  const g = ac.createGain();
  src.connect(f);
  f.connect(g);
  g.connect(ac.destination);
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
}

/** "clack" de máquina de escrever — ao destacar uma pista. */
export function typeTick(on: boolean) {
  if (!on) return;
  noise(0, 0.028, 2400, 0.8, 0.1);
  tone(150, 0, 0.03, 0.05);
}

/** clique seco de papel/ficha — ao preencher um campo. */
export function fileClick(on: boolean) {
  if (!on) return;
  noise(0, 0.022, 1500, 1.1, 0.07);
}

/** carimbo seco "tum" — fechamento do caso / acusação certeira. */
export function stamp(on: boolean) {
  if (!on) return;
  noise(0, 0.085, 520, 0.5, 0.28, "lowpass");
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime;
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(165, t0);
  o.frequency.exponentialRampToValueAtTime(68, t0 + 0.13);
  o.connect(g);
  g.connect(ac.destination);
  g.gain.setValueAtTime(0.3, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
  o.start(t0);
  o.stop(t0 + 0.22);
}

/** "thunk" abafado — acusação/verificação errada. */
export function thunk(on: boolean) {
  if (!on) return;
  tone(116, 0, 0.2, 0.12);
  tone(123, 0, 0.2, 0.08);
}

/** vibração curta (se suportado). */
export function buzz(on: boolean, pattern: number | number[] = 18) {
  if (on && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
}
