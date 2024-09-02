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
import { Subscription } from 'rxjs';

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
  cartItems: any[] = [];
  data: Photos[] = [];
  private cartSubscription!: Subscription;
  badgeValue = 0;
  total = 0;

  constructor(
    private photosService: PhotosService,
    private landingService: LandingService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private cartService: CartService
  ) {
    this.customerSignInForm = this.fb.group({
      customer_email: ['', [Validators.required, Validators.email]],
    });
    this.customerJoinForm = this.fb.group({
      customer_join_email: ['', [Validators.required, Validators.email]],
    });
    this.cartService.cartItems$.subscribe((items) => (this.cartItems = items));
  }
  get email() {
    return this.customerSignInForm.controls['customer_email'];
  }
  get Customer_email() {
    return this.customerJoinForm.controls['customer_join_email'];
  }

  ngOnInit() {
    this.getPhotos();
    this.showSign();
    this.cartSubscription = this.cartService.cartItems$.subscribe((items) => {
      this.badgeValue = this.cartItems.length;
      this.calculateTotal();
    });
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
    this.total = this.cartItems.reduce(
      (sum, cartItem) => sum + cartItem.Price,
      0
    );
  }

  removeItem(photoId: number) {
    this.cartService.removeFromCart(photoId);
  }

  clearCart() {
    this.cartService.clearCart();
    this.preview = false;
  }

  checkout() {
    this.cartService.clearCart();
    this.preview = false;
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
