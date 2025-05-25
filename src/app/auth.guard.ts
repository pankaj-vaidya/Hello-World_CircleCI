import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject Router to navigate if the user is not logged in
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    // Redirect to login if the user is not logged in
    router.navigate(['/login']);
    return false;
  }
};
