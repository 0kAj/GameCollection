import { StatManager } from './../../shared/stat-manager';
import { Component } from '@angular/core';
import { CanvasGameComponent } from '../../core/engine/CanvasGameComponent';
import { CollectorGameLogic } from './logic/collector-game.logic';
import { GameEngine } from '../../core/engine/GameEngine';
import { KeyboardInput } from '../../core/input/KeyboardInput';
import { GameEvents } from '../../core/engine/GameEvents';
import { TimeFormatPipe } from '../../shared/pipes/time-format-pipe';

@Component({
  standalone: true,
  selector: 'app-collector-game',
  imports: [TimeFormatPipe],
  templateUrl: './collector-game.html',
  styleUrls: ['./collector-game.css'],
})
export class CollectorGame extends CanvasGameComponent<CollectorGameLogic> {
  constructor(
    engine: GameEngine,
    statManager: StatManager,
    private input: KeyboardInput,
  ) {
    super(engine, statManager);
  }

  protected createGame(context: CanvasRenderingContext2D, events: GameEvents): CollectorGameLogic {
    return new CollectorGameLogic(this.input, context, events);
  }
}
