import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-ui-avatar',
  imports: [],
  standalone: true,
  templateUrl: './ui-avatar.html',
  styleUrl: './ui-avatar.css'
})
export class UiAvatar {
   @Input() initials = '';
  @Input() src = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}