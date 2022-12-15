import { Pipe, PipeTransform } from '@angular/core';

import { ITableColumConfig } from '..';



@Pipe({
  standalone: true,
  name: 'appSharedTableDisplayColumnNames',
})
export class TableDisplayColumnNamesPipe implements PipeTransform {
  transform(value: ITableColumConfig[]): string[] {
    return value.map((column) => column?.propertyName || '');
  }
}
