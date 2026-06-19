import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arcade-title',
  imports: [],
  templateUrl: './arcade-title.html',
  styleUrl: './arcade-title.css',
})
export class ArcadeTitle {
  @Input() fontSize = '12px';

  colors = [
    '#ff004c',
    '#ff7a00',
    '#ffee00',
    '#00ff66',
    '#00fff2',
    '#0099ff',
    '#7a00ff',
    '#ff00e6',
    '#ff004c',
    '#ff7a00',
    '#ffee00',
    '#00ff66',
    '#00fff2',
    '#ff00e6',
    '#0099ff',
  ];

  private _text = 'GAME COLLECTION';

  letters: string[] = [];

  @Input()
  set text(value: string) {
    this._text = value;
    this.letters = value.split('');
  }

  get text() {
    return this._text;
  }
}
