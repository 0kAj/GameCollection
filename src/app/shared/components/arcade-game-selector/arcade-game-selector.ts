import { Component, EventEmitter, Output } from '@angular/core';
import { IGame } from '../../../core/engine/IGame';
import { ArcadeGame } from './models/ArcadeGame';
import { ArcadeTitle } from '../arcade-title/arcade-title';
import { SoundService } from '../../../core/sound/sound.service';
import { AudioClip } from '../../../core/sound/AudioClip';

@Component({
  selector: 'app-arcade-game-selector',
  imports: [ArcadeTitle],
  templateUrl: './arcade-game-selector.html',
  styleUrl: './arcade-game-selector.css',
})
export class ArcadeGameSelector {
  @Output() selectGame = new EventEmitter<ArcadeGame>();

  constructor(private sound: SoundService) {}

  public games = [
    new ArcadeGame('Collector', 'assets/games/FoodCollector.png', 'collector'),
    new ArcadeGame('Snake', 'assets/games/Snake.png', 'snake'),
  ];

  playHoverSound() {
    this.sound.playSfx(AudioClip.Hover, 0.8);
  }
}
