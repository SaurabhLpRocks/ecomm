import { Routes } from '@angular/router';

import { RoutePath } from '@shared/constants';

export const AUTH_ROUTES: Routes = [
  {
    path: `${RoutePath.Login}`,
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
];
