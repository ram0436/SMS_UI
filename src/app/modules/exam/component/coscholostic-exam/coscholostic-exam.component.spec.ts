import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoscholosticExamComponent } from './coscholostic-exam.component';

describe('CoscholosticExamComponent', () => {
  let component: CoscholosticExamComponent;
  let fixture: ComponentFixture<CoscholosticExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoscholosticExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoscholosticExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
