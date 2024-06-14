import { Injectable } from '@angular/core';
import {Product} from "../../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private product: Product = {
    id: 1,
    brandName: "SNEAKER COMPANY",
    title: "Fall Limited Edition Sneakers",
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything weather can offer.",
    regularPrice: 250.00,
    discountPercentage: 0.50,
    offerPrice: 125.00,
    stock: 10,
    gallery: [
      "/images/products/orange-shoes/orange-shoes-1.webp",
      "/images/products/orange-shoes/orange-shoes-2.webp",
      "/images/products/orange-shoes/orange-shoes-3.webp",
      "/images/products/orange-shoes/orange-shoes-4.webp",
    ],
    thumbnailGallery: [
      "/images/products/orange-shoes/orange-shoes-thumbnail-1.webp",
      "/images/products/orange-shoes/orange-shoes-thumbnail-2.webp",
      "/images/products/orange-shoes/orange-shoes-thumbnail-3.webp",
      "/images/products/orange-shoes/orange-shoes-thumbnail-4.webp",
    ],
  };

  constructor() { }


  public getProduct(): Product {
    return this.product;
  }

}
