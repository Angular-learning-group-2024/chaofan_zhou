import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { USER_TOKEN } from '../../constants';
import { AuthService } from '@auth0/auth0-angular';

export const isLogin: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const code = route.queryParams['code'];
  const auth: AuthService = inject(AuthService);
  
  if (code) { 
    localStorage.setItem(USER_TOKEN, code);
  }

  const token = localStorage.getItem(USER_TOKEN);

  if (!token) {
    auth.loginWithRedirect();
  }

  return true;
};
