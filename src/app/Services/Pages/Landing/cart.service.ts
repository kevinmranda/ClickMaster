import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../../../interfaces/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  customer_id = localStorage.getItem('customerID');
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  addItems(item: Cart): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart/add/`, item);
  }

  removeItem(photo_id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/cart/remove/${this.customer_id}/${photo_id}/`
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/clear/${this.customer_id}/`);
  }
}
