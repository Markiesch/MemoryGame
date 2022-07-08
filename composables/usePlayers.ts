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

    const ids = players.value.map((player) => player.id);
    const id = ids.length ? Math.max(...ids) + 1 : 0;

    players.value.push({
      id,
      avatar: { src, color },
      clicks: 0,
      score: 0,
      bot: false,
    });
  }

  function removePlayer(id: number) {
    const player = players.value.find((player) => player.id === id);

    if (!player) throw new Error("Player id was not found");

    const index = players.value.indexOf(player);
    players.value.splice(index, 1);
  }

  return { players, createPlayer, removePlayer };
};
