import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { firstValueFrom } from 'rxjs';
import { BookingBill } from '../../../core/models/booking-bill.model';

@Component({
  selector: 'app-booking-bill',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-bill.html',
  styleUrls: ['./booking-bill.css']
})
export class BookingBillComponent implements OnInit {

  booking: BookingBill | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const bookingId = idParam ? Number(idParam) : null;

    if (!bookingId) {
      this.error = 'Invalid booking ID';
      this.loading = false;
      return;
    }

    this.loadBookingBill(bookingId);
  }

  async loadBookingBill(bookingId: number) {
    try {
      const bookingData: any = await firstValueFrom(
        this.bookingService.getBookingById(bookingId)
      );

      const start = new Date(bookingData.start_date);
      const end = new Date(bookingData.end_date);

      const durationDays = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      const pricePerDay = bookingData.price || 0;
      const totalPrice = durationDays * pricePerDay;

      this.booking = {
        id: bookingData.id,
        status: bookingData.status,
        startDate: start,
        endDate: end,
        userName: `${bookingData.firstname} ${bookingData.lastname}`,
        userEmail: bookingData.email,
        userPhone: bookingData.phonenumber,
        carName: bookingData.carname,
        carType: bookingData.type,
        durationDays,
        pricePerDay,
        totalPrice
      };

      this.loading = false;
      this.error = '';

    } catch (err) {
      console.error('Failed to load booking bill:', err);
      this.error = 'Failed to load booking details';
      this.loading = false;
    }
  }

  printBill(): void {
    window.print();
  }
}