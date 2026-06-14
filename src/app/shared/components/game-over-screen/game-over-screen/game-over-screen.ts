import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-over-screen',
  imports: [],
  templateUrl: './game-over-screen.html',
  styleUrl: './game-over-screen.css',
})
export class GameOverScreen {
  @Input() score: number = 0;
  @Output() restart = new EventEmitter();
}
