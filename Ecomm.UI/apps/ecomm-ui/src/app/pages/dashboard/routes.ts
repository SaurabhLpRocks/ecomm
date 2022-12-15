import { Routes } from '@angular/router';

import { RoutePath } from '@shared/constants';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: `${RoutePath.AdminDashboard}`,
    loadComponent: () => import('./admin/admin.component').then((m) => m.AdminComponent),
  },
];
