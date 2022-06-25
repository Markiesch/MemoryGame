const players = ref<Player[]>([]);

watch(players, () => {
  localStorage.setItem("players", JSON.stringify(players.value));
  console.log("saving players....");
});

export default players;
