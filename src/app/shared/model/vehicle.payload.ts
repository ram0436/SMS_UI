export class Vehicle {
  createdBy: number = 0;
  createdOn: string = new Date().toISOString();
  modifiedBy: number = 0;
  modifiedOn: string = new Date().toISOString();
  id: number = 0;
  vehicleTypeId: number = 0;
  vehicleRegNo: string = "";
  noOfSeats: string = "";
  driverName: string = "";
  driverMobile: string = "";
  driverAadhar: string = "";
  driverAddress: string = "";
  remark: string = "";
}
