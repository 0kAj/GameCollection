import { Injectable } from '@angular/core';
import { IGame } from './IGame';

@Injectable({
  providedIn: 'root'
})
export class GameEngine {

  private running = false;
  private lastTime = 0;

  private game?: IGame;

  load(game: IGame) {
    this.game?.destroy?.();

    this.game = game;
    this.game.start();
  }

  start() {
    if (this.running) {
      return;
    }

    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    this.game?.destroy?.();
  }

  private loop = (time: number) => {

    if (!this.running) return;

    const delta = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.update(delta);
    this.render();

    requestAnimationFrame(this.loop);
  };

  private update(delta: number) {
    this.game?.update(delta);
  }

  private render() {
    this.game?.render();
  }
}
