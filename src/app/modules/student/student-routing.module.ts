import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllStudentsComponent } from "./component/all-students/all-students.component";
import { StudentDetailsComponent } from "./component/student-details/student-details.component";

const routes: Routes = [
  { path: "all-students", component: AllStudentsComponent },
  { path: "view/:id", component: StudentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
