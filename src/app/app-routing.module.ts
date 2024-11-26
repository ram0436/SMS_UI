import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./modules/home/home.component";
import { AuthGuard } from "./modules/auth/authguard/authguard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "admin",
    loadChildren: () =>
      import("./modules/admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: "user",
    loadChildren: () =>
      import("./modules/user/user.module").then((m) => m.UserModule),
    // canActivate: [AuthGuard],
  },
  {
    path: "student",
    loadChildren: () =>
      import("./modules/student/student.module").then((m) => m.StudentModule),
  },
  {
    path: "teacher",
    loadChildren: () =>
      import("./modules/teacher/teacher.module").then((m) => m.TeacherModule),
  },
  {
    path: "staff",
    loadChildren: () =>
      import("./modules/staff/staff.module").then((m) => m.StaffModule),
  },
  {
    path: "attendance",
    loadChildren: () =>
      import("./modules/attendance/attendance.module").then(
        (m) => m.AttendanceModule
      ),
  },
  {
    path: "exam",
    loadChildren: () =>
      import("./modules/exam/exam.module").then((m) => m.ExamModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
