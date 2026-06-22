import { Injectable } from '@angular/core';
import { KeyboardKeys } from './KeyboardKeys';

@Injectable({
  providedIn: 'root',
})
export class KeyboardInputMap {
  public static readonly LEFT: Set<string> = new Set([KeyboardKeys.ARROW_LEFT, KeyboardKeys.A]);
  public static readonly RIGHT: Set<string> = new Set([KeyboardKeys.ARROW_RIGHT, KeyboardKeys.D]);
  public static readonly UP: Set<string> = new Set([KeyboardKeys.ARROW_UP, KeyboardKeys.W]);
  public static readonly DOWN: Set<string> = new Set([KeyboardKeys.ARROW_DOWN, KeyboardKeys.S]);

  public static readonly MOVEMENT_INPUT = new Set([
    ...KeyboardInputMap.LEFT,
    ...KeyboardInputMap.RIGHT,
    ...KeyboardInputMap.UP,
    ...KeyboardInputMap.DOWN,
  ]);

  public static readonly ALL_INPUTS = new Set(KeyboardInputMap.MOVEMENT_INPUT);
}
