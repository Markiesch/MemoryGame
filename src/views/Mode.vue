<template>
  <section class="navigator-container">
    <div @click.self="navigate('singleplayer')" class="singleplayer navigator">
      <input v-model="settings.name" @input="saveSettings()" @keydown.enter="navigate('singleplayer')" type="text" maxlength="10" placeholder="Username" />
      <h5>Singleplayer</h5>
      <p>Trying to defeat yourself?</p>
    </div>
    <div @click="navigate('bot')" class="bot navigator">
      <h5>Bot</h5>
      <p>Please don't bully this dumb bot..</p>
    </div>
    <div @click="navigate('multiplayer')" class="multiplayer navigator">
      <h5>Multiplayer</h5>
      <p>Found yourself a challenger?</p>
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
    document.title = `Memory - Select Mode`;
  }

  @Getter("getSettings") settings!: Settings;
  @Action("setMode") setMode: any;
  @Action("setLoadRecent") setLoadRecent: any;

  navigate(mode: "singleplayer" | "multiplayer") {
    if (mode) this.setMode(mode);
    this.setLoadRecent(false);
    router.push({ name: "Game" });
  }

  saveSettings() {
    this.$store.commit("setSettings", this.settings);
  }
}
</script>

<style scoped src="../styles/navigate.css"></style>
