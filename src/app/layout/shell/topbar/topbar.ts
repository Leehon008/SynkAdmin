import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  facilityName = 'Adult Facility AFH';
  isUserMenuOpen = false;
  isFacilityMenuOpen = false;

  readonly facilities = [
    { name: 'Adult Facility AFH', location: 'Seattle, WA', residents: 6 },
    { name: 'Maple Grove Care Home', location: 'Bellevue, WA', residents: 8 },
    { name: 'Evergreen Senior Living', location: 'Redmond, WA', residents: 12 },
  ];

  readonly residentAvatars = [
    { name: 'Mary Johnson', initials: 'MJ' },
    { name: 'Robert Williams', initials: 'RW' },
    { name: 'Patricia Brown', initials: 'PB' },
    { name: 'James Davis', initials: 'JD' },
  ];

  toggleFacilityMenu(): void {
    this.isFacilityMenuOpen = !this.isFacilityMenuOpen;
    this.isUserMenuOpen = false;
  }

  selectFacility(name: string): void {
    this.facilityName = name;
    this.isFacilityMenuOpen = false;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    this.isFacilityMenuOpen = false;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  closeMenus(): void {
    this.isUserMenuOpen = false;
    this.isFacilityMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.user-dropdown')) {
      this.closeUserMenu();
    }
    if (!target?.closest('.facility-dropdown')) {
      this.isFacilityMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMenus();
  }
}
