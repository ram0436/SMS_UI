import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { MasterService } from "../../../service/master.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { FeeService } from "../../service/fee.service";

@Component({
  selector: "app-add-fee-deposit",
  templateUrl: "./add-fee-deposit.component.html",
  styleUrl: "./add-fee-deposit.component.css",
})
export class AddFeeDepositComponent {
  // Inputs
  admissionNo: string = "";
  rollNo: number = 0;
  studentName: string = "";
  monthId: number = 0;
  oldBalance: number = 0;
  tutionFee: number = 0;
  lateFee: number = 0;
  concession: number = 0;
  receivedAmount: number = 0;
  remark: string = "";

  // Calculated fields
  totalAmount: number = 0;
  grantTotal: number = 0;
  balance: number = 0;

  // Other properties...
  selectedPaymentModeId: number = 0;
  selectedClassId: number = 0;
  selectedSectionId: number = 0;

  classes: any[] = [];
  sections: any[] = [];
  feeModes: any[] = [];
  months: any[] = [];
  feeStructures: any[] = [];
  structures: any[] = [];
  feeStructure: String = "";

  isLoading: boolean = false;

  // Define columns for the table
  displayedColumns: string[] = ["srNo", "structure", "feeMode", "action"];

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private masterService: MasterService,
    private snackBar: MatSnackBar,
    private feeService: FeeService
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.getAllClasses());
    this.subscriptions.add(this.getFeeModes());
    this.subscriptions.add(this.getMonths());
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  getFeeModes() {
    this.feeService.getFeeModes().subscribe((data: any) => {
      this.feeModes = data;
    });
  }

  getMonths() {
    this.masterService.getMonths().subscribe((data: any) => {
      this.months = data;
    });
  }

  getFeeModeName(feeModeId: number): string {
    const feeMode = this.feeModes.find((mode) => mode.id === feeModeId);
    return feeMode ? feeMode.name : "Unknown Fee Mode";
  }

  // getMasterFeeStructure() {
  //   this.structures = [];
  //   this.feeService.getMasterFeeStructure().subscribe(
  //     (data: any) => {
  //       this.structures = data.map((structure: any) => ({
  //         ...structure,
  //         feeAmount: 0,
  //         feeModeId: 0,
  //         linkedMonthId: 0,
  //       }));

  //       this.isLoading = false;
  //     },
  //     (error) => {}
  //   );
  // }

  getAllClasses() {
    this.masterService.getAllClass().subscribe((data: any) => {
      this.classes = data;
    });
  }

  onClassSelected(classId: number) {
    this.selectedClassId = classId;
    this.loadSections(classId);
  }

  loadSections(classId: number) {
    this.masterService.getSectionByClassId(classId).subscribe((data: any) => {
      this.sections = data;
    });
  }

  // Add Fee Deposit Logic
  addFeeDeposit(): void {
    // Ensure required fields are filled
    if (
      !this.admissionNo ||
      !this.selectedClassId ||
      !this.selectedSectionId ||
      !this.rollNo ||
      !this.studentName ||
      !this.selectedPaymentModeId ||
      !this.monthId ||
      !this.receivedAmount
    ) {
      this.showNotification("Please fill in all required fields.");
      return;
    }

    this.updateCalculations();

    // Construct payload
    const payload = {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      admissionNo: this.admissionNo,
      classId: this.selectedClassId,
      sectionId: this.selectedSectionId,
      rollNo: this.rollNo,
      studentName: this.studentName,
      monthId: this.monthId,
      oldBalance: this.oldBalance,
      tutionFee: this.tutionFee,
      totalAmount: this.totalAmount,
      lateFee: this.lateFee,
      concession: this.concession,
      grantTotal: this.grantTotal,
      receivedAmount: this.receivedAmount,
      balance: this.balance,
      paymentModeId: this.selectedPaymentModeId,
      remark: this.remark,
    };

    // Call API
    this.feeService.addFeeDeposite(payload).subscribe(
      (response) => {
        this.showNotification("Fee deposit added successfully!");
      },
      (error) => {}
    );
  }

  // Method to recalculate values
  updateCalculations(): void {
    this.totalAmount =
      this.tutionFee + this.oldBalance + this.lateFee - this.concession;
    this.grantTotal = this.totalAmount;
    this.balance = this.grantTotal - this.receivedAmount;
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
