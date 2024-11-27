import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddMarksheetComponent } from "../add-marksheet/add-marksheet.component";
import { MasterService } from "../../../service/master.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { TeacherService } from "../../../teacher/service/teacher.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-all-marksheet",
  templateUrl: "./all-marksheet.component.html",
  styleUrl: "./all-marksheet.component.css",
})
export class AllMarksheetComponent {}
