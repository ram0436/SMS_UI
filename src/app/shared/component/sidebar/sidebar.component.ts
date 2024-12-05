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
      name: "Admission Enquiry",
      icon: "person_raised_hand",
      hasDropdown: false,
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
      name: "Attendance",
      icon: "edit_calendar",
      hasDropdown: true,
      subItems: [
        { name: "Student Attendance", icon: "user_attributes" },
        { name: "Staff Attendance", icon: "engineering" },
      ],
      dropdownOpen: false,
    },

    {
      name: "Fees",
      icon: "receipt_long",
      hasDropdown: true,
      subItems: [
        { name: "Fee Structure", icon: "flowsheet" },
        { name: "Fee Amount Slab", icon: "slab_serif" },
        { name: "Fee Discount", icon: "percent" },
        { name: "Fee Deposit", icon: "receipt" },
      ],
      dropdownOpen: false,
    },
    {
      name: "Exam",
      icon: "note_add",
      hasDropdown: true,
      subItems: [
        { name: "Scholastic", icon: "history_edu" },
        { name: "Co-Scholastic", icon: "sprint" },
        { name: "Discipline", icon: "man" },
        { name: "Report Card", icon: "contract" },
      ],
      dropdownOpen: false,
    },
    { name: "Transport", icon: "directions_bus", hasDropdown: false },
    {
      name: "Miscellaneous",
      icon: "mist",
      hasDropdown: true,
      subItems: [
        { name: "ID Card", icon: "id_card" },
        { name: "Admit Card", icon: "badge" },
        { name: "Transfer Certificate", icon: "article" },
        { name: "Character Certificate", icon: "demography" },
        { name: "DOB Certificate", icon: "person_book" },
      ],
      dropdownOpen: false,
    },
    { name: "Masters", icon: "supervisor_account", hasDropdown: false },
    { name: "Settings", icon: "settings", hasDropdown: false },
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
    } else if (subItem.name === "Scholastic") {
      this.router.navigate(["exam/scholastic"]);
    } else if (subItem.name === "Co-Scholastic") {
      this.router.navigate(["exam/co-scholastic"]);
    } else if (subItem.name === "Discipline") {
      this.router.navigate(["exam/discipline"]);
    } else if (subItem.name === "Fee Structure") {
      this.router.navigate(["fee/fee-structure"]);
    } else if (subItem.name === "Fee Amount Slab") {
      this.router.navigate(["fee/fee-amount-slab"]);
    } else if (subItem.name === "Fee Deposit") {
      this.router.navigate(["fee/fee-deposit"]);
    } else if (subItem.name === "Fee Discount") {
      this.router.navigate(["fee/fee-discount"]);
    } else if (subItem.name === "Report Card") {
      this.router.navigate(["exam/report-card"]);
    }
  }
}
