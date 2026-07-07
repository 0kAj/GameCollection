import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SoundService } from '../../core/sound/sound.service';
import { AudioClip } from '../../core/sound/AudioClip';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit {
  constructor(private sound: SoundService) {}

  ngOnInit(): void {
    this.sound.playSfx(AudioClip.Error);
  }
}
