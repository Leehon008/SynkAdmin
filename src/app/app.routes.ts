import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Dashboard } from './layout/shell/dashboard/dashboard';

export const routes: Routes = [ {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        component: Dashboard
      }
    ]
  }
];
 