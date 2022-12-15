import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { appConstants } from '@shared/constants';
import { NavItem } from '@shared/constants/routes.constants';
import { RoleType } from '@shared/enums';

import { AuthService } from '../../../auth/auth.service';

import { showHideMenuText } from './menu-list.animations';

const ANGULAR_MODULES = [CommonModule, RouterModule];

const ANGULAR_MATERIAL_MODULES = [FlexLayoutModule, MatIconModule, MatListModule];

const THIRD_PARTY_MODULES = [FontAwesomeModule];

@Component({
  standalone: true,
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...ANGULAR_MODULES, ...ANGULAR_MATERIAL_MODULES, ...THIRD_PARTY_MODULES, MenuListItemComponent],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
    showHideMenuText,
  ],
})
export class MenuListItemComponent {
  @Input() public depth = 0;
  public expanded = false;
  @Input() public item: NavItem = <NavItem>{};
  @Input() public showNavItemTitle = appConstants.sideNav.showSideNavTitleInitialState;
  roleTypes = RoleType;

  constructor(public router: Router, private _authService: AuthService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  public onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    } else if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
