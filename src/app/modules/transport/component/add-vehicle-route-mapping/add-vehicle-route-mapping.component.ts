import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { TransportService } from "../../service/transport.service";

@Component({
  selector: "app-add-vehicle-route-mapping",
  templateUrl: "./add-vehicle-route-mapping.component.html",
  styleUrl: "./add-vehicle-route-mapping.component.css",
})
export class AddVehicleRouteMappingComponent implements OnInit {
  vehicleRouteMapping = {
    createdBy: 0,
    createdOn: new Date().toISOString(),
    modifiedBy: 0,
    modifiedOn: new Date().toISOString(),
    id: 0,
    vehicle: "",
    vehicleRoute: "",
    transportFee: 0,
  };

  isLoading: boolean = true;
  vehicleNames: any[] = [];
  vehicleRoutes: any[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private transportService: TransportService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getVehiclesNames();
    this.getVehiclesRoutes();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getVehiclesNames() {
    this.isLoading = true;
    this.transportService.getVehiclesNameList().subscribe(
      (data: any) => {
        this.vehicleNames = data;
        this.isLoading = false;
      },
      (error) => {}
    );
  }

  getVehiclesRoutes() {
    this.isLoading = true;
    this.transportService.getVehiclesRootList().subscribe(
      (data: any) => {
        this.vehicleRoutes = data;
        this.isLoading = false;
      },
      (error) => {}
    );
  }

  addVehicleRouteMapping(): void {
    this.transportService
      .addVehicleRouteMapping(this.vehicleRouteMapping)
      .subscribe(
        (response) => {
          this.showNotification("Vehicle Route Mapping Added Successfully");
        },
        (error) => {}
      );
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
