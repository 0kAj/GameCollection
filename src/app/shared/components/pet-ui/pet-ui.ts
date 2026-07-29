import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { StatManager } from '../../services/stat-manager';

@Component({
  selector: 'app-pet-ui',
  imports: [],
  templateUrl: './pet-ui.html',
  styleUrl: './pet-ui.css',
})
export class PetUi {
  @Input() show: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  feeding = signal(false);

  constructor(protected statManager: StatManager) {}

  feed() {
    this.statManager.eatScore(10);

    //play feed animation
    this.feeding.set(true);

    setTimeout(() => {
      this.feeding.set(false);
    }, 500);
  }
}
