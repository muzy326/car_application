import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges } from '@angular/core';
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
  styleUrls: ['./booking-form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingFormComponent implements OnInit, OnChanges {

  @Input() car?: Car;

  bookingForm!: FormGroup;
  loading = false;
  submitted = false;

  totalDays = 1;
  totalPrice = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private bookingCoreService: BookingCoreService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.updateTotal();
    this.bookingForm.valueChanges.subscribe(() => this.updateTotal());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['car']) {
      this.updateTotal();
    }
  }

  private updateTotal(): void {
    if (!this.car) {
      this.totalDays = 1;
      this.totalPrice = 0;
      this.cdr.markForCheck();
      return;
    }

    const { startDate, endDate } = this.bookingForm.value;
    let days = 1;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      days = diff > 0 ? diff : 1;
    }

    const discount = this.car.discount ?? 0;
    const pricePerDay = this.car.price * (1 - discount / 100);

    this.totalDays = days;
    this.totalPrice = +(pricePerDay * days).toFixed(2);
    this.cdr.markForCheck();
  }

  submitBooking(): void {
    this.submitted = true;
    this.cdr.markForCheck();

    if (this.bookingForm.invalid || !this.car) return;

    if (!this.authService.isLoggedIn()) {
      this.toastr.warning('Please login first!');
      this.router.navigate(['/login']);
      return;
    }

    const { startDate, endDate } = this.bookingForm.value;
    this.loading = true;
    this.cdr.markForCheck();

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

        this.cdr.markForCheck();
        this.router.navigate(['/booking-success']);
      },
      error: (err) => {
        console.error('Booking failed:', err);
        this.toastr.error(err.message || 'Booking failed!');
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}