import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css']
})
export class MyBookingsComponent implements OnInit {

  currentBooking: Booking[] = [];
  history: Booking[] = [];

  loading = true;

  // Summary
  totalBookings = 0;
  totalCurrent = 0;
  totalHistory = 0;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;

    forkJoin({
      current: this.bookingService.getCurrentBooking(),
      history: this.bookingService.getBookingHistory()
    }).subscribe({
      next: ({ current, history }) => {

        // Map API data
        this.currentBooking = current.map(b => this.mapBooking(b));
        this.history = history.map(b => this.mapBooking(b));

        // Totals
        this.totalCurrent = this.currentBooking.length;
        this.totalHistory = this.history.length;
        this.updateTotals();

        // Stop loading
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bookings', err);
        this.loading = false;
      }
    });
  }

  // Convert API response → Booking model
  private mapBooking(b: any): Booking {
    return {
      id: b.id,
      userId: b.user_id,
      carId: b.car_id,
      carname: b.carname || b.car_name || 'Unknown',
      startDate: b.start_date || b.startDate || null,
      endDate: b.end_date || b.endDate || null,
      status: b.status || 'Pending',
      totalPrice: b.totalPrice || b.total_price || 0,
      createdAt: b.created_at || ''
    };
  }

  private updateTotals(): void {
    this.totalBookings = this.totalCurrent + this.totalHistory;
  }

  // Status badge helper
  getStatusBadge(status?: string): string {
    switch (status) {
      case 'Confirmed':
        return 'bg-success';
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-warning text-dark';
    }
  }

  // Safe date formatting
  formatDate(date: string | Date | null | undefined): string {
    if (!date) return '-';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString();
  }

}