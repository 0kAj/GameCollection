import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  feeding = false;

  constructor(protected statManager: StatManager) {}

  feed() {
    this.statManager.eatScore(10);

    //play feed animation
    this.feeding = true;
    setTimeout(() => {
      this.feeding = false;
    }, 500);
  }
}
