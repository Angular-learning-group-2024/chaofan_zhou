import { Routes } from '@angular/router';
import { isLogin } from './shared/guards/isLogin';
import { canReview } from './shared/guards/canReview';

export const routes: Routes = [
  {
    path: '',
    canActivate: [isLogin],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'review/:id',
    canActivate: [isLogin, canReview],
    loadComponent: () =>
      import('./pages/review/review.component').then((m) => m.ReviewComponent),
  },
  {
    path: 'finish',
    canActivate: [isLogin],
    loadComponent: () =>
      import('./pages/summary/summary.component').then(
        (m) => m.SummaryComponent
      ),
  },
];
