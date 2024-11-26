import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getAllExamTerms() {
    return this.http.get(`${this.baseUrl}Exam/GetExamTerm`);
  }

  getScholosticExamByClassId(classId: number) {
    return this.http.get(
      `${this.baseUrl}Exam/GetScholosticExamByClassId?classId=${classId}`
    );
  }

  getAllSubjectByExamId(examId: number) {
    return this.http.get(
      `${this.baseUrl}Exam/GetAllSubjectByExamId?examId=${examId}`
    );
  }

  getSubjectForEntry(
    classId: number,
    sectionId: number,
    examId: number,
    subjectId: number
  ) {
    return this.http.get(
      `${this.baseUrl}Exam/GetSubjectForEntry?classId=${classId}&sectionId=${sectionId}&examId=${examId}&subjectId=${subjectId}`
    );
  }

  addScholasticExamResult(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}Exam/AddScholasticExamResult`,
      payload
    );
  }
}
