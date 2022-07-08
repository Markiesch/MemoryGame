<script setup lang="ts">
const { players, createPlayer } = usePlayers();
</script>

<template>
  <div>
    <div class="container card--container">
      <PlayerCard v-for="player in players" :player="player" :overlay="true" />
      <div @click="createPlayer" class="add--player__card">
        <IconPlus class="icon" />
      </div>
    </div>

    <section class="game__section">
      <div class="card">
        <h2>Memory game</h2>
        <NuxtLink to="/game" class="singleplayer navigator">Start</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "/styles/pages/index";
</style>
