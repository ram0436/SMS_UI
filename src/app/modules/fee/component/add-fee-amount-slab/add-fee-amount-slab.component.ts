import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { MasterService } from "../../../service/master.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { FeeService } from "../../service/fee.service";

@Component({
  selector: "app-add-fee-amount-slab",
  templateUrl: "./add-fee-amount-slab.component.html",
  styleUrl: "./add-fee-amount-slab.component.css",
})
export class AddFeeAmountSlabComponent {
  classes: any[] = [];
  feeModes: any[] = [];
  feeStructures: any[] = [];
  structures: any[] = [];
  months: any[] = [];
  selectedClassId: number = 0;
  feeStructure: String = "";

  isLoading: boolean = true;

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
    this.subscriptions.add(this.getMasterFeeStructure());
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

  getMasterFeeStructure() {
    this.structures = [];
    this.feeService.getMasterFeeStructure().subscribe(
      (data: any) => {
        this.structures = data.map((structure: any) => ({
          ...structure,
          feeAmount: 0,
          feeModeId: 0,
          linkedMonthId: 0,
        }));

        this.isLoading = false;
      },
      (error) => {}
    );
  }

  getAllClasses() {
    this.masterService.getAllClass().subscribe((data: any) => {
      this.classes = data;
    });
  }

  onClassSelected(classId: number) {
    this.selectedClassId = classId;
  }

  addFeeAmountSlab(): void {
    // Ensure required fields are filled
    if (!this.selectedClassId || this.structures.length === 0) {
      this.showNotification("Please fill in all fields.");
      return;
    }

    // Construct feeStructureList payload
    const feeStructureList = this.structures.map((structure) => ({
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      name: structure.name || "",
      feeAmount: structure.feeAmount || 0,
      feeModeId: structure.feeModeId || 0,
      linkedMonthId: structure.linkedMonthId || 0,
    }));

    // Construct the final payload
    const payload = [
      {
        createdBy: 0,
        createdOn: new Date().toISOString(),
        modifiedBy: 0,
        modifiedOn: new Date().toISOString(),
        id: 0,
        classId: this.selectedClassId,
        feeStructureList,
      },
    ];

    console.log(JSON.stringify(payload, null, 2));

    // Call the API
    this.feeService.addClassFeeMapping(payload).subscribe(
      (response) => {
        this.showNotification("Fee amount slab added successfully!");
      },
      (error) => {}
    );
  }

  showNotification(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
