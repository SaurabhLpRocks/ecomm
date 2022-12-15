/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

const ANGULAR_MODULES = [RouterModule];

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [...ANGULAR_MODULES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent { }
