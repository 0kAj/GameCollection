import { Component, signal } from '@angular/core';
import { ArcadeTitle } from '../../shared/components/arcade-title/arcade-title';
import { Pet } from '../../shared/components/pet/pet';
import { PetUi } from '../../shared/components/pet-ui/pet-ui';
import { ArcadeGameSelector } from '../../shared/components/arcade-game-selector/arcade-game-selector';
import { ArcadeGame } from '../../shared/components/arcade-game-selector/models/ArcadeGame';
import { Router } from '@angular/router';
import { ScoreBoard } from "../../shared/components/score-board/score-board";

@Component({
  selector: 'app-home-page',
  imports: [ArcadeTitle, Pet, ArcadeGameSelector, ScoreBoard, PetUi],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  petUIOpen = signal(false);

  constructor(private router: Router) {}

  togglePetUI() {
    this.petUIOpen.update(v => !v);
  }

  openGame(game: ArcadeGame) {
    //todo add fade out effect

    //todo wait until fully black!

    this.router.navigate([game.href]);
  }
}
