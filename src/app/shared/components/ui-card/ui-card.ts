import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  imports: [],
  templateUrl: './ui-card.html',
  styleUrl: './ui-card.css'
})
export class UiCard {
  title = input('');
  subtitle = input('');
}