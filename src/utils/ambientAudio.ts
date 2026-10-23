/**
 * Ambient Audio — Warm String Pad
 * Pentatonic string-like chords via Web Audio API.
 * Deliberately AUDIBLE — volume set to comfortable listening level.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let playing = false;
let scheduleHandle: ReturnType<typeof setInterval> | null = null;

// ── Volume ────────────────────────────────────────────────────
// 0.28 = clearly audible background ambience without being loud
const MASTER_VOL = 0.28;

// ── D minor pentatonic — relaxed, no tension ─────────────────
const NOTES = [
  146.83, // D3
  174.61, // F3
  196.00, // G3
  220.00, // A3
  261.63, // C4
  293.66, // D4
  349.23, // F4
  392.00, // G4
];

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;

    // Warm reverb via delay
    const delay1 = audioCtx.createDelay(2.5);
    delay1.delayTime.value = 0.38;
    const fb1 = audioCtx.createGain();
    fb1.gain.value = 0.22;

    const delay2 = audioCtx.createDelay(2.5);
    delay2.delayTime.value = 0.55;
    const fb2 = audioCtx.createGain();
    fb2.gain.value = 0.16;

    delay1.connect(fb1); fb1.connect(delay1);
    delay2.connect(fb2); fb2.connect(delay2);

    masterGain.connect(delay1); delay1.connect(audioCtx.destination);
    masterGain.connect(delay2); delay2.connect(audioCtx.destination);
    masterGain.connect(audioCtx.destination);
  }
  return { ctx: audioCtx!, gain: masterGain! };
}

/** Play one soft string-like note with ADSR */
function playNote(freq: number, when: number, dur: number, vol: number) {
  const { ctx, gain: master } = getCtx();

  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();

  // Sawtooth + low-pass = warm bowed string tone
  osc.type = "sawtooth";
  osc.frequency.value = freq;
  osc.detune.value = (Math.random() - 0.5) * 8; // subtle humanise

  const lpf = ctx.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.value = freq * 3.5;
  lpf.Q.value = 0.6;

  // Second harmonic (octave) for richness
  const osc2 = ctx.createOscillator();
  const osc2Gain = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.value = freq * 2;
  osc2.detune.value = (Math.random() - 0.5) * 5;
  osc2Gain.gain.value = 0.3;

  osc.connect(lpf);
  lpf.connect(oscGain);
  osc2.connect(osc2Gain);
  osc2Gain.connect(oscGain);
  oscGain.connect(master);

  const g = oscGain.gain;
  const attackT  = 0.25;   // fast enough to hear immediately
  const releaseT = 2.5;

  g.setValueAtTime(0, when);
  g.linearRampToValueAtTime(vol, when + attackT);
  g.setValueAtTime(vol * 0.75, when + dur * 0.4);
  g.linearRampToValueAtTime(0, when + dur);

  osc.start(when);
  osc.stop(when + dur + 0.1);
  osc2.start(when);
  osc2.stop(when + dur + 0.1);
}

/** Schedule a gentle pentatonic chord */
function scheduleChord() {
  if (!audioCtx || !playing) return;
  const now = audioCtx.currentTime;

  // Pick 3-4 consonant notes
  const shuffled = [...NOTES].sort(() => Math.random() - 0.5).slice(0, 3 + (Math.random() > 0.5 ? 1 : 0));

  shuffled.forEach((freq, i) => {
    const offset = i * 0.3; // gentle arpeggio
    const vol    = 0.10 + Math.random() * 0.06; // per-note vol, master handles overall level
    const dur    = 5 + Math.random() * 3;
    playNote(freq, now + offset, dur, vol);
  });
}

// ─────────────────────────────────────────────────────────────

export function startAmbient(fadeDuration = 2.0) {
  if (typeof window === "undefined") return;
  const { ctx, gain } = getCtx();

  if (ctx.state === "suspended") ctx.resume();

  if (!playing) {
    playing = true;
    scheduleChord();
    scheduleHandle = setInterval(() => {
      if (playing) scheduleChord();
    }, 6000);
  }

  gain.gain.cancelScheduledValues(ctx.currentTime);
  gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(MASTER_VOL, ctx.currentTime + fadeDuration);
}

export function stopAmbient(fadeDuration = 2.0) {
  if (!audioCtx || !masterGain || !playing) return;
  playing = false;

  if (scheduleHandle !== null) {
    clearInterval(scheduleHandle);
    scheduleHandle = null;
  }

  const ctx = audioCtx;
  const gain = masterGain;
  gain.gain.cancelScheduledValues(ctx.currentTime);
  gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeDuration);
}

export function isAmbientPlaying() {
  return playing;
}
