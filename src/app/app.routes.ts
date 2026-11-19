import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Dashboard } from './layout/shell/dashboard/dashboard';
import { SectionPage } from './layout/shell/section-page/section-page';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: Dashboard },
      {
        path: 'facility',
        component: SectionPage,
        data: {
          pageKey: 'facility',
          title: 'Manage Facility',
          description: 'Facility profile, rooms, staff, and operational settings.',
        },
      },
      {
        path: 'residents',
        pathMatch: 'full',
        component: SectionPage,
        data: {
          pageKey: 'residents',
          title: 'Residents',
          description: 'Review resident profiles and care information.',
        },
      },
      {
        path: 'residents/:residentId/notes',
        component: SectionPage,
        data: {
          pageKey: 'residentNotes',
          title: 'Resident Notes',
          description: 'Review and document resident care notes.',
        },
      },
      {
        path: 'residents/:residentId/tasks-and-adls',
        component: SectionPage,
        data: {
          pageKey: 'residentTasks',
          title: 'Tasks & ADLs',
          description: 'Track daily living activities and care tasks.',
        },
      },
      {
        path: 'emar',
        pathMatch: 'full',
        component: SectionPage,
        data: {
          pageKey: 'emar',
          title: 'eMar',
          description: 'Medication administration and resident medication records.',
        },
      },
      {
        path: 'emar/:residentId/med-pass',
        component: SectionPage,
        data: {
          pageKey: 'medPass',
          title: 'Medication Pass',
          description: 'Review and record the next medication pass.',
        },
      },
      {
        path: 'emar/:residentId/med-log',
        component: SectionPage,
        data: {
          pageKey: 'medLog',
          title: 'Medication Log',
          description: 'Review medication administration history.',
        },
      },
      {
        path: 'tasks',
        component: SectionPage,
        data: {
          pageKey: 'tasks',
          title: 'Task Manager',
          description: 'Coordinate daily tasks and care team assignments.',
        },
      },
      {
        path: 'form-builder',
        component: SectionPage,
        data: {
          pageKey: 'formBuilder',
          title: 'Form Builder',
          description: 'Create and manage facility forms.',
        },
      },
      {
        path: 'fax',
        component: SectionPage,
        data: {
          pageKey: 'fax',
          title: 'Fax',
          description: 'Review incoming and outgoing facility faxes.',
        },
      },
      {
        path: 'reports',
        component: SectionPage,
        data: {
          pageKey: 'reports',
          title: 'Reports',
          description: 'Explore facility, resident, and care activity reports.',
        },
      },
      {
        path: 'resources',
        component: SectionPage,
        data: {
          pageKey: 'resources',
          title: 'Resources',
          description: 'Browse tools and information for your care team.',
        },
      },
      {
        path: 'getting-started',
        component: SectionPage,
        data: {
          pageKey: 'gettingStarted',
          title: 'Get Started',
          description: 'A guide to setting up and using your facility workspace.',
        },
      },
      {
        path: '**',
        component: SectionPage,
        data: {
          pageKey: 'notFound',
          title: 'Page not found',
          description: 'The page you requested does not exist.',
        },
      },
    ],
  },
];
