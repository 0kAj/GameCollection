import { Injectable, signal } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ScreenFader {
  public doFade = signal(false);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('FINISHED');
        this.doFade.set(false);
      }
    });
  }

  navigateFadedTo(commands: readonly any[], extras?: NavigationExtras | undefined) {
    this.doFade.set(true);
    console.log('Started');

    setTimeout(() => {
      console.log('navigated');

      this.router.navigate(commands, extras);
    }, 1000);
  }
}
