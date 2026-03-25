import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Response model for login
export interface AuthResponseModel {
  message: string;
  user: {
    id: any;
    firstname: string;
    role: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:4000'; // your backend URL

  constructor(private http: HttpClient) {}

  // ---------------- LOGIN ----------------
  login(email: string, password: string): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.baseUrl}/api/login`, { email, password })
      .pipe(
        tap((res: AuthResponseModel) => {
          // Only store in browser environment
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', res.token || '');
            localStorage.setItem('name', res.user.firstname);
            localStorage.setItem('role', res.user.role);
            localStorage.setItem('userId', res.user.id.toString());
          }
        })
      );
  }

  // ---------------- REGISTER ----------------
  register(user: { firstname: string; lastname: string; email: string; password: string; role?: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/registration`, user);
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
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  // get name(): string | null {
  //   if (typeof window === 'undefined') return null;
  //   return localStorage.getItem('name');
  // }
  get userId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('userId');
  }
  // ---------------- HELPERS ----------------
   isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }
  get displayName(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('displayName');
  }
  return null;
}
get role(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('role');
  }
  return null;
}

get isAdmin(): boolean {
   return localStorage.getItem('role') === 'Admin';
}

 
}
