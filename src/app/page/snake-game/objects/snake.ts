import { loadImage } from '../../../core/assets/image-loader';
import { GameObject } from '../../../core/engine/GameObject';
import { SNAKE_BODY_SPRITE_SRC, SNAKE_HEAD_SPRITE_SRC } from '../logic/snake-game.constants';
import { GridSize } from '../models/grid-size';
import { Vector2 } from '../../../core/models/vector2';

export class Snake extends GameObject {
  private direction: Vector2 = Vector2.RIGHT;
  private pendingDirection: Vector2 = Vector2.RIGHT;
  private segments: Vector2[];
  private readonly bodySprite = loadImage(SNAKE_BODY_SPRITE_SRC);
  private gridSize: GridSize | null = null;

  constructor(start: Vector2) {
    super(Vector2.ZERO, 0, 0, loadImage(SNAKE_HEAD_SPRITE_SRC));
    this.segments = [
      new Vector2(start.x, start.y),
      new Vector2(start.x - 1, start.y),
      new Vector2(start.x - 2, start.y),
    ];
  }

  setDirection(direction: Vector2): void {
    if (this.isReverse(direction)) {
      return;
    }

    this.pendingDirection = direction;
  }

  move(grow: boolean): void {
    this.direction = this.pendingDirection;
    this.segments.unshift(this.nextHead);

    if (!grow) {
      this.segments.pop();
    }

    this.updatePixelPosition();
  }

  willEat(food: Vector2): boolean {
    return this.nextHead.sameVector(food);
  }

  hasHitWall(grid: GridSize): boolean {
    const head = this.head;
    return head.x < 0 || head.y < 0 || head.x >= grid.columns || head.y >= grid.rows;
  }

  hasHitSelf(): boolean {
    const head = this.head;
    return this.segments.slice(1).some((segment) => segment.sameVector(head));
  }

  override update(delta: number): void {
    // Movement is handled by move() method in game logic
  }

  override render(ctx: CanvasRenderingContext2D): void {
    if (!this.gridSize) return;

    this.segments.forEach((segment, index) => {
      const sprite = index === 0 ? this.sprite : this.bodySprite;
      const pixelX = segment.x * this.gridSize!.cellWidth;
      const pixelY = segment.y * this.gridSize!.cellHeight;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(sprite, pixelX, pixelY, this.gridSize!.cellWidth, this.gridSize!.cellHeight);
    });
  }

  setGridSize(grid: GridSize): void {
    this.gridSize = grid;
    this.updatePixelPosition();
  }

  private updatePixelPosition(): void {
    if (!this.gridSize) return;

    this.position.x = this.head.x * this.gridSize.cellWidth;
    this.position.y = this.head.y * this.gridSize.cellHeight;
    this.width = this.gridSize.cellWidth;
    this.height = this.gridSize.cellHeight;
  }

  get body(): Vector2[] {
    return this.segments;
  }

  private get head(): Vector2 {
    return this.segments[0];
  }

  private get nextHead(): Vector2 {
    return this.head.add(this.pendingDirection);
  }

  private isReverse(direction: Vector2): boolean {
    return this.direction.reverse().sameVector(direction);
  }
}
