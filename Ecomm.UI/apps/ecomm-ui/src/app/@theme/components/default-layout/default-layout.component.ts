import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

import { SubscribeDirective } from '@ngneat/subscribe';

import { Observable } from 'rxjs';

import { onMainContentChange } from '@theme/animations/animations';
import { ThemeService } from '@theme/theme.service';

import { AuthService } from '../../../auth/auth.service';
import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { SideNavService } from '../side-nav/side-nav.service';

const ANGULAR_MODULES = [CommonModule, RouterModule];

const ANGULAR_MATERIAL_MODULES = [MatSidenavModule];

const THIRD_PARTY_MODULES = [SubscribeDirective];

const STANDALONE_COMPONENTS = [HeaderComponent, SideNavComponent, FooterComponent];


@Component({
  standalone: true,
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...ANGULAR_MODULES, ...ANGULAR_MATERIAL_MODULES, ...THIRD_PARTY_MODULES, ...STANDALONE_COMPONENTS],
  providers: [ThemeService, SideNavService],
  animations: [onMainContentChange],
})
export class DefaultLayoutComponent {
  isLightTheme$: Observable<boolean> = this._themeService.isLightTheme$;
  public isLoggedIn$ = this._authServer.isLoggedIn$;
  public isSideNavExpanded$ = this._sideNavService.isSideNavExpanded$;
  public mainContentAnimation$ = this._sideNavService.mainContentAnimation$;
  public onSideNavChange: boolean | undefined;
  public shouldOpenSideNav$ = this._sideNavService.shouldOpenSideNav$;

  constructor(private _sideNavService: SideNavService, private _themeService: ThemeService, private _authServer: AuthService) { }
}
