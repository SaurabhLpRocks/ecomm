import { Routes } from '@angular/router';

import { AuthGuard, RedirectGuard } from '@core/utils';

import { INavItemAcl, RoutePath } from '@shared/constants';
import { Role, RoleType } from '@shared/enums';

export const PAGES_ROUTES: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', canActivate: [RedirectGuard] },
  {
    path: `${RoutePath.Dashboard}`,
    loadChildren: () => import('./dashboard/routes').then((m) => m.DASHBOARD_ROUTES),
    data: { allowedRoles: [{ role: Role.Admin, roleType: RoleType.app }] as INavItemAcl[] },
    canActivate: [AuthGuard],
  },
];
