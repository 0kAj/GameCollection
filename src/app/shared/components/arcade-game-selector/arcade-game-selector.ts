import { Component, EventEmitter, Output } from '@angular/core';
import { IGame } from '../../../core/engine/IGame';
import { ArcadeGame } from './models/ArcadeGame';
import { ArcadeTitle } from "../arcade-title/arcade-title";

@Component({
  selector: 'app-arcade-game-selector',
  imports: [ArcadeTitle],
  templateUrl: './arcade-game-selector.html',
  styleUrl: './arcade-game-selector.css',
})
export class ArcadeGameSelector {
  @Output() selectGame = new EventEmitter<ArcadeGame>();

  //todo ArcadeGame class

  public games = [ //todo extract it to external const
    new ArcadeGame('Collector', 'assets/games/FoodCollector.png', 'collector'),
    new ArcadeGame('Snake', 'assets/games/Snake.png', 'snake'), //todo change img
  ]
}
