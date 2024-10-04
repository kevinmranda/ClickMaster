import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = new BehaviorSubject<any[]>([]);
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
  // clear the cart
  clearCart() {
    this.cartItems.next([]);
  }

  getMappedCartItems() {
    return this.cartItems$.pipe(map((items) => items.map((item) => item.ID)));
  }

  getCartItems() {
    return this.cartItems.value;
  }
}
