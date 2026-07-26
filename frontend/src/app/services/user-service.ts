import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

 
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/registration`, user);
  }
  
  logout() {
    if (isPlatformBrowser(this.platformId)) localStorage.clear();
  }

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('token') || ''
      : '';
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  /** Get logged-in user profile */
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`, this.getAuthHeaders());
    // return this.http.get<User>(`${this.baseUrl}/users/profile`, this.getAuthHeaders());
  }
  updateProfile(user: User): Observable<User> {
    // return this.http.put<User>(`/api/users/${user.id}`, user);
    return this.http.put<User>( `${this.baseUrl}/${user.id}`, user, this.getAuthHeaders());
  }

  /** Get all users (Admin) */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, this.getAuthHeaders());
  }

  /** Get user by ID (Admin) */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }

  /** Add new user (Admin) */
  addUser(user: User): Observable<User> {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') || '' : '';
    return this.http.post<User>(this.baseUrl, user, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    });
  }

  /** Update user (Admin) */
  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${userId}`, user, this.getAuthHeaders());
  }

  /** Delete user (Admin) */
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`, this.getAuthHeaders());
  }
}