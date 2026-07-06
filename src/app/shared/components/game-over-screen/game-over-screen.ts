import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenFader } from '../../../animation/screen-fader';
import { SoundService } from '../../../core/sound/sound.service';
import { AudioClip } from '../../../core/sound/AudioClip';

@Component({
  selector: 'app-game-over-screen',
  imports: [],
  templateUrl: './game-over-screen.html',
  styleUrl: './game-over-screen.css',
})
export class GameOverScreen {
  @Input() score: number = 0;
  @Input() show: boolean = true;
  @Output() restart = new EventEmitter();
  @Output() back = new EventEmitter();

  constructor(
    private router: ScreenFader,
    private sound: SoundService,
  ) {}

  @HostListener('document:keydown.enter')
  onEnter() {
    this.restart.emit();
    this.sound.playSfx(AudioClip.Click);
  }

  onBack() {
    this.back.emit();
    this.router.navigateFadedTo(['/']);
    this.sound.playSfx(AudioClip.Click);
  }
}
