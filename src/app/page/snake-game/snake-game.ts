import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CanvasGameComponent } from '../../core/engine/CanvasGameComponent';
import { SnakeGameLogic } from './logic/snake-game.logic';
import { GameEngine } from '../../core/engine/GameEngine';
import { KeyboardInput } from '../../core/input/KeyboardInput';
import { StatManager } from '../../shared/stat-manager';
import { GameEvents } from '../../core/engine/GameEvents';

@Component({
  standalone: true,
  selector: 'app-snake-game',
  imports: [CommonModule],
  templateUrl: './snake-game.html',
  styleUrls: ['./snake-game.css'],
})
export class SnakeGame extends CanvasGameComponent<SnakeGameLogic> {

  constructor(engine: GameEngine, statManager: StatManager, private input: KeyboardInput) {
    super(engine, statManager);
  }

  protected createGame(
    context: CanvasRenderingContext2D,
    events: GameEvents
  ): SnakeGameLogic {
    return new SnakeGameLogic(
      this.input,
      context,
      events
    );
  }
}
