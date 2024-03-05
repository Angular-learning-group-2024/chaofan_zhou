import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface ReviewSummary {
  accept: number;
  reject: number;
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.reviewSummary = queryParams as ReviewSummary;
    });
  }

  reviewSummary = { accept: 0, reject: 0 };

  get totalNumber() {
    const { accept, reject } = this.reviewSummary;
    return Number(accept) + Number(reject);
  }

  confirm() {
    this.router.navigate(['/'])
  }
}
