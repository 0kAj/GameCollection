import { Injectable, Service, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatManager {
  score = signal(0);

  gameOver = signal(false);

  timeleft = signal(0);
  combo = signal(0);

  updateStats(stats: { timeleft: number; combo: number }): void {
    this.timeleft.set(stats.timeleft);
    this.combo.set(stats.combo);
  }

  addScore(scoreToAdd: number): void {
    this.score.update((currentScore) => currentScore + scoreToAdd);
  }

  updateGameOver(gameOver: boolean): void {
    this.gameOver.set(gameOver);
  }
}
