import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(seconds: number, showMillis: boolean = true): string {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    if (showMillis) {
      const milli = Math.floor((seconds % 1) * 1000);

      return `${this.pad(min)}:${this.pad(sec)}.${this.padMilli(milli)}`;
    } else {
      return `${this.pad(min)}:${this.pad(sec)}`;
    }
  }

  private pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  private padMilli(n: number): string {
    return n.toString().padStart(3, '0');
  }
}
