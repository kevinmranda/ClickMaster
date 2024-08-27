import { Injectable } from '@angular/core';
import {
  UpdatedPassword,
  UpdtdPassword,
  User,
  UserEmail,
  UserLogin,
  UserPreferences,
} from '../../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private userID: number | null = null; // Store userID here

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/createAccount`, userDetails);
  }

  userLogin(loginCredentials: UserLogin): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, loginCredentials)
      .pipe(
        tap((response) => {
          if (response && response.data && response.data.ID) {
            this.userID = response.data.ID; // Store the user ID after login
          }
        })
      );
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUsers`);
  }

  getUser(): Observable<User> {
    if (this.userID === null) {
      throw new Error('User ID not set. Please login first.');
    }
    return this.http.get<User>(`${this.baseUrl}/getUser/${this.userID}`);
  }

  updateUser(updatedData: User): Observable<any> {
    if (this.userID === null) {
      throw new Error('User ID not set. Please login first.');
    }
    return this.http.put(
      `${this.baseUrl}/updateUser/${this.userID}`,
      updatedData
    );
  }

  deleteUser() {
    if (this.userID === null) {
      throw new Error('User ID not set. Please login first.');
    }
    return this.http.delete<User>(`${this.baseUrl}/deleteUser/${this.userID}`);
  }

  updateUserPassword(updatedPassword: UpdatedPassword): Observable<any> {
    if (this.userID === null) {
      throw new Error('User ID not set. Please login first.');
    }
    return this.http.put(
      `${this.baseUrl}/updateUserPassword/${this.userID}`,
      updatedPassword
    );
  }

  sendResetPasswordEmail(userEmail: UserEmail): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendResetPasswordEmail/`, userEmail);
  }

  resetPassword(
    token: string,
    updatedPassword: UpdtdPassword
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/reset-password/${token}`,
      updatedPassword
    );
  }

  updateUserPreferences(userPreferences: UserPreferences): Observable<any> {
    if (this.userID === null) {
      throw new Error('User ID not set. Please login first.');
    }
    return this.http.post(
      `${this.baseUrl}/updateUserPreferences/${this.userID}`,
      userPreferences
    );
  }
}
