import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  // Get user by id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }

  // Get all users (Admin)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, this.getAuthHeaders());
  }
  // Get user profile by id
  getProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  // Add new user (Admin)
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Update user (Admin)
  updateProfile(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${userId}`, user, this.getAuthHeaders());
  }

  // Delete user (Admin)
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`, this.getAuthHeaders());
  }
}