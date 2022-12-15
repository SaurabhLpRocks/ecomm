import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SubscribeDirective } from '@ngneat/subscribe';

import { ConfirmBoxData } from './confirm-box-data.interface';

@Component({
  standalone: true,
  selector: 'app-shared-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss'],
  imports: [MatCardModule, MatIconModule, MatMenuModule, MatTooltipModule, MatButtonModule, SubscribeDirective],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmBoxComponent {
  @Input() confirmTooltip = '';
  @Input() cancelTooltip = '';

  constructor(public dialogRef: MatDialogRef<ConfirmBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmBoxData) { }

  onSelection(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
