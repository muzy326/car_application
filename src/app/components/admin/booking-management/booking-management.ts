import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Booking } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './booking-management.html',
  styleUrls: ['./booking-management.css'],
})
export class BookingManagementComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  // Template-driven model
  bookingModel: Partial<Booking> = {
    userId: 0,
    carId: 0,
    startDate: '',
    endDate: '',
    status: 'Pending',
  };

  editingBookingId: number | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (res: any[]) => {
        this.bookings = res.map(b => ({
          id: b.id,
          userId: b.user_id,
          carId: b.car_id,
          startDate: b.start_date,
          endDate: b.end_date,
          status: b.status || 'Pending',
        }));
        this.filteredBookings = [...this.bookings];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load bookings:', err);
        this.loading = false;
      },
    });
  }

  filterBookings(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBookings = this.bookings.filter(b =>
      b.userId.toString().includes(term) ||
      b.carId.toString().includes(term) ||
      (b.status && b.status.toLowerCase().includes(term))
    );
  }

  saveBooking(form: NgForm): void {
    if (form.invalid) return;

    if (this.editingBookingId !== null) {
      // Update
      this.bookingService.updateBooking(this.editingBookingId, this.bookingModel).subscribe({
        next: () => {
          alert('Booking updated successfully!');
          this.resetForm(form);
          this.loadBookings();
        },
      });
    } else {
      // Add
      this.bookingService.addBooking(this.bookingModel).subscribe({
        next: () => {
          alert('Booking added successfully!');
          this.resetForm(form);
          this.loadBookings();
        },
      });
    }
  }

  editBooking(b: Booking): void {
    this.editingBookingId = b.id!;
    this.bookingModel = { ...b };
  }

  deleteBooking(id: number): void {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    this.bookingService.deleteBooking(id).subscribe(() => this.loadBookings());
  }

  updateStatus(id: number, status: 'Confirmed' | 'Cancelled'): void {
    this.bookingService.updateBooking(id, { status }).subscribe(() => this.loadBookings());
  }

  resetForm(form?: NgForm): void {
    this.editingBookingId = null;
    if (form) form.resetForm();
    this.bookingModel = { userId: 0, carId: 0, startDate: '', endDate: '', status: 'Pending' };
  }

  getStatusBadge(status?: string): string {
    switch (status) {
      case 'Confirmed': return 'bg-success';
      case 'Cancelled': return 'bg-warning text-dark';
      case 'Pending':
      default: return 'bg-secondary';
    }
  }
}