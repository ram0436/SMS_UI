import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddMarksheetComponent } from "../add-marksheet/add-marksheet.component";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AddDisciplineActivityComponent } from "../add-discipline-activity/add-discipline-activity.component";

@Component({
  selector: "app-discipline-activity",
  templateUrl: "./discipline-activity.component.html",
  styleUrl: "./discipline-activity.component.css",
})
export class DisciplineActivityComponent {
  @ViewChild("addDisciplineMarksheetDialog")
  addStaffDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  marksheetList: any = [];
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;

  displayedColumns: string[] = [
    "no",
    "rollNo",
    "studentName",
    "obtainedMarks",
    "practical",
    "grade",
    "action",
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private masterService: MasterService) {}

  ngOnInit() {}

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

  editMarksheet() {}

  deleteMarksheet() {}

  openAddMarksheetDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddDisciplineActivityComponent, {
      width: "1050px",
    });
  }
}
