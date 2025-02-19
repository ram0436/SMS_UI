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

@Component({
  selector: "app-vehicle-route",
  templateUrl: "./vehicle-route.component.html",
  styleUrl: "./vehicle-route.component.css",
})
export class VehicleRouteComponent {
  addFeeDepositDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  routes: any[] = [];

  displayedColumns: string[] = ["no", "route", "action"];

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private masterService: MasterService,
    private transportService: TransportService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllVehicleRoutes());
    // this.subscriptions.add(this.getFeeAmountSlabs());
  }

  getAllVehicleRoutes() {
    this.isLoading = true;
    this.transportService.getVehiclesRootList().subscribe((data: any) => {
      this.routes = data;
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

  editRoute() {}

  deleteRoute() {}

  openAddVehicleRouteDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddVehicleRouteComponent, {
      width: "450px",
    });
  }
}
