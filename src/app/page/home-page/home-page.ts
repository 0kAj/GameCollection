import { Component, OnInit, signal } from '@angular/core';
import { ArcadeTitle } from '../../shared/components/arcade-title/arcade-title';
import { Pet } from '../../shared/components/pet/pet';
import { PetUi } from '../../shared/components/pet-ui/pet-ui';
import { ArcadeGameSelector } from '../../shared/components/arcade-game-selector/arcade-game-selector';
import { ArcadeGame } from '../../shared/components/arcade-game-selector/models/ArcadeGame';
import { Router } from '@angular/router';
import { ScoreBoard } from "../../shared/components/score-board/score-board";
import { ScreenFader } from '../../animation/screen-fader';
import { SoundService } from '../../core/sound/sound.service';
import { AudioClip } from '../../core/sound/AudioClip';

@Component({
  selector: 'app-home-page',
  imports: [ArcadeTitle, Pet, ArcadeGameSelector, ScoreBoard, PetUi],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  petUIOpen = signal(false);

  constructor(private router: ScreenFader, private sound: SoundService) {}

  ngOnInit(): void {
    this.sound.playBGMusic(AudioClip.BgLobby);
  }

  togglePetUI() {
    this.petUIOpen.update(v => !v);
    this.sound.playSfx(AudioClip.Click);
  }

  openGame(game: ArcadeGame) {
    this.router.navigateFadedTo([game.href]);
    this.sound.stopBGMusic();
    this.sound.playSfx(AudioClip.SelectGame);
  }
}
