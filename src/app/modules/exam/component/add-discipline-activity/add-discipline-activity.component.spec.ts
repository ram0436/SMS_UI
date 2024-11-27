import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisciplineActivityComponent } from './add-discipline-activity.component';

describe('AddDisciplineActivityComponent', () => {
  let component: AddDisciplineActivityComponent;
  let fixture: ComponentFixture<AddDisciplineActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDisciplineActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDisciplineActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
