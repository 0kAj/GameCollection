import { Component } from '@angular/core';
import { ArcadeTitle } from '../../../shared/components/arcade-title/arcade-title';
import { Pet } from '../../../shared/components/pet/pet';
import { PetUi } from "../../../shared/components/pet-ui/pet-ui";
import { ArcadeGameSelector } from "../../../shared/components/arcade-game-selector/arcade-game-selector";

@Component({
  selector: 'app-home-page',
  imports: [ArcadeTitle, Pet, PetUi, ArcadeGameSelector],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  petOpen = false;

  togglePetUI() {
    this.petOpen = !this.petOpen;
  }
}
