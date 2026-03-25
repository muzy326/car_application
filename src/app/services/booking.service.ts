import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:4000/api/bookings';

  constructor(private http: HttpClient) {}

  /** Get JWT token header */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /** Create booking */
  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(
      this.baseUrl,
      booking,
      { headers: this.getAuthHeaders() }
    );
  }
  addBooking(booking: Partial<Booking>): Observable<Booking> {
  return this.http.post<Booking>(
    this.baseUrl,
    booking,
    { headers: this.getAuthHeaders() }
  );
}

  /** Get bookings of logged in user */
  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${this.baseUrl}/my-bookings`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Current active booking */
  getCurrentBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${this.baseUrl}/my-bookings/current`,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Booking history */
  getBookingHistory(): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${this.baseUrl}/my-bookings/history`,
      { headers: this.getAuthHeaders() }
    );
  }
  getBookingById(id: number): Observable<Booking> {
  return this.http.get<Booking>(
    `${this.baseUrl}/${id}`,
    { headers: this.getAuthHeaders() } // include JWT header
  );
}

  /** Admin: get all bookings */
  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      this.baseUrl,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Update booking */
  updateBooking(id: number, booking: Partial<Booking>): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${id}`,
      booking,
      { headers: this.getAuthHeaders() }
    );
  }

  /** Delete booking */
  deleteBooking(id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }
}