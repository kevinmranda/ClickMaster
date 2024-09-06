import { Component, Inject, OnInit } from '@angular/core';
import { PhotosService } from './photos.service';
import { Photos } from './photos';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css',
})
export class PhotosComponent implements OnInit {
  photos: Photos[] = [];
  visible: boolean = false;
  cPhoto: { [s: number]: Photos } = {};
  addPhotosForm: FormGroup;
  userID = localStorage.getItem('id');

  constructor(
    private photoServices: PhotosService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.addPhotosForm = this.fb.group({
      title: [''],
      description: [''],
      filename: [''],
      price: [''],
      user_id: [''],
    });
  }

  ngOnInit(): void {
    this.getPhotosList();
  }

  getPhotosList() {
    this.photoServices.getPhotos().subscribe((response) => {
      this.photos = response;
    });
  }

  onRowEditInit(photo: Photos) {
    this.cPhoto[photo.ID] = { ...photo };
    localStorage.setItem('photo_id', photo.ID.toString());
  }

  onRowEditSave(photo: Photos) {
    if (photo.Price > 0) {
      delete this.cPhoto[photo.ID];
      this.photoServices.updatePhoto(photo).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Photo is updated',
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.error,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Price',
      });
    }
  }

  onRowEditCancel(photo: Photos, index: number) {
    this.photos[index] = this.cPhoto[photo.ID];
    delete this.cPhoto[photo.ID];
  }

  showDialog() {
    this.visible = true;
  }
}
