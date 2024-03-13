import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-location.component.html',
  styleUrl: './user-location.component.scss'
})
export class UserLocationComponent {
  @Input('size') size: string = 'default'
  @Input('date') date!: number
  @Input('region') region!: string
}
