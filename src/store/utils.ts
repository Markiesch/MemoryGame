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
}

export function firework() {
  const animationEnd = Date.now() + 1000;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  let interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 100;
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

export const defaultSettings: Settings = {
  amount: 16,
  confetti: true,
};
