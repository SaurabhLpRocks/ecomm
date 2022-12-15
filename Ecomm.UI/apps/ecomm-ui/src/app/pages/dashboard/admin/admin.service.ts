import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs';

import { appApiResources } from '@shared/constants';

import { IProduct } from './typings';


@Injectable({
  providedIn: 'root',
})
export class AdminService {


  public products$ = this._http.get<IProduct[]>(appApiResources.product).pipe(
    tap((res) => console.log(res))
  );


  constructor(private _http: HttpClient) {

  }

}
