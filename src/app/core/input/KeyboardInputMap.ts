import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class KeyboardInputMap {
  public static readonly LEFT = new Set(['arrowleft', 'a']);
  public static readonly RIGHT = new Set(['arrowright', 'd']);
  public static readonly UP = new Set(['arrowup', 'w']);
  public static readonly DOWN = new Set(['arrowdown', 's']);

  public static readonly MOVEMENT_INPUT = new Set([
    ...KeyboardInputMap.LEFT,
    ...KeyboardInputMap.RIGHT,
    ...KeyboardInputMap.UP,
    ...KeyboardInputMap.DOWN,
  ]);

  public static readonly ALL_INPUTS = new Set(KeyboardInputMap.MOVEMENT_INPUT);
}
