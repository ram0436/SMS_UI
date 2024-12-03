import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { MasterService } from "../../../service/master.service";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { FeeService } from "../../service/fee.service";

@Component({
  selector: "app-add-fee-structure",
  templateUrl: "./add-fee-structure.component.html",
  styleUrl: "./add-fee-structure.component.css",
})
export class AddFeeStructureComponent {
  feeModes: any[] = [];
  feeStructures: any[] = [];
  structures: any[] = [];
  selectedFeeModeId: number = 0;
  feeStructure: String = "";

  isStructuresLoading: boolean = true;

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
    this.subscriptions.add(this.getFeeModes());
    // this.subscriptions.add(this.getFeeStructure());
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

  getFeeModeName(feeModeId: number): string {
    const feeMode = this.feeModes.find((mode) => mode.id === feeModeId);
    return feeMode ? feeMode.name : "Unknown Fee Mode";
  }

  onFeeModeSelected(feeModeId: number) {
    this.selectedFeeModeId = feeModeId;
  }

  // getFeeStructure() {
  //   this.structures = [];
  //   this.feeService.getFeeStructure().subscribe(
  //     (data: any) => {
  //       // Store the data in entrySubjects or a suitable variable
  //       this.structures = data;
  //       this.isStructuresLoading = false;
  //     },
  //     (error) => {}
  //   );
  // }

  addFeeStructure(): void {
    // Ensure required fields are filled
    if (!this.feeStructure.trim()) {
      this.showNotification("Please fill enter Structure Name.");
      return;
    }

    // Construct the payload
    const payload = {
      createdBy: 0,
      createdOn: new Date().toISOString(),
      modifiedBy: 0,
      modifiedOn: new Date().toISOString(),
      id: 0,
      name: this.feeStructure.trim(),
    };

    // Call the API
    this.feeService.addMasterFeeStructure(payload).subscribe(
      (response) => {
        this.showNotification("Fee structure added successfully!");
        this.feeStructure = ""; // Clear the input field
        this.selectedFeeModeId = 0; // Reset the selected fee mode
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
