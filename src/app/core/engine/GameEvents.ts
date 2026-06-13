export interface GameEvents {
  onScore: (value: number) => void;
  onGameOver: () => void;

  onStats?(stats: { elapsed: number; combo: number }): void;
}
