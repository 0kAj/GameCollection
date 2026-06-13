import { drawGameOver } from '../../../core/rendering/draw-game-over';
import { IGame } from '../../../core/engine/IGame';
import { KeyboardInput } from '../../../core/input/KeyboardInput';
import { GridSize } from '../models/grid-size';
import { Vector2 } from '../../../core/models/vector2';
import { Food } from '../objects/food';
import { Snake } from '../objects/snake';
import { MIN_COLUMNS, MIN_ROWS, TARGET_CELL_SIZE, TICK_SECONDS } from './snake-game.constants';

export class SnakeGameLogic implements IGame {
  private snake!: Snake;
  private food!: Food;
  private score = 0;
  private elapsed = 0;
  private gameOver = false;

  private currentGrid!: GridSize;

  constructor(
    private input: KeyboardInput,
    private readonly ctx: CanvasRenderingContext2D,
    private readonly notifyScore: (score: number) => void,
    private readonly notifyGameOver: (gameOver: boolean) => void
  ) {
    this.reset();
  }

  start(): void {
    this.updateScore();
    this.updateGameOver();
  }

  update(delta: number): void {
    if (this.gameOver) {
      return;
    }

    this.currentGrid = this.grid;

    const requestedDirection = this.readDirection();
    if (requestedDirection) {
      this.snake.setDirection(requestedDirection);
    }

    this.elapsed += delta;
    if (this.elapsed < TICK_SECONDS) {
      return;
    }

    this.elapsed = 0;
    const grows = this.snake.willEat(this.food.position);
    this.snake.move(grows);

    if (this.snake.hasHitWall(this.currentGrid) || this.snake.hasHitSelf()) {
      this.gameOver = true;
      this.updateGameOver();
      return;
    }

    if (grows) {
      this.score += 1;
      this.updateScore();
      this.food.respawn(this.currentGrid, this.snake.body);
    }
  }

  render(): void {
    const grid = this.grid;
    this.clearScreen();
    this.drawGrid(grid);
    this.food.render(this.ctx, grid);
    this.snake.render(this.ctx, grid);

    if (this.gameOver) {
      drawGameOver(this.ctx, 'The snake crashed.');
    }
  }

  private reset(): void {
    const grid = this.grid;
    this.snake = new Snake(
      new Vector2(
        Math.floor(grid.columns / 2),
        Math.floor(grid.rows / 2)
      )
    );
    this.food = new Food();
    this.food.respawn(grid, this.snake.body);
    this.updateScore();
    this.updateGameOver();
  }

  private readDirection(): Vector2 | undefined {
    if (this.input.horizontal > 0) {
      return Vector2.RIGHT;
    }

    if (this.input.horizontal < 0) {
      return Vector2.LEFT;
    }

    if (this.input.vertical > 0) {
      return Vector2.DOWN;
    }

    if (this.input.vertical < 0) {
      return Vector2.UP;
    }

    return undefined;
  }

  private clearScreen(): void {
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private drawGrid(grid: GridSize): void {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    this.ctx.lineWidth = 1;

    for (let x = 0; x <= grid.columns; x += 1) {
      const canvasX = x * grid.cellWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(canvasX, 0);
      this.ctx.lineTo(canvasX, this.ctx.canvas.height);
      this.ctx.stroke();
    }

    for (let y = 0; y <= grid.rows; y += 1) {
      const canvasY = y * grid.cellHeight;
      this.ctx.beginPath();
      this.ctx.moveTo(0, canvasY);
      this.ctx.lineTo(this.ctx.canvas.width, canvasY);
      this.ctx.stroke();
    }
  }

  private updateScore(): void {
    this.notifyScore(this.score);
  }

  private updateGameOver(): void {
    this.notifyGameOver(this.gameOver);
  }

  private get grid(): GridSize {
    const width = Math.max(1, this.ctx.canvas.width);
    const height = Math.max(1, this.ctx.canvas.height);
    const columns = Math.max(MIN_COLUMNS, Math.floor(width / TARGET_CELL_SIZE));
    const rows = Math.max(MIN_ROWS, Math.floor(height / TARGET_CELL_SIZE));

    return {
      columns,
      rows,
      cellWidth: width / columns,
      cellHeight: height / rows,
    };
  }
}
