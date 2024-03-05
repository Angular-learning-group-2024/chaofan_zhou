import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SwiperComponent } from '../../components/swiper/swiper.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    SwiperComponent,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormField,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  constructor(private router: Router) {}

  rejectReason = '';
  showRejectContent = false;
  reviewSummary = {
    accept: 3,
    reject: 5,
  };

  cancel() {
    this.router.navigate(['']);
  }

  accept() {}

  reject() {
    this.showRejectContent = true;
    this.rejectReason = '';
  }

  finish() {
    const { accept, reject } = this.reviewSummary;
    this.router.navigate(['/finish'], { queryParams: { accept, reject } });
  }
}
