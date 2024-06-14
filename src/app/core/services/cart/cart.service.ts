import {Injectable, signal, WritableSignal} from '@angular/core';
import {CartItem} from "../../interfaces/cart-item.interface";
import {Product} from "../../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsList: CartItem[] = [];
  private cartItemsSignal: WritableSignal<CartItem[]> = signal([]);

  constructor() { }


  getCartItemsSignal(): WritableSignal<CartItem[]> {
    return this.cartItemsSignal;
  }


  getAllItemsOcurrenceInCart(productId: number): CartItem[] {
    return this.cartItemsList.filter(item => item.itemInCart.id === productId);
  }


  saveItemInCart(productItem: Product, stockSelected: number): boolean {
    // console.log(`Attempting to save ${stockSelected} items of product ID ${productItem.id} to cart.`);
    const existingItems = this.getAllItemsOcurrenceInCart(productItem.id);
    const totalExistingQuantity = existingItems.reduce((total, item) => total + item.quantity, 0);

    if (stockSelected + totalExistingQuantity > productItem.stock) {
      // console.log(`Failed to add items to cart. Requested: ${stockSelected + totalExistingQuantity}, Available: ${productItem.stock}`);
      return false;
    }

    const existingItem = existingItems[0];
    if (existingItem) {
      existingItem.quantity += stockSelected;
      existingItem.totalPriceOfStockInCart = existingItem.quantity * productItem.offerPrice;
      // console.log(`Updated existing item. New quantity: ${existingItem.quantity}`);
    } else {
      this.cartItemsList.push({
        itemInCart: productItem,
        quantity: stockSelected,
        totalPriceOfStockInCart: stockSelected * productItem.offerPrice
      });
      // console.log(`Added new item to cart. Quantity: ${stockSelected}`);
    }

    this.cartItemsSignal.set([...this.cartItemsList]);
    return true;
  }


  deleteAllItemsOcurrencesInCart(productId: number): boolean {
    const itemsToDelete = this.getAllItemsOcurrenceInCart(productId);
    if (itemsToDelete.length === 0) return false;

    this.cartItemsList = this.cartItemsList.filter(item => item.itemInCart.id !== productId);

    // const product = itemsToDelete[0].itemInCart;
    // console.log(`Restored stock after deletion: ${product.stock}`);

    this.cartItemsSignal.set([...this.cartItemsList]);
    return true;
  }

}

