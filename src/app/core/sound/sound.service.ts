import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private bgMusic: HTMLAudioElement | null = null;

  playBGMusic(path: string) {
    this.bgMusic = new Audio(path);
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.6;
    this.bgMusic.play().catch((err) => {
      console.warn('Could not play sound:', err);
    });
  }

  playBGMusicAgain() {
    if (this.bgMusic == null) return;
    this.bgMusic.play().catch((err) => {
      console.warn('Could not play sound:', err);
    });
  }

  stopBGMusic() {
    if (this.bgMusic == null) return;
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }

  setBGMusicVolume(volume: number) {
    if (this.bgMusic == null) return;
    this.bgMusic.volume = volume;
  }

  playSfx(path: string, volume = 1) {
    const audio = new Audio(path);
    audio.volume = volume;
    audio.play().catch((err) => {
      console.warn('Could not play sound:', err);
    });
  }
}
