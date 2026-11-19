import { ActivatedRoute, provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { SectionPage } from './section-page';

async function createPage(pageKey: string) {
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
              title: pageKey === 'tasks' ? 'Task Manager' : 'Reports',
              description: 'Demo page description.',
            },
            paramMap: { get: () => '1' },
          },
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
});
