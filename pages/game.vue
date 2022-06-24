<template>
  <section>
    <h1>Play {{ activePlayerIndex }}</h1>
    <div class="deck" :class="{ disabled: deckDisabled }">
      <div class="card" v-for="card of cards" @click="handleClick(card)" :class="{ open: card.selected, correct: card.correct, incorrect: card.error }">
        <img :src="`fruits/${card.image}`" :alt="card.image" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { pause } from "~~/scripts/utils";

interface Card {
  image: string;
  selected: boolean;
  error: boolean;
  correct: boolean;
}

interface Player {
  score: number;
  clicks: number;
  bot: boolean;
}

const SLOTS = ["apple.png", "banana.png", "coconut.png", "kiwi.png", "melon.png", "pear.png", "pineapple.png", "plum.png", "grapes.png", "orange.png", "raspberries.png", "cherry.png"];

let cards = ref<Card[]>([]);

const players = ref<Player[]>([]);
let activePlayerIndex = ref(0);

let deckDisabled = ref(false);

onMounted(() => {
  players.value.push({ score: 0, clicks: 0, bot: false });
  players.value.push({ score: 0, clicks: 0, bot: true });

  for (let i = 0; i < 8; i++) {
    cards.value.push({
      image: SLOTS[i],
      selected: false,
      error: false,
      correct: false,
    });

    cards.value.push({
      image: SLOTS[i],
      selected: false,
      error: false,
      correct: false,
    });
  }
});

const activePlayer = computed(() => {
  return players.value[activePlayerIndex.value];
});

const openedCards = computed(() => {
  return cards.value.filter((card) => card.selected);
});

async function handleClick(card: Card) {
  if (deckDisabled.value === true || openedCards.value.includes(card)) return;

  deckDisabled.value = true;

  // Open card
  card.selected = true;

  activePlayer.value.clicks++;

  if (openedCards.value.length === 2) {
    const card1 = openedCards.value[0];
    const card2 = openedCards.value[1];

    if (card1.image === card2.image) {
      activePlayer.value.score++;

      // correct
      card1.correct = true;
      card2.correct = true;
    } else {
      await pause(1000);

      console.log("wrong");

      activePlayerIndex.value = activePlayerIndex.value === 1 ? 0 : 1;
    }

    closeCards();
  }

  const incorrectCard = cards.value.find((card) => !card.correct);

  if (!incorrectCard) {
    await useRouter().push("/");
    return;
  }

  deckDisabled.value = false;
  playBot();
}

function closeCards() {
  cards.value.forEach((card) => {
    card.selected = false;
  });
}

const botMemory: Card[] = [];

function playBot() {
  if (!activePlayer.value.bot) return;

  const availableCards = cards.value.filter((card) => !card.correct && !card.selected);
  const card = availableCards[Math.floor(Math.random() * availableCards.length)];

  botMemory.push(card);

  handleClick(card);
}
</script>

<style lang="scss" scoped>
@use "@/styles/pages/game";
</style>
