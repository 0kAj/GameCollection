import { loadImage } from '../../../core/assets/image-loader';
import { GameObject } from '../../../core/engine/GameObject';
import {
  SNAKE_BODY_SPRITE_SRC,
  SNAKE_HEAD_SPRITE_SRC,
  TICK_SECONDS,
} from '../logic/snake-game.constants';
import { GridSize } from '../models/grid-size';
import { Vector2 } from '../../../core/models/vector2';
import { lerp } from '../../../core/utils/lerp';

export class Snake extends GameObject {
  private direction: Vector2 = Vector2.RIGHT;
  private pendingDirection: Vector2 = Vector2.RIGHT;
  private segments: Vector2[] = [];
  private previousSegments: Vector2[] = [];
  private readonly bodySprite = loadImage(SNAKE_BODY_SPRITE_SRC);
  private gridSize: GridSize | null = null;

  private elapsed: number = 0;
  private hasMoved: boolean = false;
  private pendingGrowth: number = 0;

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

  moveOneCell(): void {
    this.previousSegments = this.segments.map((s) => new Vector2(s.x, s.y));

    this.direction = this.pendingDirection;
    this.segments.unshift(this.nextHead);

    if (this.pendingGrowth > 0) {
      this.pendingGrowth--;
    } else {
      this.segments.pop();
    }

    this.updatePixelPosition();
  }

  grow(): void {
    this.pendingGrowth++;
  }

  get movedThisFrame(): boolean {
    return this.hasMoved;
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
    this.elapsed += delta;
    if (this.elapsed >= TICK_SECONDS) {
      this.elapsed -= TICK_SECONDS;
      this.moveOneCell();
      this.hasMoved = true;
    } else {
      this.hasMoved = false;
    }
  }

  override render(ctx: CanvasRenderingContext2D): void {
    if (!this.gridSize) return;

    const t: number = this.movementProgress;

    this.segments.forEach((segment, index) => {
      const previous = this.previousSegments[index] ?? segment;

      const sprite = index === 0 ? this.sprite : this.bodySprite;

      const renderX = lerp(previous.x, segment.x, t);
      const renderY = lerp(previous.y, segment.y, t);

      const pixelX = renderX * this.gridSize!.cellWidth;
      const pixelY = renderY * this.gridSize!.cellHeight;

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

  get head(): Vector2 {
    return this.segments[0];
  }

  private get nextHead(): Vector2 {
    return this.head.add(this.pendingDirection);
  }

  private isReverse(direction: Vector2): boolean {
    return this.direction.reverse().sameVector(direction);
  }

  get movementProgress(): number {
    return this.elapsed / TICK_SECONDS;
  }
}
