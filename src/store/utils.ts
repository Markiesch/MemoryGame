// @ts-ignore
import confetti from "canvas-confetti";

export function saveStatePlugin(store: any) {
  store.subscribe((mutation: any, state: State) => localStorage.setItem("settings", JSON.stringify(state.settings)));
}

export interface State {
  mode: string;
  players: Player[];
  settings: Settings;
}

export interface Player {
  name: string;
  score: number;
  time: number;
}

export interface Settings {
  amount: number;
  confetti: boolean;
  deleteCorrect: boolean;
  keepPosition: boolean;
}

export function firework() {
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  const particleCount = 100;
  confetti(Object.assign(defaults, { particleCount, origin: { x: 0.2, y: 0.6 } }));
  confetti(Object.assign(defaults, { particleCount, origin: { x: 0.4, y: 0.7 } }));
  confetti(Object.assign(defaults, { particleCount, origin: { x: 0.1, y: 0.2 } }));
  confetti(Object.assign(defaults, { particleCount, origin: { x: 0.8, y: 0.4 } }));
  confetti(Object.assign(defaults, { particleCount, origin: { x: 0.9, y: 0.9 } }));
  confetti(Object.assign(defaults, { particleCount, origin: { x: 0.6, y: 0.5 } }));
}

export function launchConfetti() {
  const end = Date.now() + 5 * 1000;
  const colors = ["#bb0000", "#0859fd"];

  frame();
  function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }
}

export const defaultSettings: Settings = {
  amount: 16,
  confetti: true,
  deleteCorrect: false,
  keepPosition: true,
};
