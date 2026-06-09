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
    if (!this.sprite.complete || this.sprite.naturalWidth === 0 || this.width <= 0 || this.height <= 0) {
      return;
    }

    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}
