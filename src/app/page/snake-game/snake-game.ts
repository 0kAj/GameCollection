import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CanvasGameComponent } from '../../core/engine/CanvasGameComponent';
import { SnakeGameLogic } from './logic/snake-game.logic';

@Component({
  standalone: true,
  selector: 'app-snake-game',
  imports: [CommonModule],
  templateUrl: './snake-game.html',
  styleUrls: ['./snake-game.css'],
})
export class SnakeGame extends CanvasGameComponent<SnakeGameLogic> {
  protected createGame(
    context: CanvasRenderingContext2D,
    notifyScore: (score: number) => void,
    notifyGameOver: (gameOver: boolean) => void
  ): SnakeGameLogic {
    return new SnakeGameLogic(
      context,
      notifyScore,
      notifyGameOver
    );
  }
}
