import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface QuickAction {
  label: string;
  url: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quick-actions.html',
  styleUrl: './quick-actions.css'
})
export class QuickActions {

  readonly actions: QuickAction[] = [
    {
      label: 'Med Pass',
      url: '/emar/23584/med-pass'
    },
    {
      label: 'Med Log',
      url: '/emar/23584/med-log'
    },
    {
      label: 'Notes',
      url: '/residents/23584/notes'
    },
    {
      label: 'Tasks & ADLs',
      url: '/residents/23584/tasks-and-adls'
    }
  ];

}