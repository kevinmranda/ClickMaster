import { Component } from '@angular/core';
import { PhotosService } from '../photos/photos.service';
import { OrdersService } from '../../Services/Pages/Orders/orders.service';
import { PaymentsService } from '../../Services/Pages/Payments/payments.service';
import { Payments } from '../../interfaces/payments';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  loading = false;
  photos?: number;
  completedOrders?: number;
  pendingOrders?: number;
  payments: Payments[] = [];
  income?: number;
  constructor(
    private photoServices: PhotosService,
    private ordersService: OrdersService,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getPhotosCount();
    this.getOrdersCount();
    this.incomeCalc();
    this.loading = false;
  }

  getPhotosCount() {
    this.photoServices.getPhotos().subscribe((response) => {
      this.photos = response.length;
    });
  }

  getOrdersCount() {
    this.ordersService.getOrders().subscribe((response) => {
      this.completedOrders = response.filter(
        (order) => order.Status.toLowerCase() === 'completed'
      ).length;
      this.pendingOrders = response.filter(
        (order) => order.Status.toLowerCase() === 'pending'
      ).length;
    });
  }

  incomeCalc() {
    this.paymentsService.getPayments().subscribe((response) => {
      this.payments = response;

      this.income = this.payments.reduce((total, payment) => {
        return total + payment.Amount;
      }, 0);
    });
  }
}
