import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(photo: any) {
    const currentCart = this.cartItems.value;
    currentCart.push(photo);
    this.cartItems.next(currentCart);
  }

  removeFromCart(photoId: number) {
    const currentCart = this.cartItems.value.filter(
      (item) => item.ID !== photoId
    );
    this.cartItems.next(currentCart);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getCartItems() {
    return this.cartItems.value;
  }
}
