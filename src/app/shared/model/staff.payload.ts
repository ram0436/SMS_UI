export class Staff {
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

  // Aadhar Card Details
  staffExperience: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    lastOrganisation: string;
    lastJobPosition: string;
    yearsOfExperience: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      lastOrganisation: "",
      lastJobPosition: "",
      yearsOfExperience: "",
    },
  ];

  // Bank Account Details
  staffBankAccountDetail: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    bankName: string;
    branchName: string;
    ifscCode: string;
    accountNo: string;
    panNo: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      bankName: "",
      branchName: "",
      ifscCode: "",
      accountNo: "",
      panNo: "",
    },
  ];

  // Permanent Address
  staffPermanentAddress: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      address: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    },
  ];

  // Temporary Address
  staffTemporaryAddress: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      address: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    },
  ];

  // Previous Qualifications
  staffQualification: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    qualification: string;
    passingYear: string;
    college: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      qualification: "",
      passingYear: new Date().toISOString(),
      college: "",
    },
  ];
}
