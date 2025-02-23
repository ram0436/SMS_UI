import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class MasterService {
  private dataSubject = new Subject<any>();

  private brandsDataSubject = new Subject<any>();

  constructor(private http: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getDepartment() {
    return this.http.get(`${this.baseUrl}Master/GetDepartment`);
  }

  getSchoolDetail() {
    return this.http.get(`${this.baseUrl}Master/GetSchoolDetail`);
  }

  getDesignation() {
    return this.http.get(`${this.baseUrl}Master/GetDesignation`);
  }

  getSchool() {
    return this.http.get(`${this.baseUrl}Master/GetSchool`);
  }

  getSchoolBranch() {
    return this.http.get(`${this.baseUrl}Master/GetSchoolBranch`);
  }

  getAllClass() {
    return this.http.get(`${this.baseUrl}Master/GetAllClass`);
  }

  getAllCourseStream() {
    return this.http.get(`${this.baseUrl}Master/GetAllCourseStream`);
  }

  getAllQualification() {
    return this.http.get(`${this.baseUrl}Master/GetAllQualification`);
  }

  getAllOccupation() {
    return this.http.get(`${this.baseUrl}Master/GetAllOccupation`);
  }

  getAllSchool() {
    return this.http.get(`${this.baseUrl}Master/GetSchool`);
  }

  getAllDesignations() {
    return this.http.get(`${this.baseUrl}Master/GetDesignation`);
  }

  getAllDepartments() {
    return this.http.get(`${this.baseUrl}Master/GetDepartment`);
  }

  getStaffCategories() {
    return this.http.get(`${this.baseUrl}Master/GetStaffCategories`);
  }

  getMonths() {
    return this.http.get(`${this.baseUrl}Master/GetMonths`);
  }

  getSectionByClassId(classId: number) {
    return this.http.get(
      `${this.baseUrl}Master/GetSectionByClassId?classId=${classId}`
    );
  }

  getAddress(pinCode: any) {
    return this.http.get("https://api.postalpincode.in/pincode/" + pinCode);
  }
}
