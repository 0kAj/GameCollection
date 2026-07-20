import { effect, Injectable, OnDestroy, signal } from '@angular/core';
import { SoundService } from '../../core/sound/sound.service';
import { AudioClip } from '../../core/sound/AudioClip';
import { StorageManager } from './storage-manager';
import { Storage } from './storage/storage.type';

@Injectable({
  providedIn: 'root',
})
export class StatManager {
  score = signal(0);

  gameOver = signal(false);

  timeleft = signal(0);
  combo = signal(0);

  storage: Storage;

  constructor(
    private sound: SoundService,
    private storageManager: StorageManager,
  ) {
    this.storage = storageManager.loadStorage();

    this.score.set(this.storage.applesTotal);

    effect(() => {
      this.storage.applesTotal = this.score();

      this.storageManager.saveStorage(this.storage);
    });
  }

  updateStats(stats: { timeleft: number; combo: number }): void {
    this.timeleft.set(stats.timeleft);
    this.combo.set(stats.combo);
  }

  addScore(scoreToAdd: number): void {
    this.score.update((currentScore) => currentScore + scoreToAdd);
    this.sound.playSfx(AudioClip.Collect);
  }

  eatScore(amount: number): void {
    const currentScore = this.score();
    const eatenScore: number = Math.min(amount, currentScore);

    this.score.set(currentScore - eatenScore);
    this.sound.playSfx(AudioClip.Feed);
  }

  updateGameOver(gameOver: boolean): void {
    this.gameOver.set(gameOver);
    if (gameOver) {
      this.sound.stopBGMusic();
      this.sound.playSfx(AudioClip.GameOver);
    } else {
      this.sound.playBGMusicAgain();
    }
  }
}
