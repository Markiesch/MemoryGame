import Vue from "vue";
import Vuex from "vuex";
import { saveStatePlugin, State, Player, Settings } from "./utils";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [saveStatePlugin],

  state: {
    mode: "singleplayer",
    players: [
      {
        name: "PLAYER 1",
        score: 0,
        time: 0,
      },
      {
        name: "PLAYER 2",
        score: 0,
        time: 0,
      },
    ],
    settings: {
      confetti: true,
    },
  },
  mutations: {},
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
