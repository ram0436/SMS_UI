import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeDepositComponent } from './fee-deposit.component';

describe('FeeDepositComponent', () => {
  let component: FeeDepositComponent;
  let fixture: ComponentFixture<FeeDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeDepositComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
