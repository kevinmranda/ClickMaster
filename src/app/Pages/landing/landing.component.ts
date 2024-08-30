import { Component, OnInit } from '@angular/core';
import { Photos } from '../photos/photos';
import { PhotosService } from '../photos/photos.service';
import { LandingService } from '../../Services/Pages/Landing/landing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { customerEmail } from '../../interfaces/auth';
import { CartService } from '../../Services/Pages/Landing/cart.service';
import { Cart } from '../../interfaces/cart';
interface cartData {
  img: string;
  title: string;
  price: number;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  customerSignInForm: FormGroup;
  customerJoinForm: FormGroup;
  preview = false;
  show = false;
  join = false;
  data: Photos[] = [];
  photos: cartData[] = [
    {
      img: '51241.jpg',
      title: 'Image',
      price: 25000,
    },
    {
      img: 'Frog.jpg',
      title: 'Image2',
      price: 25000,
    },
    {
      img: 'Sand.jpg',
      title: 'Image3',
      price: 25000,
    },
  ];

  badgeValue = this.photos.length;
  total: number = 0;

  constructor(
    private photosService: PhotosService,
    private landingService: LandingService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private cartService: CartService
  ) {
    this.customerSignInForm = this.fb.group({
      customer_email: ['', [Validators.required, Validators.email]],
    });
    this.customerJoinForm = this.fb.group({
      customer_join_email: ['', [Validators.required, Validators.email]],
    });
  }
  get email() {
    return this.customerSignInForm.controls['customer_email'];
  }
  get Customer_email() {
    return this.customerJoinForm.controls['customer_join_email'];
  }

  ngOnInit() {
    this.getPhotos();
    this.calculateTotal();
    this.showSign();
  }

  getPhotos() {
    this.photosService.getAllPhotos().subscribe((response) => {
      this.data = response;
    });
  }

  openCart() {
    this.preview = true;
  }
  showSign() {
    this.show = true;
  }
  joinNow() {
    this.join = true;
  }

  calculateTotal() {
    this.total = this.photos.reduce((sum, photo) => sum + photo.price, 0);
  }

  addItem(item: Cart) {
    this.cartService.addItems(item).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Item Added',
        });
        console.log(response);
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
  }

  removeItem(photo_id: number) {
    this.cartService.removeItem(photo_id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Item Removed',
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
  }

  clearCart() {
    this.cartService.clearCart().subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Cart Cleared',
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
  }

  customerSignIn() {
    const Customer_email = { ...this.customerSignInForm.value };
    this.landingService
      .customerLogin(Customer_email as customerEmail)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Welcome',
          });
          this.show = false;
          this.join = false;
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
  }

  customerJoin() {
    const Customer_join_email = { ...this.customerJoinForm.value };
    this.landingService
      .customerJoin(Customer_join_email as customerEmail)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Enter you email in the form below',
          });
          this.show = true;
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
  }
}
