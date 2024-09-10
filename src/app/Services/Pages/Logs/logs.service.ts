import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logs } from '../../../interfaces/logs';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private baseUrl = 'https://goapi-lppa.onrender.com';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<Logs[]> {
    return this.http.get<{ data: Logs[] }>(`${this.baseUrl}/logs`).pipe(
      map((response) => response.data) // Map to extract the data array
    );
  }
}
