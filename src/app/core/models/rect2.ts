import { clamp } from '../utils/clamp';
import { Size } from './size';
import { Vector2 } from './vector2';

export class Rect2 extends Size {
  constructor(
    public position: Vector2,
    width: number,
    height: number,
  ) {
    super(width, height);
  }

  contains(point: Vector2): boolean {
    return (
      point.x >= this.position.x &&
      point.x < this.position.x + this.width &&
      point.y >= this.position.y &&
      point.y < this.position.y + this.height
    );
  }

  overlaps(other: Rect2): boolean {
    return (
      this.position.x < other.position.x + other.width &&
      this.position.x + this.width > other.position.x &&
      this.position.y < other.position.y + other.height &&
      this.position.y + this.height > other.position.y
    );
  }
}
