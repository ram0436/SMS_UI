import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class TeacherService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  addTeacher(payload: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}Teacher/AddTeacher`, payload);
  }

  uploadImages(formData: any) {
    return this.httpClient.post(
      `${this.baseUrl}Teacher/UploadImages`,
      formData
    );
  }

  getTeacherList() {
    return this.httpClient.get(`${this.baseUrl}Teacher/GetTeacherList`);
  }

  getTeacherDetailByGuid(id: any) {
    return this.httpClient.get(
      `${this.baseUrl}Teacher/GetTeacherDetailByTabRefGuid?tabRefGuid=` + id
    );
  }

  deleteTeacher(teacherId: any) {
    return this.httpClient.delete(`${this.baseUrl}Teacher/` + teacherId);
  }
}
