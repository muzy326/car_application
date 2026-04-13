import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  // Backend URL from environment (works in Docker)
  private baseUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

 
  private getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token'); 
  if (!token) {
    console.warn('No JWT token found in localStorage!');
  }
  return new HttpHeaders({
    'Authorization': `Bearer ${token ?? ''}`
  });
}

  /** ---------------- CREATE ---------------- */
  createBooking(booking: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, booking, { headers: this.getAuthHeaders() });
  }
  

  /** ---------------- READ ---------------- */
  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/my-bookings`, { headers: this.getAuthHeaders() });
  }

  getCurrentBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/my-bookings/current`, { headers: this.getAuthHeaders() });
  }

  getBookingHistory(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/my-bookings/history`, { headers: this.getAuthHeaders() });
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  /** ---------------- UPDATE ---------------- */
  updateBooking(id: number, booking: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.baseUrl}/${id}`, booking, { headers: this.getAuthHeaders() });
  }

  /** ---------------- DELETE ---------------- */
  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}