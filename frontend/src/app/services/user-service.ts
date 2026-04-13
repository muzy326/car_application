import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  /** Login user */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  /** Register user (public) */
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/registration`, user);
  }

  /** Get JWT headers */
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  /** Get logged-in user profile */
  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/profile`, this.getAuthHeaders());
  }
  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`/api/users/${user.id}`, user);
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
    return this.http.post<User>(this.baseUrl, user, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
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