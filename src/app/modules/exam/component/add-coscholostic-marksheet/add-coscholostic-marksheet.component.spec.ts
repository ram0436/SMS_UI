import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoscholosticMarksheetComponent } from './add-coscholostic-marksheet.component';

describe('AddCoscholosticMarksheetComponent', () => {
  let component: AddCoscholosticMarksheetComponent;
  let fixture: ComponentFixture<AddCoscholosticMarksheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCoscholosticMarksheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCoscholosticMarksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
