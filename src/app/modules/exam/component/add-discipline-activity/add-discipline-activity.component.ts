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
  selector: "app-add-discipline-activity",
  templateUrl: "./add-discipline-activity.component.html",
  styleUrl: "./add-discipline-activity.component.css",
})
export class AddDisciplineActivityComponent {
  marksheet: Marksheet = new Marksheet();
  marksheetImage: any[] = [""];
  cardsCount: any[] = [""];

  disciplineElements: any[] = [];

  classes: any[] = [];
  sections: any[] = [];
  disciplines: any[] = [];
  examTerms: any[] = [];
  selectedClassId: number = 0;
  selectedSectionId: number = 0;
  selectedExamTermId: number = 0;
  selectedDisciplineId: number = 0;

  // Define columns for the table
  displayedColumns: string[] = ["rollNo", "studentName", "grade", "action"];

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
    this.getDisciplines(classId);
  }

  onDiscplineElementSelected(examId: number) {
    this.selectedDisciplineId = examId;
  }

  getSections(classId: number) {
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  getDisciplines(classId: number) {
    this.examService.getDisciplineByClassId(classId).subscribe((data: any) => {
      this.disciplines = data;
    });
  }

  getAllClasses() {
    this.masterService.getAllClass().subscribe((data: any) => {
      this.classes = data;
    });
  }

  getDisciplineElementForEntry() {
    if (this.selectedClassId && this.selectedSectionId) {
      this.disciplineElements = [];
      this.examService
        .getDisciplineElementForEntry(
          this.selectedClassId,
          this.selectedSectionId
        )
        .subscribe(
          (data: any) => {
            this.disciplineElements = data;
            if (this.disciplineElements.length === 0) {
              this.showNotification("No Elements found");
            }
          },
          (error) => {}
        );
    } else {
      this.showNotification("Please ensure all fields are selected");
    }
  }

  addMarksheet(): void {
    for (const activity of this.disciplineElements) {
      if (
        activity.grade === undefined ||
        activity.grade === null ||
        activity.grade.trim() === ""
      ) {
        this.showNotification("Please fill grade.");
        return;
      }
    }

    // Construct the payload
    const payload = this.disciplineElements.map((element) => ({
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      classId: this.selectedClassId,
      sectionId: this.selectedSectionId,
      rollNo: element.rollNo,
      examTermId: this.selectedExamTermId,
      disciplineId: this.selectedDisciplineId,
      grade: element.grade || "N/A",
    }));

    // Call the service
    this.examService.addDisciplineAssessmentResult(payload).subscribe(
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
