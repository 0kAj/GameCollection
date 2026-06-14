import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

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

  @HostListener('document:keydown.enter')
  onEnter() {
    this.restart.emit();
  }
}
