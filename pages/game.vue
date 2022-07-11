<template>
  <div class="container">
    <div class="header">
      <h1>Memory game</h1>
      <span v-show="isBotPlaying">Bot is playing</span>
    </div>

    <div class="card--container">
      <PlayerCard v-for="(player, index) in players" :class="{ active: activePlayerIndex === index }" :player="player" :overlay="false" />
    </div>

    <div>{{ selectionLog }}</div>
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

const selectionLog = ref<number[]>([]);

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

for (let i = 0; i < items.length; i++) {
  cards.value.push({
    index: i,
    image: items[i],
    selected: false,
    error: false,
    correct: false,
  });
}

async function handleClick(card: Card) {
  if (deckDisabled.value === true || openedCards.value.includes(card)) return;

  // Disable the deck
  deckDisabled.value = true;

  // Add clicked card to selection log
  selectionLog.value.push(card.index);

  // Create audio if it doens't excist yet
  if (audio == null) audio = new Audio("flip_card.mp3");
  audio.pause();
  audio.currentTime = 0;
  audio.play();

  // Open card
  card.selected = true;

  activePlayer.value.clicks++;

  if (openedCards.value.length === 2) {
    const card1 = openedCards.value[0];
    const card2 = openedCards.value[1];

    // correct
    if (card1.image === card2.image) {
      activePlayer.value.score++;

      card1.correct = true;
      card2.correct = true;
    } else {
      // Play error animation
      card1.error = true;
      card2.error = true;
      await pause(1200);
      card1.error = false;
      card2.error = false;

      // Cycle to next player
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

/**
 * Closes all the cards
 */
function closeCards() {
  cards.value.forEach((card) => {
    card.selected = false;
  });
}

function playBot() {
  // Return if the active player is not a bot
  if (!activePlayer.value.bot) return;

  function getBotCard(): Card {
    // Get available cards
    const availableCards = cards.value.filter((card) => !card.correct && !card.selected);

    // Get untouched cards
    const untouchedCards = availableCards.filter((card) => !selectionLog.value.includes(card.index));

    // Check if a card is turned around
    if (openedCards.value.length) {
      //  - Check if the same type of card is already discovered
      //    - If yes, turn that around
      //    - Otherwise, turn a random card around
      const turnedCard = openedCards.value[0];
      const dirtyCards: Card[] = selectionLog.value.map((index) => cards.value.find((card) => card.index === index)).filter((card) => card.index !== turnedCard.index);

      const target = dirtyCards.find((card) => turnedCard.image === card.image);
      if (target != null) return target;

      const selection = untouchedCards.length ? untouchedCards : availableCards;
      return selection[Math.floor(Math.random() * selection.length)];
    }

    // No cards are selected, turn a random card around which is not discovered yet
    const selection = untouchedCards.length ? untouchedCards : availableCards;
    return selection[Math.floor(Math.random() * selection.length)];
  }

  handleClick(getBotCard());
}

onMounted(() => {
  playBot();
});
</script>

<style lang="scss" scoped>
@use "@/styles/layout/memory";
</style>
