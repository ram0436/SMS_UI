import { Component, ElementRef } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StudentService } from "../../service/student.service";
import { MasterService } from "../../../service/master.service";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-student-details",
  templateUrl: "./student-details.component.html",
  styleUrl: "./student-details.component.css",
})
export class StudentDetailsComponent {
  dialogRef: MatDialogRef<any> | null = null;

  studentDetails: any;
  targetRoute: any;
  isLoading: boolean = true;

  classes: any[] = [];
  sections: any[] = [];
  schoolBranches: any[] = [];
  streams: any[] = [];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private el: ElementRef
  ) {}

  ngOnInit() {
    var tableRefGuid;
    this.route.paramMap.subscribe((params) => {
      tableRefGuid = params.get("id");
      this.targetRoute = params.get("targetRoute");
    });
    if (tableRefGuid != null) {
      this.getPostDetails(tableRefGuid);
    }
    this.getAllClass();
    this.getAllSchoolBranches();
    this.getAllStreams();
  }

  getPostDetails(guid: any) {
    this.studentService.getStudentDetailByGuid(guid).subscribe((res: any) => {
      this.studentDetails = res;
      this.isLoading = false;
    });
  }

  truncateEmail(email: string, limit: number = 12): string {
    if (email && email.length > limit) {
      return email.substring(0, limit) + "...";
    }
    return email;
  }

  getAllClass() {
    this.masterService.getAllClass().subscribe((data: any) => {
      this.classes = data;
    });
  }

  getAllStreams() {
    this.masterService.getAllCourseStream().subscribe((data: any) => {
      this.streams = data;
    });
  }

  getAllSchoolBranches() {
    this.masterService.getSchoolBranch().subscribe((data: any) => {
      this.schoolBranches = data;
    });
  }

  getClassName(classId: number): string {
    this.getSection(classId);
    const matchedClass = this.classes.find((cls) => cls.id === classId);
    return matchedClass ? matchedClass.name : "-";
  }

  getSchoolBranchName(branchId: number): string {
    console.log(this.schoolBranches);
    const matchedBranch = this.schoolBranches.find(
      (branch) => branch.id === branchId
    );
    return matchedBranch ? matchedBranch.name : "-";
  }

  getStreamName(streamId: number): string {
    const matchedStream = this.streams.find((stream) => stream.id === streamId);
    return matchedStream ? matchedStream.name : "-";
  }

  getSection(classId: number) {
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  getSectionName(sectionId: number): string {
    const matchedSection = this.sections.find(
      (section) => section.id === sectionId
    );
    return matchedSection ? matchedSection.name : "-";
  }

  // Method for Edit action
  editStudent() {
    // Add your edit logic here
  }

  // Method for Delete action
  deleteStudent() {
    // Add your delete logic here
  }
}
