import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Student } from "../../../../shared/model/student.payload";
import { TeacherService } from "../../service/teacher.service";
import { MasterService } from "../../../service/master.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Teacher } from "../../../../shared/model/teacher.payload";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-teacher",
  templateUrl: "./add-teacher.component.html",
  providers: [provideNativeDateAdapter()],
  styleUrl: "./add-teacher.component.css",
})
export class AddTeacherComponent implements OnInit {
  teacher: Teacher = new Teacher();
  teacherImage: any[] = [""];
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

  numericValue: number = 0;

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

    this.teacher.teacherQualification.push(newQualification);
  }

  // Method to remove a qualification row
  removeQualification(index: number) {
    this.teacher.teacherQualification.splice(index, 1);
  }

  onJoiningDateChange() {
    if (this.joiningDateTemp) {
      // Convert to ISO string format and assign to the API model
      this.teacher.joiningDate = this.joiningDateTemp.toISOString();
    }
  }

  onDOBDateChange() {
    if (this.dobDateTemp) {
      // Convert to ISO string format and assign to the API model
      this.teacher.dob = this.dobDateTemp.toISOString();
    }
  }

  onPassingYearChange(index: number) {
    this.teacher.teacherQualification[index].passingYear =
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
    this.teacher.designationId = designationId;
  }

  onDepartmentSelect(departmentId: number): void {
    this.teacher.departmentId = departmentId;
  }

  getPermanentAddress(event: any) {
    let pincode = event.target.value;
    if (pincode.length === 6) {
      this.masterService.getAddress(pincode).subscribe((data: any) => {
        if (data[0].PostOffice != null) {
          var address = data[0].PostOffice[0];
          this.teacher.teacherPermanentAddress[0].state = address.State;
          this.teacher.teacherPermanentAddress[0].city = address.District;
          this.teacher.teacherPermanentAddress[0].country = address.Country;
          // this.postOffices = data[0].PostOffice;
        }
      });
    }
  }

  getTemporaryAddress(event: any) {
    let pincode = event.target.value;
    if (pincode.length === 6) {
      this.masterService.getAddress(pincode).subscribe((data: any) => {
        if (data[0].PostOffice != null) {
          var address = data[0].PostOffice[0];

          this.teacher.teacherTemporaryAddress[0].state = address.State;
          this.teacher.teacherTemporaryAddress[0].city = address.District;
          this.teacher.teacherTemporaryAddress[0].country = address.Country;
        }
      });
    }
  }

  allowOnlyNumbersPincode(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const numericInput = inputValue.replace(/[^0-9.-]/g, "");
    inputElement.value = numericInput;
    this.numericValue = parseFloat(numericInput);
  }

  selectFile(isFrom: String) {
    if (this.document) {
      if (isFrom == "teacherImage") {
        const uploadElement = this.document.getElementById("teacherFileUpload");
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

      if (isFrom == "teacherImageUpload") {
        for (
          let j = 0;
          j < this.teacherImage.length && dataIndex < data.length;
          j++
        ) {
          this.teacher.profilePicURL = data[0];
          if (this.teacherImage[j] === "") {
            this.teacherImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      }
    });
  }
  deleteBackgroundImage(index: any, isFrom: string): void {
    if (isFrom == "teacherImageUpload") {
      for (let i = index; i < this.teacherImage.length - 1; i++) {
        this.teacherImage[i] = this.teacherImage[i + 1];
      }
      this.teacherImage[this.teacherImage.length - 1] = "";
    }
  }

  addTeacher(): void {
    this.teacherService.addTeacher(this.teacher).subscribe((response) => {
      this.showNotification("Teacher Added Succesfully");
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
