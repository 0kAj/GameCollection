import { loadImage } from '../../../core/assets/image-loader';
import { GameObject } from '../../../core/engine/GameObject';
import { Rect2 } from '../../../core/models/rect2';
import { Vector2 } from '../../../core/models/vector2';
import {
  COLLECTIBLE_SPRITE_SRC,
  ITEM_SIZE,
} from '../logic/collector-game.constants';
import { CollectibleConfig } from './collectible.conf';

export class Collectible extends GameObject {
  private age = 0;
  private readonly lifetime: number;
  private readonly offset: number;

  constructor(config: CollectibleConfig) {
    super(Vector2.ZERO, ITEM_SIZE, ITEM_SIZE, loadImage(COLLECTIBLE_SPRITE_SRC));

    this.lifetime = config.lifetimeSeconds;
    this.offset = config.offset ?? ITEM_SIZE * 1.5;

    this.respawn(0, 0, Rect2.ZERO);
  }

  respawn(width: number, height: number, avoid: Rect2): void {
    this.age = 0;
    this.width = ITEM_SIZE;
    this.height = ITEM_SIZE;

    const margin = this.offset;
    const maxX = Math.max(width - this.width - margin, margin);
    const maxY = Math.max(height - this.height - margin, margin);

    do {
      this.position.x = margin + Math.random() * (maxX - margin);
      this.position.y = margin + Math.random() * (maxY - margin);
    } while (this.isTooClose(avoid));
  }

  override update(delta: number): void {
    if (this.hasVanished) {
      return;
    }

    const centerX = this.position.x + this.width / 2;
    const centerY = this.position.y + this.height / 2;

    this.age = Math.min(this.age + delta, this.lifetime);
    const scale = this.scaleFactor;
    this.width = ITEM_SIZE * scale;
    this.height = ITEM_SIZE * scale;
    this.position.x = centerX - this.width / 2;
    this.position.y = centerY - this.height / 2;
  }

  override render(ctx: CanvasRenderingContext2D): void {
    this.renderSprite(ctx);
  }

  get hasVanished(): boolean {
    return this.age >= this.lifetime;
  }

  private isTooClose(avoid: Rect2): boolean {
    const dx = this.position.x + this.width / 2 - (avoid.position.x + avoid.width / 2);
    const dy = this.position.y + this.height / 2 - (avoid.position.y + avoid.height / 2);
    return Math.hypot(dx, dy) < this.width * 2;
  }

  get scaleFactor(): number {
    return 1 - this.age / this.lifetime;
  }

  get scoreValue(): number {
    if (this.scaleFactor <= 0.15) {
      return 10; // bonus
    }

    if (this.scaleFactor > 0.75) {
      return 4;
    }

    if (this.scaleFactor > 0.5) {
      return 3;
    }

    if (this.scaleFactor > 0.25) {
      return 2;
    }

    return 1;
  }
}
