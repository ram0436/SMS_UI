import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Student } from "../../../../shared/model/student.payload";
import { StudentService } from "../../service/student.service";
import { MasterService } from "../../../service/master.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  providers: [provideNativeDateAdapter()],
  styleUrls: ["./add-student.component.css"],
})
export class AddStudentComponent implements OnInit {
  student: Student = new Student();
  studentImage: any[] = [""];
  fatherImage: any[] = [""];
  motherImage: any[] = [""];
  guardianImage: any[] = [""];
  aadharCardImage: any[] = [""];
  dobCertificateImage: any[] = [""];
  transferCertificateImage: any[] = [""];
  castCertificateImage: any[] = [""];
  cardsCount: any[] = [""];
  branches: any[] = [];
  schools: any[] = [];
  selectedSchool: any;

  classes: any[] = [];
  guardianQualifications: any[] = [];
  guardianOccupations: any[] = [];
  sections: any[] = [];
  streams: any[] = [];
  selectedSessionId: number = 1;
  selectedBranchId: number = 0;
  selectedClassId: number = 0;
  selectedSectionId: number = 0;
  selectedStreamId: number = 0;
  admissionDateTemp: Date | null = null;
  dobDateTemp: Date | null = null;
  issueDateTemp: Date | null = null;
  numericValue: number = 0;

  passingDates: any[] = [];

  qualifications = [
    {
      qualification: "",
      passingYear: {
        year: 0,
        month: 0,
        day: 0,
        dayOfWeek: 0,
      },
      rollNo: "",
      percent: "",
      subject: "",
      schoolName: "",
      schoolCode: "",
      boardName: "",
    },
  ];

  fatherDetails: { [key: string]: any } = {
    name: "",
    qualificationId: 0,
    occupationId: 0,
    residentialAddress: "",
    officialAddress: "",
    annualIncome: "",
    email: "",
    mobileNo: "",
    aadharNo: "",
  };

  motherDetails: { [key: string]: any } = {
    name: "",
    qualificationId: 0,
    occupationId: 0,
    residentialAddress: "",
    officialAddress: "",
    annualIncome: "",
    email: "",
    mobileNo: "",
    aadharNo: "",
  };

  guardianDetails: { [key: string]: any } = {
    name: "",
    qualificationId: 0,
    occupationId: 0,
    residentialAddress: "",
    officialAddress: "",
    annualIncome: "",
    email: "",
    mobileNo: "",
    aadharNo: "",
  };

  detailLabels = [
    { label: "Name", key: "name", type: "text" },
    { label: "Qualification", key: "qualificationId", type: "dropdown" },
    { label: "Occupation", key: "occupationId", type: "dropdown" },
    { label: "Residential Address", key: "residentialAddress", type: "text" },
    { label: "Official Address", key: "officialAddress", type: "text" },
    { label: "Annual Income", key: "annualIncome", type: "text" },
    { label: "Email", key: "email", type: "text" },
    { label: "Mobile No", key: "mobileNo", type: "text" },
    { label: "Aadhar No", key: "aadharNo", type: "text" },
    { label: "Photo", key: "imageUrl", type: "text" },
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private studentService: StudentService,
    private masterService: MasterService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadBranches();
    this.loadClasses();
    this.loadCourseStreams();
    this.getAllOccupation();
    this.getAllQualifications();
    this.getAllSchools();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onAdmissionDateChange() {
    if (this.admissionDateTemp) {
      // Convert to ISO string format and assign to the API model
      this.student.studentAdmissionDetail[0].admissionDate =
        this.admissionDateTemp.toISOString();
    }
  }

  onDOBDateChange() {
    if (this.dobDateTemp) {
      // Convert to ISO string format and assign to the API model
      this.student.dob = this.dobDateTemp.toISOString();
    }
  }

  onIssueDateChange() {
    if (this.issueDateTemp) {
      // Convert to ISO string format and assign to the API model
      this.student.studentTransferCertificate[0].dateOfIssue =
        this.issueDateTemp.toISOString();
    }
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
      passingYear: new Date().toISOString(),
      rollNo: "",
      percent: "",
      subject: "",
      schoolName: "",
      schoolCode: "",
      boardName: "",
      studentId: 0,
    };

    this.student.studentPreviousQualification.push(newQualification);
  }

  // Method to remove a qualification row
  removeQualification(index: number) {
    this.student.studentPreviousQualification.splice(index, 1);
  }

