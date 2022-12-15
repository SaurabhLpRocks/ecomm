import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { SubscribeDirective } from '@ngneat/subscribe';

import { map } from 'rxjs';

import { MdTableCardComponent } from '@shared/component';
import { AppTableConfig, TableSortOrder } from '@shared/typings';

import { ProductImageCellComponent } from './product-image-cell/product-image-cell.component';
import { AdminService } from './admin.service';
import { IProduct } from './typings';


const ANGULAR_MODULES = [CommonModule];

const ANGULAR_MATERIAL_MODULES = [
  FlexLayoutModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
];

const THIRD_PARTY_MODULES = [SubscribeDirective];

const SHARED_COMPS = [MdTableCardComponent]


@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [...ANGULAR_MODULES, ...ANGULAR_MATERIAL_MODULES, ...THIRD_PARTY_MODULES, ...SHARED_COMPS, ProductImageCellComponent],
  providers: [AdminService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {

  public products: IProduct[] = [];

  public productsTable$ = this._service.products$.pipe(
    map((res) => { return { ...this.matTableConfig, data: res } })
  );

  matTableConfig: AppTableConfig<IProduct> = {
    data: [],
    filters: {
      pageNumber: 1,
      rowsPerPage: 10,
      sortField: '',
      sortOrder: TableSortOrder.dsc,
      entityId: '',
    },
    headerConfig: [
      {
        name: 'id',
        pathToProperty: 'id',
        propertyName: 'id',
        displayName: 'Id',
        isSortable: true,
        isCustomTemplate: false,
      },
      {
        name: 'imageUrl',
        pathToProperty: 'imageUrl',
        propertyName: 'imageUrl',
        displayName: 'Image',
        isSortable: true,
        isCustomTemplate: true,
        templateComponentRef: ProductImageCellComponent,
      },
      {
        name: 'name',
        pathToProperty: 'name',
        propertyName: 'name',
        displayName: 'Name',
        isSortable: true,
        isCustomTemplate: false,
      },
      {
        name: 'description',
        pathToProperty: 'description',
        propertyName: 'description',
        displayName: 'Description',
        isSortable: true,
        isCustomTemplate: false,
      },
      {
        name: 'price',
        pathToProperty: 'price',
        propertyName: 'price',
        displayName: 'Price',
        isSortable: true,
        isCustomTemplate: false,
      },
      {
        name: 'unit',
        pathToProperty: 'unit',
        propertyName: 'unit',
        displayName: 'Unit',
        isSortable: false,
        isCustomTemplate: false,
      },
      {
        name: 'unitType',
        pathToProperty: 'unitType',
        propertyName: 'unitType',
        displayName: 'UnitType',
        isSortable: false,
        isCustomTemplate: false,
      },
    ],
    heading: '',
    idColumn: 'id',
    isLoading: false,
    pagination: true,

    rowsPerPageOptions: [10, 20, 30],
    showCurrentPageReport: false,
    totalRecords: 0,
  };

  constructor(private _service: AdminService) {

  }
}
