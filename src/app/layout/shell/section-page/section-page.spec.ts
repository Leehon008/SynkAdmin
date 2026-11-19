import { ActivatedRoute, provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SectionPage } from './section-page';

async function createPage(pageKey: string, residentId = '1') {
  await TestBed.configureTestingModule({
    imports: [SectionPage],
    providers: [
      provideRouter([]),
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: {
              pageKey,
              title: pageKey === 'tasks' ? 'Task Manager' : pageKey === 'medLog' ? 'Medication Log' : 'Reports',
              description: 'Demo page description.',
            },
            paramMap: { get: () => residentId },
          },
          paramMap: of({ get: () => residentId }),
        },
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(SectionPage);
  fixture.detectChanges();
  return fixture;
}

describe('SectionPage', () => {
  it('renders searchable report content', async () => {
    const fixture = await createPage('reports');
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('.record-row').length).toBe(4);
    const search = element.querySelector('input[type="search"]') as HTMLInputElement;
    search.value = 'Resident census';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(element.querySelectorAll('.record-row').length).toBe(1);
    expect(element.querySelector('.record-row')?.textContent).toContain('Resident census');
  });

  it('updates task completion in the demo view', async () => {
    const fixture = await createPage('tasks');
    const element = fixture.nativeElement as HTMLElement;
    const row = Array.from(element.querySelectorAll('.record-row')).find((item) =>
      item.textContent?.includes('Confirm appointment transport'),
    );
    const checkbox = row?.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(row?.textContent).toContain('Due soon');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(row?.textContent).toContain('Completed');
  });

  it('shows individual eMAR entries and links each resident to their MAR', async () => {
    const fixture = await createPage('emar');
    const element = fixture.nativeElement as HTMLElement;
    const residentLinks = element.querySelectorAll('.emar-resident-stack a');

    expect(element.querySelectorAll('.record-row').length).toBe(12);
    expect(residentLinks.length).toBe(6);
    expect(residentLinks[1].getAttribute('href')).toBe('/emar/2/med-log');
    expect(residentLinks[1].getAttribute('aria-label')).toBe('Open Robert Williams MAR');
  });

  it('shows the selected resident’s own administration history', async () => {
    const fixture = await createPage('medLog', '2');
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Medication Log');
    expect(element.textContent).toContain('Robert Williams');
    expect(element.textContent).toContain('Aspirin · 81 mg');
    expect(element.textContent).not.toContain('Mary Johnson');
  });
});
