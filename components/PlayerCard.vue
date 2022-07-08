<script setup lang="ts">
const { removePlayer } = usePlayers();

defineProps<{ player: Player; overlay: boolean }>();
</script>

<template>
  <div v-bind="$attrs" class="player--card" :class="player.avatar.color">
    <img :src="`/avatars/${player.bot ? 'robot' : player.avatar.src}x256.png`" alt="" />
    <div v-if="overlay" class="overlay">
      <button @click="removePlayer(player.id)">
        <IconTrash />
      </button>
      <button @click="player.bot = !player.bot">Toggle bot</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/layout/playerCard";
</style>
