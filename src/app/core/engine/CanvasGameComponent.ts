import { AfterViewInit, Directive, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { GameEngine } from './GameEngine';
import { IGame } from './IGame';

@Directive()
export abstract class CanvasGameComponent<TGame extends IGame> implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  public score = 0;
  public gameOver = false;

  private game?: TGame;
  private resizeObserver?: ResizeObserver;

  constructor(private engine: GameEngine) {}

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Unable to initialize canvas rendering context');
    }

    this.resizeCanvas();
    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(canvas);
    this.restart();
  }

  protected restart(): void {
    this.score = 0;
    this.gameOver = false;

    const context = this.canvasRef.nativeElement.getContext('2d');
    if (!context) {
      return;
    }

    this.game = this.createGame(
      context,
      (score) => this.score = score,
      (gameOver) => this.gameOver = gameOver
    );
    this.engine?.load(this.game);
    this.engine?.start();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.engine?.stop();
  }

  protected abstract createGame(
    context: CanvasRenderingContext2D,
    notifyScore: (score: number) => void,
    notifyGameOver: (gameOver: boolean) => void
  ): TGame;

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    canvas.width = width;
    canvas.height = height;
  }
}
