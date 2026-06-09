import { Routes } from '@angular/router';
import { CollectorGame } from './page/collector-game/collector-game';

export const routes: Routes = [
  { path: '', redirectTo: 'collector', pathMatch: 'full' },
  { path: 'collector', component: CollectorGame },
  { path: '**', redirectTo: 'collector' },
];
