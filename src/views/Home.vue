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
  background-color: rgb(20, 20, 20);
  margin: 0 auto;
  padding: 3rem;
  display: flex;
  min-height: 100vh;
}

@media screen and (max-width: 900px) {
  section {
    flex-direction: column;
  }
}

div {
  flex: 1 1 200px;
  transition: flex 300ms ease;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
}

h5,
p {
  font-size: clamp(2rem, 0.5rem + 6.65vw, 4rem);
  color: white;
  transform: translateY(100px);
  transition: transform 500ms ease, opacity 300ms ease 300ms;
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
  font-size: clamp(1.25rem, 0.875rem + 1.65vw, 1.75rem);
  font-weight: 300;
}

section div:hover p {
  opacity: 1;
}

div::before {
  content: "";
  z-index: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  transition: height 300ms ease;
}

div:hover::before {
  height: 400px;
}

div:hover {
  flex: 1 1 350px;
  cursor: pointer;
}

.singleplayer {
  background-image: url("../assets/singleplayer.jpg");
  background-position: center center;
  background-size: cover;
}

.multiplayer {
  background-image: url("../assets/multiplayer.jpg");
  background-position: center center;
  background-size: cover;
}

.settings {
  background-image: url("../assets/settings.jpg");
  background-position: center center;
  background-size: cover;
}
</style>
