import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddStudentComponent } from "../add-student/add-student.component";
import { StudentService } from "../../service/student.service";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-all-students",
  templateUrl: "./all-students.component.html",
  styleUrls: ["./all-students.component.css"],
})
export class AllStudentsComponent {
  @ViewChild("addStudentDialog") addStudentDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  studentList: any = [];
  dataSource = new MatTableDataSource<any>([]);
  isLoading: boolean = true;

  classes: any[] = [];
  sections: any[] = [];
  streams: any[] = [];

  selectedClassId: number | null = null;
  selectedSectionId: number | null = null;
  selectedStreamId: number | null = null;
  selectedIsRTE: boolean | null = null;

  admissionNo: string = "";
  registrationNo: string = "";
  educationMedium: string = "";
  religion: string = "";

  className: string = "";

  isFilterVisible = false;

  displayedColumns: string[] = [
    "no",
    "admissionNo",
    "rollNo",
    "serialNo",
    "isRTE",
    "createdAt",
    "updatedAt",
    "profile",
    "studentInfo",
    "action",
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialog: MatDialog,
    private studentService: StudentService,
    private masterService: MasterService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllStudentList());
    this.subscriptions.add(this.getAllClass());
    this.subscriptions.add(this.getAllStreams());
    // this.subscriptions.add(this.getAllClass());
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

  toggleFilters() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  getAllStudentList() {
    this.isLoading = true;
    this.studentService.getStudentList().subscribe((data: any) => {
      this.studentList = data;
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

  loadSections(classId: number) {
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  getAllStreams() {
    this.masterService.getAllCourseStream().subscribe((data: any) => {
      this.streams = data;
      this.isLoading = false;
    });
  }

  getClassName(classId: number): string {
    const matchedClass = this.classes.find((cls) => cls.id === classId);
    return matchedClass ? matchedClass.name : "-";
  }

  getSection(classId: number) {
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  // Set RTE filter
  setRTEStudent(value: string) {
    this.selectedIsRTE = value === "yes";
    this.applyFilters();
  }

  // Update applyFilters method to include text input filtering
  applyFilters() {
    let filteredList = this.studentList;

    if (this.selectedClassId) {
      filteredList = filteredList.filter(
        (student: any) =>
          student.studentAdmissionDetailList[0]?.classId ===
          this.selectedClassId
      );
    }

    if (this.selectedSectionId) {
      filteredList = filteredList.filter(
        (student: any) =>
          student.studentAdmissionDetailList[0]?.sectionId ===
          this.selectedSectionId
      );
    }

    if (this.selectedStreamId) {
      filteredList = filteredList.filter(
        (student: any) =>
          student.studentAdmissionDetailList[0]?.streamId ===
          this.selectedStreamId
      );
    }

    if (this.selectedIsRTE !== null) {
      filteredList = filteredList.filter(
        (student: any) =>
          student.studentAdmissionDetailList[0]?.isRTEStudent ===
          this.selectedIsRTE
      );
    }

    // Filter by text inputs
    if (this.admissionNo) {
      filteredList = filteredList.filter((student: any) =>
        student.studentAdmissionDetailList[0]?.admissionNo
          ?.toLowerCase()
          .includes(this.admissionNo.toLowerCase())
      );
    }

    if (this.registrationNo) {
      filteredList = filteredList.filter((student: any) =>
        student.studentAdmissionDetailList[0]?.registrationNo
          ?.toLowerCase()
          .includes(this.registrationNo.toLowerCase())
      );
    }

    if (this.educationMedium) {
      filteredList = filteredList.filter((student: any) =>
        student.studentAdmissionDetailList[0]?.educationMedium
          ?.toLowerCase()
          .includes(this.educationMedium.toLowerCase())
      );
    }

    if (this.religion) {
      filteredList = filteredList.filter((student: any) =>
        student.studentReligionAndCastCategoryList[0]?.religion
          ?.toLowerCase()
          .includes(this.religion.toLowerCase())
      );
    }

    // Update data source
    this.dataSource = new MatTableDataSource(filteredList);
    this.dataSource.paginator = this.paginator;
  }

  // Method for handling input change
  onInputChange() {
    this.applyFilters();
  }

  // Trigger filter when class, section, or stream changes
  onClassSelected(value: number) {
    this.selectedClassId = value;
    this.loadSections(value);
    this.applyFilters();
  }

  onSectionSelected(value: number) {
    this.selectedSectionId = value;
    this.applyFilters();
  }

  onStreamSelected(value: number) {
    this.selectedStreamId = value;
    this.applyFilters();
  }

  editStudent() {
    // console.log("Editing student");
    // Implement edit functionality
  }

  deleteStudent(studentId: any): void {
    if (confirm("Are you sure you want to delete this student?")) {
      this.studentService.deleteStudent(studentId).subscribe(
        () => {
          console.log("Hi");
          this.showNotification("Student deleted successfully!");
          window.location.reload();
        },
        (error) => {}
      );
    }
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }

  openAddStudentDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(AddStudentComponent, {
      width: "1050px",
    });
  }
}
