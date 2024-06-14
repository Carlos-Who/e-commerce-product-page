import {Product} from "./product.interface";

export interface CartItem {
  itemInCart: Product;
  quantity: number;
  totalPriceOfStockInCart: number;
}
