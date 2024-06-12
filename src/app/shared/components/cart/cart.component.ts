import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatBadge} from "@angular/material/badge";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'element-cart',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatBadge
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

  isCartDialogOpen: boolean = false;


  public toggleCartDialog(): void {
    this.isCartDialogOpen = !this.isCartDialogOpen;
  }

}
