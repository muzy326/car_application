import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingSuccessComponent implements OnInit {
  booking: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const bookingId = localStorage.getItem('latestBookingId');
    if (bookingId) {
      this.bookingService.getBookingById(Number(bookingId))
        .subscribe(data => {
          this.booking = data;
          this.cdr.markForCheck();
        });
    }
  }
}