import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllTeachersComponent } from "./component/all-teachers/all-teachers.component";
import { TeacherDetailsComponent } from "./component/teacher-details/teacher-details.component";

const routes: Routes = [
  { path: "all-teachers", component: AllTeachersComponent },
  { path: "view/:id", component: TeacherDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
