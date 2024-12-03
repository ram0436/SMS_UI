import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeDepositComponent } from './add-fee-deposit.component';

describe('AddFeeDepositComponent', () => {
  let component: AddFeeDepositComponent;
  let fixture: ComponentFixture<AddFeeDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeeDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeeDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
