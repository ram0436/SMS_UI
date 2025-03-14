import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddFeeStructureComponent } from "../add-fee-structure/add-fee-structure.component";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TeacherService } from "../../../teacher/service/teacher.service";
import { Subscription } from "rxjs";
import { FeeService } from "../../service/fee.service";
import { AddFeeAmountSlabComponent } from "../add-fee-amount-slab/add-fee-amount-slab.component";
import { AddFeeDepositComponent } from "../add-fee-deposit/add-fee-deposit.component";

@Component({
  selector: "app-fee-deposit",
  templateUrl: "./fee-deposit.component.html",
  styleUrl: "./fee-deposit.component.css",
})
export class FeeDepositComponent {
  @ViewChild("addFeeDepositDialog")
  addFeeDepositDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  feeDeposits: any[] = [];
  feeList: any[] = [];
  feeModes: any[] = [];
  classes: any[] = [];

  displayedColumns: string[] = [
    "no",
    "admissionNo",
    "rollNo",
    "class",
    "paymentMode",
    "remark",
    "feeDetails",
    "month",
    "action",
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private masterService: MasterService,
    private feeService: FeeService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllFeeRecepit());
    // this.subscriptions.add(this.getFeeAmountSlabs());
  }

  getAllFeeRecepit() {
    this.isLoading = true;
    this.feeService.getFeeReceipt().subscribe((data: any) => {
      this.feeList = data;
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

  editFee() {}

  deleteFee() {}

  openAddFeeDepositDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddFeeDepositComponent, {
      width: "1050px",
    });
  }
}
