import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRouteComponent } from './vehicle-route.component';

describe('VehicleRouteComponent', () => {
  let component: VehicleRouteComponent;
  let fixture: ComponentFixture<VehicleRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
