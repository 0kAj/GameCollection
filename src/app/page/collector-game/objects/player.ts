import { loadImage } from '../../../core/assets/image-loader';
import { GameObject } from '../../../core/engine/GameObject';
import { KeyboardInput } from '../../../core/input/KeyboardInput';
import {
  PLAYER_SIZE,
  PLAYER_SPEED,
  PLAYER_SPRITE_SRC,
} from '../logic/collector-game.constants';
import { BoardSize } from '../models/board-size';
import { clamp } from '../utils/clamp';

export class Player extends GameObject {
  constructor(
    x: number,
    y: number,
    private readonly input: KeyboardInput,
    private readonly getBoard: () => BoardSize,
    private readonly speed = PLAYER_SPEED
  ) {
    super(x, y, PLAYER_SIZE, PLAYER_SIZE, loadImage(PLAYER_SPRITE_SRC));
  }

  override update(delta: number): void {
    const board = this.getBoard();
    const dx = this.input.horizontal * this.speed * delta;
    const dy = this.input.vertical * this.speed * delta;
    this.x = clamp(this.x + dx, 0, board.width - this.width);
    this.y = clamp(this.y + dy, 0, board.height - this.height);
  }

  override render(ctx: CanvasRenderingContext2D): void {
    this.renderSprite(ctx);
  }
}
