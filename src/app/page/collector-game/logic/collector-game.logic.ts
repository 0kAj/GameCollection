import { drawGameOver } from '../../../core/rendering/draw-game-over';
import { IGame } from '../../../core/engine/IGame';
import { KeyboardInput } from '../../../core/input/KeyboardInput';
import { BoardSize } from '../models/board-size';
import { Collectible } from '../objects/collectible';
import { Player } from '../objects/player';

export class CollectorGameLogic implements IGame {
  private readonly player = new Player(280, 220, this.input, () => this.board);
  private readonly collectible = new Collectible();
  private score = 0;
  private gameOver = false;

  constructor(
    private input: KeyboardInput,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly notifyScore: (score: number) => void,
    private readonly notifyGameOver: (gameOver: boolean) => void
  ) {
    this.respawnCollectible();
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
    this.collectible.update(delta);

    if (this.hasCollected()) {
      this.score += 1;
      this.updateScore();
      this.respawnCollectible();
      return;
    }

    if (this.collectible.hasVanished) {
      this.gameOver = true;
      this.updateGameOver();
    }
  }

  render(): void {
    this.clearScreen();
    this.drawArena();
    this.collectible.render(this.ctx);
    this.player.render(this.ctx);
    this.drawHud();

    if (this.gameOver) {
      drawGameOver(this.ctx, 'The apple vanished.');
    }
  }

  destroy(): void {
    this.input.destroy();
  }

  private respawnCollectible(): void {
    const board = this.board;

    this.collectible.respawn(board.width, board.height, {
      x: this.player.x,
      y: this.player.y,
      width: this.player.width,
      height: this.player.height,
    });
  }

  private hasCollected(): boolean {
    const playerCenterX = this.player.x + this.player.width / 2;
    const playerCenterY = this.player.y + this.player.height / 2;
    const itemCenterX = this.collectible.x + this.collectible.width / 2;
    const itemCenterY = this.collectible.y + this.collectible.height / 2;
    const distance = Math.hypot(playerCenterX - itemCenterX, playerCenterY - itemCenterY);
    return distance < (this.player.width + this.collectible.width) * 0.45;
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

  private drawHud(): void {
    this.ctx.fillStyle = '#f8fafc';
    this.ctx.font = '18px Inter, system-ui, sans-serif';
    this.ctx.fillText(`Score: ${this.score}`, 20, 28);

    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = '14px Inter, system-ui, sans-serif';
    this.ctx.fillText('WASD / arrow keys', 20, this.board.height - 16);
  }

  private updateScore(): void {
    this.notifyScore(this.score);
  }

  private updateGameOver(): void {
    this.notifyGameOver(this.gameOver);
  }

  private get board(): BoardSize {
    return {
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height,
    };
  }
}
