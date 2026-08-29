import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../../core/models/booking.model';
import { mapBooking } from '../../../core/mappers/booking.mapper';
import { formatDate } from '../../../core/utils/date.util';
import { getStatusBadge } from '../../../core/utils/status.util';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyBookingsComponent implements OnInit {

  currentBooking: Booking[] = [];
  history: Booking[] = [];
  loading = true;

  totalBookings = 0;
  totalCurrent = 0;
  totalHistory = 0;

  // expose shared utils to the template
  formatDate = formatDate;
  getStatusBadge = getStatusBadge;

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

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
        this.currentBooking = current.map(mapBooking);
        this.history = history.map(mapBooking);

        this.totalCurrent = this.currentBooking.length;
        this.totalHistory = this.history.length;
        this.totalBookings = this.totalCurrent + this.totalHistory;

        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading bookings', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}