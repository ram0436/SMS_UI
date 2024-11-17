import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentAttendanceComponent } from "./component/student-attendance/student-attendance.component";
import { StaffAttendanceComponent } from "./component/staff-attendance/staff-attendance.component";

const routes: Routes = [
  { path: "student-attendance", component: StudentAttendanceComponent },
  { path: "staff-attendance", component: StaffAttendanceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
