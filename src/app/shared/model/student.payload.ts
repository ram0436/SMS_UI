export class Student {
  // Metadata
  createdBy: number = 0;
  createdOn: string = new Date().toISOString();
  modifiedBy: number = 0;
  modifiedOn: string = new Date().toISOString();
  id: number = 0;
  tableRefGuid: string = "";

  // Personal Information
  firstName: string = "";
  lastName: string = "";
  mobileNo: string = "";
  alternateNo: string = "";
  whatsAppNo: string = "";
  email: string = "";
  gender: string = "";
  bloodGroup: string = "";
  height: string = "";
  weight: string = "";
  dob: string = new Date().toISOString();
  dobCertificateNo: string = "";
  dobCertificateImageURL: string = "";

  // Aadhar Card Details
  studentAadharCard: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    adharCardNo: string;
    aadharCardImageURL: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      adharCardNo: "",
      aadharCardImageURL: "",
    },
  ];

  // Admission Details
  studentAdmissionDetail: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    schoolBranchId: number;
    schoolSessionId: number;
    penNo: string;
    registrationNo: string;
    enrollmentNo: string;
    srNo: string;
    admissionNo: string;
    admissionDate: string;
    rollNo: string;
    classId: number;
    sectionId: number;
    streamId: number;
    educationMedium: string;
    studentImageURL: string;
    referredBy: number;
    isRTEStudent: boolean;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      schoolBranchId: 0,
      schoolSessionId: 0,
      penNo: "",
      registrationNo: "",
      enrollmentNo: "",
      srNo: "",
      admissionNo: "",
      admissionDate: new Date().toISOString(),
      rollNo: "",
      classId: 0,
      sectionId: 0,
      streamId: 0,
      educationMedium: "",
      studentImageURL: "",
      referredBy: 0,
      isRTEStudent: true,
    },
  ];

  // Bank Account Details
  studentBankAccountDetail: {
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

  // Father Details
  studentFatherDetail: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    name: string;
    qualificationId: number;
    occupationId: number;
    residentialAddress: string;
    officialAddress: string;
    annualIncome: string;
    email: string;
    mobileNo: string;
    aadharNo: string;
    fatherImageURL: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      name: "",
      qualificationId: 0,
      occupationId: 0,
      residentialAddress: "",
      officialAddress: "",
      annualIncome: "",
      email: "",
      mobileNo: "",
      aadharNo: "",
      fatherImageURL: "",
    },
  ];

  // Guardian Details
  studentGuardianDetail: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    name: string;
    qualificationId: number;
    occupationId: number;
    residentialAddress: string;
    officialAddress: string;
    annualIncome: string;
    email: string;
    mobileNo: string;
    aadharNo: string;
    guardianImageURL: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      name: "",
      qualificationId: 0,
      occupationId: 0,
      residentialAddress: "",
      officialAddress: "",
      annualIncome: "",
      email: "",
      mobileNo: "",
      aadharNo: "",
      guardianImageURL: "",
    },
  ];

  // Last School Details
  studentLastSchoolDetail: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    schoolName: string;
    schoolCode: string;
    address: string;
    attendentClass: string;
    affiliatedTo: string;
    lastSession: string;
    isDropout: boolean;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      schoolName: "",
      schoolCode: "",
      address: "",
      attendentClass: "",
      affiliatedTo: "",
      lastSession: "",
      isDropout: true,
    },
  ];

  // Mother Details
  studentMotherDetail: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    name: string;
    qualificationId: number;
    occupationId: number;
    residentialAddress: string;
    officialAddress: string;
    annualIncome: string;
    email: string;
    mobileNo: string;
    aadharNo: string;
    motherImageURL: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      name: "",
      qualificationId: 0,
      occupationId: 0,
      residentialAddress: "",
      officialAddress: "",
      annualIncome: "",
      email: "",
      mobileNo: "",
      aadharNo: "",
      motherImageURL: "",
    },
  ];

  // Permanent Address
  studentPermanentAddress: {
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
  studentTemporaryAddress: {
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
  studentPreviousQualification: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    qualification: string;
    passingYear: string;
    rollNo: string;
    percent: string;
    subject: string;
    schoolName: string;
    schoolCode: string;
    boardName: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      qualification: "",
      passingYear: new Date().toISOString(),
      rollNo: "",
      percent: "",
      subject: "",
      schoolName: "",
      schoolCode: "",
      boardName: "",
    },
  ];

  // Religion and Cast Category
  studentReligionAndCastCategory: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    nationality: string;
    religion: string;
    category: string;
    caste: string;
    casteCertificateImageURL: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      nationality: "",
      religion: "",
      category: "",
      caste: "",
      casteCertificateImageURL: "",
    },
  ];

  studentTransferCertificate: {
    createdBy: number;
    createdOn: string;
    modifiedBy: number;
    modifiedOn: string;
    id: number;
    certificateNo: string;
    dateOfIssue: string;
    certificateImageURL: string;
  }[] = [
    {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      certificateNo: "",
      dateOfIssue: "",
      certificateImageURL: "",
    },
  ];
}
