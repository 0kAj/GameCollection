export class Vector2 {
  constructor(
    public x: number,
    public y: number,
  ) {}

  static get ZERO() {
    return new Vector2(0, 0);
  }

  static get UP() {
    return new Vector2(0, -1);
  }

  static get DOWN() {
    return new Vector2(0, 1);
  }

  static get LEFT() {
    return new Vector2(-1, 0);
  }

  static get RIGHT() {
    return new Vector2(1, 0);
  }

  add(b: Vector2): Vector2 {
    return new Vector2(this.x + b.x, this.y + b.y);
  }

  sameVector(b: Vector2): boolean {
    return this.x === b.x && this.y === b.y;
  }

  reverse(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  toString(): string {
    return `Vector2(${this.x}, ${this.y})`;
  }

  toKey(): string {
    return `${this.x}:${this.y}`;
  }
}
