import { Component } from '@angular/core';
import { ArcadeTitle } from '../../../shared/components/arcade-title/arcade-title';
import { Pet } from '../../../shared/components/pet/pet';
import { PetUi } from '../../../shared/components/pet-ui/pet-ui';
import { ArcadeGameSelector } from '../../../shared/components/arcade-game-selector/arcade-game-selector';
import { ArcadeGame } from '../../../shared/components/arcade-game-selector/models/ArcadeGame';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [ArcadeTitle, Pet, PetUi, ArcadeGameSelector],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  petOpen = false;

  constructor(private router: Router) {}

  togglePetUI() {
    this.petOpen = !this.petOpen;
  }

  openGame(game: ArcadeGame) {
    //todo add fade out effect

    //todo wait until fully black!

    this.router.navigate([game.href]);
  }
}
