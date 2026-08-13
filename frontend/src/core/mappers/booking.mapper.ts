import { Booking } from "../models/booking.model";


export function mapBooking(b: any): Booking {
  return {
    id: b.id,
    userId: b.user_id,
    carId: b.car_id,
    carname: b.carname || b.car_name || 'Unknown',
    startDate: b.start_date || b.startDate || null,
    endDate: b.end_date || b.endDate || null,
    status: b.status || 'Pending',
    totalPrice: b.totalPrice || b.total_price || 0,
    createdAt: b.created_at ?? b.createdAt ?? ''
  };
}