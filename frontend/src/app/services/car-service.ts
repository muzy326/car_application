import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Car } from '../../core/models/car.model';
import { handleApiError } from '../../core/utils/error.util';

@Injectable({ providedIn: 'root' })
export class CarService {

  private baseUrl = `${environment.apiUrl}/cars`;

  constructor(private http: HttpClient) {}

  /** Get all cars */
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl)
      .pipe(handleApiError('Get cars'));
  }

  /** Get single car */
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/${id}`)
      .pipe(handleApiError('Get car'));
  }

  /** Add new car */
  addCar(car: Car): Observable<Car> {
    const payload = {
      ...car,
      price: Number(car.price),
      rating: car.rating !== undefined ? Number(car.rating) : 5,
      discount: car.discount !== undefined ? Number(car.discount) : 0
    };

    return this.http.post<Car>(this.baseUrl, payload)
      .pipe(handleApiError('Add car'));
  }

  /** Update existing car */
  updateCar(id: number, car: Car): Observable<Car> {
    const payload = {
      ...car,
      price: Number(car.price),
      rating: car.rating !== undefined ? Number(car.rating) : 5,
      discount: car.discount !== undefined ? Number(car.discount) : 0
    };

    return this.http.put<Car>(`${this.baseUrl}/${id}`, payload)
      .pipe(handleApiError('Update car'));
  }

  /** Delete a car */
  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(handleApiError('Delete car'));
  }
}