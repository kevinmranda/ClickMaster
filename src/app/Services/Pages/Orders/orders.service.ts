import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orders } from '../../../interfaces/orders';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Orders[]> {
    return this.http
      .get<{ data: Orders[] }>(
        `${this.baseUrl}/getOrders/${localStorage.getItem('id')}`
      )
      .pipe(
        map((response) => response.data) // Map to extract the data array
      );
  }
}
