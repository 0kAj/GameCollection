import { Component } from '@angular/core';
import { CanvasGameComponent } from '../../core/engine/CanvasGameComponent';
import { CollectorGameLogic } from './logic/collector-game.logic';
import { GameEngine } from '../../core/engine/GameEngine';

@Component({
  standalone: true,
  selector: 'app-collector-game',
  imports: [],
  templateUrl: './collector-game.html',
  styleUrls: ['./collector-game.css'],
})
export class CollectorGame extends CanvasGameComponent<CollectorGameLogic> {

  constructor(engine: GameEngine) {
    super(engine);
  }


  protected createGame(
    context: CanvasRenderingContext2D,
    notifyScore: (score: number) => void,
    notifyGameOver: (gameOver: boolean) => void
  ): CollectorGameLogic {
    return new CollectorGameLogic(
      context,
      notifyScore,
      notifyGameOver
    );
  }
}
