import {Component, inject, effect} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {BreakpointsService} from "../../../core/services/breakpoints/breakpoints.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  public selectedQuantity: number = 0;

  public breakpointsService: BreakpointsService  = inject(BreakpointsService);
  public currentBreakpoint: string = "";


  constructor() {
    effect(() => {
      this.currentBreakpoint = this.breakpointsService.currentScreenSize();
    });

  }

  increment(): void {

  }

  decrement(): void {

  }

  addToCart(): void {

  }

}
