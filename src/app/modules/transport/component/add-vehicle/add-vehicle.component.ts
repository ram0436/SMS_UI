import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { MasterService } from "../../../service/master.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Vehicle } from "../../../../shared/model/vehicle.payload";
import { Subscription } from "rxjs";
import { TransportService } from "../../service/transport.service";

@Component({
  selector: "app-add-vehicle",
  templateUrl: "./add-vehicle.component.html",
  styleUrl: "./add-vehicle.component.css",
})
export class AddVehicleComponent {
  vehicle: Vehicle = new Vehicle();
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

  ngOnInit() {
    this.subscriptions.add(this.getVehiclesNameList());
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  getVehiclesNameList() {
    this.transportService.getVehicleTypes().subscribe((data: any) => {
      this.vehicleTypes = data;
    });
  }

  onVehicleSelect(vehicleId: number): void {
    this.vehicle.vehicleTypeId = vehicleId;
  }

  addVehicle(): void {
    this.transportService.addVehicle(this.vehicle).subscribe((response) => {
      this.showNotification("Vehicle Added Succesfully");
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
