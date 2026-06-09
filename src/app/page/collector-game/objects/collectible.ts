import { loadImage } from '../../../core/assets/image-loader';
import { GameObject } from '../../../core/engine/GameObject';
import {
  COLLECTIBLE_SPRITE_SRC,
  ITEM_LIFETIME_SECONDS,
  ITEM_SIZE,
} from '../logic/collector-game.constants';
import { Bounds } from '../models/bounds';

export class Collectible extends GameObject {
  private age = 0;

  constructor(private readonly offset = ITEM_SIZE * 1.5) {
    super(0, 0, ITEM_SIZE, ITEM_SIZE, loadImage(COLLECTIBLE_SPRITE_SRC));
    this.respawn(0, 0, { x: 0, y: 0, width: 0, height: 0 });
  }

  respawn(width: number, height: number, avoid: Bounds): void {
    this.age = 0;
    this.width = ITEM_SIZE;
    this.height = ITEM_SIZE;

    const margin = this.offset;
    const maxX = Math.max(width - this.width - margin, margin);
    const maxY = Math.max(height - this.height - margin, margin);

    do {
      this.x = margin + Math.random() * (maxX - margin);
      this.y = margin + Math.random() * (maxY - margin);
    } while (this.isTooClose(avoid));
  }

  override update(delta: number): void {
    if (this.hasVanished) {
      return;
    }

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    this.age = Math.min(this.age + delta, ITEM_LIFETIME_SECONDS);
    const scale = 1 - this.age / ITEM_LIFETIME_SECONDS;
    this.width = ITEM_SIZE * scale;
    this.height = ITEM_SIZE * scale;
    this.x = centerX - this.width / 2;
    this.y = centerY - this.height / 2;
  }

  override render(ctx: CanvasRenderingContext2D): void {
    this.renderSprite(ctx);
  }

  get hasVanished(): boolean {
    return this.age >= ITEM_LIFETIME_SECONDS;
  }

  private isTooClose(avoid: Bounds): boolean {
    const dx = this.x + this.width / 2 - (avoid.x + avoid.width / 2);
    const dy = this.y + this.height / 2 - (avoid.y + avoid.height / 2);
    return Math.hypot(dx, dy) < this.width * 2;
  }
}
