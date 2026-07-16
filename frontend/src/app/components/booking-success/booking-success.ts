import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-success',
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-success.html',
  styleUrl: './booking-success.css',
})
export class BookingSuccessComponent implements OnInit {
booking: any;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {

    const bookingId = localStorage.getItem('latestBookingId');

    if (bookingId) {

      this.bookingService.getBookingById(Number(bookingId))
        .subscribe(data => {

          this.booking = data;

        });

    }

  }

}
