import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UiCard } from '../../../shared/components/ui-card/ui-card';

@Component({
  selector: 'app-section-page',
  imports: [RouterLink, UiCard],
  templateUrl: './section-page.html',
  styleUrl: './section-page.css',
})
export class SectionPage {
  private readonly route = inject(ActivatedRoute);

  readonly title = String(this.route.snapshot.data['title'] ?? 'Workspace');
  readonly description = String(this.route.snapshot.data['description'] ?? '');
}
