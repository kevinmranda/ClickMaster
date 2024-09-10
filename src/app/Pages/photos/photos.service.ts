import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photos } from './photos';
import { User } from '../../interfaces/auth';
import { AuthService } from '../../Services/Auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private baseUrl = 'https://goapi-lppa.onrender.com';
  photoID = localStorage.getItem('photo_id');
  constructor(private http: HttpClient) {}

  getPhotos(): Observable<Photos[]> {
    return this.http
      .get<{ data: Photos[] }>(
        `${this.baseUrl}/getPhotos/${localStorage.getItem('id')}`
      )
      .pipe(
        map((response) => response.data) // Map to extract the data array
      );
  }

  getAllPhotos(): Observable<Photos[]> {
    return this.http
      .get<{ data: Photos[] }>(`${this.baseUrl}/getAllPhotos/`)
      .pipe(
        map((response) => response.data) // Map to extract the data array
      );
  }

  updatePhoto(photo: Photos) {
    return this.http.put(`${this.baseUrl}/updatePhoto/${this.photoID}`, photo);
  }
}
