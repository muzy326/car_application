import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import {
  Booking,
  CreateBookingRequest
} from '../models/booking.model';

import { validateBookingDates } from '../validators/booking.validators';

import { BookingService } from '../../app/services/booking.service';

export interface BookCarCoreRequest {
  carId: number;
  startDate: Date | string | null;
  endDate: Date | string | null;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingCoreService {

  constructor(
    private bookingService: BookingService
  ) {}

  /**
   * Shared booking logic.
   *
   * Used by:
   * - Manual Booking
   * - DriveAI Booking
   */
  bookCarCore(
    request: BookCarCoreRequest
  ): Observable<Booking> {

    // 1. Validate car
    if (!request.carId) {
      return throwError(
        () => new Error('Car is required.')
      );
    }

    // 2. Validate dates
    const dateValidation = validateBookingDates(
      request.startDate,
      request.endDate
    );

    if (!dateValidation.valid) {
      return throwError(
        () => new Error(
          dateValidation.error ?? 'Invalid booking dates.'
        )
      );
    }

    // 3. Build backend request
    const bookingPayload: CreateBookingRequest = {
      car_id: request.carId,
      start_date: request.startDate!,
      end_date: request.endDate!,
      status: request.status ?? 'Pending'
    };

    // 4. Use existing API service
    return this.bookingService.createBooking(
      bookingPayload
    );
  }
}