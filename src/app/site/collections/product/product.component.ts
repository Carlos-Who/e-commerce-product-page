import {
  Component,
  inject,
  effect,
  OnInit,
  signal,
  WritableSignal,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA, afterNextRender
} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  CurrencyPipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
  NgStyle,
  PercentPipe
} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

import {BreakpointsService} from "../../../core/services/breakpoints/breakpoints.service";
import {ProductService} from "../../../core/services/product/product.service";
import {CartService} from "../../../core/services/cart/cart.service";
import {LightboxComponent} from "../../../shared/components/lightbox/lightbox.component";

import {Product} from "../../../core/interfaces/product.interface";
import { gsap } from "gsap";

import { SwiperOptions } from 'swiper/types';
import {register, SwiperContainer} from 'swiper/element/bundle';
register();

export interface lightboxImages {
  image: string[];
}


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgOptimizedImage,
    DecimalPipe,
    PercentPipe,
    NgStyle,
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  @ViewChild('swiperGallerySliderMobile') swiperGallerySliderMobile!: ElementRef<SwiperContainer>;
  public swiperParams!: SwiperOptions;

  public addToCartForm: FormGroup;

  public totalQuantityInCart: number = 0;
  public originalProductStock: number = 0;
  public product: Product = {
    id: 0,
    brandName: "",
    title: "",
    description: "",
    regularPrice: 0,
    discountPercentage: 0,
    offerPrice: 0,
    stock: 0,
    gallery: [],
    thumbnailGallery: [],
  };
  public imageSelected: WritableSignal<number> = signal(0);

  public breakpointsService: BreakpointsService  = inject(BreakpointsService);
  public currentBreakpoint: string = "";


  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private productService: ProductService,
    private cartService: CartService,
    public dialogLightbox: MatDialog
  ) {

    this.addToCartForm = this.formBuilder.group({
      selectedQuantity: [1, [Validators.required, Validators.min(1)]]
    });

    effect(() => {
      this.currentBreakpoint = this.breakpointsService.currentScreenSize();
    });

    effect(() => {
      const cartItems = this.cartService.getCartItemsSignal()();
      this.totalQuantityInCart = cartItems
        .filter(item => item.itemInCart.id === this.product.id)
        .reduce((total, item) => total + item.quantity, 0);
      // console.log(`Total quantity in cart updated: ${this.totalQuantityInCart}`);
      this.updateFormValidators();
    });

    afterNextRender((): void => {
      this.swiperParams = {
        slidesPerView: 1,
        navigation: true,
        loop: true,
        injectStyles: [
          `.swiper-button-next, .swiper-button-prev {
              background-color: #ffffffd1;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 1.3rem;
              height: 1.3rem;
              padding: .6em;
              aspect-ratio: 1;
              border-radius: 100%;
          }`
        ]
      }
      Object.assign(this.swiperGallerySliderMobile.nativeElement, this.swiperParams);
      this.swiperGallerySliderMobile.nativeElement.initialize();
    });
  }

  ngOnInit(): void {
    this.product = this.productService.getProduct();
    this.originalProductStock = this.product.stock;
    // console.log('Product loaded:', this.product);
    this.totalQuantityInCart = this.cartService.getAllItemsOcurrenceInCart(this.product.id)
      .reduce((total, item) => total + item.quantity, 0);
    // console.log('Total quantity in cart on init:', this.totalQuantityInCart);
    this.updateFormValidators();
  }

  public updateFormValidators(): void {
    // console.log('Updating form validators with max value:', this.product.stock - this.totalQuantityInCart);
    this.addToCartForm.get('selectedQuantity')?.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.product.stock - this.totalQuantityInCart)
    ]);
    this.addToCartForm.get('selectedQuantity')?.updateValueAndValidity();
  }

  public selectedThumbnail(index: number): void {
    this.imageSelected.set(index);
    gsap.from(".gallery__product-image-container", {
      duration: .3,
      opacity: .3,
      ease: "none",
      x: 20,
    });
  }

  public openSnackBarError(message: string, action: string): void {
    this._snackBar.open(message, action, {
      panelClass: 'error-snackbar',
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  public openSnackBarSuccess(message: string, action: string): void {
    this._snackBar.open(message, action, {
      panelClass: 'success-snackbar',
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }


  public increment(): void {
    let currentValue = this.addToCartForm.get('selectedQuantity')?.value;
    if (currentValue + this.totalQuantityInCart < this.product.stock) {
      this.addToCartForm.get('selectedQuantity')?.setValue(currentValue + 1);
    }
  }

  public decrement(): void {
    let currentValue = this.addToCartForm.get('selectedQuantity')?.value;
    if (currentValue > 1) {
      this.addToCartForm.get('selectedQuantity')?.setValue(currentValue - 1);
    }
  }

  public submitAddToCart(): void {
    if (this.addToCartForm.valid) {
      const quantity = this.addToCartForm.get('selectedQuantity')?.value;
      // console.log(`Attempting to add ${quantity} items to cart.`);
      const success = this.cartService.saveItemInCart(this.product, quantity);
      if (!success) {
        this.openSnackBarError(`The total quantity exceeds the stock of ${this.product.stock}.`, "close");
      } else {
        this.openSnackBarSuccess('Product added to cart!', 'Close');
      }
      this.addToCartForm.reset({ selectedQuantity: 1 });
    } else {
      this.openSnackBarError('Error adding this product', 'close');
    }
    this.addToCartForm.reset({ selectedQuantity: 1 });
  }

  openDialogLightbox(index: any) {
    console.log(index);
    this.dialogLightbox.open(LightboxComponent, {
      panelClass: 'lightbox-dialog',
      data: { gallery: this.product.gallery },
    });
  }

}
