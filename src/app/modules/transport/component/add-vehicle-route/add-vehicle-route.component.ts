import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { MasterService } from "../../../service/master.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Vehicle } from "../../../../shared/model/vehicle.payload";
import { Subscription } from "rxjs";
import { TransportService } from "../../service/transport.service";

@Component({
  selector: "app-add-vehicle-route",
  templateUrl: "./add-vehicle-route.component.html",
  styleUrl: "./add-vehicle-route.component.css",
})
export class AddVehicleRouteComponent {
  vehicleRoute = {
    createdBy: 0,
    createdOn: new Date().toISOString(),
    modifiedBy: 0,
    modifiedOn: new Date().toISOString(),
    id: 0,
    routeName: "",
  };

  vehicleTypes: any[] = [];
  selectedVehicleTypeId: number = 0;
  joiningDateTemp: Date | null = null;
  dobDateTemp: Date | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private transportService: TransportService,
    private masterService: MasterService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  addVehicleRoute(): void {
    this.transportService
      .addVehicleRoute(this.vehicleRoute)
      .subscribe((response) => {
        this.showNotification("Vehicle Route Added Succesfully");
      });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
