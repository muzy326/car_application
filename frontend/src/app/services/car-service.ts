import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CarService {

  private baseUrl = `${environment.apiUrl}/cars`; // Backend API URL

  constructor(private http: HttpClient) {}

  /** Authorization headers */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /** Get all cars */
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(err => {
          console.error('Get cars failed', err);
          return throwError(() => err);
        })
      );
  }

  /** Get single car */
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(err => {
          console.error('Get car failed', err);
          return throwError(() => err);
        })
      );
  }

  /** Add new car */
  addCar(car: Car): Observable<Car> {
    const payload = {
      ...car,
      price: Number(car.price),
      rating: car.rating !== undefined ? Number(car.rating) : 5,
      discount: car.discount !== undefined ? Number(car.discount) : 0
    };

    return this.http.post<Car>(this.baseUrl, payload, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(err => {
          console.error('Add car failed:', err);
          return throwError(() => err);
        })
      );
  }

  /** Update existing car */
  updateCar(id: number, car: Car): Observable<Car> {
    const payload = {
      ...car,
      price: Number(car.price),
      rating: car.rating !== undefined ? Number(car.rating) : 5,
      discount: car.discount !== undefined ? Number(car.discount) : 0
    };

    return this.http.put<Car>(`${this.baseUrl}/${id}`, payload, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(err => {
          console.error('Update car failed:', err);
          return throwError(() => err);
        })
      );
  }

  /** Delete a car */
  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(err => {
          console.error('Delete car failed', err);
          return throwError(() => err);
        })
      );
  }
}