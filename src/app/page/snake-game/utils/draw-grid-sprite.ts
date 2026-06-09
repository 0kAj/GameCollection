import { GridSize } from '../models/grid-size';
import { Vector2 } from '../models/vector2';
import { drawLoadedImage } from '../../../core/rendering/draw-loaded-image';

export function drawGridSprite(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLImageElement,
  position: Vector2,
  grid: GridSize
): void {
  drawLoadedImage(
    ctx,
    sprite,
    position.x * grid.cellWidth,
    position.y * grid.cellHeight,
    grid.cellWidth,
    grid.cellHeight
  );
}
