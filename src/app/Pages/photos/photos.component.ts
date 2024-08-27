import { Component, OnInit } from '@angular/core';
import { PhotosService } from './photos.service';
import { Photos } from './photos';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css',
})
export class PhotosComponent implements OnInit {
  photos: Photos[] = [];
  constructor(private photoServices: PhotosService) {}

  ngOnInit(): void {
    this.getPhotosList();
  }

  getPhotosList() {
    this.photoServices.getPhotos().subscribe((response) => {
      this.photos = response;
    });
  }
}
