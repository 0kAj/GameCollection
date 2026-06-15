import { Routes } from '@angular/router';
import { CollectorGame } from './page/collector-game/collector-game';
import { SnakeGame } from './page/snake-game/snake-game';
import { HomePage } from './page/home-page/home-page/home-page';
import { NotFound } from './page/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'collector', component: CollectorGame },
  { path: 'snake', component: SnakeGame },
  { path: '**', component: NotFound },
];
