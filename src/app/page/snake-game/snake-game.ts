import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractCanvasGameComponent } from '../../core/engine/AbstractCanvasGameComponent';
import { SnakeGameLogic } from './logic/snake-game.logic';
import { GameEngine } from '../../core/engine/GameEngine.service';
import { KeyboardInput } from '../../core/input/KeyboardInput.service';
import { StatManager } from '../../shared/stat-manager';
import { GameEvents } from '../../core/engine/GameEvents';
import { GameOverScreen } from "../../shared/components/game-over-screen/game-over-screen";
import { ScoreBoard } from "../../shared/components/score-board/score-board";
import { TouchInput } from "../../shared/components/touch-input/touch-input";

@Component({
  standalone: true,
  selector: 'app-snake-game',
  imports: [CommonModule, GameOverScreen, ScoreBoard, TouchInput],
  templateUrl: './snake-game.html',
  styleUrls: ['./snake-game.css'],
})
export class SnakeGame extends AbstractCanvasGameComponent<SnakeGameLogic> {

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
