import Vue from "vue";
import Vuex from "vuex";
import { saveStatePlugin } from "./utils";

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
    setMode({ state }, mode: "singleplayer" | "multiplayer") {
      state.mode = mode;
    },
    savePlayers({ state }, players) {
      state.players = players;
    },
  },
  modules: {},
  getters: {
    getMode(state): string {
      return state.mode;
    },
    getPlayers(state) {
      return state.players;
    },
    getSettings(state) {
      return state.settings;
    },
  },
});
