import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { RouterOutlet } from "@angular/router";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  showSidebar = true;
  title = "school-ui";
  constructor(private matIconReg: MatIconRegistry, private router: Router) {}

  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass("material-symbols-outlined");
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.showSidebar = !(url.includes("/user") || url.includes("/admin"));
      });
  }
}
