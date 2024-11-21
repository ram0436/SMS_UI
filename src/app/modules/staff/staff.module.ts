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
import { StaffRoutingModule } from "./staff-routing.module";
import { AddStaffComponent } from "./component/add-staff/add-staff.component";
import { AllStaffComponent } from "./component/all-staff/all-staff.component";

@NgModule({
  declarations: [AddStaffComponent, AllStaffComponent],
  imports: [
    SharedModule,
    StaffRoutingModule,
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
export class StaffModule {}
