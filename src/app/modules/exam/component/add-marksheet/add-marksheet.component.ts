import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Student } from "../../../../shared/model/student.payload";
import { TeacherService } from "../../../teacher/service/teacher.service";
import { MasterService } from "../../../service/master.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { Marksheet } from "../../../../shared/model/marksheet.payload";
import { ExamService } from "../../service/exam.service";

@Component({
  selector: "app-add-marksheet",
  templateUrl: "./add-marksheet.component.html",

  styleUrl: "./add-marksheet.component.css",
})
export class AddMarksheetComponent {
  marksheet: Marksheet = new Marksheet();
  marksheetImage: any[] = [""];
  cardsCount: any[] = [""];

  entrySubjects: any[] = [];

  classes: any[] = [];
  sections: any[] = [];
  subjects: any[] = [];
  examTerms: any[] = [];
  scholosticExams: any[] = [];
  selectedClassId: number = 0;
  selectedSubjectId: number = 0;
  selectedSectionId: number = 0;
  selectedExamTermId: number = 0;
  selectedScholosticExamId: number = 0;

  // Define columns for the table
  displayedColumns: string[] = [
    "rollNo",
    "studentName",
    "minMarks",
    "maxMarks",
    "obtainedMarks",
    "practical",
    "grade",
    "action",
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private teacherService: TeacherService,
    private masterService: MasterService,
    private snackBar: MatSnackBar,
    private examService: ExamService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllExamTerms());
    this.subscriptions.add(this.getAllClasses());
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  getAllExamTerms() {
    this.examService.getAllExamTerms().subscribe((data: any) => {
      this.examTerms = data;
    });
  }

  onClassSelected(classId: number) {
    this.selectedClassId = classId;
    this.getSections(classId);
    this.getScholosticExam(classId);
  }

  onScholosticExamSelected(examId: number) {
    this.selectedScholosticExamId = examId;
    this.getSubjects(examId);
  }

  getSections(classId: number) {
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  getSubjects(examId: number) {
    this.examService.getAllSubjectByExamId(examId).subscribe((data: any) => {
      this.subjects = data;
    });
  }

  getScholosticExam(classId: number) {
    this.examService
      .getScholosticExamByClassId(classId)
      .subscribe((data: any) => {
        this.scholosticExams = data;
      });
  }

  getAllClasses() {
    this.masterService.getAllClass().subscribe((data: any) => {
      this.classes = data;
    });
  }

  getSubjectsForEntry() {
    if (
      this.selectedClassId &&
      this.selectedSectionId &&
      this.selectedExamTermId &&
      this.selectedSubjectId
    ) {
      this.entrySubjects = [];
      this.examService
        .getSubjectForEntry(
          this.selectedClassId,
          this.selectedSectionId,
          this.selectedExamTermId,
          this.selectedSubjectId
        )
        .subscribe(
          (data: any) => {
            // Store the data in entrySubjects or a suitable variable
            this.entrySubjects = data;
            // Check if entrySubjects is empty
            if (this.entrySubjects.length === 0) {
              this.showNotification("No subjects found");
            }
          },
          (error) => {
            this.showNotification("Failed to load subjects for entry");
          }
        );
    } else {
      this.showNotification("Please ensure all fields are selected");
    }
  }

  addMarksheet(): void {
    for (const subject of this.entrySubjects) {
      if (
        subject.obtainedMarks === undefined ||
        subject.obtainedMarks === null ||
        subject.practical === undefined ||
        subject.practical === null ||
        subject.grade === undefined ||
        subject.grade === null ||
        subject.grade.trim() === ""
      ) {
        this.showNotification(
          "Please fill all fields (obtained marks, practical, grade) for all entries."
        );
        return;
      }
    }

    // Construct the payload
    const payload = this.entrySubjects.map((subject) => ({
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      classId: this.selectedClassId,
      sectionId: this.selectedSectionId,
      rollNo: subject.rollNo,
      examTermId: this.selectedExamTermId,
      examId: this.selectedScholosticExamId,
      subjectId: this.selectedSubjectId,
      obtainedMark: subject.obtainedMarks || 0,
      practical: subject.practical || 0,
      grade: subject.grade || "N/A",
    }));

    // Call the service
    this.examService.addScholasticExamResult(payload).subscribe(
      (response) => {
        this.showNotification("Marksheet added successfully!");
      },
      (error) => {}
    );
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
