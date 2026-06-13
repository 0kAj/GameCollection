import { loadImage } from '../../../core/assets/image-loader';
import { GameObject } from '../../../core/engine/GameObject';
import { KeyboardInput } from '../../../core/input/KeyboardInput';
import {
  PLAYER_SIZE,
  PLAYER_SPEED,
  PLAYER_SPRITE_SRC,
} from '../logic/collector-game.constants';
import { clamp } from '../../../core/utils/clamp';
import { Size } from '../../../core/models/size';
import { Vector2 } from '../../../core/models/vector2';

export class Player extends GameObject {
  constructor(
    position: Vector2,
    private readonly input: KeyboardInput,
    private readonly getBoard: () => Size,
    private readonly speed = PLAYER_SPEED
  ) {
    super(position, PLAYER_SIZE, PLAYER_SIZE, loadImage(PLAYER_SPRITE_SRC));
  }

  override update(delta: number): void {
    const board = this.getBoard();
    const dx = this.input.horizontal * this.speed * delta;
    const dy = this.input.vertical * this.speed * delta;
    this.position.x = clamp(this.position.x + dx, 0, board.width - this.width);
    this.position.y = clamp(this.position.y + dy, 0, board.height - this.height);
  }

  override render(ctx: CanvasRenderingContext2D): void {
    this.renderSprite(ctx);
  }
}
