import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  menuItems = [
    { name: "Dashboard", icon: "dashboard", hasDropdown: false },
    {
      name: "Teachers",
      icon: "school",
      hasDropdown: true,
      subItems: [
        { name: "All Teachers", icon: "menu" },
        { name: "Passed", icon: "school" },
      ],
      dropdownOpen: false,
    },
    {
      name: "Students",
      icon: "groups",
      hasDropdown: true,
      subItems: [
        { name: "All Students", icon: "menu" },
        { name: "Passed", icon: "school" },
      ],
      dropdownOpen: false,
    },
    { name: "Employees", icon: "work", hasDropdown: false },
    { name: "Parents", icon: "family_restroom", hasDropdown: false },
    { name: "Home Works", icon: "edit_note", hasDropdown: false },
    { name: "Incomes", icon: "attach_money", hasDropdown: false },
  ];

  selectedItem: any = null;
  selectedSubItem: any = null;

  constructor(private router: Router) {}

  selectItem(item: any) {
    if (item.hasDropdown) {
      item.dropdownOpen = !item.dropdownOpen;
      this.selectedItem = item;
    } else {
      this.selectedItem = item;
    }
  }

  selectSubItem(event: Event, subItem: any, item: any) {
    event.stopPropagation();
    this.selectedItem = item;
    this.selectedSubItem = subItem;

    if (subItem.name === "All Students") {
      this.router.navigate(["student/all-students"]);
    } else if (subItem.name === "All Teachers") {
      this.router.navigate(["teacher/all-teachers"]);
    }
  }
}
