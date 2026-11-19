import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the dashboard', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/dashboard');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.dashboard-heading h1')?.textContent).toContain('Good morning');
    expect(compiled.querySelector('.medication-summary')?.textContent).toContain('2');
    expect(compiled.querySelector('.medication-list')?.textContent).toContain('Lisinopril');
    expect(compiled.querySelector('.medication-list a')?.getAttribute('href')).toBe('/emar/1/med-pass');
    expect(compiled.querySelectorAll('app-medications .medication-row')).toHaveLength(4);
    expect(compiled.querySelectorAll('app-residents .resident')).toHaveLength(4);
    expect(compiled.querySelector('app-residents a[href="/residents"]')).toBeTruthy();
  });

  it('should link each topbar resident avatar to that resident MAR', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/dashboard');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const residentLinks = compiled.querySelectorAll('.resident-avatar-stack a');
    expect(residentLinks.length).toBe(5);
    expect(residentLinks[0].getAttribute('href')).toBe('/emar/1/med-log');
    expect(residentLinks[1].getAttribute('href')).toBe('/emar/2/med-log');
    expect(residentLinks[1].getAttribute('aria-label')).toBe('Open Robert Williams MAR');

    (residentLinks[0] as HTMLAnchorElement).click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Mary Johnson');

    (residentLinks[1] as HTMLAnchorElement).click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(router.url).toBe('/emar/2/med-log');
    const content = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(content).toContain('Robert Williams');
    expect(content).toContain('Aspirin · 81 mg');
    expect(content).not.toContain('Mary Johnson');
  });

  it('should update the MAR content when navigating between resident IDs', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/emar/1/med-log');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Mary Johnson');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Calcium · 500 mg');

    await router.navigateByUrl('/emar/2/med-log');
    fixture.detectChanges();
    const content = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(content).toContain('Robert Williams');
    expect(content).toContain('Aspirin · 81 mg');
    expect(content).not.toContain('Mary Johnson');
  });

  it('should render populated reports content', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/reports');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Reports');
    expect(compiled.querySelector('.metric-grid')?.textContent).toContain('Reports ready');
    expect(compiled.textContent).not.toContain('This section is ready for content');
  });

  it('should route to Admin Ops from the workspace', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/admin-ops');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Admin Ops');
    expect(compiled.textContent).toContain('Staff credential renewals');
  });

  it('should route to Staff Management and Role Management under Admin Ops', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/admin-ops/staff');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent)
      .toContain('Staff Management');

    await router.navigateByUrl('/admin-ops/roles');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent)
      .toContain('Role Management');
  });

  it('should place Admin Ops in the Manage Facility dropdown', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/dashboard');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector('.facility-nav-toggle') as HTMLButtonElement;

    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    toggle.click();
    fixture.detectChanges();
    expect(compiled.querySelector('.facility-submenu a')?.textContent).toContain('Admin Ops');
    expect(compiled.querySelector('.admin-ops-submenu')?.textContent).toContain('Staff Management');
    expect(compiled.querySelector('.admin-ops-submenu')?.textContent).toContain('Role Management');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });
});
