import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  addStudent(payload: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}Student/AddStudent`, payload);
  }

  uploadImages(formData: any) {
    return this.httpClient.post(
      `${this.baseUrl}Student/UploadImages`,
      formData
    );
  }

  getStudentList() {
    return this.httpClient.get(`${this.baseUrl}Student/GetStudentList`);
  }

  getStudentDetailByGuid(id: any) {
    return this.httpClient.get(
      `${this.baseUrl}Student/GetStudentDetailByTabRefGuid?tabRefGuid=` + id
    );
  }
}
