export interface BookingBill {
  id: number;
  status: string;
  startDate: Date;
  endDate: Date;
  userName: string;
  userEmail: string;
  userPhone: string;
  carName: string;
  carType: string;
  durationDays: number;
  pricePerDay: number;
  totalPrice: number;
}