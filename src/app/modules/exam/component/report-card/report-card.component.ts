import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddMarksheetComponent } from "../add-marksheet/add-marksheet.component";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AddDisciplineActivityComponent } from "../add-discipline-activity/add-discipline-activity.component";

@Component({
  selector: "app-report-card",
  templateUrl: "./report-card.component.html",
  styleUrl: "./report-card.component.css",
})
export class ReportCardComponent {
  @ViewChild("addReportCardDialog")
  addReportCardDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dialogRef: MatDialogRef<any> | null = null;

  schoolDetails: any = [];
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

  studentDetails = {
    name: "John Doe",
    fatherName: "Robert Doe",
    motherName: "Jane Doe",
    dateOfBirth: "2005-03-14",
    address: "123 Main Street, Springfield",
    rollNo: "101",
    admissionNo: "A102345",
    bloodGroup: "O+",
    contactNo: "9876543210",
    profilePictureUrl: "https://via.placeholder.com/150", // Replace with actual URL
  };

  subjects = [
    {
      name: "English",
      perTest: 10,
      notebook: 4,
      sea: 5,
      halfYearly: 67,
      total: 86,
      grade: "A2",
    },
    {
      name: "Hindi",
      perTest: 9,
      notebook: 5,
      sea: 4,
      halfYearly: 64,
      total: 82,
      grade: "A2",
    },
    {
      name: "Maths",
      perTest: 7,
      notebook: 4,
      sea: 3,
      halfYearly: 78,
      total: 92,
      grade: "A1",
    },
    {
      name: "Science",
      perTest: 8,
      notebook: 3,
      sea: 4,
      halfYearly: 55,
      total: 70,
      grade: "B2",
    },
    {
      name: "Social Studies",
      perTest: 6,
      notebook: 5,
      sea: 5,
      halfYearly: 77,
      total: 93,
      grade: "A1",
    },
    {
      name: "Computer Sc.",
      perTest: 9,
      notebook: 5,
      sea: 5,
      halfYearly: 67,
      total: 86,
      grade: "A2",
    },
  ];

  coScholasticData = [
    { term: "Work Education", grade: "A" },
    { term: "Art Education", grade: "B" },
    { term: "Health & Physical Education", grade: "C" },
    { term: "Scientific Skills", grade: "A" },
    { term: "Thinking Skills", grade: "B" },
    { term: "Social Skills", grade: "C" },
    { term: "Yoga/ NCC", grade: "A" },
    { term: "Sports", grade: "A" },
  ];

  disciplineData = [
    { term: "Regularity & Punctuality", grade: "A" },
    { term: "Sincerity", grade: "B" },
    { term: "Behaviour & Values", grade: "C" },
    { term: "Respectfulness for Rules & Regulations", grade: "A" },
    { term: "Attitude Towards Teachers", grade: "B" },
    { term: "Attitude Towards School-mates", grade: "A" },
    { term: "Attitude Towards Society", grade: "A" },
    { term: "Attitude Towards Nation", grade: "B" },
  ];

  gradingScaleData = [
    { marksRange: "91-100", grade: "A1" },
    { marksRange: "81-90", grade: "A2" },
    { marksRange: "71-80", grade: "B1" },
    { marksRange: "61-70", grade: "B2" },
    { marksRange: "51-60", grade: "C1" },
    { marksRange: "41-50", grade: "C2" },
    { marksRange: "33-40", grade: "D" },
    { marksRange: "32 & Below", grade: "E (Needs improvement)" },
  ];

  overallMarks = 509;
  percentage = 70.5;
  grade = "B2";

  private subscriptions: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private masterService: MasterService) {}

  ngOnInit() {
    this.subscriptions.add(this.getSchoolDetails());
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

  getSchoolDetails() {
    this.masterService.getSchoolDetail().subscribe((data: any) => {
      this.schoolDetails = data;
    });
  }

  editMarksheet() {}

  deleteMarksheet() {}
}
