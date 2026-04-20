import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const auth = inject(AuthService);

  if (typeof window === 'undefined') return false;

  const token = auth.getToken();

  if (!token) {
    router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  const roles = route.data?.['roles'] as string[] | undefined;
  const userRole = auth.role?.toLowerCase() || '';

  if (roles && !roles.map(r => r.toLowerCase()).includes(userRole)) {
    router.navigate(['/un-authorized']);
    return false;
  }

  return true;
};