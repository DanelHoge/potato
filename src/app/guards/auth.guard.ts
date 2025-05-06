import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStore } from '../stores/app.store';

export const authGuard: CanActivateFn = () => {
  const store = inject(AppStore);
  const router = inject(Router);

  const isLoggedIn = store.loggedIn();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
