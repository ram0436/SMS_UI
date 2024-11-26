import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarksheetComponent } from './add-marksheet.component';

describe('AddMarksheetComponent', () => {
  let component: AddMarksheetComponent;
  let fixture: ComponentFixture<AddMarksheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMarksheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMarksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
