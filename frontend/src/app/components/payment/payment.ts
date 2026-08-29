import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent {
  constructor(private paymentService: PaymentService) {}

  makePayment() {
    this.paymentService.createPayment({
      bookingId: 1,   // later you pass dynamic bookingId
      amount: 100,
      method: 'Card',
      status: 'Paid',
      paidAt: new Date().toISOString()
    }).subscribe({
      next: (res) => {
        console.log('Payment Success', res);
        alert('Payment Successful!');
      },
      error: (err) => {
        console.error(err);
        alert('Payment Failed!');
      }
    });
  }
}