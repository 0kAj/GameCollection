export interface GameEvents {
  onScore: (value: number) => void;
  onGameOver: () => void;

  onStats?(stats: { timeleft: number; combo: number }): void;
}
