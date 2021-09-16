export function saveStatePlugin(store: any): void {
  store.subscribe((mutation: any, state: any) => localStorage.setItem("settings", JSON.stringify(state.settings)));
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
  confetti: boolean;
}
