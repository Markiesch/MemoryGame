import Vue from "vue";
import Vuex from "vuex";
import { saveStatePlugin, State, Player, Settings, defaultSettings } from "./utils";

Vue.use(Vuex);

// @ts-ignore
let settings: Settings = JSON.parse(localStorage.getItem("settings"));
if (settings === null || settings === undefined) settings = defaultSettings;

export default new Vuex.Store({
  plugins: [saveStatePlugin],

  state: {
    mode: "singleplayer",
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
    settings,
  },
  mutations: {
    setSettings(state: State, newSettings: Settings) {
      state.settings = newSettings;
    },
  },
  actions: {
    setMode({ state }: { state: State }, mode: "singleplayer" | "multiplayer") {
      state.mode = mode;
    },
    savePlayers({ state }: { state: State }, players: Player[]) {
      state.players = players;
    },
  },
  modules: {},
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
  },
});
