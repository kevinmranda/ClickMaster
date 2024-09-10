import { Component } from '@angular/core';
import { Payments } from '../../interfaces/payments';
import { PaymentsService } from '../../Services/Pages/Payments/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})
export class PaymentsComponent {
  loading = false;
  payments: Payments[] = [];
  constructor(private paymentsServices: PaymentsService) {}

  ngOnInit(): void {
    this.getPaymentsList();
  }

  getPaymentsList() {
    this.loading = true;
    this.paymentsServices.getPayments().subscribe((response) => {
      this.loading = false;
      this.payments = response;
    });
  }

  getClass(status: string) {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500 pi-check-circle';
      case 'failed':
        return 'text-red-500 pi-times-circle';
      case 'pending':
        return 'text-yellow-500 pi-clock';
      default:
        return undefined;
    }
  }
}
