import { Injectable, Service, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatManager {
  public score = signal(0);

  public gameOver = signal(false);


  addScore(scoreToAdd: number): void {
    this.score.update((currentScore) => currentScore + scoreToAdd);
  }

  updateGameOver(gameOver: boolean): void {
    this.gameOver.set(gameOver);
  }
}
