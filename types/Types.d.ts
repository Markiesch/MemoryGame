interface Player {
  avatar: {
    src: string;
    color: string;
  };
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
