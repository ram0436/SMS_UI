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
        { name: "Alumni", icon: "school" },
      ],
      dropdownOpen: false,
    },
    {
      name: "Staff",
      icon: "person_play",
      hasDropdown: true,
      subItems: [{ name: "All Staff", icon: "menu" }],
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
    {
      name: "Attendance",
      icon: "edit_calendar",
      hasDropdown: true,
      subItems: [
        { name: "Student Attendance", icon: "user_attributes" },
        { name: "Staff Attendance", icon: "engineering" },
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
    } else if (subItem.name === "Student Attendance") {
      this.router.navigate(["attendance/student-attendance"]);
    } else if (subItem.name === "Staff Attendance") {
      this.router.navigate(["attendance/staff-attendance"]);
    } else if (subItem.name === "All Staff") {
      this.router.navigate(["staff/all-staff"]);
    }
  }
}
