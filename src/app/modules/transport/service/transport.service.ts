import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class TransportService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  addVehicle(payload: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}Transport/AddVehicle`, payload);
  }

  addVehicleRoute(payload: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}Transport/AddVehicleRoute`,
      payload
    );
  }

  addVehicleRouteMapping(payload: any): Observable<any> {
    return this.httpClient.post(
      `${this.baseUrl}Transport/AddVehicleRouteMapping`,
      payload
    );
  }

  getVehicleTypes() {
    return this.httpClient.get(`${this.baseUrl}Transport/GetVehicleTypes`);
  }

  getVehicles() {
    return this.httpClient.get(`${this.baseUrl}Transport/GetVehicles`);
  }

  getVehiclesRoute() {
    return this.httpClient.get(`${this.baseUrl}Transport/GetVehiclesRoute`);
  }

  getVehiclesNameList() {
    return this.httpClient.get(`${this.baseUrl}Transport/GetVehiclesNameList`);
  }

  getVehiclesRootList() {
    return this.httpClient.get(`${this.baseUrl}Transport/GetVehicleRootList`);
  }

  getVehiclesRootMapping() {
    return this.httpClient.get(
      `${this.baseUrl}Transport/GetVehicleRootMapping`
    );
  }
}
