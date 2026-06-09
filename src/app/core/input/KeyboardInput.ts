import { KeyListenerRegistration } from './key-listener-registration';

export class KeyboardInput {
  private readonly activeKeys = new Set<string>();
  private readonly listeners: KeyListenerRegistration[] = [];

  constructor() {
    this.addListener('keydown', this.onKeyDown);
    this.addListener('keyup', this.onKeyUp);
  }

  private addListener(type: 'keydown' | 'keyup', listener: (event: KeyboardEvent) => void) {
    window.addEventListener(type, listener);
    this.listeners.push({ type, listener });
  }

  private normalizeKey(key: string): string {
    return key.toLowerCase();
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const key = this.normalizeKey(event.key);
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
      this.activeKeys.add(key);
      event.preventDefault();
    }
  };

  private onKeyUp = (event: KeyboardEvent) => {
    const key = this.normalizeKey(event.key);
    this.activeKeys.delete(key);
  };

  get horizontal(): number {
    const left = this.activeKeys.has('arrowleft') || this.activeKeys.has('a');
    const right = this.activeKeys.has('arrowright') || this.activeKeys.has('d');
    return Number(right) - Number(left);
  }

  get vertical(): number {
    const up = this.activeKeys.has('arrowup') || this.activeKeys.has('w');
    const down = this.activeKeys.has('arrowdown') || this.activeKeys.has('s');
    return Number(down) - Number(up);
  }

  get isMoving(): boolean {
    return this.horizontal !== 0 || this.vertical !== 0;
  }

  destroy(): void {
    for (const { type, listener } of this.listeners) {
      window.removeEventListener(type, listener);
    }
    this.listeners.length = 0;
    this.activeKeys.clear();
  }
}
