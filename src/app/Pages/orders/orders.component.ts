import { Component } from '@angular/core';
import { Orders } from '../../interfaces/orders';
import { OrdersService } from '../../Services/Pages/Orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  loading = false;
  orders: Orders[] = [];
  constructor(private OrdersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrdersList();
  }

  getOrdersList() {
    this.loading = true;
    this.OrdersService.getOrders().subscribe((response) => {
      this.loading = false;
      this.orders = response;
    });
  }

  getSeverity(status: string) {
    switch (status.toLowerCase()) {
      case 'failed':
        return 'danger';

      case 'completed':
        return 'success';

      case 'pending':
        return 'warning';
      default:
        return undefined;
    }
  }

  getClass(status: string) {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500 pi-check-circle';
      case 'canceled':
        return 'text-red-500 pi-times-circle';
      case 'pending':
        return 'text-yellow-500 pi-clock';
      default:
        return undefined;
    }
  }
}
