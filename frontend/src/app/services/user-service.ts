import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../../core/models/user.model';
import { handleApiError } from '../../core/utils/error.util';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/registration`, user)
      .pipe(handleApiError('Register'));
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`)
      .pipe(handleApiError('Get profile'));
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user)
      .pipe(handleApiError('Update profile'));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
      .pipe(handleApiError('Get all users'));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
      .pipe(handleApiError('Get user'));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user)
      .pipe(handleApiError('Add user'));
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${userId}`, user)
      .pipe(handleApiError('Update user'));
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`)
      .pipe(handleApiError('Delete user'));
  }
}