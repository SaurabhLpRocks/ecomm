import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { ThemeService } from '@theme/theme.service';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public isLoggedIn$ = this._authServer.isLoggedIn$;
  isLightTheme$: Observable<boolean> = this._themeService.isLightTheme$;
  constructor(private cookieService: CookieService, private _authServer: AuthService, private _themeService: ThemeService) { }
}
