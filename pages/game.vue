<template>
  <section v-if="started">
    <GameMemory />
  </section>
  <section v-else>
    <div class="card--container">
      <div class="player--card" :class="player.avatar.color" v-for="(player, index) in players">
        <img :src="`/avatars/${player.bot ? 'robot' : player.avatar.src}x256.png`" alt="" />
        <div class="overlay">
          <button @click="removePlayer(index)">
            <IconTrash />
          </button>
          <button @click="player.bot = !player.bot">Toggle bot</button>
        </div>
      </div>
    </div>
    <button @click="createPlayer()">New Player</button>
    <button @click="startGame">Start</button>
  </section>
</template>

<script lang="ts" setup>
const { players, createPlayer, removePlayer } = usePlayers();

let started = ref(false);

function startGame() {
  started.value = true;
}
</script>

<style lang="scss" scoped>
@use "@/styles/pages/game";
</style>
