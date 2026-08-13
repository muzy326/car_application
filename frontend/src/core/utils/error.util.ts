import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs';

export function handleApiError<T>(context: string): MonoTypeOperatorFunction<T> {
  return catchError(err => {
    console.error(`${context} failed:`, err);
    return throwError(() => err);
  });
}