import { drawGameOver } from '../../../core/rendering/draw-game-over';
import { IGame } from '../../../core/engine/IGame';
import { KeyboardInput } from '../../../core/input/KeyboardInput';
import { Collectible } from '../objects/collectible';
import { Player } from '../objects/player';
import { Size } from '../../../core/models/size';
import { Rect2 } from '../../../core/models/rect2';
import { Vector2 } from '../../../core/models/vector2';
import { COLLECTIBLES_COUNT } from './collector-game.constants';

export class CollectorGameLogic implements IGame {
  private readonly player;
  private readonly collectibles: Collectible[] = [];
  private score = 0;
  private gameOver = false;

  constructor(
    private input: KeyboardInput,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly notifyScore: (score: number) => void,
    private readonly notifyGameOver: (gameOver: boolean) => void,
  ) {
    this.player = new Player(new Vector2(280, 220), this.input, () => this.board);

    // setup collectibles
    for (let i = 0; i < COLLECTIBLES_COUNT; i++) {
      this.collectibles[i] = new Collectible();
      this.respawnCollectible(this.collectibles[i]);
    }

    this.updateScore();
    this.updateGameOver();
  }

  start(): void {
    this.updateScore();
    this.updateGameOver();
  }

  update(delta: number): void {
    if (this.gameOver) {
      return;
    }

    this.player.update(delta);

    this.collectibles.forEach((c) => {
      if (c.hasVanished) return;

      c.update(delta);
      if (this.hasCollected(c)) {
        this.score++;
        this.updateScore(); // todo MAKE IT A SEARVICE -> StatManager like
        this.respawnCollectible(c);
      }
    });

    const allVanished = this.collectibles.every((c) => c.hasVanished);

    if (allVanished) {
      this.gameOver = true;
      this.updateGameOver();
    }
  }

  render(): void {
    this.clearScreen();
    this.drawArena();
    this.collectibles.forEach((c) => c.render(this.ctx));
    this.player.render(this.ctx);

    if (this.gameOver) {
      drawGameOver(this.ctx, 'The apple vanished.');
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

  private updateScore(): void {
    this.notifyScore(this.score);
  }

  private updateGameOver(): void {
    this.notifyGameOver(this.gameOver);
  }

  private get board(): Size {
    return {
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height,
    };
  }
}
