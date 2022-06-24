<template>
  <section>
    <h1>Memory game</h1>
    <div class="deck" :class="{ disabled: deckDisabled || isBotPlaying }">
      <div class="card" v-for="card of cards" @click="handleClick(card)" :class="{ open: card.selected, correct: card.correct, incorrect: card.error }">
        <img v-if="card.selected || card.correct" :src="`fruits/${card.image}`" :alt="card.image" />
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

  const singleItems = SLOTS.slice(0, 8);
  const items = shuffle([...singleItems, ...singleItems]);

  for (const item of items) {
    cards.value.push({
      image: item,
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

const isBotPlaying = computed(() => {
  return activePlayer.value?.bot;
});

async function handleClick(card: Card) {
  if (deckDisabled.value === true || openedCards.value.includes(card)) return;

  deckDisabled.value = true;

  const audio = new Audio("flip_card.mp3");

  audio.play();

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
      card1.error = true;
      card2.error = true;
      await pause(1200);

      card1.error = false;
      card2.error = false;

      activePlayerIndex.value = activePlayerIndex.value === 1 ? 0 : 1;
    }

    closeCards();
  }

  const hasIncorrectCard = !!cards.value.find((card) => !card.correct);

  if (!hasIncorrectCard) {
    await useRouter().push("/");
    return;
  }

  deckDisabled.value = false;

  if (activePlayer.value.bot) {
    await pause(400);
    playBot();
  }
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

function shuffle<T>(cards: T[]): T[] {
  let currentIndex = cards.length;
  let randomIndex: number;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
  }
  return cards;
}
</script>

<style lang="scss" scoped>
@use "@/styles/pages/game";
</style>
