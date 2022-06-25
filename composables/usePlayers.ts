const AVATARS = ["african", "asian", "indian", "student", "western"];
const COLORS = ["purple", "aqua", "blue", "gold"];

const players = ref<Player[]>([]);

export const usePlayers = () => {
  onMounted(() => {
    players.value = JSON.parse(localStorage.getItem("players")) ?? [];

    watch(players.value, () => {
      localStorage.setItem("players", JSON.stringify(players.value));
    });
  });

  function createPlayer() {
    const src = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    players.value.push({
      avatar: { src, color },
      clicks: 0,
      score: 0,
      bot: false,
    });
  }

  function removePlayer(index: number) {
    players.value.splice(index, 1);
  }

  return { players, createPlayer, removePlayer };
};
