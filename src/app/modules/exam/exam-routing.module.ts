import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllMarksheetComponent } from "./component/all-marksheet/all-marksheet.component";
import { AddMarksheetComponent } from "./component/add-marksheet/add-marksheet.component";

const routes: Routes = [
  { path: "all-marksheets", component: AllMarksheetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
