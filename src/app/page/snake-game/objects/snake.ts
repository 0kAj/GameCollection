import { loadImage } from '../../../core/assets/image-loader';
import { DIRECTIONS, SNAKE_BODY_SPRITE_SRC, SNAKE_HEAD_SPRITE_SRC } from '../logic/snake-game.constants';
import { GridSize } from '../models/grid-size';
import { Vector2 } from '../models/vector2';
import { drawGridSprite } from '../utils/draw-grid-sprite';
import { addVector, reverseVector, sameVector } from '../utils/vector';

export class Snake {
  private readonly headSprite = loadImage(SNAKE_HEAD_SPRITE_SRC);
  private readonly bodySprite = loadImage(SNAKE_BODY_SPRITE_SRC);
  private direction: Vector2 = DIRECTIONS.right;
  private pendingDirection: Vector2 = DIRECTIONS.right;
  private segments: Vector2[];

  constructor(start: Vector2) {
    this.segments = [
      { x: start.x, y: start.y },
      { x: start.x - 1, y: start.y },
      { x: start.x - 2, y: start.y },
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
    return sameVector(this.nextHead, food);
  }

  hasHitWall(grid: GridSize): boolean {
    const head = this.head;
    return head.x < 0 || head.y < 0 || head.x >= grid.columns || head.y >= grid.rows;
  }

  hasHitSelf(): boolean {
    const head = this.head;
    return this.segments.slice(1).some((segment) => sameVector(segment, head));
  }

  render(ctx: CanvasRenderingContext2D, grid: GridSize): void {
    this.segments.forEach((segment, index) => {
      const sprite = index === 0 ? this.headSprite : this.bodySprite;
      drawGridSprite(ctx, sprite, segment, grid);
    });
  }

  get body(): Vector2[] {
    return this.segments.map((segment) => ({ ...segment }));
  }

  private get head(): Vector2 {
    return this.segments[0];
  }

  private get nextHead(): Vector2 {
    return addVector(this.head, this.pendingDirection);
  }

  private isReverse(direction: Vector2): boolean {
    return reverseVector(direction, this.direction);
  }
}
