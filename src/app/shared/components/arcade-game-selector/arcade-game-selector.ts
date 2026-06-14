import { Component, EventEmitter, Output } from '@angular/core';
import { IGame } from '../../../core/engine/IGame';

@Component({
  selector: 'app-arcade-game-selector',
  imports: [],
  templateUrl: './arcade-game-selector.html',
  styleUrl: './arcade-game-selector.css',
})
export class ArcadeGameSelector {
  @Output() selectGame = new EventEmitter<object>();

  //todo ArcadeGame class
  games = [{
    name: 'Collector',
    image: 'assets/games/FoodCollector.png'
  }]
}
