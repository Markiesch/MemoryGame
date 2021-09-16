<template>
  <section>
    <router-link class="link" to="/">
      <svg viewBox="0 0 512 512">
        <path
          d="M44.8 155.826h149.234c-5.841-8.248-10.57-16.558-14.153-24.918C166.248 99.098 189.778 63.986 224 64c18.616.008 32.203 10.897 40 29.092 12.122 28.286 78.648 64.329 107.534 77.323 17.857 7.956 28.453 25.479 28.464 43.845l.002.001v171.526c0 11.812-8.596 21.897-20.269 23.703-46.837 7.25-61.76 38.483-123.731 38.315-2.724-.007-13.254.195-16 .195-50.654 0-81.574-22.122-72.6-71.263-18.597-9.297-30.738-39.486-16.45-62.315-24.645-21.177-22.639-53.896-6.299-70.944H44.8c-24.15 0-44.8-20.201-44.8-43.826 0-23.283 21.35-43.826 44.8-43.826zM440 176h48c13.255 0 24 10.745 24 24v192c0 13.255-10.745 24-24 24h-48c-13.255 0-24-10.745-24-24V200c0-13.255 10.745-24 24-24zm24 212c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z"
        ></path>
      </svg>
      Settings
    </router-link>
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
      <div class="input-container select">
        <input v-model="settings.deleteCorrect" id="deleteCorrect" type="checkbox" />
        <label for="deleteCorrect">Should matched cards be deleted?</label>
      </div>
      <div class="input-container select">
        <input v-model="settings.keepPosition" id="keepPosition" type="checkbox" />
        <label for="keepPosition">Should the remaining cards stay in their position? NOTE: this only works when delete matched cards is enabled</label>
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
    deleteCorrect: false,
    keepPosition: true,
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

svg {
  height: 1em;
}

.link {
  font-size: 40px;
  color: var(--primary-color);
  text-decoration: none;
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

.input-container + .input-container {
  margin-top: 1em;
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
