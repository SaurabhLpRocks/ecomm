import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { appApiResources } from '@shared/constants';
import { defaultTableConfig } from '@shared/typings';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  public initData$ = combineLatest([this._getFile$()]);
  constructor(private _http: HttpClient) { }
  private _getFile$(): Observable<any[]> {
    const filters = defaultTableConfig.filters;
    const params = { results: filters.rows } as never;
    return this._http.get<any>(appApiResources.file, { params }).pipe(
      tap((res) => {
        localStorage.setItem('customers', JSON.stringify(res.data));
      }),

      map((res) => res?.data)
    );
  }
}
