import { OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { errorTailorImports, provideErrorTailorConfig } from '@ngneat/error-tailor';
import { HotToastModule } from '@ngneat/hot-toast';
import { SubscribeDirective } from '@ngneat/subscribe';

import { CoreService } from '@core/core.service';
import { httpInterceptorProviders } from '@core/interceptors';
import { ErrorLoggerService, HttpErrorHandlerService, MockDataService } from '@core/utils';

import { DefaultLayoutComponent } from '@theme/components/default-layout/default-layout.component';
import { ThemeService } from '@theme/theme.service';

import { AuthService } from './auth/auth.service';
import { errorTailerConfig, HelperService } from './@shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const ANGULAR_MODULES = [CommonModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule];

const ErrorTailor = provideErrorTailorConfig(errorTailerConfig);

const THIRD_PARTY_MODULES = [HotToastModule.forRoot(), SubscribeDirective, errorTailorImports];

const CORE_SERVICES = [
  HelperService,
  ...httpInterceptorProviders,
  ErrorLoggerService,
  HttpErrorHandlerService,
  CoreService,
  MockDataService,
];

@NgModule({
  declarations: [AppComponent],
  imports: [...ANGULAR_MODULES, ...THIRD_PARTY_MODULES, DefaultLayoutComponent],
  exports: [],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' /*'fill'*/ } },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ErrorTailor,
    AuthService,
    ...CORE_SERVICES,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  // #region Constructors (1)

  constructor(overlayContainer: OverlayContainer, private _themeService: ThemeService) {
    this._themeService.isLightTheme$.subscribe((isLightTheme) => {
      if (isLightTheme) {
        overlayContainer.getContainerElement().classList.add('.light-theme');
      }
    });
  }

  // #endregion Constructors (1)
}
