import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllMarksheetComponent } from "./component/all-marksheet/all-marksheet.component";
import { AddMarksheetComponent } from "./component/add-marksheet/add-marksheet.component";
import { CoscholosticExamComponent } from "./component/coscholostic-exam/coscholostic-exam.component";
import { DisciplineActivityComponent } from "./component/discipline-activity/discipline-activity.component";
import { ScholosticExamComponent } from "./component/scholostic-exam/scholostic-exam.component";

const routes: Routes = [
  { path: "scholastic", component: ScholosticExamComponent },
  { path: "co-scholastic", component: CoscholosticExamComponent },
  { path: "discipline", component: DisciplineActivityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
