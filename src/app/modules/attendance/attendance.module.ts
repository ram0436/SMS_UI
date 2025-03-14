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
import { AttendanceRoutingModule } from "./attendance-routing.module";
import { StudentAttendanceComponent } from "./component/student-attendance/student-attendance.component";
import { StaffAttendanceComponent } from "./component/staff-attendance/staff-attendance.component";
import { UpdateAttendanceComponent } from "./component/update-attendance/update-attendance.component";
import { UpdateStaffAttendanceComponent } from "./component/update-staff-attendance/update-staff-attendance.component";

@NgModule({
  declarations: [
    StudentAttendanceComponent,
    StaffAttendanceComponent,
    UpdateAttendanceComponent,
    UpdateStaffAttendanceComponent,
  ],
  imports: [
    SharedModule,
    AttendanceRoutingModule,
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
export class AttendanceModule {}
