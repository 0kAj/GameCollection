import { Vector2 } from '../models/vector2';

export const TARGET_CELL_SIZE = 36;
export const MIN_COLUMNS = 12;
export const MIN_ROWS = 10;
export const TICK_SECONDS = 0.14;

export const SNAKE_HEAD_SPRITE_SRC = 'assets/pets/Mouse.png';
export const SNAKE_BODY_SPRITE_SRC = 'assets/pets/Mouse_bg.png';
export const FOOD_SPRITE_SRC = 'assets/food/apple.png';

export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
} satisfies Record<string, Vector2>;
