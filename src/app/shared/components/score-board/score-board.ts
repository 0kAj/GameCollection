import { Component } from '@angular/core';
import { StatManager } from '../../stat-manager';

@Component({
  selector: 'app-score-board',
  imports: [],
  templateUrl: './score-board.html',
  styleUrl: './score-board.css',
})
export class ScoreBoard {

  constructor(protected statManager: StatManager) { }
}
