import { loadImage } from '../../../core/assets/image-loader';
import { SNAKE_BODY_SPRITE_SRC, SNAKE_HEAD_SPRITE_SRC } from '../logic/snake-game.constants';
import { GridSize } from '../models/grid-size';
import { Vector2 } from '../../../core/objects/vector2';
import { drawGridSprite } from '../utils/draw-grid-sprite';

export class Snake {
  private readonly headSprite = loadImage(SNAKE_HEAD_SPRITE_SRC);
  private readonly bodySprite = loadImage(SNAKE_BODY_SPRITE_SRC);
  private direction: Vector2 = Vector2.RIGHT;
  private pendingDirection: Vector2 = Vector2.RIGHT;
  private segments: Vector2[];

  constructor(start: Vector2) {
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

  render(ctx: CanvasRenderingContext2D, grid: GridSize): void {
    this.segments.forEach((segment, index) => {
      const sprite = index === 0 ? this.headSprite : this.bodySprite;
      drawGridSprite(ctx, sprite, segment, grid);
    });
  }

  get body(): Vector2[] {
    return this.segments.slice(1);
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
