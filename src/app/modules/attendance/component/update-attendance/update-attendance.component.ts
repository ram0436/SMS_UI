import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { AttendanceService } from "../../service/attendance.service";
import { MasterService } from "../../../service/master.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: "app-update-attendance",
  providers: [provideNativeDateAdapter()],
  templateUrl: "./update-attendance.component.html",
  styleUrl: "./update-attendance.component.css",
})
export class UpdateAttendanceComponent {
  dialogRef: MatDialogRef<any> | null = null;
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;
  isAttendanceLoading: boolean = false;

  selectAll: boolean = false;

  classes: any[] = [];
  sections: any[] = [];
  statuses: any[] = [];

  studentList: any = [];

  noRecordsFound: boolean = false;

  selectedClassId: number = 0;
  selectedSectionId: number = 0;

  attendanceDateTemp: Date | null = new Date();

  displayedColumns: string[] = [
    "rollNo",
    "profilePic",
    "studentName",
    "fatherName",
    "mobileNo",
    "status",
    "remark",
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
    this.subscriptions.add(this.getAllStatus());
    this.dataSource.data = this.studentList;
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

  getAllStatus() {
    this.attendanceService.getAttendanceStatus().subscribe((data: any) => {
      this.statuses = data;
    });
  }

  toggleAllStatus(): void {
    const statusToSet = this.selectAll ? "Present" : "";
    this.studentList.forEach((student: any) => {
      student.status = statusToSet;
    });
  }

  onAttendanceDateChange() {}

  getClassName(classId: number): string {
    const matchedClass = this.classes.find((cls) => cls.id === classId);
    return matchedClass ? matchedClass.name : "-";
  }

  getSection(classId: number) {
    if (!classId) {
      this.sections = [];
      return;
    }
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  getStudentList() {
    if (!this.selectedClassId || !this.selectedSectionId) {
      this.showNotification("Please select class, and section.");
      return;
    }

    const classId = this.selectedClassId;
    const sectionId = this.selectedSectionId;

    this.isAttendanceLoading = true;
    this.attendanceService
      .getStudentListByClassSectionId(classId, sectionId)
      .subscribe(
        (data: any) => {
          if (data.length === 0) {
            this.noRecordsFound = true;
            this.showNotification("No Records Found");
          }
          this.isAttendanceLoading = false;
          this.studentList = data;
          this.dataSource.data = data;
        },
        (error) => {
          this.isAttendanceLoading = false;
        }
      );
  }

  addAttendance() {
    // Check if there are students to process
    if (!this.studentList || this.studentList.length === 0) {
      this.showNotification("No students to update attendance.");
      return;
    }

    // Create the payload for the API
    const payload = this.studentList.map((student: any) => ({
      createdBy: 1,
      createdOn: new Date().toISOString(),
      modifiedBy: 1,
      modifiedOn: new Date().toISOString(),
      id: student.id || 0,
      studentId: student.studentId,
      classId: this.selectedClassId,
      sectionId: this.selectedSectionId,
      attendanceDate: this.attendanceDateTemp?.toLocaleDateString("en-CA"),
      rollNo: student.rollNo,
      attendanceStatusId: this.getAttendanceStatusId(student.status),
      remark: student.remark || "",
    }));

    this.attendanceService.addBulkStudentAttendance(payload).subscribe(
      (response) => {
        this.showNotification("Attendance updated successfully.");
      },
      (error) => {
        this.showNotification("Failed to update attendance.");
      }
    );
  }

  getAttendanceStatusId(status: string): number {
    const statusObj = this.statuses.find((s) => s.name === status);
    return statusObj ? statusObj.id : 0;
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
