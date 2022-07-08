<template>
  <div class="container">
    <div class="header">
      <h1>Memory game</h1>
      <span v-show="isBotPlaying">Bot is playing</span>
    </div>

    <div class="card--container">
      <div class="player--card" :class="[player.avatar.color, { active: activePlayerIndex === index }]" v-for="(player, index) in players">
        <img :src="`/avatars/${player.bot ? 'robot' : player.avatar.src}x256.png`" alt="" />
      </div>
    </div>

    <div class="deck" :class="{ disabled: deckDisabled || isBotPlaying }">
      <div class="card" v-for="card of cards" @click="handleClick(card)" :class="{ open: card.selected, correct: card.correct, incorrect: card.error }">
        <img v-if="card.selected || card.correct" :src="`fruits/${card.image}`" :alt="card.image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { shuffle, pause } from "~~/scripts/utils";
const SLOTS = ["apple.png", "banana.png", "coconut.png", "kiwi.png", "melon.png", "pear.png", "pineapple.png", "plum.png", "grapes.png", "orange.png", "raspberries.png", "cherry.png"];

// Props
const { players } = usePlayers();

// Properties
let audio: HTMLAudioElement | undefined;
let cards = ref<Card[]>([]);
let activePlayerIndex = ref(0);
let deckDisabled = ref(false);

// Computed properties
const activePlayer = computed(() => players.value[activePlayerIndex.value]);
const openedCards = computed(() => cards.value.filter((card) => card.selected));
const isBotPlaying = computed(() => activePlayer.value?.bot);

// Create cards
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

async function handleClick(card: Card) {
  if (deckDisabled.value === true || openedCards.value.includes(card)) return;

  deckDisabled.value = true;

  if (audio == null) audio = new Audio("flip_card.mp3");
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

      activePlayerIndex.value = activePlayerIndex.value + 1 >= players.value.length ? 0 : activePlayerIndex.value + 1;
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

onMounted(() => {
  playBot();
});
</script>

<style lang="scss" scoped>
@use "@/styles/layout/memory";
</style>
