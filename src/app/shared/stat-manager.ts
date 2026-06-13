import { Injectable, Service, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatManager {
  score = signal(0);

  gameOver = signal(false);

  elapsed = signal(0);
  combo = signal(0);

  updateStats(stats: { elapsed: number; combo: number }): void {
    this.elapsed.set(stats.elapsed);
    this.combo.set(stats.combo);
  }

  addScore(scoreToAdd: number): void {
    this.score.update((currentScore) => currentScore + scoreToAdd);
  }

  updateGameOver(gameOver: boolean): void {
    this.gameOver.set(gameOver);
  }
}
