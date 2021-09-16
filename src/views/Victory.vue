<template>
  <section>
    <img src="../assets/victory.png" alt="Victory!" />
    <h1>Victory!</h1>
    <p>{{ winningPlayer() }} won with {{ winningScore() }} point{{ winningScore() === 1 ? "" : "s" }}</p>
    <div class="player-container">
      <p class="player">{{ players[0].name }}</p>
      <p>VS</p>
      <p class="player">{{ players[1].name }}</p>
    </div>
    <div class="score-container">
      <div>
        <p>{{ players[0].score }}</p>
        <p>Points</p>
        <p>{{ players[1].score }}</p>
      </div>
      <div>
        <p>{{ players[0].time }}</p>
        <p>Time</p>
        <p>{{ players[1].time }}</p>
      </div>
    </div>
    <router-link class="button" :to="{ name: 'Home' }">PLAY AGAIN</router-link>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { launchConfetti } from "../store/utils";

@Component
export default class Victory extends Vue {
  mounted(): void {
    document.title = `Memory - Settings`;
    launchConfetti();
  }

  @Getter("getPlayers") players: any;
  @Getter("getMode") mode: any;

  isTieScore() {
    return this.players[0].score === this.players[1].score;
  }

  isTieTime() {
    return this.players[0].time === this.players[1].time;
  }

  winningPlayer() {
    if (this.mode === "singleplayer") return this.players[0].name;
    if (this.isTieScore()) return this.players[0].time > this.players[1].time ? this.players[1].name : this.players[0].name;
    return this.players[0].score > this.players[1].score ? this.players[0].name : this.players[1].name;
  }
  winningScore() {
    return this.players[0].score > this.players[1].score ? this.players[0].score : this.players[1].score;
  }
}
</script>

<style scoped>
section {
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 70px;
}

img {
  margin: 0 auto;
  display: block;
  max-width: 100%;
}

.player-container,
.score-container > div {
  max-width: 600px;
  margin: 1em auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.player {
  font-weight: 600;
}

.button {
  cursor: pointer;
  font-size: 20px;
  color: white;
  font-weight: 500;
  border: none;
  display: inline-block;
  text-decoration: none;
  background-color: var(--secondary-color);
  padding: 0.6em;
  border-radius: 5px;
  margin-top: 3em;
}
</style>
