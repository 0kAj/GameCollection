import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StatManager } from '../../stat-manager';

@Component({
  selector: 'app-pet-ui',
  imports: [],
  templateUrl: './pet-ui.html',
  styleUrl: './pet-ui.css',
})
export class PetUi {
  @Input() show: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(protected statManager: StatManager) {}

  feed() {
    this.statManager.eatScore(10);
  }
}
