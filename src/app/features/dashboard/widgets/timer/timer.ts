import { Component, signal } from '@angular/core';
import { UiCard } from '../../../../shared/components/ui-card/ui-card';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [UiCard],
  templateUrl: './timer.html',
  styleUrl: './timer.css'
})
export class Timer {
  readonly running = signal(false);
  readonly elapsed = signal('00:00:00');

  toggleTimer(): void {
    this.running.update(value => !value);
  }
}