import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngine } from '../../core/engine/GameEngine';
import { CollectorGameLogic } from './logic/collector-game.logic';

@Component({
  standalone: true,
  selector: 'app-collector-game',
  imports: [CommonModule],
  templateUrl: './collector-game.html',
  styleUrls: ['./collector-game.css'],
})
export class CollectorGame implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  protected readonly score = signal(0);
  protected readonly gameOver = signal(false);

  private engine?: GameEngine;
  private game?: CollectorGameLogic;
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Unable to initialize canvas rendering context');
    }

    this.engine = new GameEngine(context);
    this.resizeCanvas();
    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(canvas);
    this.restart();
  }

  protected restart(): void {
    this.game?.destroy?.();
    this.score.set(0);
    this.gameOver.set(false);

    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    this.game = new CollectorGameLogic(
      context,
      (score) => this.score.set(score),
      (gameOver) => this.gameOver.set(gameOver)
    );
    this.engine?.load(this.game);
    this.engine?.start();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.engine?.stop();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    if (canvas.width !== width) {
      canvas.width = width;
    }

    if (canvas.height !== height) {
      canvas.height = height;
    }
  }
}
