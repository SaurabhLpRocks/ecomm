import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageCellComponent } from './product-image-cell.component';

describe('ProductImageCellComponent', () => {
  let component: ProductImageCellComponent;
  let fixture: ComponentFixture<ProductImageCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductImageCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductImageCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
