import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Booking } from '../../core/models/booking.model';



@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  /** ---------------- CREATE ---------------- */
  createBooking(booking: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, booking);
  }

  /** ---------------- READ ---------------- */
  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/my-bookings`);
  }

  getCurrentBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/my-bookings/current`);
  }

  getBookingHistory(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/my-bookings/history`);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  /** ---------------- UPDATE ---------------- */
  updateBooking(id: number, booking: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/${id}`, booking);
  }

  /** ---------------- DELETE ---------------- */
  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}