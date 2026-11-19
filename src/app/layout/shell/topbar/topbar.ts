import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEMO_RESIDENTS } from '../../../shared/data/demo-residents';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink],
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

  readonly residentAvatars = DEMO_RESIDENTS.slice(0, 4);
  readonly hiddenResidentCount = DEMO_RESIDENTS.length - this.residentAvatars.length;

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
