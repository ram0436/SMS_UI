import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TeacherService } from "../../../teacher/service/teacher.service";
import { Subscription } from "rxjs";
import { TransportService } from "../../service/transport.service";
import { AddVehicleComponent } from "../add-vehicle/add-vehicle.component";

@Component({
  selector: "app-all-vehicle",
  templateUrl: "./all-vehicle.component.html",
  styleUrl: "./all-vehicle.component.css",
})
export class AllVehicleComponent {
  addFeeDepositDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  vehicles: any[] = [];

  displayedColumns: string[] = [
    "no",
    "vehicleType",
    "regNo",
    "seats",
    "driverDetails",
    "action",
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private masterService: MasterService,
    private transportService: TransportService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllVehicles());
    // this.subscriptions.add(this.getFeeAmountSlabs());
  }

  // getAllVehiclesTypes() {
  //   this.isLoading = true;
  //   this.transportService.getVehicleTypes().subscribe((data: any) => {
  //     this.vehicles = data;
  //     this.dataSource.data = data;
  //     this.isLoading = false;
  //   });
  // }

  getAllVehicles() {
    this.isLoading = true;
    this.transportService.getVehicles().subscribe((data: any) => {
      this.vehicles = data;
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

  editVehicle() {}

  deleteVehicle() {}

  openAddVehicleDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddVehicleComponent, {
      width: "1050px",
    });
  }
}
