<template>
  <section>
    <div @click="navigate('Game', 'singleplayer')" class="singleplayer">
      <h5>Singleplayer</h5>
      <p>Trying to defeat yourself?</p>
    </div>
    <div @click="navigate('Game', 'multiplayer')" class="multiplayer">
      <h5>Multiplayer</h5>
      <p>Found yourself a challenger?</p>
    </div>
    <div @click="navigate('Settings')" class="settings">
      <h5>Settings</h5>
      <p>Customize your experience!</p>
    </div>
  </section>
</template>

<script lang="ts">
import router from "@/router";
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class Home extends Vue {
  @Action("setMode") setMode: any;

  navigate(to: string, mode: "singleplayer" | "multiplayer") {
    if (mode) this.setMode(mode);
    router.push({ name: to });
  }
}
</script>

<style scoped>
section {
  background-color: rgb(10, 10, 10);
  margin: 0 auto;
  padding: 4rem;
  display: flex;
  gap: 1rem;
  min-height: 100vh;
}

div {
  position: relative;
  display: flex;
  cursor: pointer;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  flex: 1 1 200px;
  overflow: hidden;
  transition: flex 300ms ease;
}

div:hover {
  flex: 1 1 350px;
}

div::after {
  content: "";
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: filter 1000ms ease;
  filter: brightness(0.7);
  background-position: center center;
  background-size: cover;
}

div:hover::after {
  filter: brightness(1);
}

.singleplayer::after {
  background-image: url("../assets/singleplayer.jpg");
}

.multiplayer::after {
  background-image: url("../assets/multiplayer.jpg");
  filter: brightness(0.5);
}

.settings::after {
  background-image: url("../assets/settings.jpg");
}

div::before {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  transition: height 500ms ease 300ms;
}

div:hover::before {
  height: 400px;
}

h5,
p {
  font-size: clamp(2rem, 0.5rem + 4vw, 4rem);
  z-index: 3;
  color: white;
  transform: translateY(100px);
  transition: transform 500ms ease 300ms, opacity 300ms ease 500ms;
  user-select: none;
}

section div:hover h5,
section div:hover p {
  transform: translateY(0);
}

p {
  opacity: 0;
  color: rgb(197, 197, 197);
  margin: 1rem 0 4rem 0;
  font-size: clamp(1.25rem, 0.875rem + 1vw, 1.75rem);
  font-weight: 300;
}

section div:hover p {
  opacity: 1;
}

@media screen and (max-width: 900px) {
  section {
    flex-direction: column;
  }
  div:hover {
    flex: 1 1 200px;
  }
}
</style>
