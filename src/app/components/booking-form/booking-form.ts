import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { Car } from '../../models/car.model';

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
    private router: Router
  ) {}

  ngOnInit(): void {

    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    if (!this.car) {
      console.warn('BookingFormComponent: car input missing');
    }
  }

 submitBooking(): void {

  this.submitted = true;

  if (this.bookingForm.invalid || !this.car) {
    return;
  }

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

  // Angular model format (camelCase)
  const booking = {
    userId: userId,
    carId: this.car.id!,
    startDate: startDate,
    endDate: endDate,
    status: 'Pending'
  };

  // Convert to backend format
  const bookingPayload = {
    user_id: booking.userId,
    car_id: booking.carId,
    start_date: booking.startDate,
    end_date: booking.endDate,
    status: booking.status
  };

  console.log("Sending booking:", bookingPayload);

  this.loading = true;

  this.bookingService.createBooking(bookingPayload as any).subscribe({
    next: (res: any) => {
      this.loading = false;
       localStorage.setItem('latestBookingId', res.id);
      alert('Booking created successfully!');
      this.router.navigate(['/booking-bill']);
    },
    error: (err) => {
      this.loading = false;
      console.error('Booking failed:', err);
      alert('Booking failed!');
    }
  });
  
}

}