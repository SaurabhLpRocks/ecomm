import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { HotToastService } from '@ngneat/hot-toast';

import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

import { HelperService } from '@shared/services';

import { AuthService } from '../auth.service';

import { ILoginForm } from './login-form.interface';

const ANGULAR_MATERIAL_MODULES = [
  FlexLayoutModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

const ANGULAR_MODULES = [ReactiveFormsModule, CommonModule];

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [...ANGULAR_MODULES, ...ANGULAR_MATERIAL_MODULES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthService, HelperService],
})
export class LoginComponent implements OnDestroy {
  public hide = true;
  public authSubscription!: Subscription;
  public loginErrorMessage = '';
  public loginFailed = false;
  public loader!: boolean;

  public loginForm = new FormGroup<ILoginForm>({
    email: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
  });
  public returnUrl = '';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _helperService: HelperService,
    private cookieService: CookieService,
    private _toast: HotToastService
  ) { }

  public get password() {
    return this.loginForm.controls.password;
  }

  public get email() {
    return this.loginForm.controls.email;
  }

  onLogin(): void {
    this.authSubscription = this._authService.loginUser(this.email?.value, this.password?.value, '', '', true).subscribe((res) => {
      // this._router.navigate([defaultRoutesByRole.appAdmin]);
      window.location.assign('/');
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
