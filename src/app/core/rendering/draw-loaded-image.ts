export function drawLoadedImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  if (!image.complete || image.naturalWidth === 0 || width <= 0 || height <= 0) {
    return;
  }

  ctx.drawImage(image, x, y, width, height);
}
