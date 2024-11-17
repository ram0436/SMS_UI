import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { UpdateAttendanceComponent } from "../update-attendance/update-attendance.component";
import { AttendanceService } from "../../service/attendance.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: "app-student-attendance",
  providers: [provideNativeDateAdapter()],
  templateUrl: "./student-attendance.component.html",
  styleUrl: "./student-attendance.component.css",
})
export class StudentAttendanceComponent {
  @ViewChild("updateAttendanceDialog")
  updateAttendanceDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  studentAttendanceList: any = [];

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;
  isAttendanceLoading: boolean = false;

  classes: any[] = [];
  sections: any[] = [];

  noRecordsFound: boolean = false;

  selectedClassId: number = 0;
  selectedSectionId: number = 0;

  attendanceDateTemp: Date | null = null;

  displayedColumns: string[] = [
    "rollNo",
    "profilePic",
    "studentName",
    "fatherName",
    "mobileNo",
    "status",
    "remark",
    "action",
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private attendanceService: AttendanceService,
    private masterService: MasterService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllClass());
    this.dataSource.data = this.studentAttendanceList;
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

  getAllClass() {
    this.masterService.getAllClass().subscribe((data: any) => {
      this.classes = data;
    });
  }

  onAttendanceDateChange() {
    // if (this.attendanceDateTemp) {
    //   this.attendanceDateTemp = this.attendanceDateTemp.toISOString();
    // }
  }

  getClassName(classId: number): string {
    const matchedClass = this.classes.find((cls) => cls.id === classId);
    return matchedClass ? matchedClass.name : "-";
  }

  getSection(classId: number) {
    if (!classId) {
      this.sections = []; // Clear sections if no class is selected
      return;
    }
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  getStudentAttendance() {
    if (
      !this.selectedClassId ||
      !this.selectedSectionId ||
      !this.attendanceDateTemp
    ) {
      this.showNotification("Please select class, section, and date.");
      return;
    }

    const classId = this.selectedClassId;
    const sectionId = this.selectedSectionId;
    const attendanceDate = this.attendanceDateTemp?.toLocaleDateString("en-CA");

    this.isAttendanceLoading = true; // Show loader
    this.attendanceService
      .getStudentAttendanceDashboard(classId, sectionId, attendanceDate)
      .subscribe(
        (data: any) => {
          if (data.length === 0) {
            this.noRecordsFound = true;
            this.showNotification("No Records Found");
          }
          this.isAttendanceLoading = false;
          this.studentAttendanceList = data;
          this.dataSource.data = data;
        },
        (error) => {
          this.isAttendanceLoading = false;
        }
      );
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  openUpdateAttendanceDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(UpdateAttendanceComponent, {
      width: "1050px",
    });
  }
}
