import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddFeeStructureComponent } from "../add-fee-structure/add-fee-structure.component";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TeacherService } from "../../../teacher/service/teacher.service";
import { Subscription } from "rxjs";
import { FeeService } from "../../service/fee.service";

@Component({
  selector: "app-fee-structure",
  templateUrl: "./fee-structure.component.html",
  styleUrl: "./fee-structure.component.css",
})
export class FeeStructureComponent {
  @ViewChild("addFeeStructureDialog")
  addFeeStructureDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  feeList: any = [];
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  structures: any[] = [];
  feeModes: any[] = [];

  displayedColumns: string[] = ["srNo", "structure", "action"];

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private masterService: MasterService,
    private feeService: FeeService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getFeeModes());
    this.subscriptions.add(this.getFeeStructure());
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

  getFeeStructure() {
    this.structures = [];
    this.feeService.getMasterFeeStructure().subscribe(
      (data: any) => {
        // Store the data in entrySubjects or a suitable variable
        this.structures = data;
        this.isLoading = false;
      },
      (error) => {}
    );
  }

  editMarksheet() {}

  deleteMarksheet() {}

  openAddFeeStructureDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddFeeStructureComponent, {
      width: "450px",
    });
  }
}
