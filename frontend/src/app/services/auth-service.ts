import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { handleApiError } from '../../core/utils/error.util';
import { STORAGE_KEYS } from '../../core/constants/storage-keys.const';
import { AuthResponseModel } from '../../core/models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // ---------------- LOGIN ----------------
  login(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res: AuthResponseModel) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.TOKEN, res.token || '');
          localStorage.setItem(STORAGE_KEYS.NAME, res.user?.name || '');
          localStorage.setItem(STORAGE_KEYS.ROLE, res.user?.role || '');
          localStorage.setItem(STORAGE_KEYS.USER_ID, res.user?.id?.toString() || '');
        }
      }),
      handleApiError('Login')
    );
  }

  // ---------------- REGISTER ----------------
  register(user: { firstname: string; lastname: string; phonenumber: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user)
      .pipe(handleApiError('Register'));
  }

  // ---------------- LOGOUT ----------------
  logout(): void {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    }
  }

  // ---------------- GETTERS ----------------
  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.TOKEN) : null;
  }

  get userId(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.USER_ID) : null;
  }

  get displayName(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.NAME) : null;
  }

  get role(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.ROLE) : null;
  }

  get isAdmin(): boolean {
    return this.role?.toLowerCase() === 'admin';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}