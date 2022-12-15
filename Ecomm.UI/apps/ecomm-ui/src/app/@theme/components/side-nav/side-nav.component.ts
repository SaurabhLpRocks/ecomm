/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SubscribeDirective } from '@ngneat/subscribe';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { NavItem, sideNavMenus } from '@shared/constants/routes.constants';
import { SideNavMenuByRolePipe } from '@shared/pipes';
import { HelperService } from '@shared/services';
import { IUser } from '@shared/typings';

import { animateText, onSideNavChange, resizeAvatarOnSideNavCollapseExpand } from '@theme/animations/animations';

import { AuthService } from '../../../auth/auth.service';
import { MenuListItemComponent } from '../menu-list-item';

import { SideNavService } from './side-nav.service';

const ANGULAR_MODULES = [CommonModule];

const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatListModule,
];

const THIRD_PARTY_MODULES = [SubscribeDirective];

const STANDALONE_COMPONENTS = [MenuListItemComponent];

const PIPES = [SideNavMenuByRolePipe];

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...ANGULAR_MODULES, ...ANGULAR_MATERIAL_MODULES, ...THIRD_PARTY_MODULES, ...STANDALONE_COMPONENTS, ...PIPES],
  providers: [SideNavService, HelperService],
  animations: [onSideNavChange, animateText, resizeAvatarOnSideNavCollapseExpand],
})
export class SideNavComponent {
  private _sideNavMenusSubject = new BehaviorSubject<NavItem[]>(sideNavMenus);
  public collapse = true;
  public sideNavMenusAction$ = this._sideNavMenusSubject.asObservable();
  public isSideNavExpanded$ = this._sidebarService.isSideNavExpanded$;
  public linkText = false;
  public showNavItemTitle$ = this._sidebarService.showNavItemTitle$;
  public sideNavMenus = sideNavMenus;
  public sideNavState = false;
  public loggedInUser$ = this._authService.loggedInUser$;

  // Combine the streams for the view
  public vm$ = combineLatest([this.isSideNavExpanded$, this.showNavItemTitle$, this.loggedInUser$, this.sideNavMenusAction$]).pipe(
    map(([isSideNavExpanded, showNavItemTitle, loggedInUser, sideNavMenus]) => ({
      isSideNavExpanded,
      showNavItemTitle,
      loggedInUser,
      sideNavMenus,
    }))
  );

  constructor(private _sidebarService: SideNavService, private _authService: AuthService, private _helperService: HelperService) { }

  public onSideNavSizeToggle() {
    this._sidebarService.toggleSideNavSize();
  }

  public onRoleChanged($event: MatSelectChange, loggedInUser: IUser) {
    const roles = loggedInUser.roles;
    if (roles && roles.length > 0) {
      const roleId = $event.value;
      loggedInUser.currentRole = roles.find((role) => role.roleId === roleId);
      this._authService.currentUserValue = { ...loggedInUser };
      this._helperService.redirectToDefaultPage();
    }
  }

  public selectedItem(event: unknown) {
    // console.log(event);
  }
}
