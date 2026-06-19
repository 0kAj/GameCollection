import { loadImage } from '../../../core/assets/image-loader';
import { GameObject } from '../../../core/engine/GameObject';
import { FOOD_SPRITE_SRC } from '../logic/snake-game.constants';
import { GridSize } from '../models/grid-size';
import { Vector2 } from '../../../core/models/vector2';

export class Food extends GameObject {
  private gridPosition: Vector2 = Vector2.ZERO;

  constructor() {
    super(Vector2.ZERO, 0, 0, loadImage(FOOD_SPRITE_SRC));
  }

  respawn(grid: GridSize, blocked: Vector2[]): void {
    const blockedCells = new Set(blocked.map((pos) => pos.toKey()));
    const openCells: Vector2[] = [];

    for (let y = 0; y < grid.rows; y += 1) {
      for (let x = 0; x < grid.columns; x += 1) {
        const position = new Vector2(x, y);
        if (!blockedCells.has(position.toKey())) {
          openCells.push(position);
        }
      }
    }

    if (openCells.length === 0) {
      return;
    }

    this.gridPosition = openCells[Math.floor(Math.random() * openCells.length)];
    this.updatePixelPosition(grid);
  }

  override update(delta: number): void {
    // Food doesn't need positional updates
  }

  override render(ctx: CanvasRenderingContext2D): void {
    this.renderSprite(ctx);
  }

  updatePixelPosition(grid: GridSize): void {
    this.position.x = this.gridPosition.x * grid.cellWidth;
    this.position.y = this.gridPosition.y * grid.cellHeight;
    this.width = grid.cellWidth;
    this.height = grid.cellHeight;
  }

  get gridPos(): Vector2 {
    return this.gridPosition;
  }
}
