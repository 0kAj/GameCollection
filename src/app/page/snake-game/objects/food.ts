import { loadImage } from '../../../core/assets/image-loader';
import { FOOD_SPRITE_SRC } from '../logic/snake-game.constants';
import { GridSize } from '../models/grid-size';
import { Vector2 } from '../models/vector2';
import { drawGridSprite } from '../utils/draw-grid-sprite';
import { vectorKey } from '../utils/vector';

export class Food {
  public position: Vector2 = { x: 0, y: 0 };
  private readonly sprite = loadImage(FOOD_SPRITE_SRC);

  respawn(grid: GridSize, blocked: Vector2[]): void {
    const blockedCells = new Set(blocked.map(vectorKey));
    const openCells: Vector2[] = [];

    for (let y = 0; y < grid.rows; y += 1) {
      for (let x = 0; x < grid.columns; x += 1) {
        const position = { x, y };
        if (!blockedCells.has(vectorKey(position))) {
          openCells.push(position);
        }
      }
    }

    if (openCells.length === 0) {
      return;
    }

    this.position = openCells[Math.floor(Math.random() * openCells.length)];
  }

  render(ctx: CanvasRenderingContext2D, grid: GridSize): void {
    drawGridSprite(ctx, this.sprite, this.position, grid);
  }
}
