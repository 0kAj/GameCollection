import { Routes } from '@angular/router';
import { CollectorGame } from './page/collector-game/collector-game';
import { SnakeGame } from './page/snake-game/snake-game';
import { HomePage } from './page/home-page/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'collector', component: CollectorGame },
  { path: 'snake', component: SnakeGame },
  { path: '**', redirectTo: 'collector' },
];
