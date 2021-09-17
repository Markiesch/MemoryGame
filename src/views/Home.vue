<template>
  <section class="navigator-container">
    <div @click.self="navigate('Game', 'singleplayer')" class="singleplayer navigator">
      <input v-model="settings.name" @input="saveSettings()" type="text" placeholder="Username" />
      <h5>Singleplayer</h5>
      <p>Trying to defeat yourself?</p>
    </div>
    <div @click="navigate('Game', 'multiplayer')" class="multiplayer navigator">
      <h5>Multiplayer</h5>
      <p>Found yourself a challenger?</p>
    </div>
    <div @click="navigate('Settings')" class="settings navigator">
      <h5>Settings</h5>
      <p>Customize your experience!</p>
    </div>
  </section>
</template>

<script lang="ts">
import router from "@/router";
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { Settings } from "../store/utils";

@Component
export default class Home extends Vue {
  mounted() {
    document.title = `Memory - Main Menu`;
  }

  @Getter("getSettings") settings!: Settings;
  @Action("setMode") setMode: any;

  navigate(to: string, mode: "singleplayer" | "multiplayer") {
    if (mode) this.setMode(mode);
    router.push({ name: to });
  }

  saveSettings() {
    this.$store.commit("setSettings", this.settings);
  }
}
</script>

<style scoped>
input {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  border: none;
  text-align: center;
  color: white;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 30px;
  padding: 0.5em;
  border-radius: 5px;
  max-width: 95%;
}

.navigator-container {
  margin: 0 auto;
  padding: 6rem;
  display: flex;
  gap: 1rem;
  background-color: rgb(10, 10, 10);
  min-height: 100vh;
}

.navigator {
  position: relative;
  display: flex;
  cursor: pointer;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  flex: 1 1 200px;
  overflow: hidden;
  transition: flex 300ms ease;
  opacity: 0;
  transform: translateY(-100px);
  animation: fade-in 1200ms ease forwards;
}

.multiplayer {
  animation-delay: 300ms;
}

.settings {
  animation-delay: 600ms;
}

@keyframes fade-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navigator:hover {
  flex: 1 1 350px;
}

.navigator::after {
  content: "";
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: filter 1000ms ease;
  filter: brightness(0.4);
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
}

.settings::after {
  background-image: url("../assets/settings.jpg");
}

.navigator::before {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  transition: height 500ms ease;
}

.navigator:hover::before {
  height: 400px;
}

h5,
p {
  font-size: clamp(2rem, 0.5rem + 4vw, 4rem);
  z-index: 3;
  color: white;
  transform: translateY(100px);
  transition: transform 500ms ease, opacity 300ms ease;
  user-select: none;
}

.navigator:hover h5,
.navigator:hover p {
  transform: translateY(0);
}

p {
  opacity: 0;
  color: rgb(197, 197, 197);
  margin: 1rem 0 4rem 0;
  font-size: clamp(1.25rem, 0.875rem + 1vw, 1.75rem);
  font-weight: 300;
}

.navigator:hover p {
  opacity: 1;
}

@media screen and (max-width: 900px) {
  section {
    flex-direction: column;
  }

  .navigator-container {
    padding: 1rem;
  }

  .navigator:hover {
    flex: 1 1 200px;
  }

  .navigator {
    transform: translateX(-100px);
  }
}
</style>
