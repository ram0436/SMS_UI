import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddMarksheetComponent } from "../add-marksheet/add-marksheet.component";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TeacherService } from "../../../teacher/service/teacher.service";
import { Subscription } from "rxjs";
import { AddCoscholosticMarksheetComponent } from "../add-coscholostic-marksheet/add-coscholostic-marksheet.component";

@Component({
  selector: "app-coscholostic-exam",
  templateUrl: "./coscholostic-exam.component.html",
  styleUrl: "./coscholostic-exam.component.css",
})
export class CoscholosticExamComponent {
  @ViewChild("addCoscholosticMarksheetDialog")
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

    this.dialogRef = this.dialog.open(AddCoscholosticMarksheetComponent, {
      width: "1050px",
    });
  }
}
