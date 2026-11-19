import { Component } from '@angular/core';

import { UiCard } from '../../../shared/components/ui-card/ui-card';
import { Facility } from '../../../features/dashboard/widgets/facility/facility';
import { Residents } from '../../../features/dashboard/widgets/residents/residents';
import { QuickActions } from '../../../features/dashboard/components/quick-actions/quick-actions';
import { Medications } from '../../../features/dashboard/widgets/medications/medications';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    UiCard,
    Facility,
    Residents,
    QuickActions,
    Medications,
    DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  today = new Date();
}