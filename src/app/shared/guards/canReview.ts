import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const canReview: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];
  const router: Router = inject(Router);

  if (!id) {
    return router.createUrlTree(['/']);
  }
  return true;
};
