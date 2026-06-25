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

/** vibração curta (se suportado). */
export function buzz(on: boolean, pattern: number | number[] = 18) {
  if (on && typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
}
