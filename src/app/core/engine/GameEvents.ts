export interface GameEvents {
  onScore: (value: number) => void;
  onGameOver: () => void;
}
