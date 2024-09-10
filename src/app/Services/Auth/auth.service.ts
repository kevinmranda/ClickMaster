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
  private baseUrl = 'https://goapi-lppa.onrender.com';

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
            localStorage.setItem('id', response.data.ID.toString());
            localStorage.setItem('role', response.data.Role.toString());
            localStorage.setItem('token', response.token.toString());
            localStorage.setItem('theme', response.data.Theme.toString());
            localStorage.setItem('language', response.data.Language.toString());
          }
        })
      );
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUsers`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/getUser/${localStorage.getItem('id')}`
    );
  }

  updateUser(updatedData: User): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/updateUser/${localStorage.getItem('id')}`,
      updatedData
    );
  }

  deleteUser() {
    return this.http.delete<User>(
      `${this.baseUrl}/deleteUser/${localStorage.getItem('id')}`
    );
  }

  updateUserPassword(updatedPassword: UpdatedPassword): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/updateUserPassword/${localStorage.getItem('id')}`,
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
    return this.http.put(
      `${this.baseUrl}/updateUserPreferences/${localStorage.getItem('id')}`,
      userPreferences
    );
  }

  getUserPreferences(): Observable<UserPreferences> {
    return this.http.get<UserPreferences>(
      `${this.baseUrl}/userPreferences/${localStorage.getItem('id')}`
    );
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('theme');
    localStorage.removeItem('language');
    localStorage.clear();
  }
}
