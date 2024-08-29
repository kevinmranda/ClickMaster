import { Component, Inject, OnInit } from '@angular/core';
import { PhotosService } from './photos.service';
import { Photos } from './photos';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css',
})
export class PhotosComponent implements OnInit {
  photos: Photos[] = [];
  visible: boolean = false;
  clonedProducts: { [s: string]: Photos } = {};
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

  onRowEditInit(photos: Photos) {
    this.clonedProducts[photos.ID as number] = { ...photos };
  }

  onRowEditSave(photos: Photos) {}

  onRowEditCancel(photos: Photos, index: number) {}

  showDialog() {
    this.visible = true;
  }
}
