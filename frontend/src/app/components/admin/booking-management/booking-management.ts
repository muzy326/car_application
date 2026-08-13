import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { Booking } from '../../../../core/models/booking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking-management.html',
  styleUrls: ['./booking-management.css']
})
export class BookingManagementComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  pages: number[] = [];

  // Form model
  bookingModel: Partial<Booking> = {
    userId: 0,
    carId: 0,
    startDate: '',
    endDate: '',
    status: 'Pending'
  };

  editingBookingId: number | null = null;

  constructor(private bookingService: BookingService,private router: Router) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  /** LOAD ALL BOOKINGS */
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
          status: b.status
        }));
        this.applyFilter();
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  /** FILTER BOOKINGS */
  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBookings = this.bookings.filter(b =>
      b.userId?.toString().includes(term) ||
      b.carId?.toString().includes(term) ||
      b.status?.toLowerCase().includes(term)
    );

    this.totalPages = Math.ceil(this.filteredBookings.length / this.pageSize) || 1;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.currentPage = 1;
  }

  /** PAGINATION */
  get pagedBookings(): Booking[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredBookings.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  /** CREATE / UPDATE BOOKING */
  saveBooking(form: NgForm): void {
    if (form.invalid) return;

    const payload = {
      user_id: this.bookingModel.userId,
      car_id: this.bookingModel.carId,
      start_date: this.bookingModel.startDate,
      end_date: this.bookingModel.endDate,
      status: this.bookingModel.status
    };

    if (this.editingBookingId) {
      this.bookingService.updateBooking(this.editingBookingId, payload).subscribe({
        next: () => {
          alert('Booking updated successfully!');
          this.router.navigate(['/booking-success']);
          this.resetForm(form);
          this.loadBookings();
        },
        error: err => console.error(err)
      });
    } else {
      this.bookingService.createBooking(payload).subscribe({
        next: () => {
          alert('Booking created successfully!');
          this.resetForm(form);
          this.loadBookings();
        },
        error: err => console.error(err)
      });
    }
  }

  /** EDIT BOOKING */
  editBooking(b: Booking): void {
    this.editingBookingId = b.id!;
    this.bookingModel = { ...b };
  }

  /** DELETE BOOKING */
  deleteBooking(id: number): void {
    if (!confirm('Delete this booking?')) return;
    this.bookingService.deleteBooking(id).subscribe({
      next: () => this.loadBookings(),
      error: err => console.error(err)
    });
  }

  /** UPDATE STATUS */
  updateStatus(id: number, status: 'Confirmed' | 'Cancelled'): void {
    this.bookingService.updateBooking(id, { status }).subscribe({
      next: () => this.loadBookings(),
      error: err => console.error(err)
    });
  }

  /** RESET FORM */
  resetForm(form?: NgForm): void {
    this.editingBookingId = null;
    if (form) form.resetForm();
    this.bookingModel = {
      userId: 0,
      carId: 0,
      startDate: '',
      endDate: '',
      status: 'Pending'
    };
  }

  /** STATUS BADGE CLASS */
  getStatusBadge(status?: string): string {
    switch (status) {
      case 'Confirmed': return 'bg-success';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}