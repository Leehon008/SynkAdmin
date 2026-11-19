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
      url: '/emar/1/med-pass'
    },
    {
      label: 'Med Log',
      url: '/emar/1/med-log'
    },
    {
      label: 'Notes',
      url: '/residents/1/notes'
    },
    {
      label: 'Tasks & ADLs',
      url: '/residents/1/tasks-and-adls'
    }
  ];

}