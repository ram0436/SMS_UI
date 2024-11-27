import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholosticExamComponent } from './scholostic-exam.component';

describe('ScholosticExamComponent', () => {
  let component: ScholosticExamComponent;
  let fixture: ComponentFixture<ScholosticExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholosticExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholosticExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
