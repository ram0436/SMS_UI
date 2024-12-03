import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeDiscountComponent } from './add-fee-discount.component';

describe('AddFeeDiscountComponent', () => {
  let component: AddFeeDiscountComponent;
  let fixture: ComponentFixture<AddFeeDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeeDiscountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeeDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
