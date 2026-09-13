import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../app/services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  const token = authService.getToken();

  const cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Uses the same logout() the rest of the app already relies on —
        // this keeps "what logout means" defined in exactly one place,
        // instead of the interceptor having its own separate idea of it.
        authService.logout();
        router.navigate(['/login']);
      } else if (error.status === 500) {
        toastr.error('Something went wrong on our end. Please try again.');
      }

      return throwError(() => error);
    })
  );
};