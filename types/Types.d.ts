interface Player {
  id: number;

  avatar: {
    src: string;
    color: string;
  };
  score: number;
  clicks: number;
  bot: boolean;
}

interface Card {
  index: number;
  image: string;
  selected: boolean;
  error: boolean;
  correct: boolean;
}
