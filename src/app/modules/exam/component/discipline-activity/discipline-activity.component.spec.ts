import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineActivityComponent } from './discipline-activity.component';

describe('DisciplineActivityComponent', () => {
  let component: DisciplineActivityComponent;
  let fixture: ComponentFixture<DisciplineActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplineActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplineActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
