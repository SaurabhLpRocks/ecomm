import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { RedirectGuard } from '@core/utils';

import { RoutePath } from '@shared/constants/routes.constants';

export const routes: Routes = [
  {
    path: RoutePath.Pages,
    loadChildren: () => import('./pages/routes').then((m) => m.PAGES_ROUTES),
    canActivate: [],
  },
  { path: `${RoutePath.Auth}`, loadChildren: () => import('./auth/routes').then((mod) => mod.AUTH_ROUTES) },
  { path: '', redirectTo: '', pathMatch: 'full', canActivate: [RedirectGuard] },
];

const config: ExtraOptions = {
  useHash: false,
  preloadingStrategy: PreloadAllModules,
  onSameUrlNavigation: 'reload',
};

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
