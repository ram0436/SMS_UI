import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { AttendanceService } from "../../service/attendance.service";
import { MasterService } from "../../../service/master.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: "app-update-staff-attendance",
  providers: [provideNativeDateAdapter()],
  templateUrl: "./update-staff-attendance.component.html",
  styleUrl: "./update-staff-attendance.component.css",
})
export class UpdateStaffAttendanceComponent {
  dialogRef: MatDialogRef<any> | null = null;
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = false;
  isAttendanceLoading: boolean = false;

  selectAll: boolean = false;

  staffCategories: any[] = [];
  statuses: any[] = [];

  staffList: any = [];

  noRecordsFound: boolean = false;

  selectedStaffCategoryId: number = 0;

  attendanceDateTemp: Date | null = new Date();

  displayedColumns: string[] = [
    "employeeId",
    "profilePic",
    "fatherName",
    "designation",
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
    this.subscriptions.add(this.getAllStaffCategories());
    this.subscriptions.add(this.getAllStatus());
    this.dataSource.data = this.staffList;
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

  getAllStatus() {
    this.attendanceService.getAttendanceStatus().subscribe((data: any) => {
      this.statuses = data;
    });
  }

  toggleAllStatus(): void {
    const statusToSet = this.selectAll ? "Present" : "";
    this.staffList.forEach((student: any) => {
      student.status = statusToSet;
    });
  }

  onAttendanceDateChange() {}

  getStaffList() {
    if (!this.selectedStaffCategoryId) {
      this.showNotification("Please select staff category.");
      return;
    }

    const staffCategoryId = this.selectedStaffCategoryId;
    this.isAttendanceLoading = true;
    this.attendanceService
      .getStaffListByStaffCategoryId(staffCategoryId)
      .subscribe(
        (data: any) => {
          if (data.length === 0) {
            this.noRecordsFound = true;
            this.showNotification("No Records Found");
          }
          this.isAttendanceLoading = false;
          this.staffList = data;
          this.dataSource.data = data;
        },
        (error) => {
          this.isAttendanceLoading = false;
        }
      );
  }

  addAttendance() {
    // Check if there are students to process
    if (!this.staffList || this.staffList.length === 0) {
      this.showNotification("No Staff to update attendance.");
      return;
    }

    // Create the payload for the API
    const payload = this.staffList.map((staff: any) => ({
      createdBy: 1,
      createdOn: new Date().toISOString(),
      modifiedBy: 1,
      modifiedOn: new Date().toISOString(),
      id: staff.id || 0,
      employeeId: staff.employeeId,
      staffCategoryId: this.selectedStaffCategoryId,
      attendanceDate: this.attendanceDateTemp?.toLocaleDateString("en-CA"),
      attendanceStatusId: this.getAttendanceStatusId(staff.status),
      remark: staff.remark || "",
    }));

    this.attendanceService.addBulkStaffAttendance(payload).subscribe(
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
