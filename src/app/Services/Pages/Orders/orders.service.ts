import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderResponse, Orders } from '../../../interfaces/orders';
import { map, Observable, tap } from 'rxjs';
import { CartService } from '../Landing/cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = 'https://goapi-lppa.onrender.com';

  constructor(private http: HttpClient, private cartService: CartService) {}

  getOrders(): Observable<Orders[]> {
    return this.http
      .get<{ data: Orders[] }>(
        `${this.baseUrl}/getOrders/${localStorage.getItem('id')}`
      )
      .pipe(
        map((response) => response.data) // Map to extract the data array
      );
  }

  submitOrder(order: Order): Observable<OrderResponse> {
    return this.http
      .post<OrderResponse>(`${this.baseUrl}/addOrder/`, order)
      .pipe(
        tap((response) => {
          if (response && response.order) {
            localStorage.setItem('orderID', response.order.ID.toString());
          } else {
            console.error('Order is missing in the response.');
          }
        })
      );
  }
}
