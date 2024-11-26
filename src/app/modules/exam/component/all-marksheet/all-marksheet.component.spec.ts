import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMarksheetComponent } from './all-marksheet.component';

describe('AllMarksheetComponent', () => {
  let component: AllMarksheetComponent;
  let fixture: ComponentFixture<AllMarksheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMarksheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMarksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
