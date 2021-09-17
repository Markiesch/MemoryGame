import Vue from "vue";
import Vuex from "vuex";
import { saveStatePlugin, State, Player, Settings, defaultSettings, recentGame } from "./utils";

Vue.use(Vuex);

// @ts-ignore
let settings: Settings = JSON.parse(localStorage.getItem("settings"));
if (settings === null || settings === undefined) settings = defaultSettings;
// @ts-ignore
let recentGame: recentGame | null = JSON.parse(localStorage.getItem("recentGame"));
if (recentGame === null || recentGame === undefined) recentGame = null;

export default new Vuex.Store({
  plugins: [saveStatePlugin],

  state: {
    mode: "singleplayer",
    loadRecent: false,
    players: [
      {
        score: 0,
        time: 0,
      },
      {
        score: 0,
        time: 0,
      },
    ],
    settings: settings,
    recentGame,
  },
  mutations: {
    setSettings(state: State, newSettings: Settings) {
      state.settings = newSettings;
    },
    setLatestGame(state: State, newGame: recentGame) {
      state.recentGame = newGame;
    },
  },
  actions: {
    setMode({ state }: { state: State }, mode: "singleplayer" | "multiplayer") {
      state.mode = mode;
    },
    setLoadRecent({ state }: { state: State }, load: boolean) {
      state.loadRecent = load;
    },
    savePlayers({ state }: { state: State }, players: Player[]) {
      state.players = players;
    },
  },
  getters: {
    getMode(state: State): string {
      return state.mode;
    },
    getPlayers(state: State): Player[] {
      return state.players;
    },
    getSettings(state: State): Settings {
      return state.settings;
    },
    getLoadRecent(state: State): boolean {
      return state.loadRecent;
    },
    getLatestGame(state: State): recentGame | null {
      return state.recentGame;
    },
  },
});
