import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleRouteComponent } from './add-vehicle-route.component';

describe('AddVehicleRouteComponent', () => {
  let component: AddVehicleRouteComponent;
  let fixture: ComponentFixture<AddVehicleRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVehicleRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehicleRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
