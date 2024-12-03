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

@Component({
  selector: "app-fee-amount-slab",
  templateUrl: "./fee-amount-slab.component.html",
  styleUrl: "./fee-amount-slab.component.css",
})
export class FeeAmountSlabComponent {
  @ViewChild("addFeeAmountSlabDialog")
  addFeeAmountSlabDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  slabs: any[] = [];
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

  getFeeModes() {
    this.feeService.getFeeModes().subscribe((data: any) => {
      this.feeModes = data;
    });
  }

  getFeeModeName(feeModeId: number): string {
    const feeMode = this.feeModes.find((mode) => mode.id === feeModeId);
    return feeMode ? feeMode.name : "Unknown Fee Mode";
  }

  getFeeAmountSlabs() {
    this.slabs = [];
    this.feeService.getFeeAmountSlab().subscribe(
      (data: any) => {
        this.slabs = data;
        this.isLoading = false;
      },
      (error) => {}
    );
  }

  openAddFeeAmountSlabDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddFeeAmountSlabComponent, {
      width: "1050px",
    });
  }
}
