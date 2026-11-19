import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiCard } from '../../../../shared/components/ui-card/ui-card';
import { DEMO_RESIDENTS } from '../../../../shared/data/demo-residents';
import { getDemoAdministrations } from '../../../../shared/data/demo-medications';
import { DASHBOARD_PREVIEW_LIMIT } from '../../dashboard.constants';

const STATUS_PRIORITY: Record<string, number> = {
  'Due now': 0,
  Upcoming: 1,
  Scheduled: 2,
  Recorded: 3,
};

@Component({
  selector: 'app-medications',
  imports: [RouterLink, UiCard],
  templateUrl: './medications.html',
  styleUrl: './medications.css',
})
export class Medications {
  readonly administrations = DEMO_RESIDENTS.flatMap((resident) =>
    getDemoAdministrations(resident.id).map((administration) => ({
      ...administration,
      resident,
    })),
  );
  readonly dueCount = this.administrations.filter(({ status }) => status === 'Due now').length;
  readonly recordedCount = this.administrations.filter(({ status }) => status === 'Recorded').length;
  readonly visibleAdministrations = [...this.administrations]
    .sort((left, right) => STATUS_PRIORITY[left.status] - STATUS_PRIORITY[right.status])
    .slice(0, DASHBOARD_PREVIEW_LIMIT);
}
