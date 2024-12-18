import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatOptionModule } from "@angular/material/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "../../shared/shared.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
} from "@angular/material/dialog";
import { FeeRoutingModule } from "./fee-routing.module";
import { FeeAmountSlabComponent } from "./component/fee-amount-slab/fee-amount-slab.component";
import { FeeDepositComponent } from "./component/fee-deposit/fee-deposit.component";
import { FeeStructureComponent } from "./component/fee-structure/fee-structure.component";
import { FeeDiscountComponent } from "./component/fee-discount/fee-discount.component";
import { AddFeeStructureComponent } from "./component/add-fee-structure/add-fee-structure.component";
import { AddFeeAmountSlabComponent } from "./component/add-fee-amount-slab/add-fee-amount-slab.component";
import { AddFeeDepositComponent } from "./component/add-fee-deposit/add-fee-deposit.component";
import { AddFeeDiscountComponent } from "./component/add-fee-discount/add-fee-discount.component";

@NgModule({
  declarations: [
    FeeAmountSlabComponent,
    FeeDepositComponent,
    FeeStructureComponent,
    FeeDiscountComponent,
    AddFeeStructureComponent,
    AddFeeAmountSlabComponent,
    AddFeeDepositComponent,
    AddFeeDiscountComponent,
  ],
  imports: [
    SharedModule,
    FeeRoutingModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatDialogContent,
    MatNativeDateModule,
    MatDialogActions,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatChipsModule,
    CommonModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatMenuModule,
    MatPaginator,
  ],
})
export class FeeModule {}
