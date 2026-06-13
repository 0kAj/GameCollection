import { Vector2 } from '../models/vector2';
import { drawLoadedImage } from '../rendering/draw-loaded-image';

export abstract class GameObject {
  constructor(
    public position: Vector2,
    public width: number,
    public height: number,
    public sprite: HTMLImageElement
  ) {}

  abstract update(delta: number): void;

  abstract render(ctx: CanvasRenderingContext2D): void;

  protected renderSprite(ctx: CanvasRenderingContext2D): void {
    drawLoadedImage(ctx, this.sprite, this.position.x, this.position.y, this.width, this.height);
  }
}
