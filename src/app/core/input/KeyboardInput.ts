import { KeyboardInputMap } from './KeyboardInputMap';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyboardInput {
  private readonly activeKeys = new Set<string>();

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  private normalizeKey(key: string): string {
    return key.toLowerCase();
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const key = this.normalizeKey(event.key);
    if (KeyboardInputMap.ALL_INPUTS.has(key)) {
      this.activeKeys.add(key);
      event.preventDefault();
    }
  };

  private onKeyUp = (event: KeyboardEvent) => {
    const key = this.normalizeKey(event.key);
    this.activeKeys.delete(key);
  };

  isPressed(...keys: string[]): boolean {
    return keys.some((key) => this.activeKeys.has(key));
  }

  get horizontal(): number {
    const left = this.isPressed(...KeyboardInputMap.LEFT);
    const right = this.isPressed(...KeyboardInputMap.RIGHT);
    return Number(right) - Number(left);
  }

  get vertical(): number {
    const up = this.isPressed(...KeyboardInputMap.UP);
    const down = this.isPressed(...KeyboardInputMap.DOWN);
    return Number(down) - Number(up);
  }

  get isMoving(): boolean {
    return this.horizontal !== 0 || this.vertical !== 0;
  }
}
