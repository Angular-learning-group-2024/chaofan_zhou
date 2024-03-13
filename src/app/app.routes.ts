import { Routes } from '@angular/router';
import { canReview } from './shared/guards/canReview';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'review/:id',
    canActivate: [canReview],
    loadComponent: () =>
      import('./pages/review/review.component').then((m) => m.ReviewComponent),
  },
  {
    path: 'finish',
    loadComponent: () =>
      import('./pages/summary/summary.component').then(
        (m) => m.SummaryComponent
      ),
  },
];
