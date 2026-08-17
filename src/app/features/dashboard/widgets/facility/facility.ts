import { Component } from '@angular/core';
import { UiCard } from '../../../../shared/components/ui-card/ui-card';

@Component({
  selector: 'app-facility',
  imports: [UiCard],
  templateUrl: './facility.html',
  styleUrl: './facility.css'
})
export class Facility {
  readonly facility = {
    name: '#1 Empowering AFH 2 L',
    address: '123 Main Street',
    city: 'Seattle, WA',
    residents: 6,
    daysUntilInspection: 13
  };
}