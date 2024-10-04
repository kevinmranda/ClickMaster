import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customerEmail, CustResponse } from '../../../interfaces/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  customerJoin(customerEmail: customerEmail): Observable<any> {
    return this.http.post(`${this.baseUrl}/customerJoin/`, customerEmail);
  }

  customerLogin(customerEmail: customerEmail): Observable<CustResponse> {
    return this.http
      .post<CustResponse>(`${this.baseUrl}/customerLogin/`, customerEmail)
      .pipe(
        tap((response) => {
          if (response && response.customer) {
            localStorage.setItem('customerID', response.customer.ID.toString());
            localStorage.setItem(
              'customerEmail',
              response.customer.CustomerEmail.toString()
            );
          } else {
            console.error('Customer data is missing in the response.');
          }
        })
      );
  }
}
