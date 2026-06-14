import { StatManager } from './../../shared/stat-manager';
import { AfterViewInit, Directive, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GameEngine } from './GameEngine';
import { IGame } from './IGame';
import { GameEvents } from './GameEvents';

@Directive()
export abstract class CanvasGameComponent<TGame extends IGame> implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  private game?: TGame;
  private resizeObserver?: ResizeObserver;

  constructor(
    private engine: GameEngine,
    protected statManager: StatManager,
  ) {}

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
    const context = this.canvasRef.nativeElement.getContext('2d');
    if (!context) {
      return;
    }

    this.statManager.updateGameOver(false);

    this.game = this.createGame(context, {
      onScore: (v) => this.statManager.addScore(v),
      onGameOver: () => this.statManager.updateGameOver(true),
      onStats: (stats) => this.statManager.updateStats(stats),
    });
    this.engine?.load(this.game);
    this.engine?.start();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.engine?.stop();
  }

  protected abstract createGame(context: CanvasRenderingContext2D, events: GameEvents): TGame;

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    canvas.width = width;
    canvas.height = height;
  }
}
