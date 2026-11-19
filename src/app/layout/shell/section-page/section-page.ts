import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UiCard } from '../../../shared/components/ui-card/ui-card';
import { UiAvatar } from '../../../shared/components/ui-avatar/ui-avatar';
import { DEMO_RESIDENTS } from '../../../shared/data/demo-residents';
import { createSectionPageContent } from './section-page.data';
import type { PageRecord, SectionPageKey } from './section-page.data';

const PAGE_KEYS: readonly SectionPageKey[] = [
  'facility',
  'adminOps',
  'staffManagement',
  'roleManagement',
  'residents',
  'emar',
  'medPass',
  'medLog',
  'residentNotes',
  'residentTasks',
  'tasks',
  'formBuilder',
  'fax',
  'reports',
  'resources',
  'gettingStarted',
  'notFound',
];

function getPageKey(value: unknown): SectionPageKey {
  return PAGE_KEYS.find((key) => key === value) ?? 'notFound';
}

@Component({
  selector: 'app-section-page',
  imports: [RouterLink, UiAvatar, UiCard],
  templateUrl: './section-page.html',
  styleUrl: './section-page.css',
})
export class SectionPage {
  private readonly route = inject(ActivatedRoute);
  private readonly routeParamMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly pageKey = getPageKey(this.route.snapshot.data['pageKey']);
  readonly title = String(this.route.snapshot.data['title'] ?? 'Workspace');
  readonly description = String(this.route.snapshot.data['description'] ?? '');
  readonly currentResident = computed(
    () =>
      DEMO_RESIDENTS.find((resident) => resident.id === Number(this.routeParamMap().get('residentId'))) ??
      DEMO_RESIDENTS[0],
  );
  readonly residents = DEMO_RESIDENTS;
  readonly showResidentContext = [
    'residentNotes',
    'residentTasks',
    'medPass',
    'medLog',
  ].includes(this.pageKey);
  readonly content = computed(() => createSectionPageContent(this.pageKey, this.currentResident()));

  records: PageRecord[] = this.content().records.map((record) => ({ ...record }));
  searchQuery = '';
  selectedStatus = 'all';

  constructor() {
    effect(() => {
      this.records = this.content().records.map((record) => ({ ...record }));
      this.searchQuery = '';
      this.selectedStatus = 'all';
    });
  }

  get statusOptions(): string[] {
    return [...new Set(this.records.map((record) => record.status))];
  }

  get visibleRecords(): PageRecord[] {
    const query = this.searchQuery.trim().toLowerCase();

    return this.records.filter((record) => {
      const matchesQuery =
        !query ||
        `${record.title} ${record.detail} ${record.meta} ${record.status}`
          .toLowerCase()
          .includes(query);
      const matchesStatus = this.selectedStatus === 'all' || record.status === this.selectedStatus;
      return matchesQuery && matchesStatus;
    });
  }

  updateSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchQuery = event.target.value;
    }
  }

  updateStatus(event: Event): void {
    if (event.target instanceof HTMLSelectElement) {
      this.selectedStatus = event.target.value;
    }
  }

  toggleRecord(recordId: string): void {
    this.records = this.records.map((record) => {
      if (record.id !== recordId || record.done === undefined) {
        return record;
      }

      const done = !record.done;
      return {
        ...record,
        done,
        status: done ? 'Completed' : (record.incompleteStatus ?? 'Scheduled'),
        tone: done ? 'success' : (record.incompleteTone ?? 'neutral'),
      };
    });
  }
}
