import { Component, ElementRef } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TeacherService } from "../../service/teacher.service";
import { MasterService } from "../../../service/master.service";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-teacher-details",
  templateUrl: "./teacher-details.component.html",
  styleUrl: "./teacher-details.component.css",
})
export class TeacherDetailsComponent {
  dialogRef: MatDialogRef<any> | null = null;

  teacherDetails: any;
  targetRoute: any;
  isLoading: boolean = true;

  departments: any[] = [];
  designations: any[] = [];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private teacherService: TeacherService,
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
    this.getAllDepartments();
    this.getAllDesignations();
  }

  getPostDetails(guid: any) {
    this.teacherService.getTeacherDetailByGuid(guid).subscribe((res: any) => {
      this.teacherDetails = res;
      this.isLoading = false;
    });
  }

  truncateEmail(email: string, limit: number = 12): string {
    if (email && email.length > limit) {
      return email.substring(0, limit) + "...";
    }
    return email;
  }

  // getAllClass() {
  //   this.masterService.getAllClass().subscribe((data: any) => {
  //     this.classes = data;
  //   });
  // }

  getAllDepartments() {
    this.masterService.getAllDepartments().subscribe((data: any) => {
      this.departments = data;
    });
  }

  getAllDesignations() {
    this.masterService.getAllDesignations().subscribe((data: any) => {
      this.designations = data;
    });
  }

  getDepartmentName(departmentId: number): string {
    const matchedDepartment = this.departments.find(
      (department) => department.id === departmentId
    );
    return matchedDepartment ? matchedDepartment.name : "-";
  }

  getDesignationName(designationId: number): string {
    const matchedDesignation = this.designations.find(
      (designation) => designation.id === designationId
    );
    return matchedDesignation ? matchedDesignation.name : "-";
  }

  // Method for Edit action
  editTeacher() {
    // Add your edit logic here
  }

  // Method for Delete action
  deleteTeacher() {
    // Add your delete logic here
  }
}
