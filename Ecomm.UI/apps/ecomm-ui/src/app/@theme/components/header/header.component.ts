import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { SubscribeDirective } from '@ngneat/subscribe';

import { Observable } from 'rxjs';

import { appConstants } from '@shared/constants/app.constant';

import { ThemeService } from '@theme/theme.service';

import { AuthService } from '../../../auth/auth.service';
import { SideNavService } from '../side-nav/side-nav.service';

const ANGULAR_MODULES = [CommonModule];

const ANGULAR_MATERIAL_MODULES = [MatBadgeModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule];

const THIRD_PARTY_MODULES = [SubscribeDirective];

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [...ANGULAR_MODULES, ...ANGULAR_MATERIAL_MODULES, ...THIRD_PARTY_MODULES],
  providers: [ThemeService, SideNavService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  faHandHoldingUsd = faHandHoldingUsd;
  public collapse = true;
  isLightTheme$: Observable<boolean> = this._themeService.isLightTheme$;
  public isLoggedIn$ = this._authService.isLoggedIn$;
  @Input() public shouldOpenSideNav = appConstants.sideNav.shouldOpenSideNavInitialState;
  @Input() public sidenav: MatSidenav | undefined;
  public notificationCount = 2;

  /**
   *
   */
  constructor(private _themeService: ThemeService, private _authService: AuthService, private _sideNavService: SideNavService) { }

  public toggleDarkTheme(checked: boolean) {
    this._themeService.setLightTheme(checked);
  }

  public toggleSideNavVisibility() {
    this._sideNavService.toggleSideNavVisibility();
  }

  public logout() {
    this._authService.logout();
  }
}
