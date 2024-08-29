import { Injectable } from '@angular/core';
import { Payments } from '../../../interfaces/payments';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payments[]> {
    return this.http
      .get<{ data: Payments[] }>(
        `${this.baseUrl}/getPayments/${localStorage.getItem('id')}`
      )
      .pipe(
        map((response) => response.data) // Map to extract the data array
      );
  }
}
