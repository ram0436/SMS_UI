import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class AttendanceService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getStudentAttendanceDashboard(
    classId: number,
    sectionId: number,
    attendanceDate: string
  ): Observable<any> {
    // Construct the URL with query parameters
    const url = `${
      this.baseUrl
    }Attendance/GetStudentAttendanceDashboard?classId=${classId}&sectionId=${sectionId}&attendanceDate=${encodeURIComponent(
      attendanceDate
    )}`;
    return this.http.get<any>(url);
  }

  getStaffAttendanceDashboard(
    staffCategoryId: number,
    attendanceDate: string
  ): Observable<any> {
    // Construct the URL with query parameters
    const url = `${
      this.baseUrl
    }Attendance/GetStaffAttendanceDashboard?staffCategoryId=${staffCategoryId}&attendanceDate=${encodeURIComponent(
      attendanceDate
    )}`;
    return this.http.get<any>(url);
  }

  getStaffListByStaffCategoryId(staffCategoryId: number): Observable<any> {
    // Construct the URL with query parameters
    const url = `${this.baseUrl}/Attendance/GetStaffListByStaffCategoryId?staffCategoryId=${staffCategoryId}`;

    return this.http.get<any>(url);
  }

  getStudentListByClassSectionId(
    classId: number,
    sectionId: number
  ): Observable<any> {
    // Construct the URL with query parameters
    const url = `${this.baseUrl}/Attendance/GetStudentListByClassSectionId?classId=${classId}&sectionId=${sectionId}`;

    return this.http.get<any>(url);
  }

  getAttendanceStatus(): Observable<any> {
    const url = `${this.baseUrl}Attendance/GetAttendanceStatus`;

    return this.http.get<any>(url);
  }

  addBulkStudentAttendance(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}Attendance/AddBulkStudentAttendance`,
      payload
    );
  }

  addBulkStaffAttendance(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}Attendance/AddBulkStaffAttendance`,
      payload
    );
  }
}
