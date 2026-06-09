export class Vector2 {
  constructor(
    public x: number,
    public y: number,
  ) {}

  addVector(b: Vector2): Vector2 {
    return new Vector2(this.x + b.x, this.y + b.y);
  }

  sameVector(b: Vector2): boolean {
    return this.x === b.x && this.y === b.y;
  }

  reverseVector(b: Vector2): boolean {
    return this.x === -b.x && this.y === -b.y;
  }

  toString(): string {
    return `Vector2(${this.x}, ${this.y})`;
  }

  toKey(): string {
    return `${this.x}:${this.y}`;
  }
}
