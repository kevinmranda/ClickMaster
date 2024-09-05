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
import { Order } from '../../interfaces/orders';
import { OrdersService } from '../../Services/Pages/Orders/orders.service';
import { PaymentsService } from '../../Services/Pages/Payments/payments.service';
import { Payment } from '../../interfaces/payments';
import { withHttpTransferCacheOptions } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  customerSignInForm: FormGroup;
  customerJoinForm: FormGroup;
  customerPayForm: FormGroup;
  payForm = false;
  preview = false;
  show = false;
  join = false;
  cartItems: any[] = [];
  data: Photos[] = [];
  private cartSubscription!: Subscription;
  badgeValue = 0;
  total = 0;
  mappedCartItems: number[] = [];
  paymentInfo!: Payment;
  providersDialog = false;
  MNOProvider!: string;

  constructor(
    private photosService: PhotosService,
    private landingService: LandingService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private cartService: CartService,
    private orderService: OrdersService,
    private paymentService: PaymentsService
  ) {
    this.customerSignInForm = this.fb.group({
      customer_email: ['', [Validators.required, Validators.email]],
    });
    this.customerJoinForm = this.fb.group({
      customer_join_email: ['', [Validators.required, Validators.email]],
    });
    this.cartService.cartItems$.subscribe((items) => (this.cartItems = items));
    this.customerPayForm = this.fb.group({
      phone: [
        '',
        [Validators.required, Validators.pattern(/^(?:\+255|255)?[0-9]{10}$/)],
      ],
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
    this.showSign();
    this.cartSubscription = this.cartService.cartItems$.subscribe((items) => {
      this.badgeValue = this.cartItems.length;
      this.calculateTotal();
    });
    this.cartService.getMappedCartItems().subscribe((ids) => {
      this.mappedCartItems = ids;
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
    const order: Order = {
      Customer_email: localStorage.getItem('customerEmail')?.toString() || '',
      Photo_ids: this.mappedCartItems,
    };

    this.orderService.submitOrder(order).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order sent',
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
    localStorage.setItem('total', this.total.toString());
    this.cartService.clearCart();
    this.preview = false;
    this.providersDialog = true;
  }

  provider(provider: string) {
    this.MNOProvider = provider;
    this.payForm = true;
    this.providersDialog = false;
  }

  pay() {
    const orderIDstr = localStorage.getItem('orderID');
    const orderID = orderIDstr ? parseInt(orderIDstr, 10) || 0 : 0;
    const totalStr = localStorage.getItem('total');
    const totalInt = totalStr ? parseInt(totalStr, 10) || 0 : 0;
    if (this.customerPayForm.valid) {
      const phoneNumber = this.customerPayForm.get('phone')?.value;
      this.paymentInfo = {
        OrderID: orderID,
        Amount: totalInt,
        AccountNumber: phoneNumber,
        Provider: this.MNOProvider,
      };
      this.paymentService.pay(this.paymentInfo).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order Paid Successfully',
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
      this.payForm = false;
    }
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
