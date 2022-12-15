import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IProduct } from '../typings';

@Component({
  standalone: true,
  selector: 'app-ui-product-image-cell',
  templateUrl: './product-image-cell.component.html',
  styleUrls: ['./product-image-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageCellComponent {

  data!: IProduct;
}
