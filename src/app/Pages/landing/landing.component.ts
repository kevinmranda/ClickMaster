import { Component, OnInit } from '@angular/core';
import { Photos } from '../photos/photos';
import { PhotosService } from '../photos/photos.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  data: Photos[] = [];

  constructor(private photosService: PhotosService) {}

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos() {
    this.photosService.getAllPhotos().subscribe((response) => {
      this.data = response;
    });
  }
}
