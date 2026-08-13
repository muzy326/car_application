export interface Booking {
  id?: number;
  userId: number;
  carId: number;
  carname?: string;
  startDate: Date | string | null;
  endDate: Date | string | null;
  status?: string; // e.g., "Pending", "Confirmed", "Completed"
  totalPrice?: number; // optional
  createdAt?: string;
  
}
export interface CreateBookingRequest {
  car_id: number;
  start_date: Date | string;
  end_date: Date | string;
  status?: string;
}