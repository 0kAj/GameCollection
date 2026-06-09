import { Routes } from '@angular/router';
import { CollectorGame } from './page/collector-game/collector-game';
import { SnakeGame } from './page/snake-game/snake-game';

export const routes: Routes = [
  { path: '', redirectTo: 'snake', pathMatch: 'full' },
  { path: 'collector', component: CollectorGame },
  { path: 'snake', component: SnakeGame },
  { path: '**', redirectTo: 'snake' },
];
