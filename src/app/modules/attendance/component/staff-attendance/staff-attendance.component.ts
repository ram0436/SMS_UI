import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { UpdateStaffAttendanceComponent } from "../update-staff-attendance/update-staff-attendance.component";
import { AttendanceService } from "../../service/attendance.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: "app-staff-attendance",
  templateUrl: "./staff-attendance.component.html",
  styleUrl: "./staff-attendance.component.css",
})
export class StaffAttendanceComponent {
  @ViewChild("updateAttendanceDialog")
  updateAttendanceDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  studentAttendanceList: any = [];

  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;
  isAttendanceLoading: boolean = false;

  staffCategories: any[] = [];

  noRecordsFound: boolean = false;

  selectedStaffCategoryId: number = 0;

  attendanceDateTemp: Date | null = null;

  displayedColumns: string[] = [
    "employeeId",
    "profilePic",
    "fatherName",
    "designation",
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
    this.subscriptions.add(this.getAllStaffCategories());
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

  getAllStaffCategories() {
    this.masterService.getStaffCategories().subscribe((data: any) => {
      this.staffCategories = data;
    });
  }

  onAttendanceDateChange() {
    // if (this.attendanceDateTemp) {
    //   this.attendanceDateTemp = this.attendanceDateTemp.toISOString();
    // }
  }

  getStaffAttendance() {
    if (!this.selectedStaffCategoryId || !this.attendanceDateTemp) {
      this.showNotification("Please select staff category, and date.");
      return;
    }

    const staffCategoryId = this.selectedStaffCategoryId;
    const attendanceDate = this.attendanceDateTemp?.toLocaleDateString("en-CA");

    this.isAttendanceLoading = true; // Show loader
    this.attendanceService
      .getStaffAttendanceDashboard(staffCategoryId, attendanceDate)
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

    this.dialogRef = this.dialog.open(UpdateStaffAttendanceComponent, {
      width: "1050px",
    });
  }
}
