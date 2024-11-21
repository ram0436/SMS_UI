import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Student } from "../../../../shared/model/student.payload";
import { TeacherService } from "../../../teacher/service/teacher.service";
import { MasterService } from "../../../service/master.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Staff } from "../../../../shared/model/staff.payload";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  providers: [provideNativeDateAdapter()],
  styleUrl: "./add-staff.component.css",
})
export class AddStaffComponent {
  staff: Staff = new Staff();
  staffImage: any[] = [""];
  cardsCount: any[] = [""];
  branches: any[] = [];
  schools: any[] = [];
  selectedSchool: any;

  classes: any[] = [];
  guardianQualifications: any[] = [];
  guardianOccupations: any[] = [];
  sections: any[] = [];
  streams: any[] = [];
  designations: any[] = [];
  departments: any[] = [];
  selectedDepartmentId: number = 0;
  selectedDesignationId: number = 0;
  joiningDateTemp: Date | null = null;
  dobDateTemp: Date | null = null;

  passingDates: any[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private teacherService: TeacherService,
    private masterService: MasterService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllDepartments());
    this.subscriptions.add(this.getAllDesignations());
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  // Method to add a new qualification row
  addQualification() {
    const newQualification = {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      qualification: "",
      college: "",
      passingYear: new Date().toISOString(),
    };

    this.staff.staffQualification.push(newQualification);
  }

  // Method to remove a qualification row
  removeQualification(index: number) {
    this.staff.staffQualification.splice(index, 1);
  }

  onJoiningDateChange() {
    if (this.joiningDateTemp) {
      // Convert to ISO string format and assign to the API model
      this.staff.joiningDate = this.joiningDateTemp.toISOString();
    }
  }

  onDOBDateChange() {
    if (this.dobDateTemp) {
      // Convert to ISO string format and assign to the API model
      this.staff.dob = this.dobDateTemp.toISOString();
    }
  }

  onPassingYearChange(index: number) {
    this.staff.staffQualification[index].passingYear =
      this.passingDates[index].toISOString();
  }

  getAllDesignations() {
    this.masterService.getAllDesignations().subscribe((data: any) => {
      this.designations = data;
    });
  }

  getAllDepartments() {
    this.masterService.getAllDepartments().subscribe((data: any) => {
      this.departments = data;
    });
  }

  onDesignationSelect(designationId: number): void {
    this.staff.designationId = designationId;
  }

  onDepartmentSelect(departmentId: number): void {
    this.staff.departmentId = departmentId;
  }

  selectFile(isFrom: String) {
    if (this.document) {
      if (isFrom == "staffImage") {
        const uploadElement = this.document.getElementById("staffFileUpload");
        if (uploadElement) {
          uploadElement.click();
        }
      }
    }
  }

  selectImage(event: any, isFrom: string): void {
    var files = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    this.teacherService.uploadImages(formData).subscribe((data: any) => {
      let imagesLength = data.length;
      let dataIndex = 0;

      if (isFrom == "staffImageUpload") {
        for (
          let j = 0;
          j < this.staffImage.length && dataIndex < data.length;
          j++
        ) {
          this.staff.profilePicURL = data[0];
          if (this.staffImage[j] === "") {
            this.staffImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      }
    });
  }
  deleteBackgroundImage(index: any, isFrom: string): void {
    if (isFrom == "teacherImageUpload") {
      for (let i = index; i < this.staffImage.length - 1; i++) {
        this.staffImage[i] = this.staffImage[i + 1];
      }
      this.staffImage[this.staffImage.length - 1] = "";
    }
  }

  addStaff(): void {
    this.teacherService.addTeacher(this.staff).subscribe((response) => {
      this.showNotification("Staff Added Succesfully");
    });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
