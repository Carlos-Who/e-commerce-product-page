import {Component, effect} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";

import {MatBadge} from "@angular/material/badge";
import {MatTooltip} from "@angular/material/tooltip";

import {CartService} from "../../../core/services/cart/cart.service";
import {CartItem} from "../../../core/interfaces/cart-item.interface";

@Component({
  selector: 'element-cart',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatBadge,
    MatTooltip,
    CurrencyPipe
  ],
  animations: [
    trigger('cartDialogAnimationTrigger', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-10px)'}),
        animate('100ms', style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition(':leave', [animate('100ms', style({opacity: 0, transform: 'translateY(-10px)'}))]),
    ]),
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {

  public isCartDialogOpen: boolean = false;
  public cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {
    effect(() => {
      this.cartItems = this.cartService.getCartItemsSignal()();
    });
  }


  public getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPriceOfStockInCart, 0);
  }

  public getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  public getTotalOfferPriceForProduct(item: CartItem): number {
    return item.itemInCart.offerPrice * item.quantity;
  }

  public removeFromCart(item: CartItem): void {
    this.cartService.deleteAllItemsOcurrencesInCart(item.itemInCart.id);
  }

  public toggleCartDialog(): void {
    this.isCartDialogOpen = !this.isCartDialogOpen;
  }

  public trackByItemId(index: number, item: CartItem): number {
    return item.itemInCart.id;
  }

}
