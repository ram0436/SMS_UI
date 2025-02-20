import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleRouteMappingComponent } from './add-vehicle-route-mapping.component';

describe('AddVehicleRouteMappingComponent', () => {
  let component: AddVehicleRouteMappingComponent;
  let fixture: ComponentFixture<AddVehicleRouteMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVehicleRouteMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehicleRouteMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
