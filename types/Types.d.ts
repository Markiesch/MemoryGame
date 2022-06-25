interface Player {
  score: number;
  clicks: number;
  bot: boolean;
}

interface Card {
  image: string;
  selected: boolean;
  error: boolean;
  correct: boolean;
}
