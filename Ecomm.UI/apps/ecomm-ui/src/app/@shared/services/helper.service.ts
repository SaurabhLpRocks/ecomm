import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { format } from 'date-fns';

import { defaultRoutesByRole } from '@shared/constants';
import { Role, RoleType } from '@shared/enums';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { HexColor } from '..';

@Injectable()
export class HelperService {
  public env: string;

  public lastItemInMap = (map: Map<unknown, unknown>) => Array.from(map).pop();
  public lastKeyInMap = (map: Map<unknown, unknown>) => Array.from(map.keys()).pop();
  public lastValueInMap = (map: Map<unknown, unknown>) => Array.from(map.values()).pop();
  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.env = environment.env;
  }

  public getRandomHexColor(excludeList: HexColor[]): HexColor {
    let color: HexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    while (excludeList.includes(color)) {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
    return color;
  }

  public isDevEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'dev' || this.env.toLocaleLowerCase() === 'development' ? true : false;
  }

  public isProdEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'prod' || this.env.toLocaleLowerCase() === 'production' ? true : false;
  }

  public isStageEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'stage' || this.env.toLocaleLowerCase() === 'staging' ? true : false;
  }

  public convertToLocalTime(utcTime: string | null): string {
    try {
      if (utcTime) {
        return format(new Date(utcTime), 'MM/dd/yyyy hh:mm:ss a');
      }
      return format(new Date(), 'MM/dd/yyyy hh:mm:ss a');
    } catch (ex) {
      throw new Error('Invalid date!');
    }
  }

  public toFormData(formValue: any): FormData {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      if (key == 'file') {
        for (let i = 0; i < formValue[key].length; i++) formData.append('file[]', formValue[key][i]);
      } else formData.append(key, formValue[key]);
    }
    return formData;
  }

  public getTimeElapsedInSecondsTillNow(startDate: Date) {
    const endDate = new Date();
    return (endDate.getTime() - startDate.getTime()) / 1000;
  }

  public redirectToDefaultPage() {
    const currentRole = this._authService.currentUserValue.currentRole;
    if (currentRole) {
      if (currentRole.roleType === RoleType.app) {
        if (currentRole.roleName === Role.Admin) {
          this._router.navigate([defaultRoutesByRole.appAdmin]);
        }
      } else if (currentRole.roleType === RoleType.Client) {
        if (currentRole.roleName === Role.Admin || Role.AccountAdmin) {
          this._router.navigate([defaultRoutesByRole.appAdmin]);
        }
      }
    }
  }
}
