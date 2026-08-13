export interface Payment {
  id?: number;
  bookingId: number;
  amount: number;
  method: string;      // Card, Cash, UPI, etc.
  status: string;      // Pending, Paid, Failed
  paidAt?: string;     // ISO date string
}
