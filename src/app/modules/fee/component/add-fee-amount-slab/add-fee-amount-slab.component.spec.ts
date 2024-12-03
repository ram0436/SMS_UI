import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeAmountSlabComponent } from './add-fee-amount-slab.component';

describe('AddFeeAmountSlabComponent', () => {
  let component: AddFeeAmountSlabComponent;
  let fixture: ComponentFixture<AddFeeAmountSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeeAmountSlabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeeAmountSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
