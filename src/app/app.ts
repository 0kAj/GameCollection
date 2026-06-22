import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenFader } from './animation/screen-fader';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  constructor(protected router: ScreenFader) {}
}
