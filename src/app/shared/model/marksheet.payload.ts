export class Marksheet {
  // Metadata
  createdBy: number = 0;
  createdOn: string = new Date().toISOString();
  modifiedBy: number = 0;
  modifiedOn: string = new Date().toISOString();
  id: number = 0;
  tableRefGuid: string = "";

  employeeId: string = "";
  staffCategoryId: number = 0;
  joiningDate: string = new Date().toISOString();
  profilePicURL: string = "";

  // Personal Information
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  mobileNo: string = "";
  whatsAppNo: string = "";
  alternateMobileNo: string = "";

  gender: string = "";
  dob: string = new Date().toISOString();

  maritalStatus: string = "";
  spouseName: string = "";
  fatherName: string = "";
  nationality: string = "";
  religion: string = "";
  castCategory: string = "";
  aadharNo: string = "";
  designationId: number = 0;
  departmentId: number = 0;
}
