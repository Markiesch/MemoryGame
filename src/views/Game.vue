<!-- eslint-disable -->
<template>
  <main>
    <header>
      <h2>Memory</h2>
      <h3><span>Round</span> {{ round }}</h3>
      <h3>{{ time }}<span>s</span></h3>
    </header>
    <section>
      <div class="player player1" :class="{ ghostplayer: currentPlayer === 1 }">
        <p class="player-name">{{ players[0].name || "PLAYER 1" }}</p>
        <p class="player-score">SCORE: {{ players[0].score }}</p>
        <p class="player-score">TIME: {{ players[0].time }}</p>
      </div>
      <div class="deck" :class="{ disabled: deckDisabled }">
        <div class="card" v-for="(card, index) of cards" :key="index" @click="openCard(index)" :class="{ open: card.selected, correct: card.correct, incorrect: card.error }">
          <img :src="getImgUrl(card.name)" :alt="card.name" />
        </div>
      </div>
      <div class="player player2" :class="{ ghostplayer: currentPlayer === 0 }">
        <p class="player-name">{{ players[1].name || "PLAYER 2" }}</p>
        <p class="player-score">SCORE: {{ players[1].score }}</p>
        <p class="player-score">TIME: {{ players[1].time }}</p>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
// @ts-ignore
import confetti from "canvas-confetti";
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

interface card {
  name: string;
  selected: boolean;
  error: boolean;
  correct: boolean;
}

@Component
export default class Game extends Vue {
  round = 0;
  time = 0;
  clicks = 0;
  cards: card[] = [];
  openedCards: number[] = [];
  interval: any;
  deckDisabled = false;
  victory = false;
  currentPlayer = 0;

  @Getter("getMode") mode: any;
  @Getter("getPlayers") players: any;
  @Action("savePlayers") savePlayers: any;

  startTimer(): void {
    this.interval = setInterval(() => {
      this.players[this.currentPlayer].time++;
    }, 1000);
  }

  openCard(index: number): void {
    if (this.openedCards.includes(index)) return;
    this.clicks++;
    if (this.clicks === 1) this.startTimer();
    const card = this.cards[index];
    card.selected = true;
    this.openedCards.push(index);
    const len = this.openedCards.length;
    if (len === 2) {
      this.round = ++this.round;
      const card1 = this.cards[this.openedCards[0]];
      const card2 = this.cards[this.openedCards[1]];

      if (card1.name === card2.name) {
        card1.correct = true;
        card2.correct = true;

        this.openedCards = [];
        this.players[this.currentPlayer].score++;

        const animationEnd = Date.now() + 1000;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        let interval = setInterval(function () {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 100;
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
          confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
      } else {
        if (this.mode === "multiplayer") {
          if (this.currentPlayer === 0) {
            this.currentPlayer = 1;
          } else {
            this.currentPlayer = 0;
          }
        }

        card1.error = true;
        card2.error = true;
        this.deckDisabled = true;
        setTimeout(() => {
          card1.error = false;
          card2.error = false;
          card1.selected = false;
          card2.selected = false;
          this.deckDisabled = false;
          this.openedCards = [];
        }, 1000);
      }
    }

    const correctRound = this.players[0].score + this.players[1].score;
    this.savePlayers(this.players);

    if (correctRound >= this.cards.length / 2) {
      clearInterval(this.interval);
      setTimeout(() => {
        this.$router.push("/victory");
      }, 400);
    }
  }

  getImgUrl(pic: string): string {
    return require("../assets/fruits/" + pic);
  }

  init(): void {
    this.players[0].score = 0;
    this.players[0].time = 0;
    this.players[1].score = 0;
    this.players[1].time = 0;
    // const slots = ["apple.png"];
    const slots = ["apple.png", "banana.png", "coconut.png", "kiwi.png", "melon.png", "pear.png", "pineapple.png", "plum.png"];
    const shuffledNames = this.shuffle([...slots, ...slots]);

    let index = 0;
    const cardInterval = setInterval(() => {
      const shuffledName = shuffledNames[index];
      this.cards.push({
        name: shuffledName,
        selected: false,
        error: false,
        correct: false,
      });
      index++;
      if (index >= shuffledNames.length) clearInterval(cardInterval);
    }, 100);
  }

  shuffle(cards: string[]): string[] {
    let currentIndex = cards.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
    }
    return cards;
  }

  mounted(): void {
    this.init();
  }
}
</script>

<style scoped>
section {
  display: flex;
  flex-wrap: wrap;
  padding: 5rem 1rem 1rem 1rem;
}

.player + div {
  flex: 1 1 400px;
}

.player {
  flex: 1 1 100px;
  text-align: center;
}

.player-name {
  position: relative;
  font-weight: 100;
  font-size: 50px;
}

.player-name::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
}

.player1 .player-name::after {
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #1d2635;
  right: 0;
}

.ghostplayer {
  opacity: 0.2;
}

.ghostplayer .player-name::after {
  display: none;
}

.player2 .player-name::after {
  left: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #1d2635;
}

.player-score {
  margin-top: 1em;
  font-weight: 400;
  font-size: 38px;
}

.deck {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5em;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  user-select: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: font-size 500ms ease, background-color 300ms ease;
}

.card img {
  height: 0;
  user-select: none;
  pointer-events: none;
  filter: drop-shadow(-5px -5px 15px rgba(0, 0, 0, 0.25));
}

.open img {
  height: 90%;
}

.correct {
  background-color: #4caf50;
  pointer-events: none;
}

.incorrect {
  background-color: #ff5252;
}
</style>
