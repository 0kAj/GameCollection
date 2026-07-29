import { effect, Injectable, signal } from '@angular/core';
import { SoundService } from '../../core/sound/sound.service';
import { AudioClip } from '../../core/sound/AudioClip';
import { StorageManager } from './storage-manager';
import { CurrentStorageVersion } from './storage/storage.type';
import { GameStats } from '../../core/engine/GameEvents';

@Injectable({
  providedIn: 'root',
})
export class StatManager {
  score = signal(0);

  gameOver = signal(false);

  timeleft = signal(0);
  combo = signal(0);

  storage: CurrentStorageVersion;

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

  updateStats(stats: GameStats): void {
    let storageChanged = false;

    Object.entries(stats).forEach(([key, value]) => {
      switch (key) {
        case 'timeleft':
          this.timeleft.set(value);
          break;

        case 'combo':
          this.combo.set(value);

          if (value > this.storage.collectorHighestCombo) {
            this.storage.collectorHighestCombo = value;
            storageChanged = true;
          }
          break;

        case 'snakeLength':
          if (value > this.storage.longestSnake) {
            this.storage.longestSnake = value;
            storageChanged = true;
          }
          break;
      }
    });

    if (storageChanged) {
      this.storageManager.saveStorage(this.storage);
    }
  }

  addScore(scoreToAdd: number): void {
    this.score.update((currentScore) => currentScore + scoreToAdd);

    this.storage.applesTotal += scoreToAdd;
    this.storageManager.saveStorage(this.storage);

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
