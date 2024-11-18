import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStaffAttendanceComponent } from './update-staff-attendance.component';

describe('UpdateStaffAttendanceComponent', () => {
  let component: UpdateStaffAttendanceComponent;
  let fixture: ComponentFixture<UpdateStaffAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStaffAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStaffAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
