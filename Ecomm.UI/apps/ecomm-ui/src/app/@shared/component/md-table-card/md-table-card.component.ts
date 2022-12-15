import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubscribeDirective } from '@ngneat/subscribe';

import { Observable } from 'rxjs';

import { DynamicVisibilityHandlerPipe } from '@shared/pipes/dynamic-visibility-handler.pipe';
import { ReadObjectByStringPathPipe } from '@shared/pipes/read-object-by-string-path.pipe';
import { RouteWithIdPipe } from '@shared/pipes/route-with-id.pipe';
import { TableDisplayColumnNamesPipe } from '@shared/pipes/table-display-column-names.pipe';

import {
  ActionType,
  AppTableConfig,
  IGlobalLibTableFilters,
  ITableColumConfig,
  ITableRowCustomActionEvent,
} from '../../typings/table-config.types';
import { DynamicTemplateComponent } from '../dynamic-template';

@Component({
  standalone: true,
  selector: 'app-shared-md-table-card',
  templateUrl: './md-table-card.component.html',
  styleUrls: ['./md-table-card.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule, MatMenuModule, MatTooltipModule, MatButtonModule, MatTableModule, MatProgressBarModule, MatPaginatorModule, MatSortModule, SubscribeDirective, ReadObjectByStringPathPipe, DynamicTemplateComponent, DynamicVisibilityHandlerPipe, FontAwesomeModule, RouterModule, RouteWithIdPipe, TableDisplayColumnNamesPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MdTableCardComponent {
  public ActionType: typeof ActionType = ActionType;
  @Output() public filtersChanged = new EventEmitter<AppTableConfig<unknown>>();
  @Output() public rowCustomActionEvent = new EventEmitter<ITableRowCustomActionEvent>();
  @Input() tableConfig$!: Observable<AppTableConfig<unknown>>;
  @Input() isLoading = false;
  public expandedElement: unknown | null;

  public onCustomActionClick(row: Record<string, unknown>, actionName: string) {
    this.rowCustomActionEvent.emit({ row, actionName });
  }

  public onTableEvent(tableConfig: AppTableConfig<unknown>, newFilters: IGlobalLibTableFilters) {
    tableConfig = { ...tableConfig, filters: newFilters };
    this.filtersChanged.emit(tableConfig);
  }

  public onPageChange(event: PageEvent, tableConfig: AppTableConfig<unknown>) {
    const pageNumber = event.pageIndex + 1;
    const rowsPerPage = event.pageSize;
    const newFilters: IGlobalLibTableFilters = { ...tableConfig.filters, pageNumber, rowsPerPage };
    this.onTableEvent(tableConfig, newFilters);
  }

  public onSortChange(sort: Sort, tableConfig: AppTableConfig<unknown>) {
    const sortField = sort.active;
    const sortOrder = sort.direction === 'asc' || sort.direction === '' ? 1 : -1;

    const newFilters: IGlobalLibTableFilters = { ...tableConfig.filters, sortField, sortOrder };
    this.onTableEvent(tableConfig, newFilters);
  }

  public trackByColumnName(index: number, headerConfig: ITableColumConfig): string {
    return headerConfig.pathToProperty;
  }
}
