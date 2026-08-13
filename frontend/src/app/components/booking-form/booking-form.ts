import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { BookingCoreService } from '../../../core/services/booking-core.service';
import { Car } from '../../../core/models/car.model';
import { STORAGE_KEYS } from '../../../core/constants/storage-keys.const';
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
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private bookingCoreService: BookingCoreService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submitBooking(): void {
    this.submitted = true;

    if (this.bookingForm.invalid || !this.car) return;

    if (!this.authService.isLoggedIn()) {
      this.toastr.warning('Please login first!');
      this.router.navigate(['/login']);
      return;
    }

    const { startDate, endDate } = this.bookingForm.value;
    this.loading = true;

    this.bookingCoreService.bookCarCore({
      carId: this.car.id!,
      startDate,
      endDate,
      status: 'Pending'
    }).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(STORAGE_KEYS.LATEST_BOOKING_ID, res.id);
        }

        this.router.navigate(['/booking-success']);
      },
      error: (err) => {
        console.error('Booking failed:', err);
        this.toastr.error(err.message || 'Booking failed!');
        this.loading = false;
      }
    });
  }
}