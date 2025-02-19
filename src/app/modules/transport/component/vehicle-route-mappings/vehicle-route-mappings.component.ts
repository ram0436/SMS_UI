import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TeacherService } from "../../../teacher/service/teacher.service";
import { Subscription } from "rxjs";
import { TransportService } from "../../service/transport.service";
import { AddVehicleComponent } from "../add-vehicle/add-vehicle.component";
import { AddVehicleRouteComponent } from "../add-vehicle-route/add-vehicle-route.component";
import { AddVehicleRouteMappingComponent } from "../add-vehicle-route-mapping/add-vehicle-route-mapping.component";

@Component({
  selector: "app-vehicle-route-mappings",
  templateUrl: "./vehicle-route-mappings.component.html",
  styleUrl: "./vehicle-route-mappings.component.css",
})
export class VehicleRouteMappingsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  routeMappings: any[] = [];

  displayedColumns: string[] = [
    "no",
    "vehicle",
    "route",
    "transportFee",
    "action",
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private masterService: MasterService,
    private transportService: TransportService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllVehicleRouteMappings());
    // this.subscriptions.add(this.getFeeAmountSlabs());
  }

  getAllVehicleRouteMappings() {
    this.isLoading = true;
    this.transportService.getVehiclesRootMapping().subscribe((data: any) => {
      this.routeMappings = data;
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();

    // Close the dialog if it is still open
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  editRouteMapping() {}

  deleteRouteMapping() {}

  openAddVehicleRouteMappingsDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddVehicleRouteMappingComponent, {
      width: "1050px",
    });
  }
}
