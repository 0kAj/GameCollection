import { drawGameOver } from '../../../core/rendering/draw-game-over';
import { IGame } from '../../../core/engine/IGame';
import { KeyboardInput } from '../../../core/input/KeyboardInput';
import { Collectible } from '../objects/collectible';
import { Player } from '../objects/player';
import { Size } from '../../../core/models/size';
import { Rect2 } from '../../../core/models/rect2';
import { Vector2 } from '../../../core/models/vector2';
import { SPAWN_INTERVALL } from './collector-game.constants';
import { GameEvents } from '../../../core/engine/GameEvents';

export class CollectorGameLogic implements IGame {
  private readonly player;
  private readonly collectibles: Collectible[] = [];

  private isGameOver = false;

  private spawnTimer = 0;
  private elapsed = 0;
  private combo = 0;
  private lastHitTime = 0;

  constructor(
    private input: KeyboardInput,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly events: GameEvents,
  ) {
    this.player = new Player(new Vector2(280, 220), this.input, () => this.board);

    // setup first collectibles
    this.createCollectable();
  }

  start(): void {}

  update(delta: number): void {
    if (this.isGameOver) return;

    this.elapsed += delta;
    this.spawnTimer += delta;

    if (this.collectibles.length < this.maxCollectibles) {
      if (this.spawnTimer >= this.dynamicSpawnInterval) {
        this.spawnTimer = 0;

        this.createCollectable();
      }
    }

    this.player.update(delta);

    this.checkComboTimeout();

    this.collectibles.forEach((c) => {
      c.update(delta);

      if (c.hasVanished) {
        this.respawnCollectible(c);
        return;
      }

      if (this.hasCollected(c)) {
        this.combo++;
        this.lastHitTime = this.elapsed;
        this.events.onScore(c.scoreValue * this.combo);
        this.respawnCollectible(c);
      }
    });

    if (this.elapsed > 90) {
      this.isGameOver = true;
      this.events.onGameOver();
    }

    this.events.onStats?.({
      elapsed: this.elapsed,
      combo: this.combo,
    });
  }

  private createCollectable() {
    const c = new Collectible({ lifetimeSeconds: this.dynamicLivetime });
    this.collectibles.push(c);
    this.respawnCollectible(c);
  }

  private checkComboTimeout(): void {
    if (this.combo > 0 && this.elapsed - this.lastHitTime > 3) {
      this.combo = 0;
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

  private get dynamicSpawnInterval() {
    return Math.max(0.4, SPAWN_INTERVALL - this.elapsed * 0.01);
  }

  private get dynamicLivetime() {
    return Math.max(1.5, 5 - this.elapsed * 0.05);
  }

  private get maxCollectibles() {
    return 3 + Math.floor(this.elapsed / 10);
  }
}
