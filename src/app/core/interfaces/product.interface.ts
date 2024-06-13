
export interface Product {
  id: number;
  brandName: string;
  title: string;
  description: string;
  regularPrice: number;
  discountPercentage: number;
  offerPrice: number;
  stock: number;
  gallery: string[];
}
