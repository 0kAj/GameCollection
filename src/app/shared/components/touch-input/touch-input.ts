import { KeyboardInputMap } from '../../../core/input/KeyboardInputMap';
import { KeyboardKeys } from '../../../core/input/KeyboardKeys';
import { KeyboardInput } from './../../../core/input/KeyboardInput';
import { Component } from '@angular/core';

@Component({
  selector: 'app-touch-input',
  imports: [],
  templateUrl: './touch-input.html',
  styleUrl: './touch-input.css',
})
export class TouchInput {
  protected keyboardInput: KeyboardInput;

  constructor(keyboardInput: KeyboardInput) {
    this.keyboardInput = keyboardInput;
  }

  onUpPress() {
    this.keyboardInput.press(KeyboardKeys.ARROW_UP);
  }

  onUpRelease() {
    this.keyboardInput.unpress(KeyboardKeys.ARROW_UP);
  }

  onDownPress() {
    this.keyboardInput.press(KeyboardKeys.ARROW_DOWN);
  }

  onDownRelease() {
    this.keyboardInput.unpress(KeyboardKeys.ARROW_DOWN);
  }

  onLeftPress() {
    this.keyboardInput.press(KeyboardKeys.ARROW_LEFT);
  }

  onLeftRelease() {
    this.keyboardInput.unpress(KeyboardKeys.ARROW_LEFT);
  }

  onRightPress() {
    this.keyboardInput.press(KeyboardKeys.ARROW_RIGHT);
  }

  onRightRelease() {
    this.keyboardInput.unpress(KeyboardKeys.ARROW_RIGHT);
  }

  get show(): boolean {
    return this.keyboardInput.isTouchDevice;
  }
}
