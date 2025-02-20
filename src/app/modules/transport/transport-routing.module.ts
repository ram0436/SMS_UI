import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllVehicleComponent } from "./component/all-vehicle/all-vehicle.component";
import { VehicleRouteMappingsComponent } from "./component/vehicle-route-mappings/vehicle-route-mappings.component";
import { AddVehicleRouteComponent } from "./component/add-vehicle-route/add-vehicle-route.component";
import { VehicleRouteComponent } from "./component/vehicle-route/vehicle-route.component";

const routes: Routes = [
  { path: "all-vehicles", component: AllVehicleComponent },
  { path: "vehicle-route-mapping", component: VehicleRouteMappingsComponent },
  { path: "vehicle-route", component: VehicleRouteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportRoutingModule {}
