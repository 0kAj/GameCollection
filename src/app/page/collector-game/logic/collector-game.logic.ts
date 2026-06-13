import { drawGameOver } from '../../../core/rendering/draw-game-over';
import { IGame } from '../../../core/engine/IGame';
import { KeyboardInput } from '../../../core/input/KeyboardInput';
import { Collectible } from '../objects/collectible';
import { Player } from '../objects/player';
import { Size } from '../../../core/models/size';
import { Rect2 } from '../../../core/models/rect2';
import { Vector2 } from '../../../core/models/vector2';
import { COLLECTIBLES_COUNT } from './collector-game.constants';
import { GameEvents } from '../../../core/engine/GameEvents';

export class CollectorGameLogic implements IGame {
  private readonly player;
  private readonly collectibles: Collectible[] = [];

  private isGameOver = false;

  constructor(
    private input: KeyboardInput,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly events: GameEvents
  ) {
    this.player = new Player(new Vector2(280, 220), this.input, () => this.board);

    // setup collectibles
    for (let i = 0; i < COLLECTIBLES_COUNT; i++) {
      this.collectibles[i] = new Collectible();
      this.respawnCollectible(this.collectibles[i]);
    }
  }

  start(): void { }

  update(delta: number): void {
    if (this.isGameOver) {
      return;
    }

    this.player.update(delta);

    this.collectibles.forEach((c) => {
      if (c.hasVanished) return;

      c.update(delta);
      if (this.hasCollected(c)) {
        this.events.onScore(c.scoreValue);
        this.respawnCollectible(c);
      }
    });

    const allVanished = this.collectibles.every((c) => c.hasVanished);

    if (allVanished) {
      this.isGameOver = true;
      this.events.onGameOver();
    }
  }

  render(): void {
    this.clearScreen();
    this.drawArena();
    this.collectibles.forEach((c) => c.render(this.ctx));
    this.player.render(this.ctx);

    if (this.isGameOver) {
      drawGameOver(this.ctx, 'The apple vanished.'); //todo make it a component!!!
    }
  }

  private respawnCollectible(collectible: Collectible): void {
    const board = this.board;

    collectible.respawn(
      board.width,
      board.height,
      new Rect2(this.player.position, this.player.width, this.player.height),
    );
  }

  private hasCollected(collectable: Collectible): boolean {
    return this.player.rect.overlaps(collectable.rect);
  }

  private clearScreen(): void {
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fillRect(0, 0, this.board.width, this.board.height);
  }

  private drawArena(): void {
    const board = this.board;

    this.ctx.imageSmoothingEnabled = false;
    this.ctx.strokeStyle = '#475569';
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(2, 2, board.width - 4, board.height - 4);
  }

  private get board(): Size {
    return {
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height,
    };
  }
}
