import { Component, OnInit } from '@angular/core';
import { AbstractCanvasGameComponent } from '../../core/engine/AbstractCanvasGameComponent';
import { CollectorGameLogic } from './logic/collector-game.logic';
import { GameEngine } from '../../core/engine/GameEngine.service';
import { KeyboardInput } from '../../core/input/KeyboardInput.service';
import { GameEvents } from '../../core/engine/GameEvents';
import { TimeFormatPipe } from '../../shared/pipes/time-format-pipe';
import { GameOverScreen } from "../../shared/components/game-over-screen/game-over-screen";
import { ScoreBoard } from "../../shared/components/score-board/score-board";
import { TouchInput } from "../../shared/components/touch-input/touch-input";
import { SoundService } from '../../core/sound/sound.service';
import { AudioClip } from '../../core/sound/AudioClip';
import { StatManager } from '../../shared/services/stat-manager';

@Component({
  standalone: true,
  selector: 'app-collector-game',
  imports: [TimeFormatPipe, GameOverScreen, ScoreBoard, TouchInput],
  templateUrl: './collector-game.html',
  styleUrls: ['./collector-game.css'],
})
export class CollectorGame extends AbstractCanvasGameComponent<CollectorGameLogic> implements OnInit {
  constructor(
    engine: GameEngine,
    statManager: StatManager,
    private input: KeyboardInput,
    private sound: SoundService
  ) {
    super(engine, statManager);
  }

  ngOnInit(): void {
    this.sound.playBGMusic(AudioClip.BgMusic1);
  }

  protected createGame(context: CanvasRenderingContext2D, events: GameEvents): CollectorGameLogic {
    return new CollectorGameLogic(this.input, context, events);
  }
}
