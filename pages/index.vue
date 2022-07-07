<script setup lang="ts">
const { players, createPlayer, removePlayer } = usePlayers();
</script>

<template>
  <div>
    <div class="container card--container">
      <div class="player--card" :class="player.avatar.color" v-for="(player, index) in players">
        <img :src="`/avatars/${player.bot ? 'robot' : player.avatar.src}x256.png`" alt="" />
        <div class="overlay">
          <button @click="removePlayer(index)">
            <IconTrash />
          </button>
          <button @click="player.bot = !player.bot">Toggle bot</button>
        </div>
      </div>
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
