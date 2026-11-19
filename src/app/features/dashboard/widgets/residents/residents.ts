import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { UiCard } from '../../../../shared/components/ui-card/ui-card';
import { UiAvatar } from '../../../../shared/components/ui-avatar/ui-avatar';

interface Resident {
  id: number;
  name: string;
  initials: string;
  room: string;
  status: 'Stable' | 'Attention';
}

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
  readonly residents: Resident[] = [
    {
      id: 1,
      name: 'Mary Johnson',
      initials: 'MJ',
      room: 'Room 101',
      status: 'Stable'
    },
    {
      id: 2,
      name: 'Robert Williams',
      initials: 'RW',
      room: 'Room 102',
      status: 'Stable'
    },
    {
      id: 3,
      name: 'Patricia Brown',
      initials: 'PB',
      room: 'Room 103',
      status: 'Attention'
    },
    {
      id: 4,
      name: 'James Davis',
      initials: 'JD',
      room: 'Room 104',
      status: 'Stable'
    }
  ];
}