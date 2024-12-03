import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class FeeService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.baseUrl;

  getFeeAmountSlab() {
    return this.http.get(`${this.baseUrl}Fee/GetFeeAmountSlab`);
  }

  getFeeDiscount() {
    return this.http.get(`${this.baseUrl}Fee/GetFeeDiscount`);
  }

  getFeeModes() {
    return this.http.get(`${this.baseUrl}Fee/GetFeeModes`);
  }

  getMasterFeeStructure() {
    return this.http.get(`${this.baseUrl}Fee/GetMasterFeeStructure`);
  }

  addMasterFeeStructure(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Fee/AddMasterFeeStructure`, payload);
  }

  addClassFeeMapping(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Fee/AddClassFeeMapping`, payload);
  }

  addFeeDeposite(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Fee/AddFeeDeposite`, payload);
  }
}
