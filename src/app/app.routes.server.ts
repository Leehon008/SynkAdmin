import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'residents/:residentId/notes',
    renderMode: RenderMode.Server
  },
  {
    path: 'residents/:residentId/tasks-and-adls',
    renderMode: RenderMode.Server
  },
  {
    path: 'emar/:residentId/med-pass',
    renderMode: RenderMode.Server
  },
  {
    path: 'emar/:residentId/med-log',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
