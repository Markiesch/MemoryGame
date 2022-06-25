<template>
  <section v-if="started">
    <GameMemory :players="players" />
  </section>
  <section v-else>
    <div>
      <div v-for="player in players">{{ player }}</div>
    </div>
    <button @click="addPlayer">New Player</button>
    <button @click="startGame">Start</button>
  </section>
</template>

<script lang="ts" setup>
import players from "@/store/Players";

onMounted(() => {
  players.value = JSON.parse(localStorage.getItem("players"));
});

let started = ref(false);

function startGame() {
  started.value = true;
}

function addPlayer() {
  players.value.push({
    clicks: 0,
    score: 0,
    bot: false,
  });
}
</script>

<style lang="scss" scoped>
@use "@/styles/pages/game";
</style>
