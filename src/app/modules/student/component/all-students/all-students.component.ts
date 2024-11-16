import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddStudentComponent } from "../add-student/add-student.component";
import { StudentService } from "../../service/student.service";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

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

  constructor(
    public dialog: MatDialog,
    private studentService: StudentService,
    private masterService: MasterService
  ) {}

  ngOnInit() {
    this.getAllStudentList();
    this.getAllClass();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllStudentList() {
    this.isLoading = true;
    this.studentService.getStudentList().subscribe((data: any) => {
      this.studentList = data.reverse();
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

  getClassName(classId: number): string {
    const matchedClass = this.classes.find((cls) => cls.id === classId);
    return matchedClass ? matchedClass.name : "-";
  }

  getSection(classId: number) {
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  editStudent() {
    // console.log("Editing student");
    // Implement edit functionality
  }

  deleteStudent() {
    // console.log("Deleting student");
    // Implement delete functionality
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
