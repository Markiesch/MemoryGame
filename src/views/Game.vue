<!-- eslint-disable -->
<template>
  <main>
    <header>
      <nav>
        <router-link to="/">Memory</router-link>
        <h2><span>Round</span> {{ round }}</h2>
        <p>{{ mode }}</p>
      </nav>
    </header>
    <section>
      <div class="player player1" :class="{ ghostplayer: currentPlayer === 1 }">
        <p class="player-name">{{ settings.name || "PLAYER 1" }}</p>
        <p class="player-score">SCORE: {{ players[0].score }}</p>
        <p class="player-score">TIME: {{ players[0].time }}</p>
      </div>
      <div class="deck" :class="{ disabled: deckDisabled }">
        <article class="card" v-for="(card, index) of cards" :key="index" @click="openCard(index)" :class="{ open: card.selected, correct: card.correct, incorrect: card.error, hidden: card.hidden }">
          <img :src="getImgUrl(card.name)" :alt="card.name" />
        </article>
      </div>
      <div class="player player2" :class="{ ghostplayer: currentPlayer === 0 }">
        <p class="player-name">PLAYER 2</p>
        <p class="player-score">SCORE: {{ players[1].score }}</p>
        <p class="player-score">TIME: {{ players[1].time }}</p>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { firework } from "../store/utils";
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { Card, Settings, Player, recentGame } from "../store/utils";

@Component
export default class Game extends Vue {
  mounted(): void {
    document.title = `Memory - ${this.mode}`;
    this.init();
  }

  round = 0;
  time = 0;
  clicks = 0;
  cards: Card[] = [];
  openedCards: number[] = [];
  interval: any;
  deckDisabled = false;
  victory = false;
  currentPlayer = 0;

  @Getter("getMode") mode!: string;
  @Getter("getPlayers") players!: Player[];
  @Getter("getSettings") settings!: Settings;
  @Getter("getLoadRecent") loadRecent!: boolean;
  @Getter("getLatestGame") latestGame!: recentGame;
  @Action("savePlayers") savePlayers: any;

  startTimer() {
    this.interval = setInterval(() => {
      this.players[this.currentPlayer].time++;
    }, 1000);
  }

  openCard(index: number) {
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
        if (this.settings.confetti) firework();
        card1.correct = true;
        card2.correct = true;
        this.openedCards = [];
        this.players[this.currentPlayer].score++;

        if (this.settings.deleteCorrect) {
          if (this.settings.keepPosition) {
            setTimeout(() => {
              card1.hidden = true;
              card2.hidden = true;
            }, 1000);
          } else {
            this.deckDisabled = true;
            setTimeout(() => {
              this.cards.splice(this.cards.indexOf(card1), 1);
              this.cards.splice(this.cards.indexOf(card2), 1);
              this.deckDisabled = false;
            }, 1000);
          }
        }
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

    if (correctRound >= this.settings.amount / 2) {
      clearInterval(this.interval);
      setTimeout(() => {
        this.$router.push("/victory");
      }, 800);
    }

    const save = {
      cards: this.cards,
      mode: this.mode,
      players: this.players,
    };
    this.$store.commit("setLatestGame", save);
  }

  getImgUrl(pic: string): string {
    return require("../assets/fruits/" + pic);
  }

  init() {
    if (this.loadRecent && this.latestGame !== null) {
      this.cards = this.latestGame.cards;
      this.savePlayers(this.latestGame.players);

      for (const card of this.cards) {
        card.error = false;
        if (!card.correct) card.selected = false;
      }
    } else {
      this.players[0].score = 0;
      this.players[0].time = 0;
      this.players[1].score = 0;
      this.players[1].time = 0;
      const slots = ["apple.png", "banana.png", "coconut.png", "kiwi.png", "melon.png", "pear.png", "pineapple.png", "plum.png"];
      const items = slots.slice(0, this.settings.amount / 2);
      const shuffledNames = this.shuffle([...items, ...items]);

      let index = 0;
      const cardInterval = setInterval(() => {
        const shuffledName = shuffledNames[index];
        this.cards.push({
          name: shuffledName,
          selected: false,
          error: false,
          correct: false,
          hidden: false,
        });
        index++;
        if (index >= shuffledNames.length) clearInterval(cardInterval);
      }, 75);
    }
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
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  color: var(--primary-color);
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  padding: 1rem;
  margin: 0 auto;
}

nav h2,
nav a {
  font-size: 24px;
  text-decoration: none;
  color: var(--primary-color);
}

nav span {
  font-weight: 300;
  font-size: 0.8em;
}

section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 5rem 1rem 1rem 1rem;
}

.player + div {
  flex: 1 1 400px;
}

.player {
  flex: 1 1 100px;
}

.player2 {
  text-align: right;
}

.player-name {
  position: relative;
  font-weight: 400;
  color: var(--primary-color);
  font-size: 50px;
}

.player-name::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

.player1 .player-name::after {
  right: 0;
  border-right: 10px solid var(--primary-color);
}

.player2 .player-name::after {
  left: 0;
  border-left: 10px solid var(--primary-color);
}

.ghostplayer .player-name::after {
  display: none;
}

.ghostplayer {
  opacity: 0.25;
}

.player-score {
  margin-top: 0.25em;
  font-weight: 200;
  font-size: 28px;
}

.deck {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5em;
}

.card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100%;
  height: 0;
  user-select: none;
  overflow: hidden;
  cursor: pointer;
  background-color: white;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.15);
  transition: background-color 300ms ease, transform 300ms ease;
}

.card:hover {
  transform: scale(1.025);
}

.card img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90%;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  filter: drop-shadow(-5px -5px 15px rgba(0, 0, 0, 0.25));
}

.open img {
  opacity: 1;
}

.incorrect {
  background: linear-gradient(to top left, #ad3838, #ff5252);
}

.correct {
  background: linear-gradient(to top left, #347536, #54c057);
  pointer-events: none;
}

.hidden {
  pointer-events: none;
  opacity: 0;
}
</style>