  onPassingYearChange(index: number) {
    const selectedDate = this.passingDates[index];

    if (selectedDate instanceof Date) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      const dayOfWeek = selectedDate.getDay();

      // Store the extracted details into the qualification object
      this.student.studentPreviousQualification[index].passingYear =
        this.passingDates[index].toISOString();
    }
  }

  // Method to handle school selection and update school name and code
  onSchoolSelect(index: number, selectedSchool: any) {
    this.student.studentPreviousQualification[index].schoolName =
      selectedSchool.name;
    this.student.studentPreviousQualification[index].schoolCode =
      selectedSchool.schoolCode;
  }

  onLastSchoolSelect(selectedSchool: any) {
    this.student.studentLastSchoolDetail[0].schoolName = selectedSchool.name;
    this.student.studentLastSchoolDetail[0].schoolName =
      selectedSchool.schoolCode;
  }

  loadBranches() {
    this.masterService.getSchoolBranch().subscribe((data: any) => {
      this.branches = data;
    });
  }

  loadClasses() {
    this.masterService.getAllClass().subscribe((data: any) => {
      this.classes = data;
    });
  }

  getAllQualifications() {
    this.masterService.getAllQualification().subscribe((data: any) => {
      this.guardianQualifications = data;
    });
  }

  getAllOccupation() {
    this.masterService.getAllOccupation().subscribe((data: any) => {
      this.guardianOccupations = data;
    });
  }

  getAllSchools() {
    this.masterService.getAllSchool().subscribe((data: any) => {
      this.schools = [data];
    });
  }

  loadCourseStreams() {
    this.masterService.getAllCourseStream().subscribe((data: any) => {
      this.streams = data;
    });
  }

  onClassSelected(classId: number) {
    this.selectedClassId = classId;
    this.loadSections(classId);
  }

  loadSections(classId: number) {
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  loadStreams() {
    this.masterService.getAllCourseStream().subscribe((data: any) => {
      this.streams = data;
    });
  }

  selectFile(isFrom: String) {
    if (this.document) {
      if (isFrom == "studentImage") {
        const uploadElement = this.document.getElementById("studentFileUpload");
        if (uploadElement) {
          uploadElement.click();
        }
      } else if (isFrom == "dobImage") {
        const uploadElement = this.document.getElementById("dobFileUpload");
        if (uploadElement) {
          uploadElement.click();
        }
      } else if (isFrom == "aadharImage") {
        const uploadElement = this.document.getElementById("aadharFileUpload");
        if (uploadElement) {
          uploadElement.click();
        }
      } else if (isFrom == "castImage") {
        const uploadElement = this.document.getElementById("castFileUpload");
        if (uploadElement) {
          uploadElement.click();
        }
      } else if (isFrom == "transferImage") {
        const uploadElement =
          this.document.getElementById("transferFileUpload");
        if (uploadElement) {
          uploadElement.click();
        }
      } else if (isFrom == "fatherImage") {
        const uploadElement = this.document.getElementById("fatherFileUpload");
        if (uploadElement) {
          uploadElement.click();
        }
      } else if (isFrom == "motherImage") {
        const uploadElement = this.document.getElementById("motherFileUpload");
        if (uploadElement) {
          uploadElement.click();
        }
      } else if (isFrom == "guardianImage") {
        const uploadElement =
          this.document.getElementById("guardianFileUpload");
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
    this.studentService.uploadImages(formData).subscribe((data: any) => {
      let imagesLength = data.length;
      let dataIndex = 0;

      if (isFrom == "studentImageUpload") {
        for (
          let j = 0;
          j < this.studentImage.length && dataIndex < data.length;
          j++
        ) {
          this.student.studentAdmissionDetail[0].studentImageURL = data[0];
          if (this.studentImage[j] === "") {
            this.studentImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      } else if (isFrom == "dobCertificateImageUpload") {
        for (
          let j = 0;
          j < this.dobCertificateImage.length && dataIndex < data.length;
          j++
        ) {
          this.student.dobCertificateImageURL = data[0];
          if (this.dobCertificateImage[j] === "") {
            this.dobCertificateImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      } else if (isFrom == "aadharCardImageUpload") {
        for (
          let j = 0;
          j < this.aadharCardImage.length && dataIndex < data.length;
          j++
        ) {
          this.student.studentAadharCard[0].aadharCardImageURL = data[0];
          if (this.aadharCardImage[j] === "") {
            this.aadharCardImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      } else if (isFrom == "castImageUpload") {
        for (
          let j = 0;
          j < this.castCertificateImage.length && dataIndex < data.length;
          j++
        ) {
          this.student.studentReligionAndCastCategory[0].casteCertificateImageURL =
            data[0];
          if (this.castCertificateImage[j] === "") {
            this.castCertificateImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      } else if (isFrom == "transferImageUpload") {
        for (
          let j = 0;
          j < this.transferCertificateImage.length && dataIndex < data.length;
          j++
        ) {
          this.student.studentTransferCertificate[0].certificateImageURL =
            data[0];
          if (this.transferCertificateImage[j] === "") {
            this.transferCertificateImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      } else if (isFrom == "fatherImage") {
        for (
          let j = 0;
          j < this.fatherImage.length && dataIndex < data.length;
          j++
        ) {
          this.student.studentFatherDetail[0].fatherImageURL = data[0];
          if (this.fatherImage[j] === "") {
            this.fatherImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      } else if (isFrom == "motherImage") {
        for (
          let j = 0;
          j < this.motherImage.length && dataIndex < data.length;
          j++
        ) {
          this.student.studentMotherDetail[0].motherImageURL = data[0];
          if (this.motherImage[j] === "") {
            this.motherImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      } else if (isFrom == "guardianImage") {
        for (
          let j = 0;
          j < this.guardianImage.length && dataIndex < data.length;
          j++
        ) {
          this.student.studentGuardianDetail[0].guardianImageURL = data[0];
          if (this.guardianImage[j] === "") {
            this.guardianImage[j] = data[dataIndex];
            dataIndex++;
            imagesLength--;
          }
        }
      }
    });
  }
  deleteBackgroundImage(index: any, isFrom: string): void {
    if (isFrom == "studentImageUpload") {
      for (let i = index; i < this.studentImage.length - 1; i++) {
        this.studentImage[i] = this.studentImage[i + 1];
      }
      this.studentImage[this.studentImage.length - 1] = "";
    } else if (isFrom == "dobCertificateImageUpload") {
      for (let i = index; i < this.dobCertificateImage.length - 1; i++) {
        this.dobCertificateImage[i] = this.dobCertificateImage[i + 1];
      }
      this.dobCertificateImage[this.dobCertificateImage.length - 1] = "";
    } else if (isFrom == "aadharCardImageUpload") {
      for (let i = index; i < this.aadharCardImage.length - 1; i++) {
        this.aadharCardImage[i] = this.aadharCardImage[i + 1];
      }
      this.aadharCardImage[this.aadharCardImage.length - 1] = "";
    } else if (isFrom == "castImageUpload") {
      for (let i = index; i < this.castCertificateImage.length - 1; i++) {
        this.castCertificateImage[i] = this.castCertificateImage[i + 1];
      }
      this.castCertificateImage[this.castCertificateImage.length - 1] = "";
    } else if (isFrom == "transferImageUpload") {
      for (let i = index; i < this.transferCertificateImage.length - 1; i++) {
        this.transferCertificateImage[i] = this.transferCertificateImage[i + 1];
      }
      this.transferCertificateImage[this.transferCertificateImage.length - 1] =
        "";
    } else if (isFrom == "fatherImage") {
      for (let i = index; i < this.fatherImage.length - 1; i++) {
        this.fatherImage[i] = this.fatherImage[i + 1];
      }
      this.fatherImage[this.fatherImage.length - 1] = "";
    } else if (isFrom == "motherImage") {
      for (let i = index; i < this.motherImage.length - 1; i++) {
        this.motherImage[i] = this.motherImage[i + 1];
      }
      this.motherImage[this.motherImage.length - 1] = "";
    } else if (isFrom == "guardianImage") {
      for (let i = index; i < this.guardianImage.length - 1; i++) {
        this.guardianImage[i] = this.guardianImage[i + 1];
      }
      this.guardianImage[this.guardianImage.length - 1] = "";
    }
  }

  getPermanentAddress(event: any) {
    let pincode = event.target.value;
    if (pincode.length === 6) {
      this.masterService.getAddress(pincode).subscribe((data: any) => {
        if (data[0].PostOffice != null) {
          var address = data[0].PostOffice[0];
          this.student.studentPermanentAddress[0].state = address.State;
          this.student.studentPermanentAddress[0].city = address.District;
          this.student.studentPermanentAddress[0].country = address.Country;
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
          this.student.studentTemporaryAddress[0].state = address.State;
          this.student.studentTemporaryAddress[0].city = address.District;
          this.student.studentTemporaryAddress[0].country = address.Country;
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

  setDropout(value: string): void {
    this.student.studentLastSchoolDetail[0].isDropout = value === "true";
  }

  setRTEStudent(value: string): void {
    this.student.studentAdmissionDetail[0].isRTEStudent = value === "yes";
  }

  addStudent(): void {
    this.student.studentAdmissionDetail = [
      {
        createdBy: 0,
        createdOn: new Date().toISOString(),
        modifiedBy: 0,
        modifiedOn: new Date().toISOString(),
        id: 0,
        schoolBranchId: this.selectedBranchId,
        schoolSessionId: Number(this.selectedSessionId),
        penNo: this.student.studentAdmissionDetail[0].penNo,
        registrationNo: this.student.studentAdmissionDetail[0].registrationNo,
        enrollmentNo: this.student.studentAdmissionDetail[0].enrollmentNo,
        srNo: this.student.studentAdmissionDetail[0].srNo,
        admissionNo: this.student.studentAdmissionDetail[0].admissionNo,
        admissionDate: this.student.studentAdmissionDetail[0].admissionDate,
        rollNo: this.student.studentAdmissionDetail[0].rollNo,
        classId: this.selectedClassId,
        sectionId: this.selectedSectionId,
        streamId: this.selectedStreamId,
        educationMedium: this.student.studentAdmissionDetail[0].educationMedium,
        studentImageURL: this.student.studentAdmissionDetail[0].studentImageURL, // assuming 1 image
        referredBy: 0, // Set 'RAM' or relevant value
        isRTEStudent: this.student.studentAdmissionDetail[0].isRTEStudent,
        studentId: 0,
      },
    ];

    this.student.studentFatherDetail = [
      {
        createdBy: 0,
        createdOn: new Date().toISOString(),
        modifiedBy: 0,
        modifiedOn: new Date().toISOString(),
        id: 0,
        name: this.fatherDetails["name"],
        qualificationId: this.fatherDetails["qualificationId"],
        occupationId: this.fatherDetails["occupationId"],
        residentialAddress: this.fatherDetails["residentialAddress"],
        officialAddress: this.fatherDetails["officialAddress"],
        annualIncome: this.fatherDetails["annualIncome"],
        email: this.fatherDetails["email"],
        mobileNo: this.fatherDetails["mobileNo"],
        aadharNo: this.fatherDetails["aadharNo"],
        fatherImageURL: this.student.studentFatherDetail[0]?.fatherImageURL,
        studentId: 0,
      },
    ];

    this.student.studentMotherDetail = [
      {
        createdBy: 0,
        createdOn: new Date().toISOString(),
        modifiedBy: 0,
        modifiedOn: new Date().toISOString(),
        id: 0,
        name: this.motherDetails["name"],
        qualificationId: this.motherDetails["qualificationId"],
        occupationId: this.motherDetails["occupationId"],
        residentialAddress: this.motherDetails["residentialAddress"],
        officialAddress: this.motherDetails["officialAddress"],
        annualIncome: this.motherDetails["annualIncome"],
        email: this.motherDetails["email"],
        mobileNo: this.motherDetails["mobileNo"],
        aadharNo: this.motherDetails["aadharNo"],
        motherImageURL: this.student.studentMotherDetail[0]?.motherImageURL,
        studentId: 0,
      },
    ];

    this.student.studentGuardianDetail = [
      {
        createdBy: 0,
        createdOn: new Date().toISOString(),
        modifiedBy: 0,
        modifiedOn: new Date().toISOString(),
        id: 0,
        name: this.guardianDetails["name"],
        qualificationId: this.guardianDetails["qualificationId"],
        occupationId: this.guardianDetails["occupationId"],
        residentialAddress: this.guardianDetails["residentialAddress"],
        officialAddress: this.guardianDetails["officialAddress"],
        annualIncome: this.guardianDetails["annualIncome"],
        email: this.guardianDetails["email"],
        mobileNo: this.guardianDetails["mobileNo"],
        aadharNo: this.guardianDetails["aadharNo"],
        guardianImageURL:
          this.student.studentGuardianDetail[0]?.guardianImageURL,
        studentId: 0,
      },
    ];

    // console.log(JSON.stringify(this.student, null, 2));

    this.studentService.addStudent(this.student).subscribe((response) => {
      this.showNotification("Student Added Succesfully");
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
