import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Mode from "../views/Mode.vue";
import Game from "../views/Game.vue";
import Victory from "../views/Victory.vue";
import Settings from "../views/Settings.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mode",
    name: "Mode",
    component: Mode,
  },
  {
    path: "/play",
    name: "Game",
    component: Game,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/victory",
    name: "Victory",
    component: Victory,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
