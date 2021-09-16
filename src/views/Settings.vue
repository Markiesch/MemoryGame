<template>
  <section>
    <h1>Settings</h1>
    <form @change="saveSettings">
      <h2>Game Settings</h2>
      <div class="input-container">
        <label for="amount">The amount of cards displayed in games</label>
        <select v-model="settings.amount" id="amount">
          <option value="4">4 tiles</option>
          <option value="6">6 tiles</option>
          <option value="8">8 tiles</option>
          <option value="10">10 tiles</option>
          <option value="12">12 tiles</option>
          <option value="14">14 tiles</option>
          <option value="16">16 tiles</option>
        </select>
      </div>
      <h2>Preferences</h2>
      <div class="input-container select">
        <input v-model="settings.confetti" id="confetti" type="checkbox" />
        <label for="confetti">Fire confetti when I get a correct match</label>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Settings } from "../store/utils";

@Component
export default class Home extends Vue {
  mounted() {
    this.settings = this.getSettings;
    document.title = `Memory - Settings`;
  }
  settings: Settings = {
    amount: 16,
    confetti: true,
  };
  @Getter("getSettings") getSettings!: Settings;

  saveSettings() {
    console.log(this.settings);
    this.$store.commit("setSettings", this.settings);
  }
}
</script>

<style scoped>
section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 3rem;
  height: 100vh;
}

h1 {
  font-size: 40px;
  color: var(--primary-color);
}

h2 {
  font-size: 24px;
  margin: 1em 0 0.5em 0;
  color: var(--primary-color);
}

.input-container {
  display: flex;
  align-items: center;
}

input {
  border: 1px solid #cacece;
  cursor: pointer;
}

label {
  user-select: none;
  padding-right: 1rem;
  color: #444;
}

.select label {
  cursor: pointer;
  padding-left: 1rem;
}

.select input {
  appearance: none;
  padding: 10px;
  border-radius: 50%;
  position: relative;
}

.select input::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
}

.select input:checked::after {
  border: 8px solid var(--primary-color);
}

select {
  border: 1px solid #cacece;
  padding: 0.25em;
  cursor: pointer;
  outline: none;
}
</style>
