import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CarService {

  private baseUrl = 'http://localhost:4000/api/cars';

  constructor(private http: HttpClient, private router: Router) {}

  // Returns HttpHeaders object
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /** Get car by ID */
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      map(car => ({
        ...car,
        imageUrl: car.imageUrl || this.getDefaultImage(car.carname)
      })),
      catchError(err => {
        console.error('Failed to fetch car', err);
        if (err.status === 401) {
          localStorage.removeItem('token');
          alert('Session expired. Please login again.');
          this.router.navigate(['/login']);
        }
        // fallback car object
        return of({
          id,
          carname: 'Unknown',
          price: 0,
          imageUrl: 'https://via.placeholder.com/400x200',
          available: true,
          type: '',
          description: ''
        } as Car);
      })
    );
  }

  /** Get all cars */
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl, { headers: this.getAuthHeaders() }).pipe(
      map(cars => cars.map(car => ({
        ...car,
        imageUrl: car.imageUrl || this.getDefaultImage(car.carname),
        description: car.description || ''
      }))),
      catchError(err => {
        console.error('Failed to fetch cars', err);
        return of([]);
      })
    );
  }

  /** Add new car */
  addCar(car: Car): Observable<Car> {
    const payload = { ...car, price: Number(car.price) };
    return this.http.post<Car>(this.baseUrl, payload, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Add car failed:', err);
        return throwError(() => err);
      })
    );
  }

  /** Update car */
  updateCar(id: number, car: Car): Observable<Car> {
    const payload = { ...car, price: Number(car.price) };
    return this.http.put<Car>(`${this.baseUrl}/${id}`, payload, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Update car failed:', err);
        return throwError(() => err);
      })
    );
  }

  /** Delete car */
  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(err => {
        console.error('Delete car failed:', err);
        return throwError(() => err);
      })
    );
  }

  private getDefaultImage(carName: string): string {
    return `https://via.placeholder.com/400x200.png?text=${encodeURIComponent(carName)}`;
  }
}