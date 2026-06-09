import { Vector2 } from '../models/vector2';

export function addVector(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function sameVector(a: Vector2, b: Vector2): boolean {
  return a.x === b.x && a.y === b.y;
}

export function reverseVector(a: Vector2, b: Vector2): boolean {
  return a.x === -b.x && a.y === -b.y;
}

export function vectorKey(vector: Vector2): string {
  return `${vector.x}:${vector.y}`;
}
