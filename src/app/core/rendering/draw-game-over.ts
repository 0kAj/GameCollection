export function drawGameOver(ctx: CanvasRenderingContext2D, message: string): void {
  const { width, height } = ctx.canvas;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.76)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '32px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Game over', width / 2, height / 2 - 12);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '16px Inter, system-ui, sans-serif';
  ctx.fillText(message, width / 2, height / 2 + 22);
  ctx.textAlign = 'start';
}
