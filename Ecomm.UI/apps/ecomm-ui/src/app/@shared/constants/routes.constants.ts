import { Data } from '@angular/router';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

import { Role, RoleType } from '@shared/enums';

export interface INavItemAcl {
  role: Role;
  roleType: RoleType;
}

export interface RouteData extends Data {
  allowedRoles: INavItemAcl[];
}

export class RouteItem {
  acl!: INavItemAcl;
  route?: string;
}

export class NavItem extends RouteItem {
  children?: NavItem[];
  disabled?: boolean;
  public displayName = '';
  public fontAwesomeIcon: IconDefinition = <IconDefinition>{};
  materialIcon?: string;
}

export enum RoutePath {
  Dashboard = 'dashboard',
  AdminDashboard = 'admin',
  Pages = 'pages',
  Auth = 'auth',
  Login = 'login',
  ManageUsers = 'manage-users',
  EditUserDetail = 'user-details/edit/:id',
}

export const routePermissions: RouteItem[] = [
  {
    acl: {
      role: Role.Admin,
      roleType: RoleType.app,
    },
    route: `${RoutePath.Pages}/${RoutePath.Dashboard}/`,
  },
];
export const sideNavMenus: NavItem[] = [
  {
    displayName: 'Admin Dashboard',
    fontAwesomeIcon: faStroopwafel,
    children: [],
    ...routePermissions[0],
  },
];

export const defaultRoutesByRole = {
  appAdmin: `${RoutePath.Pages}/${RoutePath.Dashboard}/${RoutePath.AdminDashboard}`,
};
