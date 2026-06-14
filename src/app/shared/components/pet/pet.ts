import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pet',
  imports: [],
  templateUrl: './pet.html',
  styleUrl: './pet.css',
})
export class Pet {
  @Output() openPetUI = new EventEmitter();
}
