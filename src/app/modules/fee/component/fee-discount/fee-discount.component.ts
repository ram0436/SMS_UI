import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddFeeStructureComponent } from "../add-fee-structure/add-fee-structure.component";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TeacherService } from "../../../teacher/service/teacher.service";
import { Subscription } from "rxjs";
import { FeeService } from "../../service/fee.service";
import { AddFeeDiscountComponent } from "../add-fee-discount/add-fee-discount.component";

@Component({
  selector: "app-fee-discount",
  templateUrl: "./fee-discount.component.html",
  styleUrl: "./fee-discount.component.css",
})
export class FeeDiscountComponent {
  @ViewChild("addFeeDiscounttDialog")
  addFeeDiscountDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  feeDiscounts: any[] = [];
  feeModes: any[] = [];
  classes: any[] = [];

  displayedColumns: string[] = ["srNo", "class", "totalStructures", "action"];

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private masterService: MasterService,
    private feeService: FeeService
  ) {}

  ngOnInit() {
    // this.subscriptions.add(this.getFeeModes());
    // this.subscriptions.add(this.getFeeAmountSlabs());
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

  openAddFeeDiscountDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddFeeDiscountComponent, {
      width: "1050px",
    });
  }
}
