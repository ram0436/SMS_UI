import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRouteMappingsComponent } from './vehicle-route-mappings.component';

describe('VehicleRouteMappingsComponent', () => {
  let component: VehicleRouteMappingsComponent;
  let fixture: ComponentFixture<VehicleRouteMappingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleRouteMappingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleRouteMappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
