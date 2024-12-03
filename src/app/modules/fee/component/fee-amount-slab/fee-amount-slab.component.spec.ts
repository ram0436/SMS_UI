import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeAmountSlabComponent } from './fee-amount-slab.component';

describe('FeeAmountSlabComponent', () => {
  let component: FeeAmountSlabComponent;
  let fixture: ComponentFixture<FeeAmountSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeAmountSlabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeAmountSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
