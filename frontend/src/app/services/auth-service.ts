import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

// Response model for login
export interface AuthResponseModel {
  message: string;
  user: {
    id: any;
    name: string;
    role: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Correct base URL: point to your backend API
  private baseUrl = `${environment.apiUrl}/users`; // e.g., http://backend:5000/api

  constructor(private http: HttpClient) {}

  // ---------------- LOGIN ----------------
  login(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res: AuthResponseModel) => {

         console.log("🔥 SERVICE HIT");
         console.log("🔥 RESPONSE:", res);
        // Store token and user info in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token || '');
          localStorage.setItem('name', res.user?.name || '');   // ✅ FIXED
          localStorage.setItem('role', res.user?.role || '');
          localStorage.setItem('userId', res.user?.id?.toString() || '');

          console.log("🔥 LOCAL STORAGE AFTER SAVE:", localStorage);
        }
        
      })
    );
  }

  // ---------------- REGISTER ----------------
  register(user: { firstname: string; lastname: string;  phonenumber: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  // ---------------- LOGOUT ----------------
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
    }
  }

  // ---------------- GETTERS ----------------
  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  get userId(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  }

  get displayName(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('name') : null;
  }

  get role(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  }

  get isAdmin(): boolean {
    return this.role === 'Admin';
  }

  // ---------------- HELPERS ----------------
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}