export interface GameEvents {
  onScore: (value: number) => void;
  onGameOver: () => void;

  onStats?: (stats: GameStats) => void;
}

export type GameStats = Record<string, number>;
