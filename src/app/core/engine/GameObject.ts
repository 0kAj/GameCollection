import { drawLoadedImage } from '../rendering/draw-loaded-image';

export abstract class GameObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public sprite: HTMLImageElement
  ) {}

  abstract update(delta: number): void;

  abstract render(ctx: CanvasRenderingContext2D): void;

  protected renderSprite(ctx: CanvasRenderingContext2D): void {
    drawLoadedImage(ctx, this.sprite, this.x, this.y, this.width, this.height);
  }
}
