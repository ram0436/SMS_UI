import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddTeacherComponent } from "../add-teacher/add-teacher.component";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TeacherService } from "../../service/teacher.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-all-teachers",
  templateUrl: "./all-teachers.component.html",
  styleUrl: "./all-teachers.component.css",
})
export class AllTeachersComponent {
  @ViewChild("addTeacherDialog") addTeacherDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  teacherList: any = [];
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = true;

  classes: any[] = [];
  sections: any[] = [];

  displayedColumns: string[] = [
    "no",
    "staffID",
    "profile",
    "nationality",
    "teacherDetails",
    "joiningTime",
    "gender",
    "action",
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private teacherService: TeacherService,
    private masterService: MasterService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllTeacherList());
    this.subscriptions.add(this.getAllClass());
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

  getAllTeacherList() {
    this.isLoading = true;
    this.teacherService.getTeacherList().subscribe((data: any) => {
      this.teacherList = data;
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  getAllClass() {
    this.masterService.getAllClass().subscribe((data: any) => {
      this.classes = data;
      this.isLoading = false;
    });
  }

  editTeacher() {
    // console.log("Editing teacher");
    // Implement edit functionality
  }

  deleteTeacher() {
    // console.log("Deleting teacher");
    // Implement delete functionality
  }

  openAddTeacherDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddTeacherComponent, {
      width: "1050px",
    });
  }
}
