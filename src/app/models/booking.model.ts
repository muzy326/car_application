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