import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeStructureComponent } from './add-fee-structure.component';

describe('AddFeeStructureComponent', () => {
  let component: AddFeeStructureComponent;
  let fixture: ComponentFixture<AddFeeStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeeStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
