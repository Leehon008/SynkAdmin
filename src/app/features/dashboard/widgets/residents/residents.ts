import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UiCard } from '../../../../shared/components/ui-card/ui-card';
import { UiAvatar } from '../../../../shared/components/ui-avatar/ui-avatar';
import { DEMO_RESIDENTS } from '../../../../shared/data/demo-residents';
import { DASHBOARD_PREVIEW_LIMIT } from '../../dashboard.constants';

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [
    UiCard,
    UiAvatar,
    RouterLink,
  ],
  templateUrl: './residents.html',
  styleUrl: './residents.css'
})
export class Residents {
  readonly residents = DEMO_RESIDENTS.slice(0, DASHBOARD_PREVIEW_LIMIT);
}