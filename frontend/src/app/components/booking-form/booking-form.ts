import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { Car } from '../../models/car.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './booking-form.html',
  styleUrls: ['./booking-form.css']
})
export class BookingFormComponent implements OnInit {

  @Input() car?: Car;

  bookingForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  submitBooking(): void {

    this.submitted = true;

    if (this.bookingForm.invalid || !this.car) return;

    const { startDate, endDate } = this.bookingForm.value;

    if (startDate >= endDate) {
      alert('End Date must be after Start Date!');
      return;
    }

    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      alert('Please login first!');
      this.router.navigate(['/login']);
      return;
    }

    const bookingPayload = {
      user_id: userId,
      car_id: this.car.id!,
      start_date: startDate,
      end_date: endDate,
      status: 'Pending'
    };

    this.loading = true;

    this.bookingService.createBooking(bookingPayload).pipe(
      catchError(err => {
        console.error('Booking failed:', err);
        alert('Booking failed!');
        this.loading = false;
        return of(null);
      })
    ).subscribe((res: any) => {

      if (!res) return;

      this.loading = false;

      // Save booking ID
      localStorage.setItem('latestBookingId', res.id);
       // ✅ Angular toast
    this.toastr.success('Booking completed successfully!');

      // ✅ CLEAN NAVIGATION (NO setTimeout)
      this.router.navigate(['/booking-success']);
    });
  }
}