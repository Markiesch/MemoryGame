<template>
  <section class="navigator-container">
    <div @click="navigate('Mode')" class="singleplayer navigator">
      <h5>New Game</h5>
      <p>Ready to play?</p>
    </div>

    <div @click="navigate('Game')" class="multiplayer navigator">
      <h5>Resume</h5>
      <p>Resume your latest game</p>
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
import { Action } from "vuex-class";

@Component
export default class Home extends Vue {
  mounted() {
    document.title = `Memory - Main Menu`;
  }

  @Action("setMode") setMode: any;
  @Action("setLoadRecent") setLoadRecent: any;

  navigate(to: string) {
    if (to === "Game") this.setLoadRecent(true);
    router.push({ name: to });
  }
}
</script>

<style scoped src="../styles/navigate.css"></style>
